// ==========================================================================
// 2 default values
// ==========================================================================
const blogPosts = [
  {
    name: 'Hamburg',
    coords: { lat: 53.5510846, lng: 9.9936818 },
    postTitle: 'The most beautiful city in the world',
    postDescription: 'This is where i live...',
    rating: '5',
    month: 'May',
    year: '1997',
    postImage1URL:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwK6NLYi-_Ni4ir7MgAkg2DLGuzxv-AiM1x7lmPv0WWDPGWUMR-toZGWOG4o5Vee18oI7RvS2xJEruZUF7giIOb_wbLCDZN-jeXkgTM-eKKhzjsSDoDomfLan5XIT3HxGPsHaeHftCnQEB3EZvVoJdo3cr74q3kjDgAWA9Y_Anyy0LJb&3u900&5m1&2e1&callback=none&key=AIzaSyC6iru9XKYIvVQaPG6oK1sLFBXyeSJkwWs&token=78995',
    postImage2URL:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwINqX6w5Njs_0f-RJ4lP8YCrDvXu0FYmgEUsnU5GfoOZ1jmztUZgc0Td1B4PrS2zff86bojGnKoYMO8YkcTw-r0F-Sq1vYK8jxJZMwPKQ3apAuZeNpdg-b4lPUx-pHo51lul7kJtS_xtyWuEcDglUkb89ncmDRm-M0sV5FeS5ip-tJg&3u3000&5m1&2e1&callback=none&key=AIzaSyC6iru9XKYIvVQaPG6oK1sLFBXyeSJkwWs&token=40008',
    wiki: `Hamburg is the second-largest city in Germany after Berlin and 7th largest city in the European Union with a population of over 1.84 million.One of Germany's 16 federated states, it is surrounded by Schleswig-Holstein to the north and Lower Saxony to the south. The city's metropolitan region is home to more than five million people. Hamburg lies on the River Elbe and two of its tributaries, the River Alster and the River Bille.`,
    utc_offset: 60,
  },
  {
    name: 'Zürich',
    coords: { lat: 47.3768866, lng: 8.541694 },
    postTitle: 'Nice but expensive...',
    postDescription: '',
    rating: '3',
    month: 'May',
    year: '2018',
    postImage1URL:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwJ9T1xf8tVTnBXNyyoq5BUxoE2Y2OdWAB8-wgoOpDwtqFYExQZ4MNcEj71gWaVgtHz4pgmLi2TZR3ZpUL2OaxsoHR1p7KZNJAeAXPKEXCbWPZ4K7PO_r7j7CYmBHXLs-wMXMK8ez8CkWaty-y8TkDFzkd2bhILPHhGieJoMPjlNE1e8&3u640&5m1&2e1&callback=none&key=AIzaSyC6iru9XKYIvVQaPG6oK1sLFBXyeSJkwWs&token=87773',
    postImage2URL:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwKe5ofb0PIf5pwVkbqOuYjkXruaOBHHwFeucMYMt0km9cP8dnRgX-XTz0RyXGRO9miHsjVxbDjJjkuwfSLfz2rhzvR4inOjfYhmaPyQOjoZ8P5fOuAd1W4MWLEiez1oXh8GaWHrV319DwSOXENg2YhjyOT4nfAo_PfSooU9tEIY_nTg&3u4600&5m1&2e1&callback=none&key=AIzaSyC6iru9XKYIvVQaPG6oK1sLFBXyeSJkwWs&token=26593',
    wiki:
      'Zürich is the largest city in Switzerland, and the capital of the canton of Zürich. It is located in north-central Switzerland, at the northwestern tip of Lake Zürich. As of January 2020, the municipality has 434,335 inhabitants, the urban area (agglomeration) 1.315 million (2009), and the Zürich metropolitan area 1.83 million (2011).',
    utc_offset: 60,
  },
];

// ==========================================================================
// HANDLE LOCAL STORAGE
// ==========================================================================

// if LocalStorage is empty -> load default values
function testIfStorageisEmpty() {
  if (getArrayFromLocalStorage() === null) {
    console.error('Local Storage is empty -> loading default');
    localStorage.setItem('allLocations', JSON.stringify(blogPosts));
  }
}
testIfStorageisEmpty();

// reset Local Storage and add default entries
function resetLocalStorage() {
  if (confirm('Reset Local Storage to default! Are you sure?')) {
    localStorage.setItem('allLocations', JSON.stringify(blogPosts));
    window.open('./index.html', '_self');
  }
}

