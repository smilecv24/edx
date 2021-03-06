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
    traits: [].concat(req.body.traits.split(',')),
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
  if (!+req.query.id) {
    res.send(JSON.stringify({body: {}}));
    return;
  }
  Toy.findOne({id: req.query.id}, (err, list) => {
    if (!list) {
      res.send(JSON.stringify({body: {}}));
      return;
    }
    res.json(list);
    // res.render('all-toys', {toys: list});
  });
});

app.use('/findAnimals', (req, res) => {
  let query = {};
  if (req.query.species) {
    query['species'] = req.query.species;
  }
  if (req.query.age) {
    query['age'] = req.query.age;
  }
  if (req.query.trait) {
    query['traits'] = {'$regex': req.query.trait, '$options': 'i'};
  }
  Animal.find(query).then((list) => {
    if (!list) {
      res.json({});
    }
    res.json(list);
    // res.render('all-animals', {animals: list});
  });
});

app.use('/animalsYoungerThan', (req, res) => {
  let query = {};
  if (req.query.age) {
    query['age'] = {$lt: req.query.age};
  }
  Animal.find(query).then((list) => {
    let names = [];
    if (!list) {
      res.json({});
    }
    list.forEach(animal => names.push(animal.name));
    res.json({names: names, count: list.length});
    // res.render('all-animals', {names: names, count: list.length});
  });
});

app.use('/calculatePrice', (req, res) => {
  let query = {};
  if (req.query.id) {
    query['id'] = {$in: req.query.id};
  }
  Toy.find(query).then((list) => {
    let totalPrice = 0;
    let items = [];
    if (!list) {
      res.json({});
    }
    req.query.id.map((item) => {
      list.map((el, index) => {
        if (el.id === item) {
          let result = {};
          result['item'] = el.id;
          result['qty'] = req.query.qty[index];
          result['subtotal'] = req.query.qty[index] * el.price;
          items.push(result);
          totalPrice += result['subtotal'];
        }
      });
    });
    res.json({items: items, totalPrice: totalPrice});
    // res.render('all-toys', {items: items, totalPrice: totalPrice});
  });
});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});


// Please do not delete the following line; we need it for testing!
// module.exports = app;