const container = document.querySelector('.movies');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const input = document.querySelector('.input');
const btnCloseModal = document.querySelector('.modal__close')
const highLightContainer = document.querySelector('.highlight')
const highlightTitleH1 = document.querySelector('.highlight__title')
const highlightVideoPic = document.querySelector('.highlight__video')
const highlightVideoA = document.querySelector('.highlight__video-link')
const highlightRatingSpan = document.querySelector('.highlight__rating')
const highlightGenresSpan = document.querySelector('.highlight__genres')
const highlightLaunchSpan = document.querySelector('.highlight__launch')
const highlightDescriptionP = document.querySelector('.highlight__description')
const modal = document.querySelector('.modal');
const btnTheme = document.querySelector('.btn-theme');
const body = document.querySelectorAll('body')
const root = document.querySelector(':root')
const logo = document.querySelector('.logo')
const header = document.querySelector('.header')
const divModalGenre = document.querySelector('.modal__genres')
let page = 0;
let flag = "";

async function getMovies(input) {
    try {
        if (!input) {
            return await api.get('/3/discover/movie?language=pt-BR&include_adult=false');
        } else {
            return await api.get(`/3/search/movie?language=pt-BR&include_adult=false&query=${input}`);
        }

    } catch (error) {
        console.log(error);
    }
};

async function createMovieCard(input) {
    const { data: { results } } = await getMovies(input);
    const array = []
    for (const movie of results) {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie');
        movieCard.addEventListener('click', async () => {
            modal.classList.remove('hidden')
            const { data: { genres } } = await api.get(`/3/movie/${movie.id}?language=pt-BR`)

            for (let genre of genres) {
                const modalSpan = document.createElement('span');
                modalSpan.classList.add('modal__genre')
                modalSpan.textContent = genre.name;
                divModalGenre.appendChild(modalSpan)
            }

            const modalTitle = document.querySelector('.modal__title');
            const modalImg = document.querySelector('.modal__img');
            const modalDescriptiom = document.querySelector('.modal__description');
            const modalRating = document.querySelector('.modal__average')

            modalTitle.textContent = movie.title
            modalImg.src = movie.backdrop_path
            modalDescriptiom.textContent = movie.overview
            modalRating.textContent = movie.vote_average
        })

        const movieInfo = document.createElement('div');
        movieInfo.classList.add('movie__info');
        movieCard.appendChild(movieInfo);
        movieCard.style.backgroundImage = `URL(${movie.poster_path})`

        const movieTitle = document.createElement('span');
        movieInfo.appendChild(movieTitle);
        movieTitle.classList.add('movie__title');
        movieTitle.textContent = `${movie.title}`

        const movieRating = document.createElement('span');
        movieInfo.appendChild(movieRating);
        movieRating.classList.add('movie__rating');
        movieRating.textContent = `${movie.vote_average}`

        const movieStars = document.createElement('img');
        movieRating.appendChild(movieStars);
        movieStars.src = "./assets/estrela.svg";
        movieStars.alt = "Estrela";

        array.push(movieCard);
    };
    return array;
};

async function fillMovieCards(input) {
    const allMovies = await createMovieCard(input);
    const movies = [];

    movies.push(allMovies.slice(0, 6))
    movies.push(allMovies.slice(6, 12))
    movies.push(allMovies.slice(12, 18))

    if (container.children.length > 0) {
        for (let i = 0; i < 6; i++) {
            container.removeChild(container.children[0]);
        };
    };

    for (let movie of movies[page]) {
        container.appendChild(movie);
    };
};
fillMovieCards();

btnNext.addEventListener('click', () => {
    if (page !== 2) {
        page++
        fillMovieCards(flag);
    } else {
        page = 0;
        fillMovieCards(flag);
    }
});

btnPrev.addEventListener('click', () => {
    if (page !== 0) {
        page--
        fillMovieCards(flag);
    } else {
        page = 2;
        fillMovieCards(flag);
    };
});

