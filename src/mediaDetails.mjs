import {API_KEY} from "./secrets.mjs";
import {homePageContainerCreator} from "./index.mjs";

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


async function getMediaDetails(id){
    const {data} = await api(`/${hashLocation()}/${id}`);
    
    returnButtonGenerator();
    showMediaDetails(data);
}

async function getSimilarMedia(id){
    const {data} = await api(`/${hashLocation()}/${id}/similar`);

    homePageContainerCreator('Similar content', data.results)
}

function hashLocation(){
    return location.hash.includes('movie') ? 'movie' : 'tv';
}

export function clearHomePage(){
    bodySectionContainer.innerHTML = '';
    bodySectionContainer.classList = '';

    bodyMain.innerHTML = '';
    bodyMain.classList = '';
}



export function returnButtonGenerator(){
    const div = document.createElement('div');

    const button = document.createElement('button');
    button.innerHTML = '🔙';
    button.classList.add('returnButton')

    button.addEventListener('click', () => {
        history.back();
    })

    div.appendChild(button);
    bodySectionContainer.appendChild(div);
}

function showMediaDetails(data){
    const imagesPosterURL = 'https://image.tmdb.org/t/p/w300';

    const div = document.createElement('div');
    div.classList.add('mediaDetailsContainer');

    const mediaDetailsDiv = document.createElement('div');
    div.classList.add('mediaDetailsContainer');


    const mediaMetaData = document.createElement('ul');
    mediaMetaData.classList.add('mediaDetailsContainer');


    const mediaVoteAverage = `⭐ ${data.vote_average.toFixed(1)}`;
    const listVoteAverage = document.createElement('li');
    listVoteAverage.innerHTML = mediaVoteAverage;
    mediaMetaData.appendChild(listVoteAverage);

    const mediaRuntime = hashLocation() == 'movie' ?
        `⏱️ ${data.runtime}` :
        `⏱️ ${data.episode_run_time} * 📺 ${data.number_of_episodes}`;
    const listRuntime = document.createElement('li');
    listRuntime.innerHTML = mediaRuntime;
    mediaMetaData.appendChild(listRuntime);

    const mediaReleaseDate = hashLocation() == 'movie' ?
        `📅 ${data.release_date.split('-')[0]}` :
        `📅 ${data.first_air_date.split('-')[0]}`;
    const listReleaseDate = document.createElement('li');
    listReleaseDate.innerHTML = mediaReleaseDate;
    mediaMetaData.appendChild(listReleaseDate);


    const title = document.createElement('h1');
    title.innerHTML = `${data.title || data.name}`

    const description = document.createElement('p');
    description.innerHTML = `${data.overview}`;

    const mediaGenres = data.genres.map((ele) => {
        return ` ${ele.name}`
    })
    const genres = document.createElement('h2');
    genres.innerHTML = `Genres: ${mediaGenres}`;
    genres.classList.add('mediaDetailsContainer');


    const mediaPosterImage = document.createElement('img');
    mediaPosterImage.src = `${imagesPosterURL}${data.poster_path}`;


    mediaDetailsDiv.appendChild(mediaMetaData);
    mediaDetailsDiv.appendChild(title);
    mediaDetailsDiv.appendChild(description);
    mediaDetailsDiv.appendChild(genres);

    div.appendChild(mediaDetailsDiv);
    div.appendChild(mediaPosterImage);
    bodySectionContainer.appendChild(div);
}


export function runMediaDetailsPage(id){
    clearHomePage();
    getMediaDetails(id);
    getSimilarMedia(id);
}