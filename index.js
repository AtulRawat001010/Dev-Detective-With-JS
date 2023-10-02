let url = "https://api.github.com/users/";

let submitBtn = document.querySelector(".searchBtn");
let input = document.querySelector("input");
let searchForm = document.querySelector(".searchForm");
let user_info = document.querySelector(".user-info");

let lightmode = document.querySelector(".modeBtn1");
let enableDark = document.querySelector(".modeBtn2");

let appMode = document.querySelector(".app");

let appdarkMode = false;

start();

function start() {
    if(localStorage.dark_mode){
        darkMode();
    }

    if(localStorage.light_mode){
        lightMode();
    }
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
        }catch (error) {
            console.log("this Error occured at fetchdata Function", error);
        }
    }
}

// async function searchUser() {
//     if (!input.value == "") {
//         console.log(input.value);
//         try {
//             let gitUrl = (url + input.value);
//             let res = await fetch(gitUrl);

//             let data = await res.json();
//             console.log(data);
//         }
        
//         catch (error) {
//             console.log("Error is here", error);
//         }
//     }

//     else{
//         console.log("nahi chalra hai");
//     }
// }




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