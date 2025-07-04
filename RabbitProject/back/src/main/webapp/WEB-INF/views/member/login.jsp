<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ include file="../inc/header.jsp"%>
<!-- header -->
<!-- header -->
	<div class="container  card  my-3  p-3 w-50">
		<h3 class="card-header"> WELCOME 로그인 </h3>
		<form:form method="post" action="${pageContext.request.contextPath}/member/login" modelAttribute="memberLoginForm">
			<%-- <form:errors path="*" cssClass="text-primary text-center"/> --%>
			<c:if test="${not empty param.error}">
	            <div class="alert alert-info  my-3">아이디 또는 비밀번호를 확인해주세요</div>
	        </c:if>
	        <div class="my-3">
	            <label for="username">사용자ID</label>
	            <form:input path="username" cssClass="form-control" id="username" />
	            <form:errors path="username" cssClass="text-danger" />
	        </div>
	
	        <div class="my-3">
	            <label for="password">비밀번호</label>
	            <form:password path="password" cssClass="form-control" id="password" />
	            <form:errors path="password" cssClass="text-danger" />
	        </div>

			<div class="my-3">
           	 <input type="submit" class="btn btn-primary form-control" value="로그인" />
			</div>
			<hr />
			<div class="container my-5 text-center">
				<div class="row">
					<div class="col-sm-4">
						<a href="${pageContext.request.contextPath}/oauth2/authorization/kakao">
							<img src="${pageContext.request.contextPath}/images/kakao.png" alt="kakao login">
						</a>
					</div>
					<div class="col-sm-4">
						<a href="${pageContext.request.contextPath}/oauth2/authorization/naver">
							<img src="${pageContext.request.contextPath}/images/naver.png" alt="naver login">
						</a>
					</div>
					<div class="col-sm-4">
						<a href="${pageContext.request.contextPath}/oauth2/authorization/google">
							<img src="${pageContext.request.contextPath}/images/google.png" alt="google login">
						</a>
					</div>
				</div>
			</div>
		</form:form>
	</div>
	
	<div>
		
	<!-- 지도를 표시할 div 입니다 -->
	<div id="map" style="width:100%;height:350px;"></div>
	<script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=668d3271e4f5e9d45ec7f4a12b001802&autoload=false"></script>
	<script>
	  window.onload = function () {
	    kakao.maps.load(function () {
	      var container = document.getElementById('map');
	      var options = {
	        center: new kakao.maps.LatLng(33.450701, 126.570667),
	        level: 3
	      };
	      var map = new kakao.maps.Map(container, options);
	    });
	  };
	</script>
	</div>
<!-- footer -->
<!-- footer -->
