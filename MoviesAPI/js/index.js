getMovies("now_playing");

//side bar
let sideBar = $("#sideBar").innerWidth();
let sideNav = $("#sideNav").innerWidth();
$("#sideBar").css("left",`-${sideBar}`);
$("#sideNav").css("left",`0`);
$("#toggle-icon").click(function () {
    if($("#sideBar").css("left") == "0px"){
        $("#sideBar").animate({left:`-${sideBar}`} , 500);
        $("#sideNav").animate({left:`0`} , 500);
        $("#toggle-icon").html(`<i class="fa fa-align-justify"></i>`);  
        setTimeout(() => {
            $("#conc").animate({ top: "300px"}, 100);
        }, 100);
        setTimeout(() => {
            $("#upcoming").animate({ top: "300px"}, 100);
        }, 100); 
        setTimeout(() => {
            $("#trending").animate({ top: "300px"}, 100);
        }, 100); 
        setTimeout(() => {
            $("#topRated").animate({ top: "300px"}, 100);
        }, 100); 
        setTimeout(() => {
            $("#popular").animate({ top: "300px"}, 100);
        }, 100); 
        setTimeout(() => {
            $("#nowPlaying").animate({ top: "300px"}, 100);
        }, 100);  
    }
    else{
        $("#sideBar").animate({left:`0px`} , 500);
        $("#sideNav").animate({left:`${sideBar}`} , 500);
        $("#toggle-icon").html(`<i class="fa fa-align-justify fa-times"></i>`);
        setTimeout(() => {
            $("#nowPlaying").animate({ top: "0px"}, 500);
        }, 200); 
        setTimeout(() => {
            $("#popular").animate({ top: "0px"}, 500);
        }, 300); 
        setTimeout(() => {
            $("#topRated").animate({ top: "0px"}, 500);
        }, 400); 
        setTimeout(() => {
            $("#trending").animate({ top: "0px"}, 500);
        }, 500); 
        setTimeout(() => {
            $("#upcoming").animate({ top: "0px"}, 500);
        }, 600); 
        setTimeout(() => {
            $("#conc").animate({ top: "0px"}, 500);
        }, 700);        
    }
});

//get data from api
let allMovies = [];

//get all movies
async function getAll (searchTerm) {
    let apiResponse = await fetch (`https://api.themoviedb.org/3/search/movie?api_key=eeb6588e68f755dcbb01286e825552dc&language=en-US&query=${searchTerm}&include_adult=false`);
    let finalResult = await apiResponse.json();
    allMovies = finalResult.results;
    displayMovies ();
}

//get categorized movies
async function getMovies (searchTerm) {
    let apiResponse = await fetch (`https://api.themoviedb.org/3/movie/${searchTerm}?api_key=eeb6588e68f755dcbb01286e825552dc&language=en-US&page=1`);
    let finalResult = await apiResponse.json();
    allMovies = finalResult.results;
    displayMovies ();
}

//get trending
async function getTrending () {
    let apiResponse = await fetch (`https://api.themoviedb.org/3/trending/movie/week?api_key=eeb6588e68f755dcbb01286e825552dc`);
    let finalResult = await apiResponse.json();
    allMovies = finalResult.results;
    displayMovies ();
}

//now playing
$("#nowPlaying").click(function (){
    getMovies("now_playing");
});

//popular

$("#popular").click(function (){
    getMovies("popular");
});

//top rated

$("#topRated").click(function (){
    getMovies("top_rated");
});

//trending

$("#trending").click(function(){
    getTrending();
});

//upcoming

$("#upcoming").click(function (){
    getMovies("upcoming");
});

//display function
function displayMovies (){
    var cartoona = ``;
    for (let i=0; i<allMovies.length; i++){
        cartoona += `
        <div class="col-lg-4 col-md-6 card-item mb-4">
            <div class="card border-0 position-relative ">
                <img src="https://image.tmdb.org/t/p/w500/${allMovies[i].poster_path}" class="card-img-top rounded" alt="...">
                <div class="caption d-flex align-items-center position-absolute px-1 text-center rounded">
                    <div class="caption-inner"">
                        <h2>${allMovies[i].original_title}</h2>
                        <p>${allMovies[i].overview}</p>
                        <p>rate: ${allMovies[i].vote_average}</p>
                        <p>${allMovies[i].release_date}</p>
                    </div>
                </div>
            </div>
        </div>`;
    }
    document.getElementById ("moviesRow").innerHTML = cartoona;
}

