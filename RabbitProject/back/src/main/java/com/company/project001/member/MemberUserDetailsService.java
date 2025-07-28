package com.company.project001.member;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.company.project001.domain.Member;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberUserDetailsService implements UserDetailsService {
	private final MemberMapper memberMapper;

	
	// 사용자 정보 꺼내줌
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Member member = memberMapper.findByUsername(username); // db에 해당하는 멤버를 가져옴
		if(member == null) {
			throw new UsernameNotFoundException("해당 유저를 찾을 수 없습니다. ");
		}
		return new MemberUserDetails(member);
	}
	
	
}
