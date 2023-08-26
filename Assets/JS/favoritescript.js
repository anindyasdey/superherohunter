let favoriteResults = document.getElementById("favorite-results");


window.addEventListener("load",async function () 
{
    let charIDs = localStorage.getItem("favCharIDs");
    charIDArr = charIDs.split(',');
    charIDArr.splice(0,1);
    displayFavorites(charIDArr);
    localStorage.setItem('moreInfo','');
    


})

async function displayFavorites(charIDArr)
{
    charHeroArr = [];

    for (let i = 0; i < charIDArr.length; i++) 
    {   
        let PUBLIC_KEY = "ff5099697f636bd87821f1090353a506";
        let PRIVATE_KEY = "1ddbb55bc3d3a8ad1ebc028894d0a42d4b3bca05";


        let ts = new Date().getTime();
        let hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

    

        await fetch(`https://gateway.marvel.com/v1/public/characters/${charIDArr[i]}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`)
          .then(res => res.json()) //Converting the data into JSON format
          .then(data => charHeroArr.push(data.data.results[0])) //sending the searched results characters to show in HTML
    }
    

    showSearchedResults(charHeroArr);


}

function showSearchedResults(searchedHero) 
{

    favoriteResults.innerHTML = '';

    let favoriteHTML;

    let favCharIDs = localStorage.getItem("favCharIDs");
     if(favCharIDs == null || favCharIDs == '')
     {
          // If we did't got the favourite Character IDs then we initalize it with empty string
          favCharIDs = '';
     }

    

        for(i=0; i<searchedHero.length;i++)
        {     let character = searchedHero[i];
              // Appending the element into DOM

              if(i%5 == 0)
              {
                favoriteHTML += `<div class="padder"> <div class="d-flex flex-row cards-container">`
              }

              favoriteHTML +=
                   `
                   <div class="flex-col card">
                   <img src="${character.thumbnail.path+'/portrait_uncanny.' + character.thumbnail.extension}" alt="No Image Found">
                   <span class="name">${character.name}</span>
                   <span class="id">Id : ${character.id}</span>
                   <span class="comics">Comics : ${character.comics.available}</span>
                   <span class="series">Series : ${character.series.available}</span>
                   <span class="stories">Stories : ${character.stories.available}</span>
                   <button class="more-info-btn" id="A${character.id}"><i class="fa-solid fa-circle-info"></i> &nbsp; More Info</button>
                   <button class="btn add-to-fav-btn" id="${character.id}"><i class=\"fa-solid fa-heart-circle-minus\"></i> &nbsp; Remove from Favourites
                   </div> 
              `

              if(i%5==4 || i+1 == searchedHero.length)
              {
                favoriteHTML += `</div> </div>`
              }

        }    
        // Adding the appropritate events to the buttons after they are inserted in dom

        favoriteResults.innerHTML += favoriteHTML;

        events();
}

function events() 
{
    let favouriteButton = document.querySelectorAll(".add-to-fav-btn");
    favouriteButton.forEach((btn) => btn.addEventListener("click", removeFromFavourites));

    let infoButton = document.querySelectorAll(".more-info-btn");
    infoButton.forEach((btn) => btn.addEventListener("click", moreInfo));


}

function removeFromFavourites() 
{
    favCharIDs = localStorage.getItem('favCharIDs');
    favString = ',' + this.id;

    favCharIDs = favCharIDs.replace(favString,'');
    localStorage.setItem('favCharIDs',favCharIDs);         
    
    location.reload();
}


function moreInfo()
{
    localStorage.setItem('moreInfo', this.id);
    console.log(this.id);
    window.location.replace("file:///C:/Users/User/OneDrive/Desktop/Superhero%20App/superheropage.html");

}




