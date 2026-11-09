import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cursos", "0002_datos_iniciales"),
        ("tareas", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="tarea",
            name="materia",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="tareas",
                to="cursos.curso",
            ),
        ),
        migrations.AlterField(
            model_name="tarea",
            name="curso",
            field=models.CharField(blank=True, max_length=150),
        ),
    ]
