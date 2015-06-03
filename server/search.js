var getEditDistance = function(a, b){

  if(a.length == 0) return b.length; 
  if(b.length == 0) return a.length; 
  var matrix = [];
  var i = 0;
  var j = 0;

  for(i = 0; i <= b.length; i++) matrix[i] = [i];
  for(j = 0; j <= a.length; j++) matrix[0][j] = j;

  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution

                                Math.min(matrix[i][j-1] + 1, // insertion

                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }
  return matrix[b.length][a.length];
};

var distanceVal = function (dis) {
	//console.log(dis);
	if (dis < 0.01) return 1.0;
	if (dis < 0.25) return 0.8;
	if (dis < 0.5 ) return 0.4;
	if (dis < 0.7) return 0.2;
	return 0.0;

}



// sWords [101 javascript hack reactor]
// cWords [{weight: 1.0, words[]}]

var search = function(search, cWords) {
	var result = 0.0;
	var sWords = search.split(' ');
    for (var i = 0; i < sWords.length; i++) {
    	var sword = sWords[i];
    	console.log(sword);
    	for (var a = 0; a < cWords.length; a++) {
    		var content = cWords[a];
    		var weight = content.weight;
    		var words = content.words.split(' ');
    		var max = 0;
    		for (var c = 0; c < words.length; c++) {
    			var cword = words[c];
    			//console.log(cword);
    			var temp = weight * distanceVal( getEditDistance(sword,cword) / cword.length);
    			if (temp > max) max = temp;

    		}
    		result += max;
    	}
    }
    return result;
}

var content = [
  {weight : 1.0, words : 'hello world'},
  {weight : 0.5, words : 'this is an example how to implement hello world'},
  {weight : 0.3, words : 'javascript hack reactor algorithms'}
]

console.log(search('do', content));
