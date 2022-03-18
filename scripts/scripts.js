//api key
const myNasa = '4x6hmYdQ0FD2bntNfgOclrkdWcLguZFjdXdq0T7m';

//function to round data decimals
const round = (value, decimals) => {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

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




//near earth object data request

const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Form has been submitted");

    //configure fetch url
    const formRequest = document.getElementById("searchDate");
    const dateChosen = formRequest.value;
    const neoSearchUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${dateChosen}&end_date=${dateChosen}&api_key=${myNasa}`;


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

        for (const asteroid of neoArray) {

            //create a table row for each object found in the array
            const rowElement = document.createElement("tr");
            
            //get the data i want from the neoArray Object
            const approachDate = asteroid.close_approach_data[0].close_approach_date_full;
            const missDistance = asteroid.close_approach_data[0].miss_distance.miles;
            const relVelocity = asteroid.close_approach_data[0].relative_velocity.miles_per_hour;
            const diameterMin = asteroid.estimated_diameter.feet.estimated_diameter_min;
            const diameterMax = asteroid.estimated_diameter.feet.estimated_diameter_max;
            const isHazard = asteroid.is_potentially_hazardous_asteroid;

            //round all the insane numbers to two decimal places
            const missDist = round(missDistance, 2);
            const relVel = round(relVelocity, 2);
            const dMin = round(diameterMin, 2);
            const dMax = round(diameterMax, 2);
            const diameterEst = `${dMin} - ${dMax}`;

            //layout the five table data pieces for our row
            const cellElement1 = document.createElement("td"); //1 of 5
            cellElement1.textContent = approachDate;
            rowElement.appendChild(cellElement1);

            const cellElement2 = document.createElement("td"); //2 of 5
            cellElement2.textContent = diameterEst;
            rowElement.appendChild(cellElement2);

            const cellElement3 = document.createElement("td"); //3 of 5
            cellElement3.textContent = missDist;
            rowElement.appendChild(cellElement3);

            const cellElement4 = document.createElement("td"); //4 of 5
            cellElement4.textContent = relVel;
            rowElement.appendChild(cellElement4);

            const cellElement5 = document.createElement("td"); //5 of 5
            cellElement5.textContent = isHazard;
            rowElement.appendChild(cellElement5);
            

            tableBody.appendChild(rowElement); //finally add the row to the table

        }


    });
});

    
