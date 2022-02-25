from rest_framework.pagination import PageNumberPagination

class PlantListPagination(PageNumberPagination):
    # 페이지당 보여줄 갯수 기본값
    page_size = 20
    # 페이지당 보여줄 갯수 query 매개변수 이름
    page_size_query_param = "size"
    # 페이지당 보여줄 갯수 최댓값
    max_page_size = 20
    # 페이지 query 매개변수 이름
    page_query_param = "page"
