# koa-mongo-db

> Get db connection in context


## Install

```
$ npm install --save koa-mongo-db
```


## Usage

_use version 1 for koa 1_

```js
var app = require('koa')();

var koaMongoDb = require('koa-mongo-db');
app.use(koaMongoDb('mongodb://localhost/test'));

app.get('/', function * (next) {
	this.db // => Db object
});
```

## API

### koaMongoDb(uri, [options])

#### uri

*Required*  
Type: `string`

[Connection string uri](http://docs.mongodb.org/manual/reference/connection-string/).

#### options

All options from [MongoClient](http://mongodb.github.io/node-mongodb-native/2.0/api/MongoClient.html) are accepted as well.

##### property

Type: `String`  
Default: `db`

Property on `request` object in which db connection will be stored.


## License

MIT

Thanks to [floatdrop](https://github.com/floatdrop) for the original [express-mongo-db](https://github.com/floatdrop/express-mongo-db).
