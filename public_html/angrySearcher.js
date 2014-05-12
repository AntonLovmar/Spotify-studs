var angrySearcher = {};

angrySearcher.search = function(percentAngry, responder) {
	var bpm = Math.floor(60 + 1.6 * percentAngry);
	var moods = ["relaxing","happy","excited","angry"];
	var mood = moods[0];

	if(percentAngry > 20) {
		mood = moods[1];
	} 
	if(percentAngry > 50) {
		mood = moods[2];
	} 
	if(percentAngry > 70) {
		mood = moods[3];
	} 
	$.get('http://developer.echonest.com/api/v4/song/search?api_key=EVHPYKY5VHUEMFNYX&format=json&results=10&min_tempo='+bpm+"&max_tempo="+(bpm+5)+"&mood="+mood, function (resp) {
		var numberOfResults = resp.response.songs.length;
		var index = Math.floor(Math.random()*numberOfResults);
    	var title = resp.response.songs[index].title;
    	$.get("https://api.spotify.com/v1/tracks/search?q=track:"+title, function (spotifyResp) {
    		responder(spotifyResp.items[0].id);
    	});
	});
}