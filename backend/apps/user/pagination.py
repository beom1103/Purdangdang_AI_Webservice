from rest_framework.pagination import PageNumberPagination

class LikeListPagination(PageNumberPagination):
    """
    찜 리스트       
    """
    page_size = 5
    page_size_query_param = "size"
    max_page_size = 5
    page_query_param = "page"