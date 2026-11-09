"""
Datos iniciales de Habemus Classroom.

Crea los tres cursos del proyecto (Desarrollo Web, Base de Datos y
Redes) con sus horarios, materiales de apoyo y los recursos de la
sección Apoyo.

Estos datos son de ejemplo: se pueden editar o borrar desde el panel
administrativo de Django (/admin/).

Solo se ejecutan cuando todavía no existe ningún curso.
"""

from datetime import time

from django.db import migrations


CURSOS = [
    {
        "codigo": "DW-2026",
        "nombre": "Desarrollo Web",
        "nombre_en": "Web Development",
        "profesor": "Carlos Ramírez",
        "descripcion": "Desarrollo de aplicaciones y sitios web.",
        "descripcion_en": "Development of web applications and websites.",
        "introduccion": (
            "En este curso aprenderás a construir aplicaciones web "
            "completas: desde las rutas y las vistas del servidor hasta "
            "las interfaces que utiliza el usuario. Trabajarás con "
            "Django, APIs REST y React para conectar el frontend con el "
            "backend y presentar información real en tus proyectos."
        ),
        "introduccion_en": (
            "In this course you will learn to build complete web "
            "applications: from server routes and views to the "
            "interfaces people actually use. You will work with Django, "
            "REST APIs and React to connect the frontend with the "
            "backend and show real data in your projects."
        ),
        "competencia": (
            "Al finalizar este curso serás capaz de diseñar y "
            "desarrollar aplicaciones web funcionales, seguras y "
            "escalables, integrando un backend con una interfaz moderna."
        ),
        "competencia_en": (
            "By the end of this course you will be able to design and "
            "build functional, secure and scalable web applications, "
            "integrating a backend with a modern interface."
        ),
        "progreso": 70,
        "modalidad": "presencial",
        "aula": "Laboratorio 2",
        "aula_en": "Lab 2",
        "color": "azul",
        "horarios": [
            (0, time(9, 0), time(10, 30)),
            (3, time(9, 0), time(10, 30)),
        ],
        "materiales": [
            ("Guía de aprendizaje", "Learning guide", "pdf", ""),
            (
                "Documentación oficial de Django",
                "Official Django documentation",
                "enlace",
                "https://docs.djangoproject.com/es/",
            ),
            (
                "Documentación de React",
                "React documentation",
                "enlace",
                "https://react.dev/",
            ),
            (
                "Introducción a las APIs REST",
                "Introduction to REST APIs",
                "lectura",
                "",
            ),
        ],
    },
    {
        "codigo": "BD-2026",
        "nombre": "Base de Datos",
        "nombre_en": "Databases",
        "profesor": "Ana Martínez",
        "descripcion": "Diseño, administración y consulta de bases de datos.",
        "descripcion_en": "Design, administration and querying of databases.",
        "introduccion": (
            "Este curso te enseña a diseñar modelos relacionales, "
            "escribir consultas SQL y administrar las bases de datos "
            "que respaldan a los sistemas reales. Aprenderás a "
            "organizar la información para que sea consistente, segura "
            "y fácil de consultar."
        ),
        "introduccion_en": (
            "This course teaches you to design relational models, "
            "write SQL queries and manage the databases behind real "
            "systems. You will learn to organize information so that it "
            "is consistent, secure and easy to query."
        ),
        "competencia": (
            "Al finalizar este curso serás capaz de modelar, crear y "
            "consultar bases de datos relacionales que cumplan con los "
            "requerimientos de un proyecto de software."
        ),
        "competencia_en": (
            "By the end of this course you will be able to model, "
            "create and query relational databases that meet the "
            "requirements of a software project."
        ),
        "progreso": 50,
        "modalidad": "presencial",
        "aula": "Aula 204",
        "aula_en": "Room 204",
        "color": "morado",
        "horarios": [
            (1, time(11, 0), time(12, 30)),
            (4, time(12, 0), time(13, 30)),
        ],
        "materiales": [
            ("Guía de aprendizaje", "Learning guide", "pdf", ""),
            (
                "Documentación de SQLite",
                "SQLite documentation",
                "enlace",
                "https://www.sqlite.org/docs.html",
            ),
            (
                "Modelo entidad-relación: apuntes",
                "Entity-relationship model: notes",
                "lectura",
                "",
            ),
        ],
    },
    {
        "codigo": "RED-2026",
        "nombre": "Redes",
        "nombre_en": "Networking",
        "profesor": "Luis Hernández",
        "descripcion": "Fundamentos de redes y comunicación de datos.",
        "descripcion_en": "Networking fundamentals and data communication.",
        "introduccion": (
            "En este curso conocerás los fundamentos de las redes de "
            "computadoras: direccionamiento IP, servicios como DHCP, "
            "DNS y web, y la configuración de equipos con Cisco Packet "
            "Tracer. Practicarás armando redes completas desde cero."
        ),
        "introduccion_en": (
            "In this course you will learn the fundamentals of computer "
            "networks: IP addressing, services such as DHCP, DNS and "
            "web, and device configuration with Cisco Packet Tracer. "
            "You will practice building complete networks from scratch."
        ),
        "competencia": (
            "Al finalizar este curso serás capaz de diseñar, configurar "
            "y documentar redes pequeñas con los servicios básicos "
            "necesarios para su funcionamiento."
        ),
        "competencia_en": (
            "By the end of this course you will be able to design, "
            "configure and document small networks with the basic "
            "services they need to work."
        ),
        "progreso": 85,
        "modalidad": "en_linea",
        "aula": "Clase virtual",
        "aula_en": "Virtual class",
        "color": "verde",
        "horarios": [
            (2, time(10, 0), time(11, 30)),
        ],
        "materiales": [
            ("Guía de aprendizaje", "Learning guide", "pdf", ""),
            (
                "Cisco Networking Academy",
                "Cisco Networking Academy",
                "enlace",
                "https://www.netacad.com/",
            ),
            (
                "Subnetting: ejercicios resueltos",
                "Subnetting: solved exercises",
                "lectura",
                "",
            ),
        ],
    },
]


