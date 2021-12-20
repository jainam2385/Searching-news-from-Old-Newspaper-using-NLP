from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, Uploads


class CustomUserAdmin(UserAdmin):
    model = User

    list_display = ('email', 'is_staff', 'is_active',
                    'date_joined',  'name')

    list_filter = ('email', 'is_staff', 'is_active', 'name')

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active',
         'date_joined', 'name')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active', 'date_joined', 'name')}
         ),
    )

    search_fields = ('email',)
    ordering = ('email',)


class UploadsAdmin(admin.ModelAdmin):
    model = Uploads

    list_display = ('user', 'file')

    list_filter = ('user', )

    search_fields = ('user',)
    ordering = ('user',)


admin.site.register(User, CustomUserAdmin)
admin.site.register(Uploads, UploadsAdmin)
