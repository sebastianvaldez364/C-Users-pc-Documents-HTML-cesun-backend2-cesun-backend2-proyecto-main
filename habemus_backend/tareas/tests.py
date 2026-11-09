from datetime import date, time

from django.test import TestCase
from django.urls import reverse

from cursos.models import Curso

from .models import Tarea


class ApiTareasTests(TestCase):
    """Pruebas básicas de la API de tareas."""

    def setUp(self):
        self.curso = Curso.objects.first()

        self.tarea = Tarea.objects.create(
            titulo='Tarea de prueba',
            materia=self.curso,
            fecha_entrega=date(2026, 12, 1),
            hora_entrega=time(23, 59),
            descripcion='Descripción',
            instrucciones='Paso 1\nPaso 2',
        )

    def test_guarda_el_nombre_del_curso(self):
        self.assertEqual(self.tarea.curso, self.curso.nombre)

    def test_detalle_de_tarea(self):
        respuesta = self.client.get(
            reverse('detalle-tarea', args=[self.tarea.pk])
        )

        self.assertEqual(respuesta.status_code, 200)
        self.assertEqual(respuesta.json()['titulo'], 'Tarea de prueba')

    def test_filtra_por_curso(self):
        respuesta = self.client.get(
            reverse('lista-tareas') + f'?curso={self.curso.pk}'
        )

        self.assertEqual(respuesta.status_code, 200)

        for tarea in respuesta.json():
            self.assertEqual(tarea['materia'], self.curso.pk)
