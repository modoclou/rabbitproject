package com.company.project001.domain;

import java.util.Date;
import lombok.Data;

@Data
public class Board {
	private  Long   id;
	private  String btitle;
	private  String bcontent;
	private  String bfile;
	private  String bip;
	private  String bpass;
	private  Long   bhit;
	private  Date   createDate;
	private  Member member;
}


/*

mysql>
mysql> desc board;
+-------------+--------------+------+-----+-------------------+-------------------+
| Field       | Type         | Null | Key | Default           | Extra             |
+-------------+--------------+------+-----+-------------------+-------------------+
| id          | bigint       | NO   | PRI | NULL              | auto_increment    |
| bcontent    | text         | YES  |     | NULL              |                   |
| bfile       | varchar(255) | YES  |     | NULL              |                   |
| bhit        | bigint       | YES  |     | NULL              |                   |
| bip         | varchar(255) | YES  |     | NULL              |                   |
| bpass       | varchar(255) | YES  |     | NULL              |                   |
| btitle      | varchar(200) | YES  |     | NULL              |                   |
| create_date | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| member_id   | bigint       | YES  | MUL | NULL              |                   |
+-------------+--------------+------+-----+-------------------+-------------------+
9 rows in set (0.01 sec)

*/