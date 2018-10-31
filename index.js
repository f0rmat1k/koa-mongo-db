'use strict';

const MongoClient = require('mongodb').MongoClient;

module.exports = function (uri, opts) {
	if (typeof uri !== 'string') {
		throw new TypeError('Expected uri to be a string');
	}

	opts = opts || {};
	const property = opts.property || 'db';

	let db;

	return function koaMongoDb(ctx, next) {
		if (!db) {
			MongoClient.connect(uri, opts)
				.then(database => {
					db = database;
					ctx[property] = db;

					return next();
				})
				.catch(err => {
					db = undefined;

					ctx.throw(500, 'Mongo connection error');
				});
		} else {
			ctx[property] = db;
			return next();
		}
	};
};