// add one new element to the  localStorage and print all posts
function addToLocalStorage(newElement) {
  array = getArrayFromLocalStorage();
  array.push(newElement);
  pushArrayToLocalStorage(array);
  printAllPosts();
}
// get content of localStorage
function getArrayFromLocalStorage() {
  let array = [];
  array = JSON.parse(localStorage.getItem('allLocations'));
  return array;
}

// set content of localStorage to array
function pushArrayToLocalStorage(array) {
  localStorage.setItem('allLocations', JSON.stringify(array));
}

// erase entry with the number 'id' from localStorage
function eraseEntryFromLocalStorage(id) {
  const array = getArrayFromLocalStorage();
  array.splice(id, 1);
  pushArrayToLocalStorage(array);
  window.open('./index.html', '_self');
}

// ==========================================================================
// GLOBAL variables & Get global elements from dom
// ==========================================================================

const blogContainer = document.getElementById('blogContainer');
const overviewMapContainer = document.getElementById('overviewMap');

const bannerImage = document.getElementById('bannerImage');
const bannerTitle = document.getElementById('bannerTitle');
const bannerButton = document.getElementById('bannerButton');
const bannerLink = document.getElementById('bannerLink');

// input form for new entry -> Submit-Button-> call onSubmit()
const addPostForm = document.getElementById('addPostForm');
addPostForm.addEventListener('submit', onSubmit);

const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', onSubmit);

// maybe not needed ???
const locationIsOk = document.getElementById('locationIsOk');
// ==========================================================================
//  => PRINT OVERVIEW OF ALL POSTS AS CARDS
// ==========================================================================

function printAllPosts() {
  blogContainer.innerHTML = '';
  const allLocations = localStorage.getItem('allLocations');
  allLocationsParsed = JSON.parse(allLocations);
  allLocationsParsed.forEach(printOnePost);
}
printAllPosts();

/* ***** ADD SINGLE POST AS CARD TO DOM ***** */
function printOnePost(element, index) {
  const newArticle = document.createElement('div');
  newArticle.classList.add('blogPost');

  // use descricption text if available, otherwise use wiki:
  let overviewText = element.postDescription || element.wiki;

  // this is the Card:
  newArticle.innerHTML = `
  <div class="overlayButton" id="${index}"></div>
    <div class="blogImage" 
      style="background-image: url(${element.postImage1URL}); 
      width: 100%;
      height: 200px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;">
    </div>
    <div class="blogTextWrapper">
        <h2>${element.name}</h2>
        <h3>${element.postTitle}</h3>
        <p>${overviewText}</p>
    </div>
    <div class="cardBottom">
        <div>
            <svg class="ratingContainer">
              <use xlink:href="#starRating${element.rating}">
            </svg>
        </div>
    </div>
`;

  blogContainer.appendChild(newArticle);

  // overlayButton makes the Card clickable and passes the index of the entry
  const overlayButton = document.getElementById(index);
  overlayButton.addEventListener('click', onClick);
}

