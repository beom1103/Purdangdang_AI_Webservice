from rest_framework.pagination import PageNumberPagination

class PlantListPagination(PageNumberPagination):
    """
    검색페이지     
    """
    page_size = 20
    page_size_query_param = "size"
    max_page_size = 20
    page_query_param = "page"

class ReviewListPagination(PageNumberPagination):
    """
    식물 리뷰       
    """
    page_size = 3
    page_size_query_param = "size"
    max_page_size = 3
    page_query_param = "page"


