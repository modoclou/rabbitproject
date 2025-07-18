package com.company.project001.tmdb;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Component;

@Component
public class NaverMail {
	 
	public void sendMail( String subject, String content , String useremail) {
		//1. 보내는쪽
		String  host = "smtp.naver.com";
		String  user = "cozizii@naver.com";   // naver아이디  cozizii@naver.com
		String  password="300djr270701";  // naver 비번
		
		//2. 받는사람
		String  to = useremail;
		
		//3. 인증과 함께 보내는 세션설정
		Properties props = new Properties();
		props.put("mail.smtp.host", host);  //naver host
		props.put("mail.smtp.auth", "true");  // 인증
		props.put("mail.smtp.port", "587");  // 포트
		props.put("mail.debug", "true");  // dedub
		
		props.put("mail.smtp.starttls.enable", "true"); // 이메일 전송시 보안연결
		props.put("mail.smtp.ssl.trust", "smtp.naver.com"); // ssl 인증서 신뢰
		props.put("mail.smtp.ssl.protocols", "TLSv1.2"); 
		
		Session   session  =  Session.getInstance(props  ,  new Authenticator() {
			@Override protected PasswordAuthentication getPasswordAuthentication() {
				return   new PasswordAuthentication(user,password);   // id, password
			} 
		});
		//4. 메일보내기
		MimeMessage  message = new MimeMessage(session);
		
		try {
			message.setFrom(  new InternetAddress(user) );  // 보내는사람
			message.addRecipient( Message.RecipientType.TO , new InternetAddress(to) );  //받는사람
			message.setSubject(subject);  // 메일제목
			message.setContent(
				    "<div style='max-width:400px; margin:auto; border-radius:16px; padding:20px; background-color:#f5f0fa; font-family:sans-serif; box-shadow:0 2px 10px rgba(0,0,0,0.05);'>" +
				        "<h2 style='color:#6c3db3; text-align:center;'> 임시 비밀번호 안내</h2>" +
				        "<p style='color:#333; font-size:16px; text-align:center;'>요청하신 임시 비밀번호는 아래와 같습니다.</p>" +
				        "<div style='margin-top:20px; padding:10px; background-color:#fff; border-radius:10px; border:1px dashed #6c3db3; text-align:center; font-size:18px; color:#6c3db3; font-weight:bold;'>" +
				            content +
				        "</div>" +
				        "<p style='margin-top:30px; font-size:14px; color:#777; text-align:center;'>※ 보안을 위해 로그인 후 비밀번호를 꼭 변경해주세요.</p>" +
				    "</div>",
				    "text/html; charset=euc-kr"
				);

			
			Transport.send(message);
			System.out.println("..... successfully .....");    
		} catch (AddressException e) { e.printStackTrace();
		} catch (MessagingException e) { e.printStackTrace(); }
 		
		
	} 
}







