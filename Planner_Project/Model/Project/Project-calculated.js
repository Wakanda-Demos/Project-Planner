/*
	@function	Project-calculated.js
	@abstract	Project data class calculated methods
*/
model.Project.businessDays.onGet = function() {
    //for more details about computing rules please refer to:
    //http://partialclass.blogspot.com/2011/07/calculating-working-days-between-two.html
    var startDate, endDate, millisecondsPerDay, diff, days, weeks, startDay, endDay;

    endDate = this.EndDate;
    startDate = this.StartDate;

    if (endDate < startDate) {
        return 0;
    }

    // Calculate days between dates
    // Day in milliseconds
    millisecondsPerDay = 86400 * 1000;

    // Start just after midnight
    startDate.setHours(0, 0, 0, 1);

    // End just before midnight
    endDate.setHours(23, 59, 59, 999);

    // Milliseconds between datetime objects 
    diff = endDate - startDate;

    days = Math.ceil(diff / millisecondsPerDay);

    // Subtract two weekend days for every week in between
    weeks = Math.floor(days / 7);

    days = days - (weeks * 2);

    // Handle special cases
    startDay = startDate.getDay();
    endDay = endDate.getDay();

    // Remove weekend not previously removed.   
    if (startDay - endDay > 1) {
        days = days - 2;
    }

    // Remove start day if span starts on Sunday but ends before Saturday
    if (startDay == 0 && endDay != 6) {
        days = days - 1;
    }

    // Remove end day if span ends on Saturday but starts after Sunday
    if (endDay == 6 && startDay != 0) {
        days = days - 1;
    }

    return days;
};

/*
	@function	onGet
	@abstract	get the Project cost
*/
model.Project.Cost.onGet = function() {
    var action, result, empIDs, ids;

    empIDs = this.employees.ID;

    if (empIDs.length == 0) {
        return 0;
    }

    ids = empIDs.length == 0 ? "" : empIDs.toString();

    //constuct action to perform
    action = {
        type: 'execute',
        data: "SELECT sum(salary) as costYear FROM employee where id in (" + ids + ")"
    };

    //call performAction
    utils.performAction(action, function(row) {
        result = row[0];
    });

    var costDay = result.costYear / 250;

    return costDay * this.businessDays;
};

/*
	@function	onGet
	@abstract	get the Project cost
*/
model.Project.Workforce.onGet = function() {
    return (this.employees.length);
};

/*
	@function	onGet
	@abstract	get the Project WorkLoad
*/
model.Project.WorkLoad.onGet = function() {
    return (this.Workforce * this.businessDays);
};