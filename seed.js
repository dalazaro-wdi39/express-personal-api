// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var albumsList = [
  {
    title: "22, A Million",
    artist: "Bon Iver",
    coverUrl: "images/22-a-million.jpg",
    releaseDate: 2016
  },
  {
    title: "Cease to Begin",
    artist: "Band of Horses",
    coverUrl: "images/cease-to-begin",
    releaseDate: 2007
  }
];

db.Album.remove({}, function(err, albums) {
  console.log('removed all albums');
  db.Album.create(albumsList, function(err, albums) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all albums');
    console.log("created", albums.length, "albums");
  });
});
