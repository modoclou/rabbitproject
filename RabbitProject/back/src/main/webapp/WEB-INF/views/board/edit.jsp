<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ include  file="../inc/header.jsp" %>
<!--  END HEADER -->
<!--  END HEADER -->
<!--  END HEADER -->
<%@page import="java.sql.*"%>

<div class="container"  style="margin-top:5%; min-height:500px"   >
	<h3>MULTIBOARD - 글수정 </h3>
		<form action="${pageContext.request.contextPath}/board/edit" 
			method="post"  id="editForm"  enctype="multipart/form-data" >
		   <fieldset>
		   <legend>	UPDATE</legend>
		   <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
		   <input type="hidden"   name="id" value="${dto.id}"    class="form-control" > 
			<div class="form-group">
			  <label for="bname"  >이름</label>
			  <input type="text"   name="bname"   id="bname" 
			  	  class="form-control"   value="${dto.member.username}"  readonly> 
			</div>			
			<div class="form-group">
			  <label for="bpass"  >비밀번호(*) 수정, 삭제시 필수</label>
			  <input type="password"   name="bpass"   id="bpass"   class="form-control" >  
			</div>																
			<div class="form-group">
			  <label for="btitle"  >제목</label>
			  <input type="text" name="btitle" id="btitle" class="form-control" 
			  		value="${dto.btitle}"> 
			</div>	
			<div class="form-group">
			  <label for="bcontent"  >내용</label>
			  <textarea name="bcontent"  id="bcontent"  cols="60"  
			  rows="10"   class="form-control">${dto.bcontent}</textarea>
			</div>	
				<div class="my-3"> <!--  새로운파일로 수정할때 -->
					<label for="file" class="form-label">파일</label> 
					<input type="file" name="file" id="file" class="form-control">
				</div>				
				<div class="my-3">  <!--  파일수정안해 -->
					<label for="bfile" class="form-label">파일</label> 
					<input type="text" name="bfile" id="bfile" 
						   class="form-control"  value="${dto.bfile}">
				</div>						
			<div class="form-group  text-right">
				<input type="submit"   value="입력"   class="btn btn-danger"  >  
				<input type="reset"    value="취소"  class="btn btn-default"    >  
				<a href="${pageContext.request.contextPath}/board/list"   
					class="btn btn-default"   >목록보기</a>
			</div>
		 </fieldset>		
		</form> <!-- end form -->	
</div>
<!-- END FOOTER -->
<!-- END FOOTER -->
<!-- END FOOTER -->
<!-- END FOOTER -->
<%@ include  file="../inc/footer.jsp" %>