package com.company.project001.util;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class PagingDto {
	private int listtotal;   //#1. 전체글  123  
	private int onepagelist; //#2. 한페이지에 보여줄 게시물의 10
	private int pagetotal;   //#3. 총페이지수는 123/10 = 13    12페이지 + 3글  
	private int bottomlist;  //#4. 하단의 페이지나누기   이전 11 12    
	
	private int pstartno;    //#5. 페이지의 스타트번호 1page : 최신글 0~9 
	
	private int current;     //#6. 현재페이지번호
	private int start;       //#7. 시작페이지번호 
	private int end;         //#8. 끝페이지번호
	
	public PagingDto(int listtotal, int pstartno) {   
		super();
		this.listtotal   = listtotal;  // 전체페이지 계산한 값 123
		this.pstartno = pstartno*10;   // limit  0,10    10,10  20,10
		this.onepagelist = 10;   
		if(this.listtotal <=0) {this.listtotal=1;}
		this.pagetotal = (int) Math.ceil(listtotal/(double)onepagelist) ; //123/10
		
		this.bottomlist=10;  
		this.current = (this.pstartno/this.onepagelist) +1;   
		// 1(0)		2(10)	3(20)
		// 현재페이지 : pstartno=10이라면  현재페이지번호는 2
		// 현재페이지 : pstartno=20이라면  현재페이지번호는 3
		
		this.start = ((this.current-1)/this.bottomlist) * this.bottomlist+1;  
		//  11		15(현재)    20
		//  11을 11로, 15를 11로, 20을 11로
		//  11-1=10/10      15-1=14/10      20-1=19/10  > 앞자리1  > 1*10+1
		
		this.end = this.start + this.bottomlist -1;  
		//  11을 20으로 만들기 
		//  11+10-1
		if( this.pagetotal < this.end ) { this.end=  this.pagetotal; } 
	} 
	
}





