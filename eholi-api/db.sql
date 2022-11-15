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

desc school_users;

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
select * from levels;
select * from school_years;