from django.urls import path

from .views import ListaApoyoView


urlpatterns = [

    # GET /api/apoyo/
    # Devuelve las clases y cursos de apoyo.
    path(
        "",
        ListaApoyoView.as_view(),
        name="lista-apoyo",
    ),

]
