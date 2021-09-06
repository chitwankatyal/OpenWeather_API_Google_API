/*
Assignment 6
Submitted By: Chitwan Katyal
Student ID: 301169422
COMP125-002
*/


"use strict";

 //To get weather for the city that user enters
function getWeather(city)
{
    var apiCall = "https://api.openweathermap.org/data/2.5/weather";
    const apiKey = "6e9590afbbc344ada3a83223cd7a669c";

    var url = apiCall + "?q=" + city + "&units=metric&appid=" + apiKey;
   
    //Creating XMLHttp object
    const xhr = new XMLHttpRequest();

    //Adding load event for the object
    if (xhr.addEventListener)
    {
        xhr.addEventListener("load", handleOutput);
    }
    else if (xhr.attachEvent)
    {
        xhr.attachEvent("onload", handleOutput);
    }
    xhr.responseType = "json";

    xhr.open("GET", url, true);
    xhr.send();
}

function handleOutput()
{
    if (this.status == 200)
    {
        console.log(this.response);
        const data = this.response;

        var html = "<p> City: " + data.name + "</p>";
        html += "<p>Current Temperature: " + data.main.temp + "°C" + "</p>";
        html += "<p>Feels Like: " + data.main.feels_like + "°C" + "</p>";
        html += "<p> Humidity: " + data.main.humidity + "%" + "</p>";
        html += "<p> Description: " + data.weather[0].description.toUpperCase() + "</p>";

        document.getElementById("forecastInfo").innerHTML = html;
    }
    else 
    {
        document.getElementById("forecastInfo").innerHTML = "<p> Weather information unavailable </p>";
    }
}
function getInfo()
{
    var cityName = document.getElementById("cityName").value;
    getWeather(cityName);
}

//Event handler for forecast button
var forecast = document.getElementById("forecast");
if(forecast.addEventListener)
{
    forecast.addEventListener("click", getInfo);
}
else if(forecast.attachEvent)
{
    forecast.attachEvent("onclick", getInfo);
}


// Maps
var waitForUser;

if (typeof google !== 'object') {
    var script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCJEZCDBHikcdXC4jpmm-e-BLDRnBCQZrw&callback=geolocationTest";
    document.body.appendChild(script);
}

function geolocationTest() {
 waitForUser = setTimeout(failToAccess, 10000);
 if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(createDirections, failToAccess, {timeout: 10000});
 } else {
    failToAccess();
 }
}

function createDirections(position) {
 clearTimeout(waitForUser);

 var currentPosLat = position.coords.latitude;
 var currentPosLng = position.coords.longitude;
 var posOptions = {
    center: {lat: currentPosLat, lng: currentPosLng},
    zoom: 11
};
   // Create Map
   var map = new google.maps.Map(document.getElementById("map"), posOptions);
   
   // Marker
   var marker = new google.maps.Marker({
      position: {lat: currentPosLat, lng: currentPosLng},
      map: map
   });
}
function failToAccess() {
 document.getElementById("map").innerHTML = "Sorry! Could not access your current location.";
}