# (categoria, tipo, materia, titulo, titulo_en, descripcion,
#  descripcion_en, dirigido_a, dirigido_a_en, duracion, duracion_en)
APOYO = [
    (
        "materias", "clase", "DW-2026",
        "Taller de repaso: Django y APIs REST",
        "Review workshop: Django and REST APIs",
        "Sesión práctica para reforzar rutas, vistas, serializers y "
        "consumo de la API desde React.",
        "Hands-on session to reinforce routes, views, serializers and "
        "consuming the API from React.",
        "Estudiantes de Desarrollo Web",
        "Web Development students",
        "2 horas",
        "2 hours",
    ),
    (
        "materias", "curso", "DW-2026",
        "React desde cero",
        "React from scratch",
        "Curso breve con componentes, estado, efectos y rutas, "
        "pensado para quienes necesitan ponerse al día.",
        "Short course covering components, state, effects and routing, "
        "for students who need to catch up.",
        "Estudiantes de Desarrollo Web",
        "Web Development students",
        "4 semanas",
        "4 weeks",
    ),
    (
        "materias", "clase", "BD-2026",
        "Asesoría de consultas SQL",
        "SQL query tutoring",
        "Resolución de dudas sobre SELECT, JOIN, agrupaciones y "
        "subconsultas con ejercicios guiados.",
        "Q&A on SELECT, JOIN, grouping and subqueries with guided "
        "exercises.",
        "Estudiantes de Base de Datos",
        "Databases students",
        "1 hora",
        "1 hour",
    ),
    (
        "materias", "curso", "BD-2026",
        "Modelado de bases de datos",
        "Database modeling",
        "Del modelo entidad-relación al esquema final: llaves, "
        "relaciones y normalización paso a paso.",
        "From the entity-relationship model to the final schema: keys, "
        "relationships and normalization step by step.",
        "Estudiantes de Base de Datos",
        "Databases students",
        "3 semanas",
        "3 weeks",
    ),
    (
        "materias", "clase", "RED-2026",
        "Práctica de subnetting",
        "Subnetting practice",
        "Ejercicios de direccionamiento IP y máscaras de subred con "
        "retroalimentación inmediata.",
        "IP addressing and subnet mask exercises with immediate "
        "feedback.",
        "Estudiantes de Redes",
        "Networking students",
        "1 hora",
        "1 hour",
    ),
    (
        "materias", "curso", "RED-2026",
        "Redes con Cisco Packet Tracer",
        "Networks with Cisco Packet Tracer",
        "Configuración de routers, switches y servidores DHCP, DNS y "
        "web en prácticas guiadas.",
        "Configuring routers, switches and DHCP, DNS and web servers "
        "in guided practices.",
        "Estudiantes de Redes",
        "Networking students",
        "4 semanas",
        "4 weeks",
    ),
    (
        "accesibilidad", "clase", None,
        "Comunicación aumentativa y alternativa (CAA) en el aula",
        "Augmentative and alternative communication (AAC) in the "
        "classroom",
        "Clase para estudiantes con dificultades para comunicarse: "
        "tableros de pictogramas, comunicadores en pantalla y formas "
        "de participar en clase sin hablar.",
        "Class for students who have difficulty communicating: "
        "pictogram boards, on-screen communicators and ways to take "
        "part in class without speaking.",
        "Estudiantes con dificultades de comunicación",
        "Students with communication difficulties",
        "1 hora",
        "1 hour",
    ),
    (
        "accesibilidad", "clase", None,
        "Introducción a la Lengua de Señas Mexicana (LSM)",
        "Introduction to Mexican Sign Language (LSM)",
        "Vocabulario básico y frases de uso diario para comunicarse "
        "con compañeros y compañeras sordos o con discapacidad "
        "auditiva.",
        "Basic vocabulary and everyday phrases to communicate with "
        "classmates who are deaf or hard of hearing.",
        "Toda la comunidad estudiantil",
        "The whole student community",
        "1 hora por semana",
        "1 hour per week",
    ),
    (
        "accesibilidad", "curso", None,
        "Tecnologías de apoyo: lectores de pantalla y dictado por voz",
        "Assistive technology: screen readers and voice dictation",
        "Aprende a usar lectores de pantalla, ampliadores y dictado "
        "por voz para estudiar y entregar tareas con mayor "
        "autonomía.",
        "Learn to use screen readers, magnifiers and voice dictation "
        "to study and hand in assignments more independently.",
        "Estudiantes con discapacidad visual o motriz",
        "Students with visual or motor disabilities",
        "3 semanas",
        "3 weeks",
    ),
    (
        "accesibilidad", "curso", None,
        "Estrategias de estudio y organización",
        "Study and organization strategies",
        "Técnicas para planear el tiempo, dividir tareas largas y "
        "estudiar con distintos estilos de aprendizaje.",
        "Techniques for planning your time, splitting long tasks and "
        "studying with different learning styles.",
        "Estudiantes que necesitan apoyo para organizarse",
        "Students who need support to get organized",
        "2 semanas",
        "2 weeks",
    ),
]


