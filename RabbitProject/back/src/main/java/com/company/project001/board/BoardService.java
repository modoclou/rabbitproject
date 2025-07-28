package com.company.project001.board;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.company.project001.domain.Board;
import com.company.project001.domain.Member;
import com.company.project001.member.MemberMapper;
import com.company.project001.util.UtilUpload;

@Service
public class BoardService {
	@Autowired  private BoardMapper  boardMapper;
	@Autowired  private MemberMapper memberMapper;
	
	@Autowired  UtilUpload upload;
	
	public List<Board> getPaging(int page){ return boardMapper.findAllPaged(page*10, 10);}  //paging
	public List<Board> findAll(){ return boardMapper.findAllByOrderedByDesc();}  // orderByDesc
	
	@Transactional
	public Board find(Long id) {  //상세보기 
		Board board = boardMapper.findById(id);
		if(board !=null) {//해당하는 번호를 찾아서 , 조회수 올리고 
			Long curr = board.getBhit() == null? 0L : board.getBhit();
			board.setBhit(curr+ 1);
			boardMapper.updateByIdAndBpass(board);
		}
		return board;
	}
	
	public int insert ( MultipartFile file, Board board ) { // 글쓰기 ##
		//작성자정보조회
		String  username = board.getMember() != null ? board.getMember().getUsername() : null;
		if(username != null) {
			Member member=memberMapper.findByUsername(username);
			if(member != null) {  board.setMember(member);}
			else {throw new  IllegalArgumentException("유효하지 않은 사용자입니다.");  }
		}
		// 파일업로드
		try {
			board.setBfile(upload.fileUpload(file));
		} catch (IOException e) { e.printStackTrace(); }
		
		// bhit=0L
		if(board.getBhit() == null) {  board.setBhit(0L);}
		
		// ip주소
		try {
			board.setBip(InetAddress.getLocalHost().getHostAddress());
		} catch (UnknownHostException e) { e.printStackTrace(); }
		
		return  boardMapper.insert(board);
	}  
	public Board update_view(Long id) { return boardMapper.findById(id);}  // 수정폼

	public int update ( MultipartFile file, Board board ) {   // 수정하기 ##
		String save = board.getBfile();
		if(  file != null  &&  file.getOriginalFilename().length() > 0) {
			try {
				save = upload.fileUpload(file);
			} catch (IOException e) { e.printStackTrace(); }
		}
		board.setBfile(save);
		return  boardMapper.updateByIdAndBpass(board);
	}

	public int  delete (Board board ) {   return  boardMapper.deleteByIdAndBpass(board); }  //삭제하기

}





