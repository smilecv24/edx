var mongoose = require('mongoose');

// note: your host/port number may be different!
// mongoose.connect('mongodb://admin:13thnovember!@edx-shard-00-00-ocvj2.mongodb.net:27017,edx-shard-00-01-ocvj2.mongodb.net:27017,edx-shard-00-02-ocvj2.mongodb.net:27017/test?ssl=true&replicaSet=edx-shard-0&authSource=admin', {useMongoClient: true});
mongoose.connect("mongodb://smilecv24:smilecv24@edx-shard-00-00-ocvj2.mongodb.net:27017,edx-shard-00-01-ocvj2.mongodb.net:27017,edx-shard-00-02-ocvj2.mongodb.net:27017/edx?ssl=true&replicaSet=edx-shard-0&authSource=admin");

var Schema = mongoose.Schema;

var toySchema = new Schema( {
	id: {type: String, required: true, unique: true},
	name: {type: String, required: true},
	price: Number
    } );


module.exports = mongoose.model('Toy', toySchema);
