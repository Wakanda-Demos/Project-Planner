
var values = [
	{id: 1, title: "Employee", value: "C"},
	{id: 2, title: "Employee", value: "C++"},
	{id: 3, title: "Employee", value: "Java"},
	{id: 4, title: "Employee", value: ".Net"},
	{id: 5, title: "Employee", value: "JavaScript"},
	{id: 6, title: "Employee", value: "Perl"},
	{id: 7, title: "Employee", value: "Python"},
	{id: 8, title: "Employee", value: "PHP"},
	{id: 9, title: "Employee", value: "ASM"},
	{id: 10, title: "Employee", value: "HTML5/CSS"},
	{id: 11, title: "Employee", value: "ActionScript"},
	{id: 12, title: "Employee", value: "NodeJS"},
	{id: 13, title: "Employee", value: "SQL"},
	{id: 14, title: "Employee", value: "MySQL"},
	{id: 15, title: "Employee", value: "Oracle"},
	{id: 16, title: "Employee", value: "DB2"},
	{id: 17, title: "Employee", value: "SQLite"},
	{id: 18, title: "Employee", value: "Postgres"},
	{id: 19, title: "Employee", value: "ACCESS"},
	{id: 20, title: "Project Manager", value: "Agile management"},
	{id: 21, title: "Project Manager", value: "Team building"},
	{id: 22, title: "Project Manager", value: "Backlog writing"},
	{id: 23, title: "Project Manager", value: "Project management"},
	{id: 24, title: "Project Manager", value: "Risk management"},
	{id: 25, title: "Project Manager", value: "Quality management"},
	{id: 26, title: "Project Manager", value: "Integration"},
	{id: 27, title: "Project Manager", value: "Validation"},
	{id: 28, title: "Project Director", value: "SLA management"},
	{id: 29, title: "Project Director", value: "Delivery management"},
	{id: 30, title: "Project Director", value: "Coordination"},
	{id: 31, title: "Project Director", value: "Coaching"},
	{id: 32, title: "Project Director", value: "Portfolio management"},
	{id: 33, title: "Project Director", value: "Strategic alignment"},
	{id: 34, title: "Project Director", value: "SI Urbanisation"},
	{id: 35, title: "Project Director", value: "Business process management"},
]

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

session.execute('delete from skills where 1');

var q = 'insert into skills values (?, ?, ?);';

var pstmt = session.createPreparedStatement(q);

var startTime = new Date().getTime();

var len = values.length;

for (var i = 0; i < len; ++i) {
    var value = values[i];
    pstmt.setNthParameter(1, value.id);
    pstmt.setNthParameter(2, value.title);
    pstmt.setNthParameter(3, value.value);
    pstmt.execute();
}


var endTime = new Date().getTime();

var deltaTime = endTime - startTime;
var x = 'total time = ' + Math.round(deltaTime/1000) + ' seconds.';
x;
