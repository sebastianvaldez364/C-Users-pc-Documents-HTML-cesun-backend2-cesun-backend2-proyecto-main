from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Curso, RecursoApoyo
from .serializers import CursoDetalleSerializer, CursoSerializer, RecursoApoyoSerializer
from .utils import IdiomaMixin


def es_docente(user):
    return user.groups.filter(name="Docentes").exists()


class ListaCursosView(IdiomaMixin, ListAPIView):
    serializer_class = CursoSerializer

    def get_queryset(self):
        cursos = Curso.objects.prefetch_related("horarios", "alumnos").select_related("docente")
        if es_docente(self.request.user):
            return cursos.filter(docente=self.request.user)
        return cursos.filter(alumnos=self.request.user)


class DetalleCursoView(IdiomaMixin, RetrieveAPIView):
    serializer_class = CursoDetalleSerializer

    def get_queryset(self):
        cursos = Curso.objects.prefetch_related("horarios", "materiales", "alumnos").select_related("docente")
        if es_docente(self.request.user):
            return cursos.filter(docente=self.request.user)
        return cursos.filter(alumnos=self.request.user)


class ListaApoyoView(IdiomaMixin, ListAPIView):
    serializer_class = RecursoApoyoSerializer

    def get_queryset(self):
        recursos = RecursoApoyo.objects.select_related("materia")
        categoria = self.request.query_params.get("categoria")
        if categoria:
            recursos = recursos.filter(categoria=categoria)
        return recursos
