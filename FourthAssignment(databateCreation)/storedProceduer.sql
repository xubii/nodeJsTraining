CREATE DEFINER=`root`@`localhost` PROCEDURE `createUser`(userId int, username varchar(30), age int, address varchar(30), bio varchar(30), roleId int, roleName varchar(20), roleDetails varchar(100), perm_id int, perm_name varchar(30), perm_details varchar(200))
BEGIN

IF NOT EXISTS (select * from role where id = roleId) then 
	call createRole(roleId, roleName, roleDetails, perm_name, perm_details);
    insert into user (name, age, address, bio, role_id) values (username, age, address, bio, (SELECT MAX(id) FROM role));
END IF;
	insert into user (name, age, address, bio, role_id) values (username, age, address, bio, roleId);
	commit;
    
END



CREATE DEFINER=`root`@`localhost` PROCEDURE `createRole`(perm_id INT, perm_name varchar(45), perm_detail varchar(200), role_name varchar(200), role_details varchar(200))
BEGIN

IF NOT EXISTS (select * from permission where id = perm_id) then 
	insert into permission (name, detail) values (perm_name, perm_detail);
END IF;
	insert into role (name, role_detail, permission_id) values (role_name, role_details, (SELECT MAX(id) FROM permission));
	commit;
END