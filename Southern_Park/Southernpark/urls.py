from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("calendar/", views.calendar, name="calendar"),
    path("faculty", views.faculty, name="faculty"),
]