package com.company.project001.board;
 
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardForm {
	@NotEmpty(message="제목은 필수항목입니다.")
	@Size(max=100 , message="제목은 100자 이내여야 합니다.")
	private  String btitle;

	@NotEmpty(message="내용은 필수항목입니다.")
	private  String bcontent;
	
	private  String bfile;
	private  String bip;

	@NotEmpty(message="비밀번호는 필수항목입니다.")
	@Size(min=3, max=20 , message="비밀번호는 4자이상 20자이하여야 합니다.")
	private  String bpass;
	private  Long   bhit; 
	
	@NotNull(message="작성자는 필수입니다.")
	private  Long   memberId; 
}


 