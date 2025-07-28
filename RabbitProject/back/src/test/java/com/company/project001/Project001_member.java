package com.company.project001;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.company.project001.domain.Member;
import com.company.project001.domain.MemberRole;
import com.company.project001.member.MemberMapper;

@SpringBootTest
class Project001_member {

	@Autowired
	MemberMapper memberMapper;
	@Autowired
	PasswordEncoder passwordEncoder;

	@Test
	public void test() {

		Member member = new Member();
		/*  
		member.setUsername("sen");
		member.setPassword(passwordEncoder.encode("1111"));
		member.setEmail("sen@gmail.com");
		member.setNickname("sen");
		member.setImage("1.png");
		member.setRole(MemberRole.MEMBER);
		member.setProvider("thejoa");
		memberMapper.insert(member);
		*/
		
		/*
		member.setNickname("dan-new");
		member.setPassword(passwordEncoder.encode("1111"));
		member.setEmail("dan@gmail.com");
		member.setProvider("thejoa");
		member.setId(68l);
		member.setRole(MemberRole.ADMIN);
		memberMapper.update(member);
		
		memberMapper.findById(68l);
		//memberMapper.findAll();
		*/
		
		/*  
		memberMapper.delete(66l);
		memberMapper.findAll();
		
		memberMapper.findByUsername("dan");*/
		Member findMember = memberMapper.findById(68L);
		if (passwordEncoder.matches("1111", findMember.getPassword())) {
			memberMapper.updateByIdAndPassword(68L, "2222", findMember.getPassword());
		}
		memberMapper.findById(68l);
		
		
		
	}

}
