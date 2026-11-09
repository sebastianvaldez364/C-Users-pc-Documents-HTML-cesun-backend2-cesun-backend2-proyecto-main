import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Curso",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("codigo", models.CharField(max_length=20, unique=True)),
                ("nombre", models.CharField(max_length=150)),
                ("nombre_en", models.CharField(blank=True, max_length=150)),
                ("profesor", models.CharField(max_length=150)),
                ("descripcion", models.TextField(blank=True)),
                ("descripcion_en", models.TextField(blank=True)),
                ("introduccion", models.TextField(blank=True)),
                ("introduccion_en", models.TextField(blank=True)),
                ("competencia", models.TextField(blank=True)),
                ("competencia_en", models.TextField(blank=True)),
                ("progreso", models.PositiveSmallIntegerField(default=0)),
                (
                    "modalidad",
                    models.CharField(
                        choices=[
                            ("presencial", "Presencial"),
                            ("en_linea", "En línea"),
                        ],
                        default="presencial",
                        max_length=20,
                    ),
                ),
                ("aula", models.CharField(blank=True, max_length=100)),
                ("aula_en", models.CharField(blank=True, max_length=100)),
                (
                    "color",
                    models.CharField(
                        choices=[
                            ("azul", "Azul"),
                            ("morado", "Morado"),
                            ("verde", "Verde"),
                        ],
                        default="azul",
                        max_length=20,
                    ),
                ),
            ],
            options={
                "ordering": ["nombre"],
            },
        ),
        migrations.CreateModel(
            name="Horario",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "dia_semana",
                    models.PositiveSmallIntegerField(
                        choices=[
                            (0, "Lunes"),
                            (1, "Martes"),
                            (2, "Miércoles"),
                            (3, "Jueves"),
                            (4, "Viernes"),
                            (5, "Sábado"),
                            (6, "Domingo"),
                        ]
                    ),
                ),
                ("hora_inicio", models.TimeField()),
                ("hora_fin", models.TimeField()),
                (
                    "curso",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="horarios",
                        to="cursos.curso",
                    ),
                ),
            ],
            options={
                "ordering": ["dia_semana", "hora_inicio"],
            },
        ),
        migrations.CreateModel(
            name="Material",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("titulo", models.CharField(max_length=200)),
                ("titulo_en", models.CharField(blank=True, max_length=200)),
                (
                    "tipo",
                    models.CharField(
                        choices=[
                            ("pdf", "PDF"),
                            ("enlace", "Enlace"),
                            ("video", "Video"),
                            ("lectura", "Lectura"),
                        ],
                        default="pdf",
                        max_length=20,
                    ),
                ),
                ("url", models.URLField(blank=True)),
                ("orden", models.PositiveSmallIntegerField(default=0)),
                (
                    "curso",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="materiales",
                        to="cursos.curso",
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "materiales",
                "ordering": ["orden", "id"],
            },
        ),
        migrations.CreateModel(
            name="RecursoApoyo",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "categoria",
                    models.CharField(
                        choices=[
                            ("materias", "Materias"),
                            ("accesibilidad", "Accesibilidad"),
                        ],
                        max_length=20,
                    ),
                ),
                (
                    "tipo",
                    models.CharField(
                        choices=[("clase", "Clase"), ("curso", "Curso")],
                        default="clase",
                        max_length=20,
                    ),
                ),
                ("titulo", models.CharField(max_length=200)),
                ("titulo_en", models.CharField(blank=True, max_length=200)),
                ("descripcion", models.TextField(blank=True)),
                ("descripcion_en", models.TextField(blank=True)),
                ("dirigido_a", models.CharField(blank=True, max_length=200)),
                ("dirigido_a_en", models.CharField(blank=True, max_length=200)),
                ("duracion", models.CharField(blank=True, max_length=60)),
                ("duracion_en", models.CharField(blank=True, max_length=60)),
                ("url", models.URLField(blank=True)),
                ("orden", models.PositiveSmallIntegerField(default=0)),
                (
                    "materia",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="recursos_apoyo",
                        to="cursos.curso",
                    ),
                ),
            ],
            options={
                "verbose_name": "recurso de apoyo",
                "verbose_name_plural": "recursos de apoyo",
                "ordering": ["categoria", "orden", "id"],
            },
        ),
    ]
