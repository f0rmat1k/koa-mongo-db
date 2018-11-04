'use strict';

const MongoClient = require('mongodb').MongoClient;

module.exports = (uri, opts = {}) => {
	if (typeof uri !== 'string') {
		throw new TypeError('Expected uri to be a string');
	}

	if (typeof opts.db !== 'string') {
		throw new TypeError('Expected options.db to be a string');
	}

	opts = opts || {};
	const property = opts.property || 'db';

	let db;

	return async function koaMongoDb(ctx, next) {
		if (!db) {
			try {
				db = await MongoClient.connect(uri, opts);
			} catch (err) {
				db = undefined;

				ctx.throw(500, 'Mongo connection error');

				return;
			}
		}

		ctx[property] = db.db(opts.db);
		return next();
	};
};
