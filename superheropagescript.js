let superResults = document.getElementById("super-results");


window.addEventListener("load",async function () 
{
    
    let moreInfo = localStorage.getItem('moreInfo');
    console.log(moreInfo);
    moreInfo = moreInfo.slice(1);
    
    let PUBLIC_KEY = "ff5099697f636bd87821f1090353a506";
    let PRIVATE_KEY = "1ddbb55bc3d3a8ad1ebc028894d0a42d4b3bca05";


    let ts = new Date().getTime();
    let hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();

    

    await fetch(`https://gateway.marvel.com/v1/public/characters/${moreInfo}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`)
        .then(res => res.json()) //Converting the data into JSON format
        .then(data => showSearchedResults(data.data.results)) //sending the searched results characters to show in HTML


})

function showSearchedResults(searchedHero) 
{

    superResults.innerHTML = '';


    // character is the object that we get from API
    let character = searchedHero[0];
    // Appending the element into DOM
    superResults.innerHTML +=
        `
        <div class="flex-row card">
        <img src="${character.thumbnail.path+'/portrait_uncanny.' + character.thumbnail.extension}" alt="No Image Found">
        <div class="flex-col card">
        <div class="flex-col card">
        <span class="name">Name: ${character.name}</span>
        <span class="id">Id : ${character.id}</span>
        <span class="comics">Comics : ${character.comics.available}</span>
        <span class="series">Series : ${character.series.available}</span>
        <span class="stories">Stories : ${character.stories.available}</span>
        </div>
        <div class="flex-col card">
        <span class="desc"> Description: ${character.description}</span>
        </div>
        </div>
                   
        `

    

}