// ==========================================================================
//  => IF CARD IS CLICKED: DISPLAY SINGLE POST
// ==========================================================================
function onClick(object) {
  const id = object.srcElement.id;
  const array = JSON.parse(localStorage.getItem('allLocations'));
  const element = array[id];
  blogContainer.innerHTML = '';

  bannerImage.style.backgroundImage = `url(${element.postImage1URL})`;
  bannerButton.innerText = '< Back';
  bannerLink.setAttribute('href', './index.html');
  bannerTitle.innerHTML = element.name;

  window.scrollTo(0, 0);

  const newArticle = document.createElement('div');

  newArticle.classList.add('blogpageArticle');
  // <p id="weatherDisplay">Temperature: </p>

  newArticle.innerHTML = `
  
  

  <div class="blogpageTextWrapper">
  
  <div id="weatherContainer">
    <p>Local Weather</br>
    <span  id="weatherDisplay" class="watchDisplay">--:--:--</span>
    </p>
  </div>
  
  <div id="watchContainer">
    <p>Local Time</br>
    <span class="watchDisplay">--:--:--</span>
    </p>
  </div>

    <h2>${element.name}</h2>
    <div>
        <h3>${element.postTitle}</h3>
        <p>${element.postDescription}</p>
        <p>${element.wiki}</p>
    </div>
    <div>
        <svg class="ratingContainer">
          <use xlink:href="#starRating${element.rating}">
        </svg>
        <p>Visited in ${element.month} ${element.year}</p>
    </div>
    
    <button onclick="eraseEntryFromLocalStorage(${id})">Delete Entry</button>
    <div class="blogpageArticeImage" 
      style="background-image: url(${element.postImage2URL}); 
      width: 75%;
      height: 400px;
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: center;
      margin-bottom: 2rem">
    </div>

  </div>
  <div id="map">map</div>
  <section class="blogpageBottom">
  </section>
`;

  // <div class="">
  //     <input required type="text" value="${element.postTitle}" id="titleEdit" style="width: 100%">
  //     <textarea id="descriptionField" name="post" rows="5" cols="80" style="width: 100%">${element.postDescription}</textarea>
  //     <textarea id="wikiEdit" name="post" rows="5" cols="80" style="width: 100%"
  //         >${element.wiki}</textarea>
  // </div>

  {
    /* <section class="blogpageShare">
<h4>Share this article</h4>
  <div>
      <a href="#">
          <i class="fab fa-facebook-f"></i>
      </a>
      <a href="#">
          <i class="fab fa-twitter"></i>
      </a>
      <a href="#">
          <i class="fab fa-linkedin"></i>
      </a>
  </div>
</section> */
  }

  blogContainer.appendChild(newArticle);
  initMap(element.coords);
  getWeather(element.name);
  setInterval(watch, 1000, element.utc_offset);
}

// add map to SinglePost
// ==========================================================================

function initMap(coords) {
  const mapCenter = coords;
  const options = {
    zoom: 6,
    center: mapCenter,
    mapTypeId: 'hybrid',
    disableDefaultUI: true,
  };
  // The map
  const map = new google.maps.Map(document.getElementById('map'), options);
  const marker = new google.maps.Marker({
    position: mapCenter,
    map: map,
  });
}

// ==========================================================================
// location autocomplete for New Post-Page */
// ==========================================================================

let currentPlace = 'noValidPlace';

function initialize() {
  var options = {
    types: ['(regions)'],
    fields: [
      'geometry',
      'photos',
      'formatted_address',
      'utc_offset_minutes',
      'name',
      'place_id',
    ],
  };
  const input = document.getElementById('searchTextField');
  const autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.addListener('place_changed', () => {
    let place = autocomplete.getPlace();

    // const googleDOMNodes = document.getElementsByClassName('pac-item');

    let googlePlaceID = place.place_id;
    if (googlePlaceID) {
      // => this is a valid location
      // ==========================================================================
      console.log('complete Location');
      // getGoogleInfoByPlaceId(googlePlaceID);
      currentPlace = place;
      // console.log(place);
      getWiki(place.name);
      locationIsValid();
    } else {
      // -> inclomplete location
      // ==========================================================================
      alert('Please select a Location from the list');
    }
  });
}
google.maps.event.addDomListener(window, 'load', initialize);

function locationIsValid() {
  locationIsOk.innerHTML = 'Location is valid';
  searchTextField.setAttribute('disabled', true);
  // searchTextField.style.color = '#111';
  // searchTextField.style.border = '0px';
  // searchTextField.style.paddingLeft = '0px';
  searchTextField.classList.add('fieldDisabled');
  titleField.focus();
  console.log(currentPlace.photos[0].getUrl());
  bannerImage.style.backgroundImage = `url(${currentPlace.photos[0].getUrl()})`;
  bannerTitle.innerHTML = `${currentPlace.name}`;
}

// // kann wahrscheinlihc weg
// function getPhotosfromPlace(place) {
//   console.log('jetzt die fotos', place.photos[0].photo_reference);
//   console.log('jetzt die fotos', place.photos[1].photo_reference);

//   imageurl1 =
//     'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=' +
//     place.photos[0].photo_reference +
//     '&key=' +
//     'AIzaSyC6iru9XKYIvVQaPG6oK1sLFBXyeSJkwWs';