//search inputs
let movieInput = document.getElementById("movieSearch");
let searchInput = document.getElementById("categorySearch");
function searchAll (searchTerm){
    getAll(searchTerm);
    var cartoona = ``;
    for (var i=0; i<allMovies.length; i++){
        if (allMovies[i].original_title.toLowerCase().includes(searchTerm.toLowerCase())){
            cartoona += `
            <div class="col-lg-4 col-md-6 card-item mb-4">
                <div class="card border-0 position-relative ">
                    <img src="https://image.tmdb.org/t/p/w500/${allMovies[i].poster_path}" class="card-img-top rounded" alt="...">
                    <div class="caption d-flex align-items-center position-absolute px-1 text-center rounded">
                        <div class="caption-inner"">
                            <h2>${allMovies[i].original_title}</h2>
                            <p>${allMovies[i].overview}</p>
                            <p>rate: ${allMovies[i].vote_average}</p>
                            <p>${allMovies[i].release_date}</p>
                        </div>
                    </div>
                </div>
            </div>`;   
        }
    }
    document.getElementById("moviesRow").innerHTML = cartoona;
}
$("#movieSearch").keyup(function(){
    searchAll(movieInput.value);   
});

function searchByCategory (searchTerm){
    var cartoona = ``;
    for (var i=0; i<allMovies.length; i++){
        if (allMovies[i].original_title.toLowerCase().includes(searchTerm.toLowerCase())){
            cartoona += `
            <div class="col-lg-4 col-md-6 card-item mb-4">
                <div class="card border-0 position-relative ">
                    <img src="https://image.tmdb.org/t/p/w500/${allMovies[i].poster_path}" class="card-img-top rounded" alt="...">
                    <div class="caption d-flex align-items-center position-absolute px-1 text-center rounded">
                        <div class="caption-inner"">
                            <h2>${allMovies[i].original_title}</h2>
                            <p>${allMovies[i].overview}</p>
                            <p>rate: ${allMovies[i].vote_average}</p>
                            <p>${allMovies[i].release_date}</p>
                        </div>
                    </div>
                </div>
            </div>`;   
        }
    }
    document.getElementById("moviesRow").innerHTML = cartoona;
}
$("#categorySearch").keyup(function(){
    searchByCategory(searchInput.value);
});


//regex
let nameInput = document.getElementById("nameInput");
let mailInput = document.getElementById("mailInput");
let phoneInput = document.getElementById("phoneInput");
let ageInput = document.getElementById("ageInput");
let passwordInput = document.getElementById("password");
let rePasswordInput = document.getElementById("rePassword");
let submitBtn = document.getElementById("submitBtn");

//name regex
function nameValidation(){
    nameRegex = /^[0-9a-zA-Z]*$/;
    if (nameRegex.test(nameInput.value)){
        $("#nameAlert").fadeOut();
        validateInputs();
    }
    else {
        $("#nameAlert").fadeIn();
    }
}
$("#nameInput").keyup(nameValidation);

//mail regex
function mailValidation(){
    mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (mailRegex.test(mailInput.value)){
        $("#mailAlert").fadeOut();
        validateInputs();
    }
    else {
        $("#mailAlert").fadeIn();
    }
}
$("#mailInput").keyup(mailValidation);

//phone regex
function phoneValidation(){
    phoneRegex = /^(+2)?01[0-9]\s?[0-9]{3}\s?[0-9]{4}$/;
    if (phoneRegex.test(phoneInput.value)){
        $("#phoneAlert").fadeOut();
        validateInputs();
    }
    else {
        $("#phoneAlert").fadeIn();
    }
}
$("#phoneInput").keyup(phoneValidation);

//age regex
function ageValidation(){
    ageRegex = /^[1-9][0-9]?$|^100$/;
    if (ageRegex.test(ageInput.value)){
        $("#ageAlert").fadeOut();
        validateInputs();
    }
    else {
        $("#ageAlert").fadeIn();
    }
}
$("#ageInput").keyup(ageValidation);

//password regex
function passValidation(){
    passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (passRegex.test(passwordInput.value)){
        $("#passwordAlert").fadeOut();
        validateInputs();
    }
    else {
        $("#passwordAlert").fadeIn();
    }
}
$("#password").keyup(passValidation);

//rePassword regex
function rePassValidation(){
    rePassRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (rePassRegex.test(rePasswordInput.value) && rePasswordInput.value == passwordInput.value){
        $("#reAlert").fadeOut();
        validateInputs();
    }
    else {
        $("#reAlert").fadeIn();
    }
}
$("#rePassword").keyup(rePassValidation);

//enable submit button
function validateInputs(){
    var disableButton = false;
    var name = nameInput.value;
    var mail = mailInput.value;
    var phone = phoneInput.value;
    var age = ageInput.value;
    var pass = passwordInput.value;
    var rePass = rePasswordInput.value;
    if(name.length == 0 || mail.length == 0 || phone.length == 0 || age.length == 0 || pass.length == 0 || rePass.length == 0) {
        disableButton = true;
    }
    else {
        disableButton = false;
    }
    $('#submitBtn').attr('disabled', disableButton);
}