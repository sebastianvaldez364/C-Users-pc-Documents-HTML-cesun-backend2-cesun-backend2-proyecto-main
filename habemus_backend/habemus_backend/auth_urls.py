from django.urls import path
from .auth_views import LoginView, LogoutView, UsuarioActualView


urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("me/", UsuarioActualView.as_view(), name="usuario-actual"),
    path("logout/", LogoutView.as_view(), name="logout"),
]
