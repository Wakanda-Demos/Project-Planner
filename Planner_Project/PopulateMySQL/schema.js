
var sql = require('waf-sql');

//The mysql connection
var params = {
	hostname:	'192.168.222.47',
	port:		3306,
    database:	'demo',
    user:		'root',
    password:	'secret',
	ssl:		false,
    dbType:		'mysql'
};

var session = sql.connect(params);

var createDemoDatabaseQuery = 'CREATE DATABASE IF NOT EXISTS demo;';

var createEmployeeTableQuery = 'CREATE TABLE `demo`.`employee` (\
  `id` INT(11) NOT NULL,\
  `firstname` VARCHAR(45) NULL DEFAULT NULL,\
  `lastname` VARCHAR(45) NULL,\
  `gender` VARCHAR(45) NULL DEFAULT NULL,\
  `matricule` INT(11) NULL DEFAULT NULL,\
  `salary` INT(11) NULL,\
  `experience` INT(11) NULL DEFAULT NULL,\
  `title` VARCHAR(45) NULL DEFAULT NULL,\
  `avatar` BLOB NULL DEFAULT NULL,\
  PRIMARY KEY (`id`));';

var createEmployeeHasSkillTableQuery = 'CREATE TABLE `demo`.`employee_has_skill` (\
  `employee_id` INT NOT NULL,\
  `skill_id` INT NULL)';

var createEmplyeeAuthTableQuery = 'CREATE TABLE `demo`.`employee_auth` (\
  `id` INT NOT NULL,\
  `employee_id` INT NULL,\
  `login` VARCHAR(90) NULL,\
  `password` VARCHAR(45) NULL,\
  PRIMARY KEY (`id`));';
  

var createSkillsTableQuery = 'CREATE TABLE `demo`.`skills` (\
  `id` INT NOT NULL,\
  `title` VARCHAR(45) NULL,\
  `value` VARCHAR(45) NULL,\
  PRIMARY KEY (`id`));'

session.execute(createDemoDatabaseQuery);
session.execute(createEmployeeTableQuery);
session.execute(createEmployeeHasSkillTableQuery);
session.execute(createEmplyeeAuthTableQuery);
session.execute(createSkillsTableQuery);

session.close();
