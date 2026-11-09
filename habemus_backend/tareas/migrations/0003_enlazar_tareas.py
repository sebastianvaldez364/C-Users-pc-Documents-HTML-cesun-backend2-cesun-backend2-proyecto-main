"""
Liga las tareas que ya existían con su materia y agrega
algunas tareas de ejemplo con fechas cercanas a la fecha
en la que se ejecuta la migración.

Las tareas de ejemplo se pueden editar o borrar desde
el panel administrativo (/admin/).
"""

import difflib
import unicodedata
from datetime import date, time, timedelta

from django.db import migrations


def normalizar(texto):
    """Minúsculas y sin acentos para comparar nombres."""
    texto = unicodedata.normalize("NFKD", texto or "")
    texto = "".join(c for c in texto if not unicodedata.combining(c))
    return texto.lower().strip()


def enlazar_tareas(apps, schema_editor):
    Curso = apps.get_model("cursos", "Curso")
    Tarea = apps.get_model("tareas", "Tarea")

    cursos = list(Curso.objects.all())

    if not cursos:
        return

    nombres = {normalizar(curso.nombre): curso for curso in cursos}

    # Tareas que ya existían: se buscan por nombre del curso.
    # Se tolera una falta de ortografía (por ejemplo "Desarollo web").
    for tarea in Tarea.objects.filter(materia__isnull=True):
        parecidos = difflib.get_close_matches(
            normalizar(tarea.curso),
            list(nombres.keys()),
            n=1,
            cutoff=0.8,
        )

        if parecidos:
            curso = nombres[parecidos[0]]

            tarea.materia = curso
            tarea.curso = curso.nombre
            tarea.color = curso.color
            tarea.save()

    # Tareas de ejemplo con fechas próximas.
    hoy = date.today()

    ejemplos = [
        (
            "DW-2026",
            3,
            "Práctica 1: API REST con Django",
            "Crea una API que devuelva una lista de elementos en "
            "formato JSON y pruébala desde el navegador.",
            "Crea un modelo y su serializer.\n"
            "Agrega una vista de lista y su ruta.\n"
            "Comprueba la respuesta en /api/.\n"
            "Guarda tu proyecto y súbelo al repositorio.",
        ),
        (
            "BD-2026",
            5,
            "Diagrama entidad-relación",
            "Diseña el diagrama entidad-relación de un sistema de "
            "biblioteca con préstamos y usuarios.",
            "Identifica las entidades y sus atributos.\n"
            "Define las llaves primarias y foráneas.\n"
            "Indica las cardinalidades de cada relación.\n"
            "Entrega el diagrama en formato PDF.",
        ),
        (
            "RED-2026",
            8,
            "Configuración de red en Packet Tracer",
            "Arma una red con un router, dos switches y servidores "
            "DHCP, DNS y web.",
            "Conecta los dispositivos según el diagrama.\n"
            "Configura las direcciones IP del router.\n"
            "Habilita DHCP y DNS en los servidores.\n"
            "Verifica que una PC obtenga IP y abra la página web.",
        ),
    ]

    por_codigo = {curso.codigo: curso for curso in cursos}

    for codigo, dias, titulo, descripcion, instrucciones in ejemplos:
        curso = por_codigo.get(codigo)

        if curso is None:
            continue

        Tarea.objects.create(
            titulo=titulo,
            materia=curso,
            curso=curso.nombre,
            fecha_entrega=hoy + timedelta(days=dias),
            hora_entrega=time(23, 59),
            descripcion=descripcion,
            instrucciones=instrucciones,
            color=curso.color,
        )


class Migration(migrations.Migration):

    dependencies = [
        ("tareas", "0002_tarea_materia"),
    ]

    operations = [
        migrations.RunPython(
            enlazar_tareas,
            migrations.RunPython.noop,
        ),
    ]
