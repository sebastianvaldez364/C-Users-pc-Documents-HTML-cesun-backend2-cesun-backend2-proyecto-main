from django.contrib import admin

from .models import Curso, Horario, Material, RecursoApoyo


class HorarioInline(admin.TabularInline):
    """Permite editar los horarios dentro del curso."""

    model = Horario
    extra = 1


class MaterialInline(admin.TabularInline):
    """Permite editar los materiales dentro del curso."""

    model = Material
    extra = 1


@admin.register(Curso)
class CursoAdmin(admin.ModelAdmin):
    list_display = ("nombre", "codigo", "profesor", "modalidad")
    inlines = [HorarioInline, MaterialInline]


@admin.register(RecursoApoyo)
class RecursoApoyoAdmin(admin.ModelAdmin):
    list_display = ("titulo", "categoria", "tipo", "materia")
    list_filter = ("categoria", "tipo")


admin.site.register(Horario)
admin.site.register(Material)