//   console.log(imageurl1);
//   // let photo1 = fetch(
//   //   proxyurl +
//   //     `https://maps.googleapis.com/maps/api/place/photo?key=AIzaSyC6iru9XKYIvVQaPG6oK1sLFBXyeSJkwWs&maxwidth=1600&photoreference=ATtYBwLgxMdmBtbvTRUi4Yo2yt6UmZ97af6AWDzYamZXmY1SCUqzeMt576DDztmoBJCBM8h_fvISOkrV6PU-tdIieVxKDE0x62EL9ITkWjyn9GSYSOrq9xX5cmnZX2pz4tpCbKeBKXHlMzgeg3UiTtjgLFywC2xe4QjTBwVdzkMzlnr1K5R9`
//   // ).then((res) => {
//   //   console.log(photo1);
//   // });
// }

// ==========================================================================
//  HANDLING OF NEW ENTRY
// ==========================================================================

function onSubmit(event) {
  // console.log(descriptionField.value);

  // console.log(titleField.value);
  if (!titleField.value) {
    alert('Please enter a Title');
    return;
  }
  // check, if the entered place is valid
  // event.preventDefault();
  // console.log(currentPlace.photos[0]);
  if (currentPlace === 'noValidPlace') {
    alert('Please enter a valid Location');
  } else {
    // create and add new entry to Local Storage:

    // const Image1URL =
    //   'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=' +
    //   currentPlace.photos[0].photo_reference +
    //   '&key=' +
    //   'AIzaSyC6iru9XKYIvVQaPG6oK1sLFBXyeSJkwWs';

    // const Image2URL =
    //   'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=' +
    //   currentPlace.photos[1].photo_reference +
    //   '&key=' +
    //   'AIzaSyC6iru9XKYIvVQaPG6oK1sLFBXyeSJkwWs';

    const newEntry = {
      name: currentPlace.name,
      coords: currentPlace.geometry.location.toJSON(),
      coords: currentPlace.geometry.location,
      postTitle: titleField.value,
      postDescription: descriptionField.value,
      rating: ratingField.value,
      month: monthField.value,
      year: yearField.value,
      // postImage1URL: Image1URL,
      // postImage2URL: Image2URL,
      postImage1URL: currentPlace.photos[0].getUrl(),
      postImage2URL: currentPlace.photos[1].getUrl(),
      postAuthor: 'Guest',
      wiki: wikiField.value,
      utc_offset: currentPlace.utc_offset_minutes,
    };
    addToLocalStorage(newEntry);
    // hide and reset form and reset 'currentPlace'
    addPostForm.reset();
    addPostForm.classList.add('hidden');
    currentPlace = 'noValidPlace';
    wikiField.innerHTML = '';
    window.open('./index.html', '_self');
  }
}

function resetInputForm() {
  addPostForm.reset();
  locationIsOk.innerHTML = 'Enter a Location';
  searchTextField.removeAttribute('disabled', true);
  searchTextField.focus();
  wikiField.innerHTML = '';
  currentPlace = 'noValidPlace';
  bannerImage.style.backgroundImage = `url(https://picsum.photos/id/0/1000/535)`;
  bannerTitle.innerHTML = 'Add new post...';
  // searchTextField.style.border = '10px';
  searchTextField.classList.remove('fieldDisabled');
  // searchTextField.style.paddingLeft = '10.8px';
  // alert('reset');
}

// ==========================================================================
// WEATHER
// ==========================================================================

function addWeatherToPage(temperature) {
  const weatherDisplay = document.getElementById('weatherDisplay');
  // weatherDisplay.innerHTML = `${temperature} °C`;
  weatherDisplay.innerHTML = temperature;
}

function getWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=80ab875a41f65bcfc23fdbad56346559&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const actualTemperature =
        data.main.temp + ' °C - ' + data.weather[0].description;

      addWeatherToPage(actualTemperature);
      // return actualTemperature;
    })
    .catch((error) => {
      return 'Something went wrong...' + error;
    });
}

// ==========================================================================
// WATCH
// ==========================================================================

function watch(offset) {
  const watchContainer = document.getElementById('watchContainer');
  const targetTime = new Date();
  var now = new Date(targetTime.getTime() + offset * 60 * 1000);
  now.setMinutes(now.getMinutes() + now.getTimezoneOffset());

  const seconds = now.getUTCSeconds();

  const mins = now.getUTCMinutes();

  const hour = now.getUTCHours();
  const time = now.toLocaleTimeString('de', {
    hour12: false,
    // hour: '2-digit',
    // minute: '2-digit',
    // second: '2-digit',
  });

  // console.log(hour, mins, seconds, time);
  watchContainer.innerHTML = `
  <p>Local Time</br>
  <span class="watchDisplay">${time}</span>
  </p>`;
  // return `${hour}:${mins}:${seconds} - ${offset} - ${time}`;
}

