var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var Animal = require('./Animal.js');
var Toy = require('./Toy.js');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use('/add-animal', (req, res) => {
    res.render('add-animal');
});

app.use('/new-animal', (req, res, next) => {
    let newAnimal = new Animal({
        name: req.body.name,
        species: req.body.species,
        breed: req.body.breed,
        gender: req.body.gender,
        traits: req.body.traits,
        age: req.body.age
    });
    newAnimal.save((err, animal) => {
        if (err) res.status(500).send('Error : ' + err);
        // res.status(200).send('Success' + animal);
        res.redirect("/all-animals");
        next();
    })
});

app.use('/all-animals', (req, res) => {
    Animal.find({}, (err, list) => {
        res.render('all-animals', {animals: list});
    });
});


app.use('/add-toy', (req, res) => {
    res.render('add-toy');
});

app.use('/new-toy', (req, res, next) => {
    let newToy = new Toy({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price
    });
    newToy.save((err, toy) => {
        if (err) res.status(500).send('Error : ' + err);
        res.redirect("/all-toys");
        next();
    })
});

app.use('/all-toys', (req, res) => {
    Toy.find({}, (err, list) => {
        res.render('all-toys', {toys: list});
    });
});

app.use('/findToy', (req, res) => {
    Toy.find({id: req.query.id}, (err, list) => {
        res.render('all-toys', {toys: list});
    });
});

app.use('/findAnimals', (req, res) => {
    Animal.find(req.query).then((list) => {
        res.render('all-animals', {animals: list});
    });
});


app.listen(3000, () => {
    console.log('Listening on port 3000');
});


// Please do not delete the following line; we need it for testing!
module.exports = app;