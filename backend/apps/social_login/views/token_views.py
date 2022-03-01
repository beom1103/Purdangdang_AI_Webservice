from rest_framework_simplejwt.views import TokenRefreshView
from ..serializers import MyTokenRefreshSerializer
from rest_framework.permissions import IsAuthenticated

class MyTokenRefreshView(TokenRefreshView):
    permission_classes = [IsAuthenticated]
    serializer_class = MyTokenRefreshSerializer

