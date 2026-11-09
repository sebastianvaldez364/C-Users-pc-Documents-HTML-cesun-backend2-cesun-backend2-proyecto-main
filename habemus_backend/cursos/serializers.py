from rest_framework import serializers

from tareas.serializers import TareaSerializer

from .models import Curso, Horario, Material, RecursoApoyo
from .utils import traducir


class HorarioSerializer(serializers.ModelSerializer):
    """
    Una sesión semanal del curso (día, hora de inicio y de fin).
    """

    class Meta:
        model = Horario

        fields = [
            "id",
            "dia_semana",
            "hora_inicio",
            "hora_fin",
        ]


class MaterialSerializer(serializers.ModelSerializer):
    """
    Material de apoyo de un curso, traducido al idioma solicitado.
    """

    titulo = serializers.SerializerMethodField()

    class Meta:
        model = Material

        fields = [
            "id",
            "titulo",
            "tipo",
            "url",
        ]

    def get_titulo(self, objeto):
        return traducir(
            objeto,
            "titulo",
            self.context.get("idioma", "es"),
        )


class CursoSerializer(serializers.ModelSerializer):
    """
    Información general de un curso.

    Se usa en el listado: Inicio, Clases, Cursos y Horarios.
    """

    nombre = serializers.SerializerMethodField()
    descripcion = serializers.SerializerMethodField()
    aula = serializers.SerializerMethodField()

    horarios = HorarioSerializer(many=True, read_only=True)

    class Meta:
        model = Curso

        fields = [
            "id",
            "codigo",
            "nombre",
            "profesor",
            "descripcion",
            "progreso",
            "modalidad",
            "aula",
            "color",
            "horarios",
        ]

    def get_nombre(self, objeto):
        return traducir(
            objeto,
            "nombre",
            self.context.get("idioma", "es"),
        )

    def get_descripcion(self, objeto):
        return traducir(
            objeto,
            "descripcion",
            self.context.get("idioma", "es"),
        )

    def get_aula(self, objeto):
        return traducir(
            objeto,
            "aula",
            self.context.get("idioma", "es"),
        )


class CursoDetalleSerializer(CursoSerializer):
    """
    Información completa para la página de un curso:
    introducción, competencia, materiales y tareas.
    """

    introduccion = serializers.SerializerMethodField()
    competencia = serializers.SerializerMethodField()

    materiales = MaterialSerializer(many=True, read_only=True)

    tareas = serializers.SerializerMethodField()

    class Meta(CursoSerializer.Meta):
        fields = CursoSerializer.Meta.fields + [
            "introduccion",
            "competencia",
            "materiales",
            "tareas",
        ]

    def get_introduccion(self, objeto):
        return traducir(
            objeto,
            "introduccion",
            self.context.get("idioma", "es"),
        )

    def get_competencia(self, objeto):
        return traducir(
            objeto,
            "competencia",
            self.context.get("idioma", "es"),
        )

    def get_tareas(self, objeto):
        tareas = objeto.tareas.order_by(
            "fecha_entrega",
            "hora_entrega",
        )

        return TareaSerializer(
            tareas,
            many=True,
            context=self.context,
        ).data


class RecursoApoyoSerializer(serializers.ModelSerializer):
    """
    Clase o curso de la sección Apoyo.
    """

    titulo = serializers.SerializerMethodField()
    descripcion = serializers.SerializerMethodField()
    dirigido_a = serializers.SerializerMethodField()
    duracion = serializers.SerializerMethodField()
    materia = serializers.SerializerMethodField()

    class Meta:
        model = RecursoApoyo

        fields = [
            "id",
            "categoria",
            "tipo",
            "titulo",
            "descripcion",
            "dirigido_a",
            "duracion",
            "materia",
            "url",
        ]

    def _idioma(self):
        return self.context.get("idioma", "es")

    def get_titulo(self, objeto):
        return traducir(objeto, "titulo", self._idioma())

    def get_descripcion(self, objeto):
        return traducir(objeto, "descripcion", self._idioma())

    def get_dirigido_a(self, objeto):
        return traducir(objeto, "dirigido_a", self._idioma())

    def get_duracion(self, objeto):
        return traducir(objeto, "duracion", self._idioma())

    def get_materia(self, objeto):
        """
        Nombre de la materia relacionada (si existe).
        """
        if objeto.materia_id:
            return traducir(
                objeto.materia,
                "nombre",
                self._idioma(),
            )

        return ""
