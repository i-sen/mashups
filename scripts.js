//Defining variables
var tmdbTitle;
var tmdbPicker;
var tmdbOverview;
var tmdbPoster;
var tmdbRating;
var youtubeVideoId;
var emebdVideoURL;


//Changing genres based on which button is clicked
$(document).ready(function(){
			console.log("The document is ready!");
		
			$('.moviebutton').click(function(evt){
				console.log(evt.currentTarget.id);

				var currentID = evt.currentTarget.id;

				var currentValue;
				if (currentID == "buttondrama"){
					currentValue = 18;
				}
				if (currentID == "buttonromance"){
					currentValue = 10749;
				}
				if (currentID == "buttonaction"){
					currentValue = 28;
				}
				if (currentID == "buttoncomedy"){
					currentValue = 35;
				}
				if (currentID == "buttonhorror"){
					currentValue = 27;
				}
				else if (currentID == "buttonthriller"){
					currentValue = 53;
				}
				//call function to execute AJAX request
				getMovieData(currentValue);

			});
});



//Displaying title and poster on page
function makeHTML(tmdbTitle){
	var htmlString = "<h2>" + tmdbTitle + "</h2>";
	htmlString += "<img src= https://image.tmdb.org/t/p/original" + tmdbPoster + ">";
	$('#results1').html(htmlString);
}



//Searching YouTube for specific movie trailer
function searchYoutube(trailerData){

	var youtubeURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&type=video&videoDefinition=high&key=AIzaSyALCADkgGerHp68OTeBLXgQE3V9AHMImZQ";
		youtubeURL += "&q=official+trailer+bollywood+";
	var youtubeRequestURL = youtubeURL + trailerData;
	
	$.ajax ({
		url: youtubeRequestURL, 
		type: "GET",
		dataType: "json",
		error: function (err){
			console.log(err);
		},
		success: function (data){
			console.log("Nice!");
			console.log(data);
			
			//Accessing particular things in the array
			youtubeVideoId = data.items[1].id.videoId;
			emebdVideoURL = "https://www.youtube.com/embed/" + youtubeVideoId;
			console.log(youtubeVideoId);
			
			//Displaying trailer and synopsis data on page
			var htmlString2 = "<h1>" + "trailer" + "</h1>"; 
    		htmlString2 += '<br><br><iframe width="560" height="315" src="' + emebdVideoURL + '" frameborder="0" allowfullscreen></iframe>';
    		htmlString2 += "<p>" + tmdbOverview + "</p>";
			htmlString2 += "<p>Rating: " + tmdbRating + "/10</p>";
			$('#results2').html(htmlString2);

			

		}			
	});
}






//Movie information  generator
function getMovieData(genreNum){

	var tmdbURL = "https://api.themoviedb.org/3/discover/movie?api_key=cf4976a037016ff6f2f2e270d3561da2";
		tmdbURL += "&region=IN&with_original_language=hi&with_genres=" + genreNum + "&page=";
	var tmdbPage = Math.ceil((Math.random() * 10));
	var tmdbRequestURL = tmdbURL + tmdbPage;

	$.ajax ({
		url: tmdbRequestURL, 
		type: "GET",
		dataType: "json",
		error: function (err){
			console.log(err);
		},
		success: function (data){
			console.log("Nice!");
			console.log(data);
            
            //Accessing particular things in the array
			tmdbPicker = data.results[Math.floor((Math.random() * 20))];
			tmdbTitle = tmdbPicker.title;
			tmdbOverview =  tmdbPicker.overview;
			tmdbPoster = tmdbPicker.poster_path;
			tmdbRating = tmdbPicker.vote_average;
			console.log(tmdbTitle, tmdbOverview, tmdbPoster);
			makeHTML (tmdbTitle, tmdbOverview, tmdbPoster);

			//Changing background based on poster called
			$(".bg").first().css("background-image", "url(https://image.tmdb.org/t/p/original"+tmdbPoster+")");

			//call youtube function with titlename
			searchYoutube(tmdbTitle);

		}
			
	});
}