def crear_datos_iniciales(apps, schema_editor):
    Curso = apps.get_model("cursos", "Curso")
    Horario = apps.get_model("cursos", "Horario")
    Material = apps.get_model("cursos", "Material")
    RecursoApoyo = apps.get_model("cursos", "RecursoApoyo")

    if Curso.objects.exists():
        return

    cursos_por_codigo = {}

    for datos in CURSOS:
        curso = Curso.objects.create(
            codigo=datos["codigo"],
            nombre=datos["nombre"],
            nombre_en=datos["nombre_en"],
            profesor=datos["profesor"],
            descripcion=datos["descripcion"],
            descripcion_en=datos["descripcion_en"],
            introduccion=datos["introduccion"],
            introduccion_en=datos["introduccion_en"],
            competencia=datos["competencia"],
            competencia_en=datos["competencia_en"],
            progreso=datos["progreso"],
            modalidad=datos["modalidad"],
            aula=datos["aula"],
            aula_en=datos["aula_en"],
            color=datos["color"],
        )

        cursos_por_codigo[datos["codigo"]] = curso

        for dia, inicio, fin in datos["horarios"]:
            Horario.objects.create(
                curso=curso,
                dia_semana=dia,
                hora_inicio=inicio,
                hora_fin=fin,
            )

        for orden, material in enumerate(datos["materiales"]):
            titulo, titulo_en, tipo, url = material

            Material.objects.create(
                curso=curso,
                titulo=titulo,
                titulo_en=titulo_en,
                tipo=tipo,
                url=url,
                orden=orden,
            )

    for orden, recurso in enumerate(APOYO):
        (
            categoria, tipo, codigo, titulo, titulo_en,
            descripcion, descripcion_en, dirigido_a, dirigido_a_en,
            duracion, duracion_en,
        ) = recurso

        RecursoApoyo.objects.create(
            categoria=categoria,
            tipo=tipo,
            materia=cursos_por_codigo.get(codigo),
            titulo=titulo,
            titulo_en=titulo_en,
            descripcion=descripcion,
            descripcion_en=descripcion_en,
            dirigido_a=dirigido_a,
            dirigido_a_en=dirigido_a_en,
            duracion=duracion,
            duracion_en=duracion_en,
            orden=orden,
        )


class Migration(migrations.Migration):

    dependencies = [
        ("cursos", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(
            crear_datos_iniciales,
            migrations.RunPython.noop,
        ),
    ]
