package com.company.project001.member;

import com.company.project001.domain.Member;
import com.company.project001.domain.MemberRole;
import com.company.project001.domain.User; 
import com.company.project001.util.JwtUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService implements JwtUserService { // ✅ Jwt 인증 필터용 인터페이스 구현

    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;

    // ✅ JwtTokenFilter에서 사용하는 인증 사용자 조회
    @Override
    public User findUserByUsername(String username) {
        Member member = memberMapper.findByUsername(username);
        if (member == null) return null;

        User user = new User();
        user.setId(member.getId());
        user.setUsername(member.getUsername());
        user.setNickname(member.getNickname());
        user.setRole(member.getRole()); // ⚠️ User 클래스에도 role 필드가 있어야 합니다
        return user;
    }

    public Member insert(Member member) {
        try {
            member.setUsername(member.getUsername());
            member.setImage("/images/thejoa.png");
            member.setRole(MemberRole.MEMBER);
            member.setPassword(passwordEncoder.encode(member.getPassword()));
            member.setEmail(member.getEmail());
            member.setNickname(member.getNickname());
            memberMapper.insert(member);
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("이미 사용중인 아이디입니다.");
        }
        return member;
    }

    public List<Member> findAll() {
        return memberMapper.findAll();
    }

    public Member findByUsername(String username) {
        return memberMapper.findByUsername(username);
    }

    public Member findById(Long id) {
        return memberMapper.findById(id);
    }

    public int updateByIdAndPassword(Member member, String oldPassword) {
        Member find = memberMapper.findById(member.getId());
        if (find != null && passwordEncoder.matches(oldPassword, find.getPassword())) {
            String newPassword = passwordEncoder.encode(member.getPassword());
            return memberMapper.updateByIdAndPassword(find.getId(), find.getPassword(), newPassword);
        }
        return 0;
    }

    public int update(Member member) {
        return 0;
    }

    public boolean delete(Long id, String password) {
        Member find = memberMapper.findById(id);
        if (find != null && passwordEncoder.matches(password, find.getPassword())) {
            return memberMapper.delete(id) > 0;
        }
        return false;
    }
}
