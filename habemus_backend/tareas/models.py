from django.db import models


class Tarea(models.Model):
    """
    Representa una actividad asignada a un estudiante
    dentro de Habemus Classroom.

    La tarea pertenece a una materia (campo materia).
    El campo curso conserva el nombre de la materia como texto
    para las tareas que se registraron antes de existir el
    modelo Curso.
    """

    titulo = models.CharField(max_length=200)

    # Materia a la que pertenece la tarea.
    materia = models.ForeignKey(
        "cursos.Curso",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="tareas",
    )

    # Nombre de la materia en texto.
    # Se completa automáticamente cuando se elige una materia.
    curso = models.CharField(
        max_length=150,
        blank=True
    )

    fecha_entrega = models.DateField()

    hora_entrega = models.TimeField()

    descripcion = models.TextField()

    instrucciones = models.TextField()

    color = models.CharField(
        max_length=20,
        default="azul"
    )

    def save(self, *args, **kwargs):
        """
        Mantiene sincronizados el nombre del curso y
        la materia elegida en el administrador.
        """
        if self.materia_id:
            self.curso = self.materia.nombre

        super().save(*args, **kwargs)

    def __str__(self):
        """
        Representación legible de la tarea dentro
        del administrador de Django.
        """
        return self.titulo
