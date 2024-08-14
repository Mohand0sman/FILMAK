// const api_key = 'xxx';
// const base_url = 'https://api.themoviedb.org/3/discover/movie';

const api_key = 'cd9da9f78d9c4399dc6fb81de22f942f';
const access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDlkYTlmNzhkOWM0Mzk5ZGM2ZmI4MWRlMjJmOTQyZiIsInN1YiI6IjY1N2RjM2U0Njc4MjU5MDZjYjQyMjcxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pxVswgDl4qoj12qO8BQvx0Ojj6E4PUU8ZriuvsHmGxU';

const base_url = 'https://api.themoviedb.org/3';
const base_img = 'https://image.tmdb.org/t/p/w500';
const get_movie = '/discover/movie';
// const fetch = require('node-fetch');

const options = {
    method:'GET',
    headers: {
        accept: 'application/json',
        authorization:`Bearer ${access_token}`
    }
}
const serch_form = document.getElementById('search_form');
const search_results_section = document.querySelector('.search-results-section');
search_results_section.style.display = 'none';
serch_form.addEventListener('submit',function(e)  {
    e.preventDefault();
    const url = `${base_url}/search/movie?query=${this.search.value}&language=en-US`;
    const search_result = document.querySelector('.search-result');
    fetch(url,options)
    .then(res => res.json())
    .then(json => {
        search_results_section.style.display = 'block';
        search_result.innerHTML = '';
        (json.results).map(result => {
            search_result.innerHTML += 
            `
            <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
            <div class="custom-block custom-block-overlay">
                <a href="detail-page.html" class="custom-block-image-wrap">
                    <img src="${base_img}${result.poster_path}" class="custom-block-image img-fluid" alt="">
                </a>
    
                <div class="custom-block-info custom-block-overlay-info">
                    <h5 class="mb-1">
                        <a href="listing-page.html">
                            ${result.original_title}
                        </a>
                    </h5>
    
                    <p class="badge mb-0">50 Episodes</p>
                    </div>
                </div>
            </div>
            `
        })
    })
})


async function featchMovie(url) {
    const response = await fetch(url);
    const data = await response.json();
    setCarousel(data.results)
    getmovieDitalis(data.results)
}

function getmovieDitalis(movies){
    let movies_url = [];
    const latest_ep = document.querySelector('.latest');
    movies.map(movie => {
        const url= `${base_url}/movie/${movie.id}`;
        movies_url.push(url);
        // .catch(err => cconsole.error('error' + err))
    })
    const movies_url_to_fetch = movies_url.slice(2,8);
    movies_url_to_fetch.forEach((url)=>{
        fetch(url,options)
        .then(res => res.json())
        .then(json => {
            // console.log(json)
            latest_ep.innerHTML += `
            <div class="col-lg-4 col-12 mb-5 mb-lg-0">
            <div class="custom-block d-flex">
                <div class="">
                    <div class="custom-block-icon-wrap">
                        <div class="section-overlay"></div>
                        <a href="detail-page.html" class="custom-block-image-wrap">
                            <img src="${base_img}${json.poster_path}" class="custom-block-image img-fluid" alt="">

                            <a href="#" class="custom-block-icon">
                                <i class="bi-play-fill"></i>
                            </a>
                        </a>
                    </div>
                </div>

                <div class="custom-block-info">
                    <h5 class="mb-2">
                        <a href="detail-page.html">
                            ${json.original_title}
                        </a>
                    </h5>

                    <div class="profile-block d-flex">
                        <img src="${base_img}${json.production_companies[0].logo_path}" class="profile-block-image img-fluid" alt="">

                        <p>
                            ${json.production_companies[0].name}
                            <img src="images/verified.png" class="verified-image img-fluid" alt="">
                            <strong>${json.production_companies[0].origin_country}</strong></p>
                    </div>

                    <p class="mb-0">${json.tagline}</p>
                </div>
            </div>
        </div>
            `
        })
    })
}
function setCarousel(movies){
    const carousel = document.querySelector('.owl-carousel');
    movies.map( movie => {
        const movie_split = (movie.original_title).split(' ').slice(0, 3).join(' ')
        carousel.innerHTML += `
        <div class="owl-carousel-info-wrap item">
        <img src=${base_img}${movie.poster_path} class="owl-carousel-image img-fluid" alt="">
        <img src="images/${movie.adult  ? 'icon_18' : 'verified'}.png" class="owl-carousel-verified-image img-fluid" alt="">


        <div class="owl-carousel-info">
            <h6 class="mb-2">${movie_split}</h6>

            <span class="badge">${movie.original_language}</span>

            <span class="badge">${movie.release_date}</span>
        </div>


    </div> 
        
        `;
    });
    $('.owl-carousel').owlCarousel({
        center: true,
        loop: true,
        margin: 30,
        autoplay: false,
        responsiveClass: true,
        responsive:{
            0:{
                items: 2,
            },
            767:{
                items: 3,
            },
            1200:{
                items: 4,
            }
        }
    });

}
const api_url = `${base_url}/${get_movie}?api_key=${api_key}`;
featchMovie(api_url);
