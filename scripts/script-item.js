function getURLVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){
        	return pair[1];
        }
    }
    return(false);
}

function createStars(rating){
	var dif = 5 - rating;
	var response = "<span class='amber-text text-darken-3'>";
	for (i = 0; i < rating; i++) { 
		response = response + '<i class="fa fa-star" aria-hidden="true"></i>';
	}
	if(dif > 0){
		for (i = 0; i < dif; i++) { 
			response = response + '<i class="fa fa-star-o" aria-hidden="true"></i>';
		}
	}
	response = response + "</span>";
	return response;
}

function friendlyDate(bookDate){
	var myDate = new Date(bookDate);
	var month = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"][myDate.getMonth()];
	return month + ' ' + myDate.getDay() + ', ' + myDate.getFullYear();
}

var code = "";
var itemID = getURLVariable("book");
var books = JSON.parse(obj);
books.forEach( function(book) {
	if(book['id'] == itemID){
		document.getElementById("book-crumb").innerHTML = book['name'];

		code = "<article class='card-panel'>";
		code = code + "<h1>"+book['name']+"</h1>";
		if(book['series'] !== ""){
			code = code + "<h3>"+book['series']+"</h3>";
		}
		code = code + "<h4>Written by "+book['author']+" in "+book['year']+"</h4>";
		code = code + "<p id='book-ratings'><span class='stars'>"+createStars(book['rating'])+"</span><span class='ratings'>("+book['numratings']+" ratings)</span></p>";
		code = code + "<div class='book-desc'><p>"+book['description'].replace(/(\r\n|\n\r|\r|\n)/gm, "</p><p>")+"</p></div>";
		code = code + "</article>";
		code = code + "<aside class='card-panel'><h2>Reviews</h2>";
		book['reviews'].forEach( function (review) {
			code = code + "<div class='comment row'><div class='comment-icon col s1'><i class='fa fa-user-circle-o' aria-hidden='true'></i></div>";
			code = code + "<div class='col s11'>";
			code = code + "<p class='comment-name'>"+review['name']+" <span>"+createStars(review['rating'])+"</span></p>";
			code = code + "<p class='comment-date'>"+friendlyDate(review['date'])+"</p>";
			code = code + "<div class='comment-text'><p>"+review['text'].replace(/(\r\n|\n\r|\r|\n)/gm, "</p><p>")+"</p></div>";
			code = code + "</div></div>";
		});
		code = code + "</aside>";


		document.getElementById("content-list").innerHTML = code;

		code = "<p>"+book['about-author'].replace(/(\r\n|\n\r|\r|\n)/gm, "</p><p>")+"</p>";
		code = code + "<h5 class='menutitle teal-text'>About this Edition</h5>";
		code = code + "<div class='row'><div class='col s4 m3 l4'><img src='images/"+book['id']+".jpg'/></div>";
		code = code + "<div class='col s8 m9 l8'>";
		code = code + "<p>Published on "+friendlyDate(book['published'])+" by "+book['publisher']+"<p>";
		code = code + "<p><em class='caps'>"+book['edition']+"</em>, "+book['pages']+" pages</p>";
		code = code + "<p>"+book['numeditions']+" editions</p>";
		code = code + "</div></div>";

		document.getElementById("author-info").innerHTML = code;
	}
});