input.addEventListener('keydown', async (event) => {
    if (event.key === "Enter") {
        if (!input.value) {
            page = 0;
            flag = "";
            fillMovieCards();
        } else {
            flag = input.value
            fillMovieCards(flag);
            input.value = "";
        };
    };

    return movies;
});

async function movieOfTheDay() {
    const movieGenres = [];
    const { data: { results } } = await getMovies();
    const { data: { results: trailerResults } } = await api.get(`3/movie/${results[0].id}/videos?language=pt-BR`)
    const { data: { genres } } = await api.get(`/3/movie/${results[0].id}?language=pt-BR`)

    for (let genre of genres) {
        movieGenres.push(genre.name)
    };

    highlightVideoPic.style.backgroundImage = `URL(${results[0].backdrop_path})`
    highlightVideoA.href = `https://www.youtube.com/watch?v=${trailerResults[0].key}`
    highlightTitleH1.textContent = results[0].title;
    highlightRatingSpan.textContent = results[0].vote_average;
    highlightGenresSpan.textContent = movieGenres.join(", ");
    highlightLaunchSpan.textContent = results[0].release_date;
    highlightDescriptionP.textContent = results[0].overview;

    highlightTitleH1.style.cursor = 'pointer'

    return [movieGenres, results]
};
movieOfTheDay();

highlightTitleH1.addEventListener('click', async () => {
    const [movieGenres, results] = await movieOfTheDay();

    modal.classList.remove('hidden')

    const modalTitle = document.querySelector('.modal__title');
    const modalImg = document.querySelector('.modal__img');
    const modalDescriptiom = document.querySelector('.modal__description');
    const modalRating = document.querySelector('.modal__average')

    for (let genre of movieGenres) {
        const modalSpan = document.createElement('span');
        modalSpan.classList.add('modal__genre')
        modalSpan.textContent = genre;
        divModalGenre.appendChild(modalSpan)
    }

    modalTitle.textContent = results[0].title
    modalImg.src = results[0].backdrop_path
    modalDescriptiom.textContent = results[0].overview
    modalRating.textContent = results[0].vote_average
})

btnCloseModal.addEventListener('click', async () => {
    modal.classList.add('hidden');
    const movieGenres = await createMovieCard();
    for (let i = 0; i < movieGenres.length + 1; i++) {
        divModalGenre.removeChild(divModalGenre.children[0])
    };
});



function applyCurrentTheme() {
    const currentTheme = localStorage.getItem("theme");

    if (!currentTheme || currentTheme === "light") {
        btnTheme.src = './assets/dark-mode.svg';
        root.style.setProperty("--background", "rgb(0, 0, 0, 0.9)");
        root.style.setProperty("--text-color", "#fff");
        root.style.setProperty("--input-color", "#665F5F");
        root.style.setProperty("--bg-secondary", "#2D3440");
        header.style.backgroundColor = "rgb(0,0,0,0)"
        btnNext.src = "./assets/arrow-right-light.svg"
        btnPrev.src = "./assets/arrow-left-light.svg"
        btnCloseModal.src = "./assets/close.svg"
        logo.src = "./assets/logo.svg"
        return;
    }

    root.style.setProperty("--background", "#fff");
    root.style.setProperty("--text-color", "#1b2028");
    root.style.setProperty("--input-color", "#979797");
    root.style.setProperty("--bg-secondary", "#ededed");
    btnNext.src = "./assets/arrow-right-dark.svg"
    btnPrev.src = "./assets/arrow-left-dark.svg"
    btnCloseModal.src = "./assets/close-dark.svg"
    logo.src = "./assets/logo-dark.png"
    btnTheme.src = './assets/light-mode.svg';
    return;
};

btnTheme.addEventListener('click', () => {
    const currentTheme = localStorage.getItem("theme")

    if (!currentTheme || currentTheme === "light") {
        localStorage.setItem("theme", "dark");
        applyCurrentTheme();
        return;
    };

    localStorage.setItem("theme", "light");
    applyCurrentTheme();
    return;
})