from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required


# Create your views here.


def home(request):
    if request.method == "GET":
        if request.user.is_authenticated:
            return HttpResponseRedirect(reverse("upload"))
        else:
            return HttpResponseRedirect(reverse("loginSignup"))


def loginSignup(request):
    if request.method == "POST":
        print(request.POST)

    return render(request,  "LoginSignup.html")


@login_required
def upload(request):
    if request.method == "POST":
        print(request.POST)

    return render(request, "upload.html")
