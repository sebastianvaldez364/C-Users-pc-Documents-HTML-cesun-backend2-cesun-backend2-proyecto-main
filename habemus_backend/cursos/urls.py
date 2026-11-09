from django.urls import path

from .views import DetalleCursoView, ListaCursosView


urlpatterns = [

    # GET /api/cursos/
    # Devuelve todos los cursos.
    path(
        "",
        ListaCursosView.as_view(),
        name="lista-cursos",
    ),

    # GET /api/cursos/1/
    # Devuelve la página completa de un curso.
    path(
        "<int:pk>/",
        DetalleCursoView.as_view(),
        name="detalle-curso",
    ),

]
