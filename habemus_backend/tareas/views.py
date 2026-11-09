from rest_framework.generics import ListAPIView, RetrieveAPIView

from cursos.utils import IdiomaMixin

from .models import Tarea
from .serializers import TareaSerializer


class ListaTareasView(IdiomaMixin, ListAPIView):
    """
    Endpoint encargado de devolver todas las tareas
    registradas en Habemus Classroom.

    GET /api/tareas/            -> todas las tareas.
    GET /api/tareas/?curso=1    -> solo las tareas del curso 1.

    React realizará una petición GET a esta vista.
    """

    serializer_class = TareaSerializer

    def get_queryset(self):
        tareas = Tarea.objects.select_related('materia').order_by(
            'fecha_entrega',
            'hora_entrega'
        )

        curso = self.request.query_params.get('curso')

        if curso and curso.isdigit():
            tareas = tareas.filter(materia_id=int(curso))

        return tareas


class DetalleTareaView(IdiomaMixin, RetrieveAPIView):
    """
    GET /api/tareas/<id>/

    Devuelve una tarea completa: título, descripción,
    instrucciones y fecha de entrega.
    """

    queryset = Tarea.objects.select_related('materia')

    serializer_class = TareaSerializer
