"use strict";

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  fetch("/fortune")
    .then((response) => response.text())
    .then((responseData) => {
      document.querySelector("#fortune-text").innerHTML = responseData;
    });
}

document
  .querySelector("#get-fortune-button")
  .addEventListener("click", showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const zipcode = document.querySelector("#zipcode-field").value;
  const queryString = new URLSearchParams({ zipcode: zipcode }).toString();
  const url = `/weather.json?${queryString}`;

  fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      document.querySelector("#weather-info").innerHTML = responseData.forecast;
    });
}

document.querySelector("#weather-form").addEventListener("submit", showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  const formInputs = {
    qty: document.querySelector("#qty-field").value,
    melon_type: document.querySelector("#melon-type-field").value
  };

  fetch("/order-melons.json", {
    method: "POST",
    body: JSON.stringify(formInputs),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.code === "ERROR") {
        document.querySelector("#order-status").classList.add("order-error");
      } else {
        document.querySelector("#order-status").classList.remove("order-error");
      }
      document.querySelector("#order-status").innerHTML = `<p>${
        responseJson.msg
      }</p>`;
    });
}
document.querySelector("#order-form").addEventListener("submit", orderMelons);

function getDogImg(evt) {
  evt.preventDefault();

  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json())
    .then((responseData) => {
      document.querySelector("#display-dog-image").innerHTML = `<img src=${
        responseData.message
      } alt="this is a cute dog photo">`;
    });
}

document.querySelector("#get-dog-image").addEventListener("click", getDogImg);
