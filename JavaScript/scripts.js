// We find all elements of the collapsible class so that we may add an event to them
var coll = document.getElementsByClassName("collapsible");
var i;
// In his for loop we cycle through the collapsible class buttons, and give them a click event
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    // This click event get a function which toggles whether the collapsible button is clossed or not.
    //If content.style.display === "none" then it is closed.
    if (content.style.display === "none") {
      content.style.display = "block";
    } else {
      content.style.display = "none"; 
    } 
  });
}

//A script element containing the youtube iframe api is created
//the element is then put insert before any other script tags in the document
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// A series of variable for the function below is created
var player;
var plot = document.getElementsByClassName("plot")
var ratings = document.getElementsByClassName("rating")
var ages = document.getElementsByClassName("age")
var currentTime = new Date().getFullYear()

// This function is responsible for fetching json, then fetchin OMDB data, creating youtube players
// and putting the fetched OMDB data into the HTML document.
// The function has an index as parameter as it is meant to be used in a for loop
async function fetchOmdb(i){
  // First we fetch our movie json data, and make it usable
  const firstresponse = await fetch('./movies.json')
  const jsonobj = await firstresponse.json()
  // We then take our the title from our json data, and use it to fetch data from OMDB about the film.
  const response = await fetch('http://www.omdbapi.com/?apikey=37ab123e&t='+jsonobj.fav_movies[i].title)
  const obj = await response.json()  
  // In the html, for each button is a div with class player. This div mark where we intend to make a 
  // YT player, which is done below. Here we also use the YT id from the json file.
  var players = document.getElementsByClassName('player');
  player = new YT.Player(players[i], {
   height: '390',
   width: '640',
   videoId: jsonobj.fav_movies[i].ID,
  });
  //We take the relevant data from the OMDB json and put it into our HTML elements
  let htmltitle = coll[i].textContent
  coll[i].textContent = htmltitle + ': ' + jsonobj.fav_movies[i].title
  plot[i].textContent =  obj.Plot
  ratings[i].textContent ="IMDB rating: " + obj.imdbRating
  ages[i].textContent = "Age: " + (currentTime - obj.Year)

}
// Finally we find all divs with a class content, these are were the omdb and yt players are to be put
// We then call our function for each of those divs
var content = document.getElementsByClassName("content")
for (i = 0; i < content.length; i++){
  fetchOmdb(i)
}
