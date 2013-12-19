/*
	@file: Connection.js
	@abstract:
		define the entry point for communications with the MySQL Server.
		all data classes and RPC methods' querying MySQL database should use this sharedworker,
		as an advantage we will have only one open MySQL Session so the time of opening/closing
		a session is optimized
*/
var wafsql, params, session, errorMsg;

//use 'waf-sql' module
wafsql = require('waf-sql');

//The mysql connection
params = {
	hostname:	'localhost',
	port:		3306,
    database:	'demo',
    user:		'root',
    password:	'',
	ssl:		false,
    dbType:		'mysql'
};

try {
    //connect to MySQL Server
    session = wafsql.connect(params);
} catch (err) {
    //if an error occur set the session as null
    session = null;
    errorMsg = err.message;
}

function getEmployeeQuery(skills, minExperience, maxExperience) {
    var query = "select employee.id, employee.firstname, employee.lastname,      \
	cast(employee.salary/250 as UNSIGNED ) as salary, employee.experience,       \
	employee.title, group_concat(skills.`value` separator ', ') as skills        \
	from employee                                                                \
	left join employee_has_skill on employee_has_skill.employee_id = employee.id \
	left join skills on skills.id = employee_has_skill.skill_id                  \
	where skills.id in (" + skills + ")                                          \
	AND employee.experience <= " + maxExperience + " AND employee.experience >=  \
	" + minExperience + " group by employee.id";

    return query;
}

function getEmployeeByIdQuery(IDs) {
    var query = "select employee.id, employee.firstname, employee.lastname,      \
	cast(employee.salary/250 as UNSIGNED) as salary, employee.experience,        \
	employee.title, group_concat(skills.`value` separator ', ') as skills        \
	from employee                                                                \
	left join employee_has_skill on employee_has_skill.employee_id = employee.id \
	left join skills on skills.id = employee_has_skill.skill_id                  \
	where employee.id in (" + IDs + ")                                           \
	group by employee.id";

    return query;
}


/*
	@function onconnect :
		a function callback executed when a thread connect to our SharedWorker
		and returns the appropriate result
*/
onconnect = function(msg) {
    var thePort = msg.ports[0];

    /*
		onmessage : function callback, executed when receiving message from sharedworker parent.
	*/
    thePort.onmessage = function(event) {
        var infos, message = event.data;

        //test if we have currently a valid session.
        // if no, send back an error message.
        if (session == null) {
            thePort.postMessage({
                type: 'error',
                data: "Can't connect to MySQL server!"
            });
            return;
        }

        infos = message.data;
        switch (message.type) {
            //for requesting the given columns from a given table and filter
            //but uniq result will be given
        case 'find':
            var row = session.find(infos.columns, infos.table, infos.filter);
            thePort.postMessage({
                type: 'result',
                data: row
            });
            break;

            //for requesting the given columns from a given table and filter
            //but not uniq result
        case 'select':
            var res = session.select(infos.columns, infos.table, infos.filter);
            var rows = res.getAllRows();
            thePort.postMessage({
                type: 'result',
                data: rows
            });
            break;

        case 'execute':
            //this processing for complicated queries
            //for simple CRUD functions (select, insert, update and delete)
            //using high level API is preferred and is better
            var query = infos;
            var res = session.execute(infos);
            var rows = res.getAllRows();
            thePort.postMessage({
                type: 'result',
                data: rows
            });
            break;

        case 'getAvatar':
            //as the SharedWorker doesn't support blob data by now
            //we are forced to pass by an intermediate string
            //base64 gives a minimized string representation
            var row = session.find('avatar', 'employee', {
                id: infos.ID
            });
            var avatar = row.avatar.toBuffer().toString('base64');
            thePort.postMessage({
                type: 'result',
                data: avatar
            });
            break;

        case 'getEmployees':
            //get all employees with given skills, min and max experience
            var skills = infos.skillsID;
            var maxExperience = infos.max;
            var minExperience = infos.min;
            var query = getEmployeeQuery(skills, minExperience, maxExperience);
            var res = session.execute(query);
            var rows = res.getAllRows();
            thePort.postMessage({
                type: 'result',
                data: rows
            });
            break;

        case 'filterEmployees':
            //get all employees with the given IDs
            var IDs = infos.employeesID;
            var query = getEmployeeByIdQuery(IDs);
            var res = session.execute(query);
            var rows = res.getAllRows();
            thePort.postMessage({
                type: 'result',
                data: rows
            });
            break;

        default:
            //the error handling step
            thePort.postMessage({
                type: 'error',
                data: 'unknown command!'
            });
            break;
        }
    }

    //send back {type:'connected'} message when a thread is connected to this sharedworker
    thePort.postMessage({
        type: 'connected'
    });
}