<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib  uri="http://java.sun.com/jsp/jstl/core"  prefix="c" %>
<%@ taglib  uri="http://java.sun.com/jsp/jstl/functions"  prefix="fn" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Theme Made By www.w3schools.com -->
  <title>Bootstrap Theme Company Page</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1"> 
<!-- Latest compiled and minified CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Latest compiled JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body id="myPage" data-spy="scroll" data-target=".navbar" data-offset="60">


<nav class="navbar navbar-expand-sm navbar-dark bg-primary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">BOOKS</a>
        <button class="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="mynavbar">
            <ul class="navbar-nav me-auto">
                <c:if test="${pageContext.request.userPrincipal != null}">
                    <li class="nav-item">
                        <a class="nav-link" href="${pageContext.request.contextPath}/board/list">BOARD</a>
                    </li>
                </c:if>
            </ul>

            <ul class="d-flex navbar-nav">
                <c:if test="${pageContext.request.userPrincipal == null}">
                    <li class="nav-item">
                        <a class="nav-link" href="${pageContext.request.contextPath}/member/login">LOGIN</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="${pageContext.request.contextPath}/member/join">JOIN</a>
                    </li>
                </c:if>

                <c:if test="${pageContext.request.userPrincipal != null}">
                    <li class="nav-item">
                        <a class="nav-link" href="${pageContext.request.contextPath}/member/logout">LOGOUT</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="${pageContext.request.contextPath}/member/member">
                            ${sessionScope.user.nickname}
                        </a>
                    </li>
                </c:if>
            </ul>
        </div>
    </div>
</nav>

<c:if test="${not empty msg}">
    <script>
        var msg = '${msg}';
        <c:choose>
            <c:when test="${msg eq 'fail'}">
                history.go(-1);
                alert("정보를 확인해주세요.");
            </c:when>
            <c:otherwise>
                alert(msg);
            </c:otherwise>
        </c:choose>
    </script>
</c:if>
