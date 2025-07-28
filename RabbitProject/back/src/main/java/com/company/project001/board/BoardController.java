package com.company.project001.board;

import java.security.Principal;

import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.company.project001.domain.Board;
import com.company.project001.domain.Member;
import com.company.project001.member.MemberService;
import com.company.project001.util.PagingDto;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class BoardController {
	private final BoardService service; 
	private final MemberService  memberService;
	
	@GetMapping("/board/list")
	public String list(Model model,  @RequestParam(value="page" , defaultValue="0") int page) {
		model.addAttribute("list"   , service.getPaging(page));  // 해당글 10개
		model.addAttribute("paging" , new PagingDto(  service.findAll().size() , page  ));
		return "board/list"; //페이지
	}
	
	@GetMapping("/board/detail/{id}")
	public String detail(@PathVariable Long id,  Model model) { 
		model.addAttribute("dto" , service.find(id));
		return "board/detail";
	}
	////////////////////// 
	@GetMapping("/board/insert")
	public String insert_get(Principal principal, Model model ) { 
		BoardForm boardForm = new BoardForm();
		if(principal != null) {
			Member member = memberService.findByUsername(  principal.getName()  );
			if(member!= null) {
				boardForm.setMemberId(member.getId());
				model.addAttribute("username" , member.getUsername());
			}
		}
		model.addAttribute("boardForm" , boardForm);
		return "board/write"; 
	}
	
	@PostMapping("/board/insert")
	public String insert_post(
			Model model, RedirectAttributes rttr,
			  MultipartFile file , Principal principal  
			, @Valid BoardForm boardForm , BindingResult  bindingResult) { 
		
		if(bindingResult.hasErrors()) {
			if(principal != null) {
				Member member = memberService.findByUsername(  principal.getName()  );
				if(member!= null) {
					boardForm.setMemberId(member.getId());
					model.addAttribute("username" , member.getUsername());
				}
			}
			return  "board/write";
		}
		//  boardForm → Board 변환
		Board board = new Board();
		board.setBtitle(boardForm.getBtitle() );
		board.setBcontent(boardForm.getBcontent() );
		board.setBpass(boardForm.getBpass() ); 
		board.setBfile(boardForm.getBfile() ); 
		
		Member member= new Member();
		member.setId(boardForm.getMemberId());
		board.setMember(member);
		
		service.insert(file, board);
		rttr.addFlashAttribute("msg" , "글이 등록되었습니다.");
		return "redirect:/board/list"; 
	}
	//////////////////////
	@GetMapping("/board/edit/{id}")
	public String update_get( @PathVariable  Long id   , Model model) { 
		model.addAttribute("dto" ,   service.update_view(id));
		return "board/edit"; 
	}
	@PostMapping("/board/edit")
	public String update_post(MultipartFile file, Board board, RedirectAttributes rttr) { 
		String msg = service.update(file, board) > 0? "글수정 성공!":"fail";
		rttr.addFlashAttribute("msg" , msg);
		return "redirect:/board/detail/" + board.getId(); 
	}
	//////////////////////
	@GetMapping("/board/delete/{id}")
	public String delete_get(    @PathVariable  Long id   , Model model) { 
		model.addAttribute("id" , id);
		return "board/delete"; 
	}
	@PostMapping("/board/delete")
	public String delete_post(  Board board, RedirectAttributes rttr) {
		String msg = service.delete(board) > 0 ? "글삭제 성공!":"fail";
		rttr.addFlashAttribute("msg" , msg);
		return "redirect:/board/list"; 
	}
	
	
}











