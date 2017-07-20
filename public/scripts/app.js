console.log("Sanity Check: JS is working!");

$(document).ready(function(){

var albumInfo = [];

  // GET profile on page load
  $.ajax({
    method: "GET",
    url: 'api/profile',
    success: function onIndexSuccess(json) {
      console.log(json);
      var profileData = json;

      $('#profile-photo').html(`
        <img src="${profileData.githubProfileImage}" />
      `);
      $('#profile-info').html(`
        <li><b>Name:</b> ${profileData.name}<li>
        <br>
        <li><b>Current City:</b> ${profileData.currentCity}</li>
        <br>
        <li><a href="${profileData.githubLink}" target="blank"><b>GitHub Profile</b></a></li>
        <br>
        <li><a href="${profileData.personalSiteLink}" target="blank"><b>Personal Portfolio</b></a></li>
        <br>
        <li><b>Hobbies:</b> ${profileData.hobbies}</li>
      `);
    }
  });

  // GET albums data
  $.ajax({
    method: "GET",
    url: 'api/albums',
    success: function handleSuccess(json) {

      console.log(json);
      var albums = json;

      // for each location, create a list item and marker
      albums.forEach(function (json) {

        //List item of album info
        var title = json.title;
        var artist = json.artist;
        var releaseDate = json.releaseDate;
        var coverUrl = json.coverUrl;

        $('.albums-list').append(
          `<section class="new-album">
            <div class="album-photo col-sm-6">
              <img src="${coverUrl}"/>
            </div>
            <div class="album-info col-sm-6">
              <li>
              <b>Title:</b> <i>${title}</i><br>
              <b>Artist:</b> ${artist}<br>
              <b>Year:</b> ${releaseDate}<br>
              </li>
            </div>
          </section>`
        );
      });
    }

  });

  $('#newAlbumForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: $(this).serialize(),
      success: function newAlbumSuccess(json) {
        $('#newAlbumForm input').val('');
        albumInfo.push(json);
        console.log('success!');
      }
    });
  });

});
