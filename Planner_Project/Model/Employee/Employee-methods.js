/*
	@file Employee-methods.js
	@abstract export Employee methods
*/
//@function getAuthInfos
//@abstract get the authentication informations
model.Employee.entityMethods.getAuthInfos = function() {
    var res, action, that = this;

    //define the action to be performed on the shared worker
    action = {
        type: 'find',
        data: {
            table: "employee_auth",
            columns: "login,password",
            filter: {
                id: that.ID
            }
        }
    };

    //perform the action now and retreive the authentication informations
    utils.performAction(action, function(row) {
        res = row;
    });

    return res;
};

//@function entityMethods.get
//@abstract returns the values of cols in the entity
//@params cols to retreive
model.Employee.entityMethods.get = function(cols) {
    var action, result, ID;
    ID = this.ID;

    //define the action to be performed on the shared worker
    action = {
        type: 'find',
        data: {
            table: "employee",
            columns: cols,
            filter: {
                id: ID
            }
        }
    };

    //perform the action now and retreive the row
    utils.performAction(action, function(row) {
        result = row;
    });

    return result;
};

//@function methods.getSubSet
//@abstract returns the subset of employees verifying the conditions
model.Employee.methods.getSubSet = function(conditions) {
    var action, result, ID, query;

    ID = this.ID;
    query = "SELECT id as ID, CONCAT(firstname,' ', lastname) as name from employee where " + conditions;

    //define the action to be performed on the shared worker
    action = {
        type: 'execute',
        data: query
    };

    //perform the action now and retreive the rows
    utils.performAction(action, function(rows) {
        result = rows;
    });

    return result;
};