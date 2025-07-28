package com.company.project001.oauth;

import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.company.project001.domain.Member;
import com.company.project001.domain.MemberRole;
import com.company.project001.member.MemberMapper;
import com.company.project001.member.MemberUserDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {
	
	private final MemberMapper memberMapper;
	private final PasswordEncoder  passwordEncoder;  //##

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User = super.loadUser(userRequest);
		log.info("1. ........getAttributes : {} ,", oAuth2User.getAttributes());
		
		String provider = userRequest.getClientRegistration().getRegistrationId();
		UserInfoOAuth2 info = null;
		if("google".equals(provider)) {
			info = new UserInfoGoogle(oAuth2User.getAttributes());
		} else if("kakao".equals(provider)) {
			info = new UserInfoKakao(oAuth2User.getAttributes());
		} else if("naver".equals(provider)) {
			info = new UserInfoNaver(oAuth2User.getAttributes());
		}
		
		String username = provider +"_" + info.getProvierId();
		String email    = info.getEmail();
		String nickname = info.getNickname();
		String image    = info.getImage();
		
		Member member = memberMapper.findByUsername(username);
		// insert
		if(member == null) {
			member = Member.builder()
					.username(username)
					.password(passwordEncoder.encode(UUID.randomUUID().toString()))
					.provider(provider)
					.email(email)
					.nickname(nickname)
					.image(image)
					.role(MemberRole.MEMBER)
					.build();
			memberMapper.insert(member);
		} else {
			member.setImage(image);
			memberMapper.update(member);
		}
		
		return new MemberUserDetails(member, oAuth2User.getAttributes());
	}
	
	

}

//PrincipalOauth2UserService