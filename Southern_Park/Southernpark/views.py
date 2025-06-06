from django.shortcuts import render, HttpResponse

# Create your views here.

def home(request):
    return render(request, "index.html")
def calendar(request):
    return render(request, "calendar.html")
def faculty(request):
    return render(request, "faculty.html")
def policies(request):
    return render(request, "policies.html")