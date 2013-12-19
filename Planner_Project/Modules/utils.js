/*
	utils.js
	export toolbox functions.
*/
/*
	@function performAction: is a function template for querying mysql database via "Workers/mysqlworker.js" SharedWorker
	@params	  action : An object that describe action to perfom
			  callback : function to be executed as callback after getting result from MySQL database.
*/
exports.performAction = function(action, callback) {
    var worker, port, result;

    //get/create the shared worker with script connection.js
    worker = new SharedWorker("Workers/mysqlworker.js", "dbSession");

    port = worker.port;

    port.onmessage = function(event) {
        var msg = event.data;
        if (msg.type == "connected") {
            //when connected to SharedWorker "dbSession"
            port.postMessage(action);
        } else if (msg.type == "result") {
            //when getting result from MySQL, execute the callback function
            callback(msg.data);
            exitWait();
        } else {
            exitWait();
        }
    }

    // wait shared worker to perform the job
    wait();
}

/*
	@function	IDUUD.idToUUID
	@abstract	convert to UUID from id
	@params		the entity id
	
	=================================
	
	@function	UUDToId
	@abstract	convert to id from the entity uuid
*/

exports.IDUUD = {
    //as an UUID is 32 characters length this function create a UUID
    //using the given id and filling with zeroes
    idToUUID: function(id) {
        var uuid = "";
        var len = id.toString().length;
        var fillingLength = 32 - len;
        for (var i = 0; i < fillingLength; i++) {
            uuid += "0";
        }
        uuid += id.toString();

        return uuid;
    },

    //now the inverse: given a UUID retreive the mapped id
    UUDToId: function(uid) {
        var id = parseInt(uid, 10);
        return id;
    }
};