CREATE DATABASE IF NOT EXISTS govtech;

use govtech;

create table teachers
(
	id int auto_increment primary key,
	username varchar(64) null,
	email varchar(256) null,
	created_at datetime null,
	constraint teachers_username_uindex unique (username),
	constraint teachers_email_uindex unique (email)
);

/*This is for the test cases*/
INSERT INTO govtech.teachers (id, username, email, created_at) VALUES (1, 'marklauyq', 'mark.lau@chope.co', '2018-11-09 04:44:14');

create table students
(
	id int auto_increment primary key,
	username varchar(64) null,
	email varchar(256) null,
	is_suspended smallint(6) null comment 'suspended = 1',
	created_at datetime null,
	constraint students_username_uindex unique (username),
	constraint students_email_uindex unique (email)
);

/*This is for the test cases*/
INSERT INTO govtech.students (id, username, email, is_suspended, created_at) VALUES (1, 'marklauyq', 'mark.lau@chope.co', 0, '2018-11-07 15:05:05');

create table map_teacher_students
(
	id int auto_increment
		primary key,
	created_at datetime null,
	teacher_id int null,
	student_id int null,
    
	constraint map_teacher_students_teacher_id_student_id_pk
		unique (teacher_id, student_id),

	constraint map_teacher_students_teachers_id_fk
		foreign key (teacher_id) references teachers (id)
			on delete cascade,

	constraint map_teacher_students_students_id_fk
		foreign key (student_id) references students (id)
			on delete cascade
)
;

create index map_teacher_students_students_id_fk
	on map_teacher_students (student_id)
;



