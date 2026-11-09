from django.contrib import admin
from django.urls import path, include


urlpatterns = [

    # Panel administrativo de Django.
    path(
        'admin/',
        admin.site.urls
    ),

    # API utilizada por el frontend React.
    path(
        'api/tareas/',
        include('tareas.urls')
    ),

    # Cursos, horarios y materiales de cada materia.
    path(
        'api/cursos/',
        include('cursos.urls')
    ),

    # Clases y cursos de la sección Apoyo.
    path(
        'api/apoyo/',
        include('cursos.urls_apoyo')
    ),

]