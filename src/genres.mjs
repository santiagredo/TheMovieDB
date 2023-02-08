import {API_KEY} from "./secrets.mjs";
import {homePageContainerCreator, queryMediaObject} from "./index.mjs";
import {clearHomePage, returnButtonGenerator} from "./mediaDetails.mjs";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY
    }
});

const bodyMain = document.getElementById('bodyMain');
const dropdownMoviesGenres = document.getElementById('dropdownMoviesGenres');
const dropdownShowsGenres = document.getElementById('dropdownShowsGenres');




async function getMoviesGenres(){
    const {data} = await api('/genre/movie/list');
    // console.log(data);
    displayMoviesGenres(data.genres);
}

async function getShowsGenres(){
    const {data} = await api('/genre/tv/list');
    // console.log(data);
    displayShowsGenres(data.genres);
}

function displayMoviesGenres(data){
    const ul = document.createElement('ul');
    ul.classList.add('dropdownMoviesContent');

    data.map((ele) => {
        let li = document.createElement('li');
        li.innerHTML = ele.name;
        li.addEventListener('click', () => {
            hashLocation(ele, 'movie')
        });
        ul.appendChild(li);
    })

    dropdownMoviesGenres.appendChild(ul);
}

function displayShowsGenres(data){
    const ul = document.createElement('ul');
    ul.classList.add('dropdownShowsContent');

    data.map((ele) => {
        let li = document.createElement('li');
        li.innerHTML = ele.name;
        li.addEventListener('click', () => {
            hashLocation(ele, 'tv')
        });
        ul.appendChild(li);
    })

    dropdownShowsGenres.appendChild(ul);
}




export async function getGenresResults(id, name, media, page){
    // console.log(`ID: ${id}, Category name: ${name}, Media type: ${media}`);
    // console.log(api(`/discover/${media}?page=${page}`));

    const {data} = await api(`/discover/${media}?page=${page}`, {
        params: {
            with_genres: id
        }
    });
    // console.log(data);
    
    if(media === 'movie'){
        displayGenresResults(`${decodeURI(name)} movies`, data.results);
    }else{
        displayGenresResults(`${decodeURI(name)} tv shows`, data.results);   
    }
}




function paginationButtonsCreator(){
    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName, mediaType, pageNumber] = categoryData.split('--');

    let counter = Number(pageNumber) > 1 ? Number(pageNumber) : 1;

    const div = document.createElement('div');
    div.classList.add('paginationContainer');

    const backwardsPaginationButton = document.createElement('button');
    backwardsPaginationButton.innerHTML = '⬅️';
    backwardsPaginationButton.classList.add('paginationButton');
    
    if(counter < 2){
        counter = 1;
        backwardsPaginationButton.disabled = true;
    }else{
        backwardsPaginationButton.disabled = false;
    };

    backwardsPaginationButton.addEventListener('click', () => {
        counter--;
        // console.log(counter);
        paginationTtile.innerHTML = counter;
        hashModifier(counter);
    });


    const paginationTtile = document.createElement('h2');
    paginationTtile.innerHTML = counter;


    const forwardPaginationButton = document.createElement('button');
    forwardPaginationButton.innerHTML = '➡️';
    forwardPaginationButton.classList.add('paginationButton');

    forwardPaginationButton.addEventListener('click', () => {
        counter++;
        // console.log(counter);
        paginationTtile.innerHTML = counter;
        hashModifier(counter);
    });
    
    div.appendChild(backwardsPaginationButton);
    div.appendChild(paginationTtile);
    div.appendChild(forwardPaginationButton);

    bodyMain.appendChild(div);
}




function hashModifier(page){
    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName, mediaType, pageNumber] = categoryData.split('--');

    const destructuredHash = {
        id: categoryId,
        name: categoryName
    };

    hashLocation(destructuredHash, mediaType, page);
}

function hashLocation(ele, media, page){
    let pageNumber = page > 1 ? page : 1;

    location.hash = `#category=${ele.id}--${ele.name}--${media}--${String(pageNumber)}`;
    queryMediaObject.currentMediaType = `#${media}`;
}


function displayGenresResults(query, data){
    clearHomePage();
    returnButtonGenerator();
    homePageContainerCreator(query, data);
    paginationButtonsCreator();
}  


getMoviesGenres();
getShowsGenres();