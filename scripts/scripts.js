//api key
const myNasa = '4x6hmYdQ0FD2bntNfgOclrkdWcLguZFjdXdq0T7m';

//image of day variables
let nasa_img = document.getElementById('nasa_img');
let img_description = document.getElementById('nasa_img_description');

//image of the day data request
fetch('https://api.nasa.gov/planetary/apod?api_key=' + myNasa)
.then(response => {
    return response.json();
})
.then(data => {
    nasa_img.innerHTML = `<img src="${data.hdurl}" class="img-fluid"/>`;
    img_description.innerHTML = `<p>${data.explanation}</p>`
});


//getting appropriate boundaries for the date field
let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth();
    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("searchDate").setAttribute("max", today);


//near earth object data request

let searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Form has been submitted");

    //configure fetch url
    let formRequest = document.getElementById("searchDate");
    let dateChosen = formRequest.value;
    let neoSearchUrl = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + dateChosen + '&end_date=' + dateChosen + '&api_key=' + myNasa;


    //clear table body
    const table = document.querySelector("table");
    const tableBody = table.querySelector("tbody");
    tableBody.innerHTML = "";
    
    
    //perform fetch with configured url
    fetch(neoSearchUrl)
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(data => {
        console.log(data);
        //variables for table population
        const neoArray = data.near_earth_objects[dateChosen];
        console.log(neoArray.length);

        //populate table body

        /*for (let i = 0; i < neoArray.length; i++) {
            const rowElement = document.createElement("tr");
            
            for (let k = 0; k < 5; k++)




        }*/


    });
});

    
