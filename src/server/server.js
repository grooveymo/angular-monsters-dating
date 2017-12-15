/**
 * api endpoint - http://localhost:9090/api/monster
 */
// =============================================================================
// import required packages
// =============================================================================
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');

//declare mongo models
var Monster = require('./models/monster').Monster;

//declare name of db
var db = 'angular-monsters-dating-db';

// =============================================================================
// configure app
// =============================================================================
// log requests to the console
app.use(morgan('dev'));

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port
var port = process.env.PORT || 9090;

// connect to our database
mongoose.connect('mongodb://localhost/' + db);

// =============================================================================
// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('request received');
  
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');// enable angularjs app to connect
  
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:9090/api)
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to Monster Dating Agency api!' });
});

//handle get single contact and update contact
router.route('/monster/:id')
  .put(function(req, res) {
    
    console.log('Updating contact : ', req.params.id);
    Monster.findById({ _id: req.params.id }, function(err, monster) {
      if (err) {
        console.log('[ERROR] PUT /monster - ' + JSON.stringify(err));
        return res.send(err);
      }
      
      console.log('Updating monster with details: ', monster);
      
      
      monster.firstName = req.body.firstName;
      monster.lastName = req.body.lastName;
      monster.email = req.body.email;
      
      monster.save(function(err, updatedMonster) {
        if (err) {
          console.log('[ERROR] PUT /monster - ' + JSON.stringify(err));
          res.status(400);
          return res.send(err);
        }
        
        console.log('*** Updated contacted : ', updatedMonster);
        
        res.json({ message: 'Contact updated!', contact: updatedMonster });
      });
      
    });
  })
  .get(function(req, res) {
    console.log('[SPECIFIC] GET/ contact : ', req);
    Monster.find({ _id: req.params.id }, function(err, monster) {
      if (err) {
        console.log('[ERROR] GET /monster - ' + JSON.stringify(err));
        return res.send(err);
      }
      
      res.json(monster);
    });
  })
  .delete(function(req, res) {
    var toBeDeletedId = req.params.id;
    Monster.remove({ _id: toBeDeletedId }, function(err) {
      if (err) {
        console.log('[ERROR] DELETE /monster - ' + JSON.stringify(err));
        return res.send(err);
      }
      res.json({ message: 'Successfully deleted', id: toBeDeletedId });
    });
    
  });

// create a NEW monster (accessed at POST http://localhost:8080/api/monster)
router.route('/monster/')
  .post(function(req, res) {
    console.log('calling POST /monster/ with body : ' + JSON.stringify(req.body));
    var monster = new Monster();		// create a new instance of the TodoList model
    monster.firstName = req.body.firstName;
    monster.lastName = req.body.lastName;
    monster.email = req.body.email;

    monster.save(function(err) {
      if (err) {
        console.log('[ERROR] POST /monster - ' + JSON.stringify(err));
        res.status(400);
        return res.send(err);
      }
      
      res.json({ message: 'New Contact created!', contact: monster });
    });
  })
  .get(function(req, res) {
    console.log('[GENERAL] calling GET /monster/', req);
    console.log('[GENERAL] calling GET /monster/');
    Monster.find(function(err, contactList) {
      if (err) {
        console.log('[ERROR] GET /monster - ' + JSON.stringify(err));
        return res.send(err);
      }
      
      res.json(contactList);
    });
  });


// =============================================================================
// REGISTER OUR ROUTES
// =============================================================================
app.use('/api', router);

// =============================================================================
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('REST API deployed on port ' + port);
