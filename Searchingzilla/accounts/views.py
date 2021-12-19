from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect
from django.urls import reverse

# Create your views here.


def home(request):
    if request.method == "GET":
        if request.user.is_authenticated:
            return HttpResponseRedirect(reverse("loginSignup"))
        else:
            return HttpResponseRedirect(reverse("loginSignup"))


def loginSignup(request):
    if request.method == "POST":
        print(request.POST)

    return render(request,  "LoginSignup.html")
