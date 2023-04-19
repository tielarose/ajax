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

  // TODO: show the result message after your form
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
      document.querySelector("#order-status").innerHTML = responseJson.msg;
    });

  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector("#order-form").addEventListener("submit", orderMelons);
