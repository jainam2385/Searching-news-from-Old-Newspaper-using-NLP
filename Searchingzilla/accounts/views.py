import json
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import redirect
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from accounts.models import User
from accounts.forms import UserForm, UploadsForm

# Create your views here.


def home(request):
    if request.method == "GET":
        if request.user.is_authenticated:
            return HttpResponseRedirect(reverse("upload"))
        else:
            return HttpResponseRedirect(reverse("loginSignup"))


def loginSignup(request):
    error = ""

    if request.method == "POST":
        name = request.POST.get("name", None)

        # Register user
        if name != None:
            user_form = UserForm(request.POST)

            if user_form.is_valid():
                user = user_form.save()

                user.set_password(user.password)

                user.save()

                login(request, User.objects.get(
                    email=user.email,
                    password=user.password
                ))

                return HttpResponseRedirect(reverse("home"))

            error = "User with this Email address already exists." \
                if "User with this Email address already exists." in str(user_form.errors) \
                else ""

        # Login user
        else:
            email = request.POST.get("email", None)
            password = request.POST.get("password", None)

            user = authenticate(username=email, password=password)

            if user:
                login(request, user)

                return HttpResponseRedirect(reverse("home"))
            error = "Invalid email / password!"

    return render(request,  "LoginSignup.html", {"error": error})


@login_required
def upload(request):
    if request.method == "POST":
        upload = UploadsForm({"user": request.user}, request.FILES)

        if upload.is_valid():
            upload.save()

        return HttpResponse(json.dumps({
            "success": True
        }))

    return render(request, "upload.html")


@login_required
def accountLogout(request):
    if request.method == "GET":
        logout(request)

    return HttpResponseRedirect(reverse("home"))