// ==========================================================================
// WIKI
// ==========================================================================

function getWiki(name) {
  fetch(
    `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=1&exsentences=3&explaintext&origin=*&titles=${name}`
  )
    .then((response) => response.json())
    .then((data) => {
      const pageID = Object.keys(data.query.pages);
      let wiki = data.query.pages[pageID].extract;

      // check if wiki is correct
      if (pageID[0] == '-1') {
        wiki = '';
        console.error('wiki is empty');
      } else {
        wiki = data.query.pages[pageID].extract;
        if (wiki.length < 100) {
          wiki = '';
          console.error('no wiki answer');
        }
      }
      wiki = removeUnwantedWiki(wiki);
      // add to form-input- field
      const wikiField = document.getElementById('wikiField');
      wikiField.innerHTML = wiki;
    });
}

/* remove the 'listen'-text from the wiki - only works, when inside () */
function removeUnwantedWiki(text) {
  return text.replaceAll('(listen)', '');
}

// ==========================================================================
// PAGE: Add Posts
// ==========================================================================
function addPost() {
  blogContainer.innerHTML = '';

  bannerImage.classList.remove('hidden');
  bannerImage.style.backgroundImage = `url(https://picsum.photos/id/0/1000/535)`;
  bannerButton.innerText = '< Back';
  bannerLink.setAttribute('href', './index.html');
  bannerTitle.innerHTML = 'Add new post...';

  addPostForm.classList.remove('hidden');
  overviewMapContainer.classList.add('hidden');
  window.scrollTo(0, 0);
  searchTextField.focus();
}

// ==========================================================================
// goto post overview-page
// ==========================================================================
function gotoPostOverwiew() {
  window.open('./index.html', '_self');
  // overviewMapContainer.classList.remove('hidden');
}

// ==========================================================================
// PAGE: Overview-Map
// ==========================================================================

function overviewMapPage() {
  initOverviewMap();

  bannerImage.style.backgroundImage = `url(https://images.unsplash.com/photo-1498354178607-a79df2916198?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2002&q=80)`;
  bannerButton.innerText = '< Back';
  bannerLink.setAttribute('href', './index.html');
  bannerTitle.innerHTML = 'Map-Overview';

  blogContainer.classList.add('hidden');

  bannerImage.classList.add('hidden');

  addPostForm.classList.add('hidden');
  overviewMapContainer.classList.remove('hidden');

  window.scrollTo(0, 0);
}

// CREATE THE MAP
function initOverviewMap() {
  const mapCenter = { lat: 53.5, lng: 9.9 };
  const options = {
    maxZoom: 10,
    mapTypeControl: false,
    streetViewControl: false,
  };

  const overviewMap = new google.maps.Map(
    document.getElementById('overviewMap'),
    options
  );

  let bounds = new google.maps.LatLngBounds();

  // CREATE MARKERS
  const markers = getArrayFromLocalStorage();

  function addMarker(location, i) {
    const marker = new google.maps.Marker({
      position: location.coords,
      map: overviewMap,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
      <div style="width: 300px;"</div>
      <h3>${location.name}</h3>
      <p>${location.postTitle}</p>
      <div
        style="background-image: url(${location.postImage1URL});
        width: 100%;
        height: 80px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;">
      </div>
      </div>
      `,
    });
    marker.addListener('click', function () {
      infoWindow.open(overviewMap, marker);
    });

    bounds.extend(location.coords);
  }

  markers.forEach(addMarker);
  overviewMap.fitBounds(bounds);

  // console.log(overviewMap.getZoom());
  // overviewMap.setCenter(bounds.getCenter());
  // overviewMap.setCenter(mapCenter);
  // overviewMap.setZoom(overviewMap.getZoom() - 1);
}

// ==========================================================================
// HIDE OVERVIEW MAP ON PAGE LOAD
overviewMapContainer.classList.add('hidden');

// ==========================================================================
// function customAlert(msg) {
//   msg = 'hallo';

//   const mainContainter = document.querySelector('.main');
//   // console.log(mainContainter);
//   const alert = document.createElement('div');
//   alert.innerHTML =
//     "<div style='position: fixed; top: 20px; left: 20px;'>" + msg + '</div>';
//   mainContainter.appendChild(alert);
// }

// customAlert();
