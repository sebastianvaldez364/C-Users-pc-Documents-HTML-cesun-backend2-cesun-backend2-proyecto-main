from rest_framework.generics import ListAPIView, RetrieveAPIView
from cursos.models import Curso
from cursos.utils import IdiomaMixin
from cursos.views import es_docente
from .models import Tarea
from .serializers import TareaSerializer


class ListaTareasView(IdiomaMixin, ListAPIView):
    serializer_class = TareaSerializer

    def get_queryset(self):
        tareas = Tarea.objects.select_related("materia").order_by("fecha_entrega", "hora_entrega")
        if es_docente(self.request.user):
            tareas = tareas.filter(materia__docente=self.request.user)
        else:
            tareas = tareas.filter(materia__alumnos=self.request.user)

        curso = self.request.query_params.get("curso")
        if curso and curso.isdigit():
            tareas = tareas.filter(materia_id=int(curso))
        return tareas.distinct()


class DetalleTareaView(IdiomaMixin, RetrieveAPIView):
    serializer_class = TareaSerializer

    def get_queryset(self):
        if es_docente(self.request.user):
            return Tarea.objects.select_related("materia").filter(materia__docente=self.request.user)
        return Tarea.objects.select_related("materia").filter(materia__alumnos=self.request.user)
