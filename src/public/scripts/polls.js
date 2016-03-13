$('document').ready(function() {
  console.log('getting polls');
  $.getJSON('/api/polls', function(polls) {
    console.log('got polls', polls);
    polls.map(function(poll, i) {
      console.log('poll #' + i + ': ', poll);
      var item = $('<li />');

      $('<a />', {
        class: 'collection-item',
        href: '/polls/' + poll._id,
        text: poll.title
      }).appendTo(item);

      item.appendTo('#pollCollection');
    });
  });
});
