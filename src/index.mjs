import {API_KEY} from "./secrets.mjs";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY
    }
});

const bodySectionContainer = document.getElementById('bodySectionContainer');
const bodyMain = document.getElementById('bodyMain');

export const queryMediaObject = {
    tv: {
        'Trending TV shows': '/trending/tv/week',
        'TV shows now playing': '/tv/on_the_air',
        'Upcoming TV shows': '/tv/airing_today',
        'Top rated TV shows': '/tv/top_rated'
    },
    movies: {
        'Trending Movies': '/trending/movie/week',
        'Movies now playing': '/movie/now_playing',
        'Upcoming movies': '/movie/upcoming',
        'Top rated movies': 'movie/top_rated'
    },
    currentMediaType: '#movie'
}


function mediaOptions(moviesMediaOption, showsMediaOption){
    if(moviesMediaOption.disabled == true){
        moviesMediaOption.disabled = false;
        showsMediaOption.disabled = true;
        getMedia(queryMediaObject.tv);
        queryMediaObject.currentMediaType = '#tv';
        console.log(queryMediaObject.currentMediaType)
    }else{
        moviesMediaOption.disabled = true;
        showsMediaOption.disabled = false; 
        getMedia(queryMediaObject.movies);
        queryMediaObject.currentMediaType = '#movie';
        console.log(queryMediaObject.currentMediaType)
    }
}

async function getMedia(media){
    bodyMain.innerHTML = '';

    const mediaOrder = Object.keys(media);
    const mediaQueries = Object.entries(media);
    
    const promises = mediaQueries.map(async ([query, urlQuery]) => {
        const {data} = await api(urlQuery);
        const results = await data.results;
        return {query, results};
    });
    
    const dataArray = await Promise.all(promises);
    
    dataArray.sort((a, b) => {
        return mediaOrder.indexOf(a.query) - mediaOrder.indexOf(b.query);
    });
    
    dataArray.forEach(({query, results}) => {
        homePageContainerCreator(query, results);
    });
}


function homePageWelcomeMessageGenerator(){
    bodySectionContainer.innerHTML = '';
    const sectionLandingMessage = document.createElement('section');
    sectionLandingMessage.classList.add('sectionLandingMessage');
    const div = document.createElement('div');

    const title = document.createElement('h1');
    title.innerHTML = 'Welcome';
    const subtitle = document.createElement('p');
    subtitle.innerHTML = 'Find all movies and TV shows details here';

    div.appendChild(title);
    div.appendChild(subtitle);
    sectionLandingMessage.appendChild(div);
    bodySectionContainer.appendChild(sectionLandingMessage);
}

function homePageButtonsMediaOption(){
    const sectionButtonOptions = document.createElement('section');
    sectionButtonOptions.classList.add('sectionButtonOptions');

    const moviesMediaOption = document.createElement('button');
    moviesMediaOption.classList.add('buttonGenreOptions');
    moviesMediaOption.innerHTML = 'Movies';
    moviesMediaOption.id = 'moviesMediaOption';
    moviesMediaOption.disabled = true;

    const showsMediaOption = document.createElement('button');
    showsMediaOption.classList.add('buttonGenreOptions');
    showsMediaOption.innerHTML = 'TV shows';
    showsMediaOption.id = 'showsMediaOption';


    moviesMediaOption.addEventListener('click', () => {
        mediaOptions(moviesMediaOption, showsMediaOption)
    });

    showsMediaOption.addEventListener('click', () => {
        mediaOptions(moviesMediaOption, showsMediaOption)
    });

    sectionButtonOptions.appendChild(moviesMediaOption);
    sectionButtonOptions.appendChild(showsMediaOption);

    bodySectionContainer.appendChild(sectionButtonOptions);
}


export function homePageContainerCreator(query, data){ 
    const section = document.createElement('section');

    const title = document.createElement('h1');
    title.innerHTML = query;
    section.appendChild(title);
    bodyMain.appendChild(section);

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('divContainers');

    data.map((ele) => {
        imageContainerCreator(ele, imageContainer)
    });

    bodyMain.appendChild(imageContainer);
}

export function imageContainerCreator(ele, parent){
    const imagesPosterURL = 'https://image.tmdb.org/t/p/w300';
    // console.log(ele)

    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movieContainer');
    
    const movieImage = document.createElement('img');
    movieImage.alt = ele.title ? ele.title : ele.name;
    movieImage.src = `${imagesPosterURL}${ele.poster_path}`;
    movieImage.addEventListener('click', () => {
        queryMediaObject.currentMediaType = ele.media_type ? `#${ele.media_type}` : queryMediaObject.currentMediaType;
        console.log(queryMediaObject.currentMediaType);
        hashLocation(ele.id);
    });

    movieImage.addEventListener('error', () => {
        movieImage.src = '../media/movieIcon.png';
        movieImage.style.opacity = .1;
    })

    movieContainer.appendChild(movieImage);
    parent.appendChild(movieContainer);
}

function hashLocation(id){
    location.hash = `${queryMediaObject.currentMediaType}=${id}`;
}


export function runHomePage(){
    homePageWelcomeMessageGenerator();
    homePageButtonsMediaOption();
    getMedia(queryMediaObject.movies);
    queryMediaObject.currentMediaType = '#movie';
}