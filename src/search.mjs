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

const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', hashLocation);

export function hashLocation(){
    location.hash = `#search=${searchBar.value}`;
}

async function getMovieSearchResults(){
    let searchQuery = searchBar.value;

    const {data} = await api(`/search/movie`, {
        params: {
            query: searchQuery
        }
    });

    data.results.map((ele) => {
        ele.media_type = `movie`;
    })

    console.log(data.results);
    homePageContainerCreator(`Movie results for: ${searchQuery}`, data.results);
}

async function getShowSearchResults(){
    let searchQuery = searchBar.value;

    const {data} = await api(`/search/tv`, {
        params: {
            query: searchQuery
        }
    });

    data.results.map((ele) => {
        ele.media_type = `tv`;
    })

    console.log(data.results);
    homePageContainerCreator(`TV shows results for: ${searchQuery}`, data.results);
}



export function displaySearchResults(){
    getMovieSearchResults();
    getShowSearchResults();
    clearHomePage();
    returnButtonGenerator();

}