import {run} from './index.mjs'


function navigator(){
    console.log({location});

    location.hash.startsWith('#trends') ? trendsPage() :
    location.hash.startsWith('#search=') ? searchPage() :
    location.hash.startsWith('#movie=') ? movieDetailsPage() :
    location.hash.startsWith('#category=') ? categoriesPage() :
    homePage();
}

function trendsPage(){
    console.log('Trends')
}

function searchPage(){
    console.log('Search')
}

function movieDetailsPage(){
    console.log('Movie')
}

function categoriesPage(){
    console.log('Categories')
}

function homePage(){
    console.log('Home page');

    run()
}

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);