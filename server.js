// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var profile = {
  name: "Daryl Jason A. Lazaro",
  githubUsername: "dalazaro",
  githubLink: "http://www.github.com/dalazaro",
  githubProfileImage: "https://avatars1.githubusercontent.com/u/27825269?v=4&s=460",
  personalSiteLink: "http://dalazaro.github.io",
  currentCity: "Hayward, CA",
  familyMembers: [
    { name: 'Kean Saetern', relationship: 'fiancee' },
    { name: 'Oliver Alvarado', relationship: 'stepson' }
  ],
  hobbies: [ 'coffee', 'pro wrestling', 'guitar', 'camping', 'listening to podcasts', 'ketogenic diet', 'lumbersexual' ]
}

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/dalazaro/express-personal-api",
    baseUrl: "https://powerful-springs-78915.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "GET", path: "/api/albums", description: "Index of favorite albums"},
      {method: "GET", path: "/api/albums/:id", description: "Show one favorite album"},
      {method: "POST", path: "/api/albums", description: "Create new favorite album"},
      {method: "PUT", path: "/api/albums/:id", description: "Update one favorite album"},
      {method: "DELETE", path: "/api/albums/:id", description: "Destroy one favorite album"},
    ]
  })
});

// API profile info
app.get('/api/profile', function(req, res){
  res.json(profile);
});

// Index of favorite albums
app.get('/api/albums', function(req, res){

  // compile album data
  db.Album.find(function(err, albums) {
    if (err) {
      res.sendStatus(500);
      return console.log("index error: " + err);
    }
    res.json(albums);
  })

});

// Show one favorite album
app.get('/api/albums/:id', function(req, res){

  // get album id
  var albumId = req.params.id;
  console.log('show album', albumId);

  // find album by id
  db.Album.findById(albumId, function(err, foundAlbum) {
    if (err) {
      res.sendStatus(500);
      return console.log("index error: " + err);
    }
    res.json(foundAlbum);
  });

});

// Create new favorite album
app.post('/api/albums', function(req, res) {

  // new album using form data (`req.body`)
  var newAlbum = new db.Album({
    title: req.body.title,
    artist: req.body.artist,
    coverUrl: req.body.coverUrl,
    releaseDate: req.body.releaseDate
  });
  console.log('album created', req.body);

  // save album to DB
  newAlbum.save(function(err, album) {
    if (err) {
      return console.log("create error: " + err);
    }
    console.log('created', album.title);
    res.json(album);
  });

});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
