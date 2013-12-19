/*
	@file		Skill-methods
	@abstract	defines Skill data class methods
*/
/*
	@function	getValues
	@abstract	get values of a Skill entity
*/
model.Skill.collectionMethods.getValues = function() {
    var arrIDs, action, result, empIDs, ids;

    arrIDs = this.ID;

    //constuct action to perform
    action = {
        type: 'execute',
        data: "SELECT id, value from skills where id in (" + arrIDs.toString() + ")"
    };

    //perform action
    utils.performAction(action, function(rows) {
        result = rows;
    });

    return result;
};

/*
	@function	getValue
	@abstract	get Skill entity value
*/
model.Skill.entityMethods.getValue = function() {
    var action, result, ID;

    ID = this.ID;

    //constuct action to perform
    action = {
        type: 'find',
        data: {
            table: "skills",
            columns: 'value',
            filter: {
                id: ID
            }
        }
    };

    //perform action
    utils.performAction(action, function(row) {
        result = row;
    });

    return result.value;
};

/*
	@function	onGet
	@abstract	get Skill entity value
*/
model.Skill.value.onGet = function() {
    var value = this.getValue();
    return value;
};