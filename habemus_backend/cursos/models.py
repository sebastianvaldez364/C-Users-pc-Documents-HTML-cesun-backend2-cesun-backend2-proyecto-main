from django.conf import settings
from django.db import models


class Curso(models.Model):
    """
    Materia de Habemus Classroom con un docente responsable
    y los alumnos inscritos.
    """

    COLORES = [
        ("azul", "Azul"),
        ("morado", "Morado"),
        ("verde", "Verde"),
    ]

    MODALIDADES = [
        ("presencial", "Presencial"),
        ("en_linea", "En línea"),
    ]

    codigo = models.CharField(max_length=20, unique=True)
    nombre = models.CharField(max_length=150)
    nombre_en = models.CharField(max_length=150, blank=True)
    profesor = models.CharField(max_length=150)
    docente = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="materias_impartidas",
    )
    alumnos = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        blank=True,
        related_name="materias_inscritas",
    )
    descripcion = models.TextField(blank=True)
    descripcion_en = models.TextField(blank=True)
    introduccion = models.TextField(blank=True)
    introduccion_en = models.TextField(blank=True)
    competencia = models.TextField(blank=True)
    competencia_en = models.TextField(blank=True)
    progreso = models.PositiveSmallIntegerField(default=0)
    modalidad = models.CharField(
        max_length=20,
        choices=MODALIDADES,
        default="presencial",
    )
    aula = models.CharField(max_length=100, blank=True)
    aula_en = models.CharField(max_length=100, blank=True)
    color = models.CharField(max_length=20, choices=COLORES, default="azul")

    class Meta:
        ordering = ["nombre"]

    def __str__(self):
        return self.nombre


class Horario(models.Model):
    DIAS = [
        (0, "Lunes"), (1, "Martes"), (2, "Miércoles"),
        (3, "Jueves"), (4, "Viernes"), (5, "Sábado"), (6, "Domingo"),
    ]

    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name="horarios")
    dia_semana = models.PositiveSmallIntegerField(choices=DIAS)
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()

    class Meta:
        ordering = ["dia_semana", "hora_inicio"]

    def __str__(self):
        return f"{self.curso.nombre} - {self.get_dia_semana_display()} {self.hora_inicio:%H:%M}"


class Material(models.Model):
    TIPOS = [
        ("pdf", "PDF"), ("enlace", "Enlace"),
        ("video", "Video"), ("lectura", "Lectura"),
    ]

    curso = models.ForeignKey(Curso, on_delete=models.CASCADE, related_name="materiales")
    titulo = models.CharField(max_length=200)
    titulo_en = models.CharField(max_length=200, blank=True)
    tipo = models.CharField(max_length=20, choices=TIPOS, default="pdf")
    url = models.URLField(blank=True)
    orden = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["orden", "id"]
        verbose_name_plural = "materiales"

    def __str__(self):
        return self.titulo


class RecursoApoyo(models.Model):
    CATEGORIAS = [
        ("materias", "Materias"), ("accesibilidad", "Accesibilidad"),
    ]
    TIPOS = [("clase", "Clase"), ("curso", "Curso")]

    categoria = models.CharField(max_length=20, choices=CATEGORIAS)
    tipo = models.CharField(max_length=20, choices=TIPOS, default="clase")
    titulo = models.CharField(max_length=200)
    titulo_en = models.CharField(max_length=200, blank=True)
    descripcion = models.TextField(blank=True)
    descripcion_en = models.TextField(blank=True)
    dirigido_a = models.CharField(max_length=200, blank=True)
    dirigido_a_en = models.CharField(max_length=200, blank=True)
    duracion = models.CharField(max_length=60, blank=True)
    duracion_en = models.CharField(max_length=60, blank=True)
    materia = models.ForeignKey(
        Curso, on_delete=models.SET_NULL, null=True, blank=True,
        related_name="recursos_apoyo",
    )
    url = models.URLField(blank=True)
    orden = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["categoria", "orden", "id"]
        verbose_name = "recurso de apoyo"
        verbose_name_plural = "recursos de apoyo"

    def __str__(self):
        return self.titulo
