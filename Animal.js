var mongoose = require('mongoose');

// note: your host/port number may be different!
// mongoose.connect('mongodb://admin:admin@edx-shard-00-00-ocvj2.mongodb.net:27017,edx-shard-00-01-ocvj2.mongodb.net:27017,edx-shard-00-02-ocvj2.mongodb.net:27017/edx?ssl=true&replicaSet=edx-shard-0&authSource=edx');
mongoose.connect("mongodb://smilecv24:smilecv24@edx-shard-00-00-ocvj2.mongodb.net:27017,edx-shard-00-01-ocvj2.mongodb.net:27017,edx-shard-00-02-ocvj2.mongodb.net:27017/edx?ssl=true&replicaSet=edx-shard-0&authSource=admin");

var Schema = mongoose.Schema;

var animalSchema = new Schema( {
	name: {type: String, required: true, unique: true},
	species: {type: String, required: true},
	breed: String,
	gender: {type: String, enum: ['male', 'female']},
	traits: [String],
	age: Number
    } );


module.exports = mongoose.model('Animal', animalSchema);
