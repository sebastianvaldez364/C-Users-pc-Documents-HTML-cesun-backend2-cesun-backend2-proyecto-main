from django.contrib import admin
from .models import Curso, Horario, Material, RecursoApoyo


class HorarioInline(admin.TabularInline):
    model = Horario
    extra = 1


class MaterialInline(admin.TabularInline):
    model = Material
    extra = 1


@admin.register(Curso)
class CursoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "codigo", "profesor", "docente", "modalidad")
    list_filter = ("docente", "modalidad")
    filter_horizontal = ("alumnos",)
    inlines = [HorarioInline, MaterialInline]


@admin.register(RecursoApoyo)
class RecursoApoyoAdmin(admin.ModelAdmin):
    list_display = ("titulo", "categoria", "tipo", "materia")
    list_filter = ("categoria", "tipo")


admin.site.register(Horario)
admin.site.register(Material)
