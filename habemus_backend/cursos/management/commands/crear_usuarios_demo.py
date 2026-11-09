from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.core.management.base import BaseCommand
from cursos.models import Curso


class Command(BaseCommand):
    help = "Crea las cuentas de demostración y asigna cada materia a su docente."

    def handle(self, *args, **options):
        User = get_user_model()
        docentes, _ = Group.objects.get_or_create(name="Docentes")

        alumno, creado = User.objects.get_or_create(username="Alumno")
        alumno.set_password("1234")
        alumno.is_staff = False
        alumno.save()
        alumno.groups.remove(docentes)
        self.stdout.write(self.style.SUCCESS("Alumno / 1234 listo"))

        cursos = Curso.objects.all()
        for curso in cursos:
            palabras = [
                palabra for palabra in curso.nombre.lower().split()
                if palabra not in {"de", "del", "la", "las", "el", "los", "y", "en"}
            ]
            abreviatura = "".join(p[0] for p in palabras) or curso.codigo[:4].lower()
            username = "Docente" + abreviatura
            docente, _ = User.objects.get_or_create(username=username)
            docente.set_password("1234")
            docente.is_staff = False
            docente.save()
            docente.groups.add(docentes)

            curso.docente = docente
            curso.profesor = docente.username
            curso.alumnos.add(alumno)
            curso.save(update_fields=["docente", "profesor"])

            self.stdout.write(self.style.SUCCESS(
                f"{curso.nombre}: {username} / 1234"
            ))

        self.stdout.write(self.style.SUCCESS(
            "Cuentas demo creadas. El alumno quedó inscrito en todas las materias existentes."
        ))
