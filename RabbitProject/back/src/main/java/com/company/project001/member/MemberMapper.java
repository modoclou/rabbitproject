package com.company.project001.member;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.company.project001.domain.Member;

@Mapper
public interface MemberMapper {

    Member findByUsername(String username); // ✅ JWT 인증 및 로그인에 사용됨

    Member findById(Long id);

    List<Member> findAll();

    int insert(Member member);

    int update(Member member);

    int updateByIdAndPassword(
            @Param("id") Long id,
            @Param("newPassword") String newPassword,
            @Param("oldPassword") String oldPassword
    );

    int delete(Long id);
}
