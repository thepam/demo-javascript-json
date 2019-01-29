//Main listing methods

function filterGenre(val){
	var filter = genresArray[val];
	var listed = document.getElementsByClassName('book');
	for (var i=0; i < listed.length; i++) {
		var localGenres = listed[i].getElementsByClassName("genres")[0].innerHTML.split(', ');
		if(val > -1){
			if(localGenres.indexOf(filter) > -1){
				listed[i].style.display = "block";
			}
			else{
				listed[i].style.display = "none";
			}
		}
		else{
			listed[i].style.display = "block";
		}
	}

	var clicked = "";
	document.getElementsByClassName('selected')[0].classList.remove('selected');
	if(val > -1){
		clicked = "genre"+val;
	}
	else{
		clicked = "all-genres";
	}

	document.getElementById(clicked).classList.add('selected');
}

function createMenu(arr){
	var response = "<ul>";
	var response = response + "<li id='all-genres' class='genre-item selected' onclick='filterGenre(-1)'>All Genres</li>";
	for (i = 0; i < arr.length; i++) {  
   		response = response + "<li id='genre"+i+"' class='genre-item' onclick='filterGenre("+i+")'>"+arr[i]+"</li>";
	}
	response = response + "</ul>";
	return response;
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

function setResponsiveMenu(){
	document.getElementById("menuarrow").onclick = function(){
		var menu = document.getElementById("genre-list");
		if(menu.style.display == "block"){
			menu.style.display = "none";
		}
		else{
			menu.style.display = "block";
		}
	}
}

function setContentList(books){
	var genresArray = [];

	books.forEach( function(book) {
		code = code + "<div id='"+book['id']+"' class='book card-panel'>";
		code = code + "<div class='cover'><img src='images/"+book['id']+".jpg'/></div>"
		code = code + "<div class='info'><p class='title'><a class='teal-text' href='item.html?book="+book['id']+"'>"+book['name']+"</a></p>";
		code = code + "<p class='authoretc'>Written by "+book['author']+" in "+ book['year'] +" &nbsp;-&nbsp; "+createStars(book['rating'])+"</p>";
		code = code + "<p class='summary'>"+book['summary']+"</p>";
		code = code + "<p class='genres blue-text text-darken-2'>";
		book['genres'].forEach( function (genre) {
			code = code + genre['name'] + ", ";
			if(genresArray.indexOf(genre['name']) == -1){
				genresArray.push(genre['name']);
			}
		});
		code = code.slice(0,-2);
		code = code + "</p>";
		code = code + "</div>";
		code = code + "</div>";
	});

	document.getElementById("content-list").innerHTML = code;
	genresArray = genresArray.sort();
	document.getElementById("genre-list").innerHTML = createMenu(genresArray);
}

//Individual book page methods

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

function friendlyDate(bookDate){
	var myDate = new Date(bookDate);
	var month = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"][myDate.getMonth()];
	return month + ' ' + myDate.getDay() + ', ' + myDate.getFullYear();
}

function setContentBook(books){
	var itemID = getURLVariable("book");
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
			code = code + "<div class='book-desc'><p>"+book['description'].split("\n").join("</p><p>")+"</p></div>";
			code = code + "</article>";
			code = code + "<aside class='card-panel'><h2>Reviews</h2>";
			book['reviews'].forEach( function (review) {
				code = code + "<div class='comment row'><div class='comment-icon col s1'><i class='fa fa-user-circle-o' aria-hidden='true'></i></div>";
				code = code + "<div class='col s11'>";
				code = code + "<p class='comment-name'>"+review['name']+" <span>"+createStars(review['rating'])+"</span></p>";
				code = code + "<p class='comment-date'>"+friendlyDate(review['date'])+"</p>";
				code = code + "<div class='comment-text'><p>"+review['text'].split("\n").join("</p><p>")+"</p></div>";
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
}

//Run on page load

var code = "";
var books = JSON.parse(obj);
if(getURLVariable("book")){
	setContentBook(books);
}else{
	setResponsiveMenu();

	setContentList(books);
}


