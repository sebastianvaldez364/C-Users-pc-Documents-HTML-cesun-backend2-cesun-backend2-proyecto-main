from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Curso, RecursoApoyo
from .serializers import (
    CursoDetalleSerializer,
    CursoSerializer,
    RecursoApoyoSerializer,
)
from .utils import IdiomaMixin


class ListaCursosView(IdiomaMixin, ListAPIView):
    """
    GET /api/cursos/

    Devuelve todos los cursos con sus horarios.
    """

    queryset = Curso.objects.prefetch_related("horarios")

    serializer_class = CursoSerializer


class DetalleCursoView(IdiomaMixin, RetrieveAPIView):
    """
    GET /api/cursos/<id>/

    Devuelve la información completa de un curso:
    introducción, horarios, materiales y tareas.
    """

    queryset = Curso.objects.prefetch_related(
        "horarios",
        "materiales",
    )

    serializer_class = CursoDetalleSerializer


class ListaApoyoView(IdiomaMixin, ListAPIView):
    """
    GET /api/apoyo/
    GET /api/apoyo/?categoria=materias
    GET /api/apoyo/?categoria=accesibilidad

    Devuelve las clases y cursos de la sección Apoyo.
    """

    serializer_class = RecursoApoyoSerializer

    def get_queryset(self):
        recursos = RecursoApoyo.objects.select_related("materia")

        categoria = self.request.query_params.get("categoria")

        if categoria:
            recursos = recursos.filter(categoria=categoria)

        return recursos
