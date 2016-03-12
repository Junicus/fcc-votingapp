$('document').ready(function() {
  console.log('getting polls');
  $.getJSON('/api/polls', function(polls) {
    console.log('got polls', polls);
    polls.map(function(poll, i) {
      console.log('poll #' + i + ': ', poll);
      $('#pollCollection').append('<li>' + poll + '</li>');
    });
  });
});
