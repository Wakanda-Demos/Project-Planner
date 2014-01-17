/*
	@file 		bootstap.js
	@abstract	populate Employee and Skill data classes
*/


directory.setLoginListener("myLogin", "Admin");

//if the employee data class is empty
if (ds.Employee.all().length == 0) {
    var rows, action;

    //define action to perform 
    action = {
        type: 'select',
        data: {
            columns: 'id',
            table: 'employee',
            filter: {}
        }
    }

    //perform the action now and retreive the rows
    utils.performAction(action, function(res) {
        rows = res;
    });

    //for each row save new entity with row's id
    rows.forEach(function(row) {
        var e = ds.Employee.createEntity();
        e.ID = row.id;
        e.save();
    });
}

//if the employee data class is empty
if (ds.Skill.all().length == 0) {
    var rows, action;

    action = {
        type: 'select',
        data: {
            columns: 'id',
            table: 'skills',
            filter: {}
        }
    }

    //perform the action now and retreive the rows
    utils.performAction(action, function(res) {
        rows = res;
    });

    //for each row save new entity with row's id
    rows.forEach(function(row) {
        var e = ds.Skill.createEntity();
        e.ID = row.id;
        e.save();
    });
}