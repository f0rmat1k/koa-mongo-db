'use strict';

var MongoClient = require('mongodb').MongoClient;

module.exports = function (uri, opts) {
	if (typeof uri !== 'string') {
		throw new TypeError('Expected uri to be a string');
	}

	opts = opts || {};
	var property = opts.property || 'db';

	var db;

	return function *koaMongoDb(next) {
		if (!db) {
			try {
				db = yield MongoClient.connect(uri, opts);
			} catch (err) {
				db = undefined;

				this.throw('Mongo connection error', 500);

				return;
			}
		}

		this[property] = db;
		yield next;
	};
};
