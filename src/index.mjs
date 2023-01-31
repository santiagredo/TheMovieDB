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

const moviesMediaOption = document.getElementById('moviesMediaOption');
moviesMediaOption.disabled = true;
moviesMediaOption.addEventListener('click', mediaOptions);

const showsMediaOption = document.getElementById('showsMediaOption');
showsMediaOption.addEventListener('click', mediaOptions);


function mediaOptions(){
    if(moviesMediaOption.disabled == true){
        moviesMediaOption.disabled = false;
        showsMediaOption.disabled = true;
        getTrending('tv');
        getNowPlaying('/tv/on_the_air');
        getUpcoming('/tv/airing_today');
        getTopRated('tv')  
    }else{
        moviesMediaOption.disabled = true;
        showsMediaOption.disabled = false;
        getTrending('movie');
        getNowPlaying('/movie/now_playing');
        getUpcoming('/movie/upcoming');
        getTopRated('movie')   
    }
}

async function getTrending(media){
    const divTrending = document.getElementById('divTrending');
    divTrending.innerHTML = '';

    const {data} = await api(`trending/${media}/week`);
    console.log(data)
    const results = data.results;

    results.map((ele) => {
        imageContainerCreator(ele, divTrending)
    })
};

async function getNowPlaying(media){
    const divNowPlaying = document.getElementById('divNowPlaying'); 
    divNowPlaying.innerHTML = '';

    const {data} = await api(media);

    const results = data.results;

    results.map((ele) => {
        imageContainerCreator(ele, divNowPlaying)
    })
}

async function getUpcoming(media){
    const divUpcoming = document.getElementById('divUpcoming');
    divUpcoming.innerHTML = '';

    const {data} = await api(media);

    const results = data.results;

    results.map((ele) => {
        imageContainerCreator(ele, divUpcoming)
    })   
}

async function getTopRated(media){
    const divTopRated = document.getElementById('divTopRated');
    divTopRated.innerHTML = '';

    const {data} = await api(`/${media}/top_rated`);

    const results = data.results;

    results.map((ele) => {
        imageContainerCreator(ele, divTopRated)
    })  
}


function imageContainerCreator(ele, parent){
    const imagesPosterURL = 'https://image.tmdb.org/t/p/w300';

    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movieContainer');
    
    const movieImage = document.createElement('img');
    movieImage.setAttribute('alt', ele.title);
    movieImage.setAttribute('src', `${imagesPosterURL}${ele.poster_path}`);
    movieImage.addEventListener('click', () => {
        alert(`${ele.title || ele.name} clicked`);
        location.hash = `#movie=${ele.id}`
    })

    movieContainer.appendChild(movieImage);
    parent.appendChild(movieContainer);
}


export function run(){
    getTrending('movie')
    getNowPlaying('/movie/now_playing')
    getUpcoming('/movie/upcoming')
    getTopRated('movie')
};