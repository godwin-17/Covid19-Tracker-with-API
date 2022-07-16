// DOM Manipulation
const countryForm = document.querySelector("form");
const information = document.querySelector(".information");
const error = document.querySelector(".error");

const covidURL = "https://covid-api.mmediagroup.fr/v1/cases";

const getCovidData = async (country) => {
  try {
    const query = `?country=${country}`;
  
    const response = await fetch(covidURL + query);
    
    const data = await response.json();
  
    const allData = await data.All;

    error.classList.add("none");
    information.classList.remove("none");
  
    information.innerHTML = `
      <div class="country"><b>Country:</b> ${allData.country}</div>
      <div class="confirmed"><b>Confirmed:</b> ${allData.confirmed}</div>
      <div class="deaths"><b>Deaths:</b> ${allData.deaths}</div>
      <div class="population"><b>Population:</b> ${allData.population}</div>
      <div class="capital-city"><b>Capital city:</b> ${allData.capital_city}</div>
      <div class="location"><b>Location:</b> ${allData.location}</div>
    `;  
  } catch (err) {
    information.classList.add("none");
    error.innerHTML = "Error with API or Typo";
    error.classList.remove("none");
  }
 
}

countryForm.addEventListener("submit", e => {
  e.preventDefault();

  const country = countryForm.country.value.trim();
  countryForm.reset();

  getCovidData(country);
  localStorage.setItem("country", country);
});

if(localStorage.getItem("country")){
  getCovidData(localStorage.getItem("country"));
}