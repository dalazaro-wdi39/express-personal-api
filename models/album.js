var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AlbumSchema = new Schema({
  title: String,
  artist: String,
  coverUrl: String,
  releaseDate: Number
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
