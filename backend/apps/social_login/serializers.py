# from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework_simplejwt.settings import api_settings

# from rest_framework import serializers

# #customize TokenRefreshSerializer
# class MyTokenRefreshSerializer(serializers.Serializer):

#     refresh_token = serializers.CharField()
#     token_class = RefreshToken

#     def validate(self, attrs):
#         refresh_token = self.token_class(attrs["refresh_token"])
        
#         data = {"access_token": str(refresh_token.access_token)}

#         if api_settings.ROTATE_REFRESH_TOKENS:
#             if api_settings.BLACKLIST_AFTER_ROTATION:
#                 try:
#                     # Attempt to blacklist the given refresh token
#                     refresh_token.blacklist()
#                 except AttributeError:
#                     # If blacklist app not installed, `blacklist` method will
#                     # not be present
#                     pass

#         return data


