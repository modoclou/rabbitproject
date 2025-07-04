package com.company.project001.member;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.company.project001.domain.Member;

@Controller
public class MemberController {
	@Autowired MemberService memberService;
	
	////////////////////////////////////////////////////////
	@GetMapping("/")
	public String home() { return "test"; }
	
	@GetMapping("/member/member")
	public String member(Authentication authentication, Model model) { 
		if(authentication == null) { return "redirect:member/login";}
		Member member = memberService.findByUsername(authentication.getName());
		model.addAttribute("dto", member);
		return "member/member"; 
		}
	
	/////////
	@GetMapping("/member/login")
	public String login_get(MemberLoginForm memberLoginForm) { return "member/login"; }
	
	@PostMapping("/member/login") // 로그인 유효성 검사한 결과값 + 로그인 기능
	public String login_post(@Valid MemberLoginForm memberLoginForm, BindingResult result) { 
		if(result.hasErrors()) {
			System.out.println(result.hasErrors());
			return "member/login";}
		return "redirect:/member/member"; 
		
	} 
	
	////////////
	@GetMapping("/member/join")
	public String join_get(MemberJoinForm memberJoinForm) { return "member/join"; }
	
	@PostMapping("/member/join")
	public String join_post(@Valid MemberJoinForm memberJoinForm, BindingResult result) {
		if(result.hasErrors()) {return "member/join";}
		if(! memberJoinForm.getPassword().equals(memberJoinForm.getPassword2())) {
			result.rejectValue("password2", "passwordInCorrect", "패스워드를 확인해주세요.");
			return "member/join";
		}
		
		try {
		Member member = new Member();
		member.setNickname(memberJoinForm.getUsername());
		member.setUsername(memberJoinForm.getUsername());
		member.setPassword(memberJoinForm.getPassword());
		member.setEmail(memberJoinForm.getEmail());
		memberService.insert(member);
		} catch(DataIntegrityViolationException e) {
			e.printStackTrace();
			result.reject("faild", "등록된 유저입니다.");
			return "member/join";
		} catch (Exception e) {
			e.printStackTrace();
			result.reject("faild", e.getMessage());
			return "member/join";
		}
		
		return "redirect:/member/login"; 
	}
	
}
