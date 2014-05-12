var angrySearcher = {};

angrySearcher.search = function(percentAngry, responder) {
	var bpm = Math.floor(60 + 1.6 * percentAngry);
	var moods = ["relaxing","happy","excited","angry"];
	var styles = ["pop", "pop", "rock", "black metal"];
	var mood = moods[0];
	var style = styles[0];

	if(percentAngry > 20) {
		mood = moods[1];
		style = styles[1];
	} 
	if(percentAngry > 50) {
		mood = moods[2];
		style = styles[2];

	} 
	if(percentAngry > 70) {
		mood = moods[3];
		style = styles[3];

	} 
	console.log(mood);
	console.log(bpm);
	$.get('http://developer.echonest.com/api/v4/song/search?api_key=EVHPYKY5VHUEMFNYX&format=json&results=10&min_tempo='+bpm+"&max_tempo="+(bpm+5)+"&mood="+mood+"&style="+style, function (resp) {
		var numberOfResults = resp.response.songs.length;
    	var title = resp.response.songs[0].title;
    	$.get("https://api.spotify.com/v1/tracks/search?q=track:"+title, function (spotifyResp) {
    		if(!spotifyResp.items[0]) {
    			angrySearcher.search(percentAngry+1, responder);
    		} else {
    			responder(spotifyResp.items[0].id);
    		}
    	});
	});
}