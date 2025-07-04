package com.company.project001.util;

import java.io.File;  //##
import java.io.IOException;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

@Component
public class UtilUpload {
	@Value("${resource.path}")// application.properties 변수    resource.path
	private String uploadPath;
	
	public  String fileUpload(MultipartFile file) throws IOException {
		
		//1. 파일이름 중복안되게 설정
		String save= UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
		
		try {
			//2. 파일업로드기능
			File target=new File(uploadPath ,save); 
			////###  추가
			if (!target.getParentFile().exists()) {
			    target.getParentFile().mkdirs(); // 디렉토리 생성
			}
	
			FileCopyUtils.copy(file.getBytes(), target);  // 실제파일올리기
		}catch (IOException e1) {
		    e1.printStackTrace(); // 추가로 로그를 남길 수 있습니다.
		    System.err.println("File Upload Error: " + e1.getMessage());
		}
		
		return save;
	}
}
