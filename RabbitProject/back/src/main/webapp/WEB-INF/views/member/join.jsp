<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ include file="../inc/header.jsp"%>
<!-- header -->
<!-- header -->
	<div class="container  card  my-3  p-3 w-50">
		<h3 class="card-header"> WELCOME 회원가입</h3>
		<form:form method="post" action="${pageContext.request.contextPath}/member/join" modelAttribute="memberJoinForm">

	        <div class="my-3">
	            <label for="username">사용자ID</label>
	            <form:input path="username" cssClass="form-control" />
	            <form:errors path="username" cssClass="text-danger" />
	        </div>
	
	        <div class="my-3">
	            <label for="password">비밀번호</label>
	            <form:password path="password" cssClass="form-control" />
	            <form:errors path="password" cssClass="text-danger" />
	        </div>
	
	        <div class="my-3">
	            <label for="password2">비밀번호 확인</label>
	            <form:password path="password2" cssClass="form-control" />
	            <form:errors path="password2" cssClass="text-danger" />
	        </div>
	
	        <div class="my-3">
	            <label for="email">이메일</label>
	            <form:input path="email" cssClass="form-control" />
	            <form:errors path="email" cssClass="text-danger" />
	        </div>
	        
			<div class="my-3">
            <input type="submit" class="btn btn-primary form-control" value="회원가입" />
			</div>
			<form:errors path="*" cssClass="text-primary text-center"/>
		</form:form>
	</div>
<!-- footer -->
<!-- footer -->








