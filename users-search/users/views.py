from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def users_list(request):
    search = request.GET.get("search", "")
    email = request.GET.get("email", "")

    users = User.objects.all()

    if search:
        users = users.filter(username__icontains=search)

    if email:
        users = users.filter(email__icontains=email)

    data = []

    for user in users:
        data.append({
            "id": user.id,
            "username": user.username,
            "email": user.email
        })

    return Response(data)