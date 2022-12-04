use eholi;

select * from students;

select * from school_students;
desc school_students;
desc student_subscribes;
show tables;

select * from migrations;

select * from admins;

select * from users;

desc permissions;

select * from roles;

select * from permissions;

select * from role_has_permissions;

desc school_years;
select * from school_years;

desc users;

select * from users;

drop table school_users;

desc school_user;
select * from school_users;
desc rooms;

desc cycles;

desc levels;

select * from cycles;
select cycles.name, levels.name from levels join cycles on cycles.id = levels.cycle_id;
select * from migrations;
desc students;
select * from school_users where school_id = "78b4e080-3771-48aa-bffc-275899c3e65a";
select * from school_students;
select * from levels;
select * from cycles;
select * from schools;
desc class_rooms;
desc buildings;
desc class_levels;
select * from class_levels;
desc level_classes;
desc rooms;
desc class_rooms;
desc buildings;
desc students;
desc courses;
desc class_level_has_courses;
select * from courses;
select * from levels;
select * from school_years;
desc student_has_rooms;
desc class_levels;
select * from courses where id = "0d41b319-ee64-40f6-a67e-6dd731087201";
desc professors;
select * from professors;
select * from class_levels;
desc class_levels;
desc semesters;
select * from courses where id = "b71e428f-7cb4-470a-ac40-1d03c1126262";
select * from semesters where id = "b6fdfbd4-6bbd-4498-adbb-c5a5edff5e07";
select * from class_levels where id = "0803f220-b97c-4c9b-9442-90d9f484670f";
select * from class_level_has_students;
desc class_level_has_courses;
select * from class_level_has_courses;
delete from class_level_has_courses where id = "e7611c15-4eac-4a04-8bed-19814e7a502f";
desc class_level_has_courses;
desc level_has_semesters;

drop table class_level_has_courses;
desc tutors;
select * from tutors order by created_at limit 1;
desc school_students;
select * from school_students;
select * from students;
desc students;
desc users;
desc school_has_professors;
desc student_has_tutors;
desc professors;
desc admins;
select * from student_has_tutors;
delete from professors where id > 0;
desc courses;	
desc semesters;
select * from tutors where reference = "tt0000000008" order by created_at desc limit 1;
select * from school_students order by created_at desc limit 1;
select * from users order by created_at desc limit 3;
select * from class_level_has_students join class_levels on class_levels.id =  class_level_has_students.class_level_id order by created_at desc limit 10;
