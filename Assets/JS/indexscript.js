let searchBar = document.getElementById("search");
let searchResults = document.getElementById("search-results");

// Adding eventListener to search bar
searchBar.addEventListener("input", () => search(searchBar.value));


// Event listener attached to dom which is executed when the page is loaded
window.addEventListener("load", async function () {


    let PUBLIC_KEY = "ff5099697f636bd87821f1090353a506";
    let PRIVATE_KEY = "1ddbb55bc3d3a8ad1ebc028894d0a42d4b3bca05";

    localStorage.setItem('moreInfo','');

    let ts = new Date().getTime();
    let hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

    await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`)
          .then(res => res.json()) //Converting the data into JSON format
          .then(data => showSearchedResults(data.data.results)) //sending the searched results characters to show in HTML


})




// function for API call
async function search(searchtext) 
{
    let PUBLIC_KEY = "ff5099697f636bd87821f1090353a506";
    let PRIVATE_KEY = "1ddbb55bc3d3a8ad1ebc028894d0a42d4b3bca05";

    let ts = new Date().getTime();
    let hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

     
     // if there is no text written in the search bar then nothing is displayed 
     if (searchtext.length == 0) 
     {      
          return;
     }

      //API call to get the data 
       await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&nameStartsWith=${searchtext}&apikey=${PUBLIC_KEY}&hash=${hash}`)
         .then(res => res.json()) //Converting the data into JSON format
         .then(data => showSearchedResults(data.data.results)) //sending the searched results characters to show in HTML
        
}

function showSearchedResults(searchedHero) 
{

    searchResults.innerHTML = '';

    let favCharIDs = localStorage.getItem("favCharIDs");
     if(favCharIDs == null || favCharIDs == '')
     {
          // If we did't got the favourite Character IDs then we initalize it with empty string
          favCharIDs = '';
     }


    // count is used to count the result displayed in DOM
    let count = 1;

    // iterating the searchedHero array using for loop
    for (const key in searchedHero) 
    {   // if count <= 5 then only we display it in dom other results are discarded
        if (count <= 5)
        {      // getting the single hero 
              // character is the object that we get from API
              let character = searchedHero[key];
              // Appending the element into DOM
              searchResults.innerHTML +=
                   `
                   <div class="flex-col card">
                   <img src="${character.thumbnail.path+'/portrait_uncanny.' + character.thumbnail.extension}" alt="No Image Found">
                   <span class="name">${character.name}</span>
                   <span class="id">Id : ${character.id}</span>
                   <span class="comics">Comics : ${character.comics.available}</span>
                   <span class="series">Series : ${character.series.available}</span>
                   <span class="stories">Stories : ${character.stories.available}</span>
                   <button class="more-info-btn" id="A${character.id}"><i class="fa-solid fa-circle-info"></i> &nbsp; More Info</button>
                   <button class="btn add-to-fav-btn" id="${character.id}">${favCharIDs.includes(character.id)? "<i class=\"fa-solid fa-heart-circle-minus\"></i> &nbsp; Remove from Favourites" :"<i class=\"fa-solid fa-heart fav-icon\"></i> &nbsp; Add to Favourites</button>"}
                   </div>
                   
              `
        }
        count++;
    }
    // Adding the appropritate events to the buttons after they are inserted in dom
   events();
}

function events() 
{
    let favouriteButton = document.querySelectorAll(".add-to-fav-btn");
    favouriteButton.forEach((btn) => btn.addEventListener("click", addToFavourites));

    let infoButton = document.querySelectorAll(".more-info-btn");
    infoButton.forEach((btn) => btn.addEventListener("click", moreInfo));
}

function addToFavourites() 
{
    favCharIDs = localStorage.getItem('favCharIDs');
    favString = ',' + this.id;

    // If add to favourites button is cliked then
    if (this.innerHTML == '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites') {

         favCharIDs = favCharIDs + favString;

         localStorage.setItem('favCharIDs',favCharIDs);

         // Convering the "Add to Favourites" button to "Remove from Favourites"
         this.innerHTML = '<i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites';
         
    }
    // For removing the character form favourites array
    else
    {
         favCharIDs = favCharIDs.replace(favString,'');
         localStorage.setItem('favCharIDs',favCharIDs);         
         
         // Convering the "Remove from Favourites" button to "Add to Favourites" 
         this.innerHTML = '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites';
    }     
}


function moreInfo()
{
    localStorage.setItem('moreInfo', this.id);
    window.location.replace("file:///C:/Users/User/OneDrive/Desktop/Superhero%20App/superheropage.html");
    console.log(this.id);

}