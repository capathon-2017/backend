
var fs = require("fs");

module.exports = {

    getData: function (db, table, selector, callback) {
        console.log('get from ' + table);
        var collection = db.get(table);
        collection.find(selector, {}, callback);
    },

    update: function (db, table, selector, data, callback) {
        console.log('update ' + JSON.stringify(selector) + ' in table ' + table + JSON.stringify(data));
        var collection = db.get(table);
        collection.update(selector, {$set: data}, callback);
    },

    insertData: function (db, table, data, callback) {
        console.log('insert ' + JSON.stringify(data) + ' in ' + table);
        var collection = db.get(table);
        collection.insert(data, callback);
    },

    getFile: function (fileName) {
        var data = fs.readFileSync(fileName);
        return JSON.parse(data);
    },

    dropData: function (db, table, callback) {
        console.log('drop all from ' + table);
        var collection = db.get(table);
        collection.drop(callback);
    },

    insertData: function (db, table, data, callback) {
        console.log('insert ' + JSON.stringify(data) + ' in ' + table);
        var collection = db.get(table);
        collection.insert(data, callback);
    }
};