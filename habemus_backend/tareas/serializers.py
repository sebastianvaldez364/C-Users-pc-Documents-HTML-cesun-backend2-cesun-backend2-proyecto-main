from rest_framework import serializers

from cursos.utils import traducir

from .models import Tarea


class TareaSerializer(serializers.ModelSerializer):
    """
    Convierte los objetos Tarea de Django a JSON
    para que puedan ser utilizados por React.

    El campo curso devuelve el nombre de la materia en el
    idioma solicitado por el frontend (?lang=es o ?lang=en).
    """

    curso = serializers.SerializerMethodField()

    class Meta:
        model = Tarea

        fields = [
            'id',
            'titulo',
            'curso',
            'materia',
            'fecha_entrega',
            'hora_entrega',
            'descripcion',
            'instrucciones',
            'color',
        ]

    def get_curso(self, tarea):
        """
        Si la tarea está ligada a una materia se devuelve su
        nombre traducido. En caso contrario se usa el texto
        guardado en la tarea.
        """
        if tarea.materia_id:
            return traducir(
                tarea.materia,
                'nombre',
                self.context.get('idioma', 'es')
            )

        return tarea.curso
