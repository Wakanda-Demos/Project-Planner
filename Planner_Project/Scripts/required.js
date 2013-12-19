/*
	@file		required.js
	@abstract	defines login functions here
*/
var utils = require('utils.js');


/*
	@function	getAuthenticationQuery
	@abstract	creates the authentication query with the given user name
	@params		userName the user name
*/
function getAuthenticationQuery(userName) {
    var query = "select employee.id, employee.title, employee_auth.password\
	from employee_auth                                                     \
	left join employee on employee.id = employee_auth.employee_id          \
	where employee_auth.login = '" + userName + "'";

    return query;
}

/*
	@function 	myLogin
	@abstract 	defines the authentication verification process
				using the given user name and password
*/
function myLogin(userName, password) {
    var action, query, row;

    query = getAuthenticationQuery(userName);

    //define the action to be performed on the shared worker
    action = {
        type: 'execute',
        data: query
    }

    //perform the action now and retreive the rows
    utils.performAction(action, function(res) {
        row = res[0];
    });

    //if the user name does not exist in our MySQL table
    //let Wakanda try to find it in the internal directory
    if (row == null) {
        return false;
    } else {
        // the user name is known
        //this is given to keep the example simple
        //we should have a more secured challenge here, for example
        //by storing and comparing a hash key
        if (row.password == password) {
            var theGroups = [];
            switch (row.title) {
            case "Project Director":
                theGroups = ['Director'];
                break;
            case 'Project Manager':
                theGroups = ['Manager'];
                break;
            case "Employee":
                theGroups = ['Employee'];
                break;
            }
            var connectTime = new Date();

            return {
                ID: IDUUD.idToUUID(row.id),
                name: userName,
                fullName: theGroups[0] + " " + userName,
                belongsTo: theGroups,
                storage: {
                    time: connectTime,
                    access: ""
                    //in the user session, sessionStorage.time
                    //will contain the connection time
                }
            };
        } else {
            return {
                error: 1024,
                errorMessage: "invalid login"
            }
        }
    }
};