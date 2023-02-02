import {runHomePage} from './index.mjs';
import {runMediaDetailsPage} from './mediaDetails.mjs';


function navigator(){
    location.hash.startsWith('#movie=') ? mediaDetailsPage() :
    location.hash.startsWith('#tv=') ? mediaDetailsPage() :
    location.hash.startsWith('#category=') ? categoriesPage() :
    homePage();
}

function mediaDetailsPage(){
    const [_, id] = location.hash.split('=');

    runMediaDetailsPage(id);
}

function categoriesPage(){
    console.log('Categories');
}

function homePage(){
    // console.log('Home page');
    runHomePage();
}

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);