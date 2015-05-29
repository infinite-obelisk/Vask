var formatTime = function (objTime, dateTime) {
  if (!objTime) return 'before universe';
  var diff = Math.floor((dateTime - objTime) / 1000);
  if (diff < 60) return 'less than a minute ago';
  diff = Math.floor(diff/60);
  if (diff < 60) return diff + ' minutes ago';
  diff = Math.floor(diff/60);
  if (diff === 1) return '1 hour ago';
  if (diff < 24) diff + ' hours ago';
  diff = Math.floor(diff/24);
  if (diff === 1) return 'yesterday';
  return diff + ' days ago';
}
