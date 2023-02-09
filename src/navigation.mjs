import {runHomePage} from './index.mjs';
import {runMediaDetailsPage} from './mediaDetails.mjs';
import {getGenresResults} from './genres.mjs';
import {displaySearchResults} from './search.mjs';


function navigator(){
    location.hash.startsWith('#movie=') ? mediaDetailsPage() :
    location.hash.startsWith('#tv=') ? mediaDetailsPage() :
    location.hash.startsWith('#category=') ? categoriesPage() :
    location.hash.startsWith('#search=') ? searchPage() :
    homePage();
}

function mediaDetailsPage(){
    const [_, id] = location.hash.split('=');

    runMediaDetailsPage(id);
}

function categoriesPage(){
    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName, mediaType, pageNumber] = categoryData.split('--');

    getGenresResults(categoryId, categoryName, mediaType, pageNumber);
}

function searchPage(){
    displaySearchResults();
}

function homePage(){
    runHomePage();
}

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);