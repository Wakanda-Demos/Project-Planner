/*
	@file Model.js
	@abstract define and includes Model functions
*/
var wafsql, utils, params, IDUUD;

//retreive the waf-sql module
wafsql = require('waf-sql');

//retreive the utils module
utils = require('utils.js');

//The mysql connection
params = {
	hostname:	'192.168.222.67',
	port:		3306,
    database:	'demo',
    user:		'root',
    password:	'secret',
	ssl:		false,
    dbType:		'mysql'
};


//retreive the IDUUD module for mapping between an ID and an UUID
IDUUD = utils.IDUUD;

//include dataclasses needed files
include("./Model/Employee/Employee-methods.js");
include("./Model/Skill/Skill-methods.js");
include("./Model/Project/Project-calculated.js");
include("./Model/Employee/Employee-calculated.js");
include("./Model/Project/Project-events.js");

include("./Model/Project/Project-methods.js");