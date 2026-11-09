from django.test import TestCase
from django.urls import reverse

from .models import Curso


class ApiCursosTests(TestCase):
    """Pruebas básicas de la API de cursos."""

    def setUp(self):
        # La migración de datos iniciales ya crea cursos de ejemplo.
        self.curso = Curso.objects.first()

    def test_lista_de_cursos(self):
        respuesta = self.client.get(reverse("lista-cursos"))

        self.assertEqual(respuesta.status_code, 200)
        self.assertGreater(len(respuesta.json()), 0)

    def test_detalle_de_curso(self):
        respuesta = self.client.get(
            reverse("detalle-curso", args=[self.curso.pk])
        )

        self.assertEqual(respuesta.status_code, 200)
        self.assertIn("materiales", respuesta.json())
        self.assertIn("tareas", respuesta.json())

    def test_idioma_ingles(self):
        respuesta = self.client.get(
            reverse("detalle-curso", args=[self.curso.pk]) + "?lang=en"
        )

        self.assertEqual(respuesta.status_code, 200)

    def test_apoyo_filtra_por_categoria(self):
        respuesta = self.client.get(
            reverse("lista-apoyo") + "?categoria=accesibilidad"
        )

        self.assertEqual(respuesta.status_code, 200)

        for recurso in respuesta.json():
            self.assertEqual(recurso["categoria"], "accesibilidad")
