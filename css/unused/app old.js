// This sample uses the Place Autocomplete widget to allow the user to search
// for and select a place. The sample then displays an info window containing
// the place ID and other information about the place that the user has
// selected.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 43.5510846, lng: 9.9936818 },
    zoom: 3,
    mapTypeId: 'hybrid',
    disableDefaultUI: true,
  });

  const inputOptions = {
    // types: ['establishment'],
    types: ['(regions)'],
    // componentRestrictions: { country: 'us' },
  };
  const input = document.getElementById('pac-input');
  const autocomplete = new google.maps.places.Autocomplete(input, inputOptions);
  autocomplete.bindTo('bounds', map);
  // Specify just the place data fields that you need.
  // autocomplete.setFields(['place_id', 'geometry', 'name']);
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(input);
  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);
  const marker = new google.maps.Marker({ map: map });
  marker.addListener('click', () => {
    infowindow.open(map, marker);
  });
  autocomplete.addListener('place_changed', () => {
    infowindow.close();
    const place = autocomplete.getPlace();

    if (!place.geometry) {
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    // Set the position of the marker using the place ID and location.
    marker.setPlace({
      placeId: place.place_id,
      location: place.geometry.location,
    });
    marker.setVisible(true);
    infowindowContent.children.namedItem('place-name').textContent = place.name;
    infowindowContent.children.namedItem('place-id').textContent =
      place.place_id;
    infowindowContent.children.namedItem('place-address').textContent =
      place.formatted_address;
    console.log(place);
    // getInfo(place.place_id, input.value);
    // infowindow.open(map, marker);
    storeResult(place, input.value);
    printResult(place, input.value);
  });
}

function storeResult(place, inputName) {
  const name = place.name;
  const coords = place.geometry.location;
  const img = place.photos[0].getUrl();
  const utc_offset = place.utc_offset_minutes;

  const placeObject = {
    inputName,
    name,
    coords,
    img,
    utc_offset,
  };

  const stringifiedPlace = JSON.stringify(placeObject);
  // console.log(stringifiedPlace);
  localStorage.setItem(name, stringifiedPlace);

  // console.log(placeName, placeCoords, placeImg);
}

const resultContainer = document.getElementById('resultContainer');
const watchContainer = document.getElementById('watchContainer');

function printResult(currentLocation, enteredPlaceName) {
  // console.log(result);
  resultContainer.innerHTML = '';
  const element = document.createElement('div');
  const result = `
           <p>You entered: ${enteredPlaceName}</p>
            <p>Google calls it: ${currentLocation.formatted_address}</p>
            <p>search for: ${currentLocation.name}</p>
            
            <p>${watch(currentLocation.utc_offset_minutes)}</p>
            <h4>Adresse: ${currentLocation.geometry.location}<h4>
            <img src=${currentLocation.photos[0].getUrl()}>
            <img src=${currentLocation.photos[1].getUrl()}>
            <img src=${currentLocation.photos[2].getUrl()}>
            <img src=${currentLocation.photos[3].getUrl()}>
            <img src=${currentLocation.photos[4].getUrl()}>
            <img src=${currentLocation.photos[5].getUrl()}>
            <img src=${currentLocation.photos[6].getUrl()}>
            <img src=${currentLocation.photos[7].getUrl()}>
            <img src=${currentLocation.photos[8].getUrl()}>
            <img src=${currentLocation.photos[9].getUrl()}>
            `;
  console.log(currentLocation.photos[1].getUrl());
  setInterval(watch, 1000);
  element.innerHTML = result;
  resultContainer.appendChild(element);
}

// setInterval(watch, 1000);
// watch(0);

function watch(offset) {
  const now = new Date();
  // console.log(now);

  const seconds = now.getUTCSeconds();
  //   const secondsDegrees = ((seconds / 60) * 360) + 90;
  //   secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const mins = now.getUTCMinutes();
  //   const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
  //   minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hour = now.getUTCHours();
  //   const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
  //   hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  const time = now.getTime();

  // console.log(hour, mins, seconds, time);
  watchContainer.innerHTML = `${hour}:${mins}:${seconds}`;
  return `${hour}:${mins}:${seconds} - ${offset} - ${time}`;
}
