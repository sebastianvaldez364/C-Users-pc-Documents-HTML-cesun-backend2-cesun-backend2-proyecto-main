from django.urls import path
from .views import DetalleTareaView, ListaTareasView


urlpatterns = [

    # GET /api/tareas/
    # Devuelve todas las tareas registradas.
    path(
        '',
        ListaTareasView.as_view(),
        name='lista-tareas'
    ),

    # GET /api/tareas/1/
    # Devuelve la tarea completa con su descripción.
    path(
        '<int:pk>/',
        DetalleTareaView.as_view(),
        name='detalle-tarea'
    ),

]
