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
      'https://images.unsplash.com/photo-1473615695634-d284ec918736?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2900&q=80',
    postImage2URL:
      'https://images.unsplash.com/photo-1598790969148-62630087609e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1825&q=80',
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
      'https://images.unsplash.com/photo-1585586813880-257f9b38d25d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2167&q=80',
    postImage2URL:
      'https://images.unsplash.com/photo-1522100199172-e0d85a587108?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2225&q=80',
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
  // showActiveLink(gotoResetAllLink);

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

const gotoOverviewLink = document.getElementById('gotoOverviewLink');
const gotoMapLink = document.getElementById('gotoMapLink');
const gotoNewPostLink = document.getElementById('gotoNewPostLink');
const gotoResetAllLink = document.getElementById('gotoResetAllLink');
const gotoAboutPageLink = document.getElementById('gotoAboutPageLink');

// ==========================================================================
// SHOW ACTIVE LINK
// ==========================================================================

function showActiveLink(link) {
  gotoOverviewLink.classList.remove('active');
  gotoMapLink.classList.remove('active');
  gotoNewPostLink.classList.remove('active');
  gotoResetAllLink.classList.remove('active');
  gotoAboutPageLink.classList.remove('active');
  link.classList.add('active');
}

// ==========================================================================
// OVERVIEW-PAGE: Display all posts als cards
// ==========================================================================

// goto post overview-page
// =======================
function gotoPostOverwiew() {
  window.open('./index.html', '_self');
  showActiveLink(gotoOverviewLink);
  // gotoOverviewLink.classList.add('active');
  // overviewMapContainer.classList.remove('hidden');
}

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
// DETAILS PAGE: DISPLAY SINGLE POST
// ==========================================================================
function onClick(object) {
  const id = object.srcElement.id;
  showDetailsPage(id);
}

function showDetailsPage(id) {
  showActiveLink(gotoOverviewLink);
  console.log('Details Page:', id);

  blogContainer.innerHTML = '';
  blogContainer.classList.remove('hidden');
  bannerImage.classList.remove('hidden');
  addPostForm.classList.add('hidden');
  overviewMapContainer.classList.add('hidden');

  // const id = object.srcElement.id;
  const array = JSON.parse(localStorage.getItem('allLocations'));
  const element = array[id];

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
  <div id="weatherContainer"></div>
  <svg class="ratingContainer">
          <use xlink:href="#starRating${element.rating}">
        </svg>
        <div id="watchContainer">
          <p>Local Time</br>  
          <span class="watchDisplay">--:--:--</span>
          </p>
        </div>
 


    <h1>${element.name}</h1>
    <div>
        <h3>${element.postTitle}</h3>
        <p>${element.postDescription}</p>
        <p>${element.wiki}</p>
    </div>
    <div>
       
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
  // getWeather(element.name);
  getWeather(element.coords);
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
    if (place.photos) {
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
  console.log('loc is valid:', currentPlace.photos);
  locationIsOk.innerHTML = 'Location is valid';
  searchTextField.setAttribute('disabled', true);
  // searchTextField.style.color = '#111';
  // searchTextField.style.border = '0px';
  // searchTextField.style.paddingLeft = '0px';
  searchTextField.classList.add('fieldDisabled');
  titleField.focus();

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

function addWeatherToPage(temperature, iconUrl) {
  const weatherContainer = document.getElementById('weatherContainer');
  weatherContainer.innerHTML = `
  
  <p>Local Weather</br>
    <span id="weatherDisplay" class="watchDisplay">
    ${temperature} <img src="${iconUrl}" style="height: 4rem; width:auto;">
    </span>
  </p>
  `;
}

function getWeather(coords) {
  // fetch(
  //   `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=80ab875a41f65bcfc23fdbad56346559&units=metric`
  // )
  // console.log(coords.lat);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=80ab875a41f65bcfc23fdbad56346559&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // const weatherIcon = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      // console.log(iconUrl);
      const actualTemperature = Math.round(data.main.temp) + ' °C';

      addWeatherToPage(actualTemperature, iconUrl);
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
// PAGE: ADD NEW POST
// ==========================================================================
function addPost() {
  showActiveLink(gotoNewPostLink);
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
// PAGE: OVERVIEW-MAP
// ==========================================================================

function overviewMapPage() {
  showActiveLink(gotoMapLink);
  // gotoMapLink.classList.add('active');
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
      <div onclick="showDetailsPage(${i})" style="width: 200px;">
      <h3>${location.name}</h3>
      <p>${location.postTitle}</p>
        <div
          style="background-image: url(${location.postImage1URL});
          width: 100%;
          height: 120px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100%;">
        </div>
        <p>Click Image for Details"</p>
        
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

// ==========================================================================
// PAGE: ABOUT
// ==========================================================================
function gotoAboutPage() {
  showActiveLink(gotoAboutPageLink);
  blogContainer.innerHTML = '';
  blogContainer.classList.remove('hidden');
  bannerImage.classList.remove('hidden');
  addPostForm.classList.add('hidden');
  overviewMapContainer.classList.add('hidden');

  bannerImage.classList.remove('hidden');
  bannerImage.style.backgroundImage = `url(https://picsum.photos/id/123/1000/535)`;
  bannerButton.innerText = '< Back';
  bannerLink.setAttribute('href', './index.html');
  bannerTitle.innerHTML = 'About this project';

  blogContainer.innerHTML = `
  <div id="blogpageContainer">
  <article class="blogpageArticle">
      <h2>Project 1 - Travel Blog</h2>
      <p>
          This is my contribution for the first Project for the Full-Stack Web Development-Course at the
          <a target="_blank" href="https://hamburgcodingschool.com/">Hamburg Coding School.</a>
      </p>
      <p>
          It uses no Frameworks, just vanilla HTML, CSS and Javascript.
      </p>
      <p>
          All Information is stored in the Local Sorage of the Browser, the App fetches information from
          the APIs: <br>
          - Google Maps <br>
          - Wikipedia<br>
          - Openweathermaps
      </p>

  </article>
</div>

<section class="aboutBottom">
  <div class="aboutAuthorInfo">
      <div class="authorPic  aboutAuthorPic">
          <img src="../assets/_Steffen square.png">
      </div>
      <p class="author">Steffen Häfelinger</p>
  </div>
  <p class="aboutAuthorText">Steffen Häfelinger is a web developer located in Hamburg, Germany.
      He is currently studying Full Stack Web Developement at
      <a target="_blank" href="https://hamburgcodingschool.com/">Hamburg Coding School.</a>
      He is also working as a professional Musician, Songwriter & Audio Engineer.
  </p>
</section>
  
  `;

  window.scrollTo(0, 0);
}
