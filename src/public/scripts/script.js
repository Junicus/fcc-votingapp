$('document').ready(function() {
  $('.button-collapse').sideNav();

  var lock = new Auth0Lock(
    AUTH0_CLIENT_ID,
    AUTH0_DOMAIN
  );

  var userProfile;

  $('.btn-login').click(function(e) {
    e.preventDefault();
    lock.show(function(err, profile, token) {
      if (err) {
        console.log('There was an error');
      } else {
        localStorage.setItem('userToken', token);

        userProfile = profile;

        $('.btn-login').hide();
      }
    });
  });

  $.ajaxSetup({
    'beforeSend': function(xhr) {
      if (localStorage.getItem('userToken')) {
        xhr.setRequestHeader('Authorization',
          'Bearer ' + localStorage.getItem('userToken'));
      }
    }
  });

});
