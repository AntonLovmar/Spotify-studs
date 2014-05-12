var bpmSearcher = {};

bpmSearcher.search = function(bpm, responder) {
	$.get('http://developer.echonest.com/api/v4/song/search?api_key=EVHPYKY5VHUEMFNYX&format=json&results=10&min_tempo='+bpm+"&max_tempo="+(bpm+5), function (resp) {
		var numberOfResults = resp.response.songs.length;
		var index = Math.floor(Math.random()*numberOfResults);
    	var title = resp.response.songs[index].title;
    	$.get("https://api.spotify.com/v1/tracks/search?q=track:"+title, function (spotifyResp) {
    		responder(spotifyResp.items[0].id);
    	});
	});
}