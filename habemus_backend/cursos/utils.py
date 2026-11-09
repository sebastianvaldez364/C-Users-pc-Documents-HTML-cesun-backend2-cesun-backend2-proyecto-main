"""
Utilidades compartidas por las aplicaciones de Habemus Classroom.

El frontend de React envía el idioma elegido por el estudiante en la
dirección de la petición, por ejemplo:

    GET /api/cursos/?lang=en

Con este dato el backend devuelve los textos en español o en inglés.
"""


def obtener_idioma(request):
    """
    Devuelve "en" cuando el frontend solicita inglés.
    En cualquier otro caso se utiliza español.
    """
    if request.query_params.get("lang") == "en":
        return "en"

    return "es"


def traducir(objeto, campo, idioma):
    """
    Devuelve el texto de un campo en el idioma solicitado.

    Los campos en inglés se guardan con el sufijo "_en"
    (por ejemplo: nombre y nombre_en). Si la traducción
    está vacía se utiliza el texto original en español.
    """
    if idioma == "en":
        valor = getattr(objeto, f"{campo}_en", "")

        if valor:
            return valor

    return getattr(objeto, campo)


class IdiomaMixin:
    """
    Mixin para las vistas de la API.

    Agrega el idioma al contexto de los serializers para que
    puedan traducir los textos que vienen de la base de datos.
    """

    def get_serializer_context(self):
        contexto = super().get_serializer_context()
        contexto["idioma"] = obtener_idioma(self.request)
        return contexto
