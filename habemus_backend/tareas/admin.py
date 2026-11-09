from django.contrib import admin
from .models import Tarea


@admin.register(Tarea)
class TareaAdmin(admin.ModelAdmin):
    """
    Permite administrar las tareas desde
    el panel administrativo de Django.
    """

    list_display = ('titulo', 'materia', 'fecha_entrega', 'hora_entrega')
    list_filter = ('materia',)
