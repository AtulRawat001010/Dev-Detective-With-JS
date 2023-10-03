let url = "https://api.github.com/users/";

let wrapper = document.querySelector(".wrapper");
let submitBtn = document.querySelector(".searchBtn");
let input = document.querySelector("input");
let searchForm = document.querySelector(".searchForm");
let user_info = document.querySelector(".user-info");

let lightmode = document.querySelector(".modeBtn1");
let enableDark = document.querySelector(".modeBtn2");

let appMode = document.querySelector(".app");

let user_details = document.querySelector(".user-details")

let appdarkMode = false;


function render(data) {
    if(data.message !== "Not Found"){
    let user_img = document.querySelector(".user-img");
    let user_name = document.querySelector(".user-name");
    let user_id = document.querySelector(".user-id");
    let user_desc = document.querySelector(".user-desc");
    let user_joined = document.querySelector(".user-joined");
    let user_repos_data = document.querySelector(".repos-data");
    let user_followers_data = document.querySelector(".followers-data");
    let user_following_data = document.querySelector(".following-data");
    let user_location = document.querySelector(".location");
    let user_page = document.querySelector(".community");
    let user_twitter = document.querySelector(".twitter");
    let user_company = document.querySelector(".company");

    user_img.src = `${data.avatar_url}`;
    
    if (`${data.bio}` !== "null"){
        user_desc.innerText = `${data.bio}`;
    }
    else{
        user_desc.innerText = "this user has no bio";
    }

    user_name.innerText = `${data.login}`;
    user_id.innerText = `@${data.login}`;
    user_id.href = `${data.html_url}`;
    user_joined.innerText = `${data.created_at.split("T").shift()}`;

    user_repos_data.innerText = `${data.public_repos
    }`
    user_followers_data.innerText = `${data.followers}`
    user_following_data.innerText = `${data.following}`
    
    user_location.innerText = data.location == null ? "No location" : `${data.location}`;
    user_page.innerText = data.blog == "" ? "No Page" : `${data.blog}`;
    user_page.href = `${data.blog}`;
    user_twitter.innerText = data.twitter_username == null ? "No Twitter" : `${data.twitter_username}`;
    user_twitter.href = `https://twitter.com/${data.twitter_username}`
    user_company.innerText = data.company == null ? "No Company" : `${data.company}`;
    }

    else{
        console.log("hello annonymous");

        let notFound = document.querySelector(".notFound");
        notFound.classList.add("notFoundClass");
        wrapper.classList.add("deactive");
    }

    
}


start();
function start() {
    if(localStorage.dark_mode){
        darkMode();
    }

    if(localStorage.light_mode){
        lightMode();
    }

    fetchData(input.value = "atulrawat001010");
}


submitBtn.addEventListener('click', fetchData);

async function fetchData() {

    if(input.value !== ""){
        try {
            let inpVal = input.value;
            let fetchData = (url + inpVal);
            console.log(fetchData);
        
            let res = await fetch(fetchData);
            let data = await res.json();
            console.log(data);

            render(data);
        }catch (error) {
            console.log("this Error occured at fetchdata Function", error);
        }
    }
}


enableDark.addEventListener('click', (()=>{
    if(!appMode.classList.contains("activeDarkMode")){
        darkMode();

        localStorage.setItem("dark_mode", true);
        localStorage.removeItem("light_mode");
        appdarkMode = true;
    }

    else{
        lightMode();
    }
}))

lightmode.addEventListener('click', (()=>{
    if(appMode.classList.contains("activeDarkMode")){
        lightMode();

        localStorage.setItem("light_mode", false);
        appdarkMode = false;
        localStorage.removeItem("dark_mode");
    }

    else{
        darkMode();
    }
}))

function darkMode() {
        appMode.classList.add("activeDarkMode");
        user_info.classList.add("activeDarkMode");
        searchForm.classList.add("activeDarkMode");
        input.classList.add("activeDarkMode");
        user_info.classList.add("activeDarkMode");
        enableDark.classList.add("deactive");
        lightmode.classList.add("active");
}

function lightMode() {
        appMode.classList.remove("activeDarkMode");
        user_info.classList.remove("activeDarkMode");
        searchForm.classList.remove("activeDarkMode");
        input.classList.remove("activeDarkMode");
        user_info.classList.remove("activeDarkMode");
        enableDark.classList.remove("deactive");
        lightmode.classList.remove("active");
}


function localStorageMode() {
    if(localStorage[0].dark_mode){
        localStorage.setItem("dark_mode", darkMode);
    }
}