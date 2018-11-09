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

CREATE TABLE map_teacher_students
(
    id int PRIMARY KEY AUTO_INCREMENT,
    created_at datetime,
    teacher_id int,
    student_id int,
    CONSTRAINT map_teacher_students_teachers_id_fk FOREIGN KEY (teacher_id) REFERENCES teachers (id) ON DELETE CASCADE,
    CONSTRAINT map_teacher_students_students_id_fk FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE
);

