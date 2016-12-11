var sqlite3 = require('sqlite3').verbose();

var Database = function(){
	this.db = new sqlite3.Database('data.db');
	DB = this.db;
	DB.serialize(function() {
		DB.run("CREATE TABLE if not exists data (temp REAL, hum REAL, real_power REAL, energy REAL, time DATETIME)");
		DB.run("CREATE INDEX if not exists time ON data(time)");
	});
};

Database.prototype.Insert = function(temp,hum,real_power,energy){
	var db = this.db;
	db.run("INSERT INTO data VALUES (?,?,?,?,?)",temp,hum,real_power,energy,new Date().toISOString());
};

module.exports = Database