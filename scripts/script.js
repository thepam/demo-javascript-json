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

document.getElementById("menuarrow").onclick = function(){
	var menu = document.getElementById("genre-list");
	if(menu.style.display == "block"){
		menu.style.display = "none";
	}
	else{
		menu.style.display = "block";
	}
}

var code = "";
var genresArray = [];
var books = JSON.parse(obj);
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

