<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include file="../inc/header.jsp" %>
<%@page import="java.sql.*"%>
<!-- 	header		 -->
<!-- 	header		 -->
<!-- 	header		 -->
<div class="container"  style="margin-top:5%; min-height:500px">
	<h3>MULTIBOARD 상세보기</h3> 					
	<div class="panel" >
	  <div  class="panel-body"> 
	  		<span class="glyphicon glyphicon-plus">  조회수</span>
	  		<p  class="form-control">${dto.bhit}</p>
	</div>	
	</div>	
	<div class="panel"  >
	  <div  class="panel-body">
	  		<span class="glyphicon glyphicon-plus">  이름</span> 
			<p class="form-control">${dto.member.username}</p>
		</div>
	</div>				
	<div class="panel"  >
	  <div  class="panel-body">
	  	<span class="glyphicon glyphicon-plus">  제목</span> 
	     <p  class="form-control">${dto.btitle}</p>
	  </div>	
	</div>
	<div class="panel"  >
	  <div  class="panel-body">
	  	<span class="glyphicon glyphicon-plus">  내용</span>
	  	<textarea class="form-control" readonly >${dto.bcontent}</textarea>
	  </div> 
	</div>	
	<div class="my-3">
		<div class="">
			<span><i class="bi bi-book-half"></i> 이미지</span>
			<p>  
				<img src="/upload/${dto.bfile}" alt="${dto.btitle}" style="width:200px"/>
			</p>
		</div>
	</div>	
	<div class="text-end"    >
		 <a href="${pageContext.request.contextPath}/board/edit/${dto.id}"  
		 	class="btn btn-danger" >수정</a> 
		 <a href="${pageContext.request.contextPath}/board/delete/${dto.id}"  
		 	class="btn btn-danger" >삭제</a>    
		 <a href="${pageContext.request.contextPath}/board/list"  
		 	class="btn btn-primary" >목록보기</a> 
	</div>						 
</div>	

<!-- 	footer		 -->
<!-- 	footer		 -->
<!-- 	footer		 -->
<%@ include file="../inc/footer.jsp" %>
