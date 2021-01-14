// ==========================================================================
// 2 default values
// ==========================================================================
const blogPosts = [
  {
    name: 'Hamburg',
    longName: 'Hamburg, Germany',
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
    longName: 'Zürich, Swizerland',
    coords: { lat: 47.3768866, lng: 8.541694 },
    postTitle: 'Nice but very expensive...',
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
  console.log('-> Reset LocalStorage');
  if (confirm('Reset Local Storage to default! Are you sure?')) {
    localStorage.setItem('allLocations', JSON.stringify(blogPosts));
    window.open('./index.html', '_self');
  }
}

// add one new element to the localStorage and print all posts
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
// GLOBAL variables & Get elements from dom
// ==========================================================================

// Screen Elements
const blogContainer = document.getElementById('blogContainer');
const overviewMapContainer = document.getElementById('overviewMap');

const bannerImage = document.getElementById('bannerImage');
const bannerTitle = document.getElementById('bannerTitle');
const bannerButton = document.getElementById('bannerButton');

const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', onSubmit);

const searchTextUnderline = document.getElementById('searchTextUnderline');
const locationLabel = document.getElementById('locationLabel');

// the Nav- and the Side-Menu-Items:
const gotoOverviewLink = document.getElementById('gotoOverviewLink');
const gotoMapLink = document.getElementById('gotoMapLink');
const gotoNewPostLink = document.getElementById('gotoNewPostLink');
const gotoResetAllLink = document.getElementById('gotoResetAllLink');
const gotoAboutPageLink = document.getElementById('gotoAboutPageLink');

const gotoOverviewSideMenu = document.getElementById('gotoOverviewSideMenu');
const gotoMapSideMenu = document.getElementById('gotoMapSideMenu');
const gotoNewPostSideMenu = document.getElementById('gotoNewPostSideMenu');
const gotoResetAllSideMenu = document.getElementById('gotoResetAllSideMenu');
const gotoAboutPageSideMenu = document.getElementById('gotoAboutPageSideMenu');

// watchID - is needed to stop the watch after leaving the Details Page
let watchID;

// Fallback Images - in case google does not provide Images -> eg. try to enter "Nuussuaq, Greenland" ;-)
let postImage1URL =
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1866&q=80';
let postImage2URL =
  'https://images.unsplash.com/photo-1517842264405-72bb906a1936?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2250&q=80';

// ==========================================================================
// BURGER MENU
// ==========================================================================
const burger = document.getElementById('burger');
const sideMenu = document.getElementById('sideMenu');
burger.addEventListener('click', onBurgerClick);
sideMenu.addEventListener('click', onBurgerClick);

function onBurgerClick() {
  sideMenu.classList.toggle('sideMenu-hiding');
}

// ==========================================================================
// Show active link in Nav-Menu and Sidebar
// i am sure there is a better solution to implement this...
// ==========================================================================
function showActiveLink(link, sideLink) {
  gotoOverviewLink.classList.remove('active');
  gotoMapLink.classList.remove('active');
  gotoNewPostLink.classList.remove('active');
  gotoResetAllLink.classList.remove('active');
  gotoAboutPageLink.classList.remove('active');

  gotoOverviewSideMenu.classList.remove('active');
  gotoMapSideMenu.classList.remove('active');
  gotoNewPostSideMenu.classList.remove('active');
  gotoResetAllSideMenu.classList.remove('active');
  gotoAboutPageSideMenu.classList.remove('active');

  link.classList.add('active');
  sideLink.classList.add('active');
}

// ==========================================================================
// OVERVIEW-PAGE: Display all posts als cards
// ==========================================================================

//
// goto overview-page
//
function gotoOverviewPage() {
  console.log('-> Overview Page');
  window.open('./index.html', '_self');
  showActiveLink(gotoOverviewLink, gotoOverviewSideMenu);
}

//
// print all posts
//
function printAllPosts() {
  blogContainer.innerHTML = '';
  getArrayFromLocalStorage().forEach(printOnePost);
}
printAllPosts();

//
//  ADD SINGLE POST AS CARD TO DOM
//
function printOnePost(element, index) {
  const newArticle = document.createElement('div');
  newArticle.classList.add('blogPost');

  // use descricption text if available, otherwise use wiki:
  let overviewText = element.postDescription || element.wiki;

  // this is the Card:
  newArticle.innerHTML = `
  <div class="overlayButton" id="${index}"></div>
  <div class="blogImage" style="background-image: url(${element.postImage1URL});"></div>
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

// if clicked on Card in the Overview Page
function onClick(object) {
  const id = object.srcElement.id;
  gotoDetailsPage(id);
}

// this shows the Details Page
function gotoDetailsPage(id) {
  console.log('-> Details Page - ID:', id);
  showActiveLink(gotoOverviewLink, gotoOverviewSideMenu);

  blogContainer.innerHTML = '';
  blogContainer.classList.remove('hidden');
  bannerImage.classList.remove('hidden');
  addPostForm.classList.add('hidden');
  overviewMapContainer.classList.add('hidden');

  const array = getArrayFromLocalStorage();
  const element = array[id];

  bannerImage.style.backgroundImage = `url(${element.postImage1URL})`;
  bannerButton.innerText = '< Back';
  bannerButton.setAttribute('onclick', 'gotoOverviewPage()');
  bannerTitle.innerHTML = element.name;

  window.scrollTo(0, 0);

  const newArticle = document.createElement('div');
  newArticle.classList.add('detailsArticle');

  // this is the DETAILS-PAGE:
  newArticle.innerHTML = `
    <div>
      <div class="detailsTopContainer">
        <div class="detailsImg2" style="background-image: url(${element.postImage2URL}); ">
      </div>
    </div>  
    <div>
      <h2>${element.longName}</h2>
      <p>Visited in ${element.month} ${element.year}</p>
      <svg class="ratingContainer">
        <use xlink:href="#starRating${element.rating}">
      </svg>
      <h3>${element.postTitle}</h3>
      <p>${element.postDescription}</p>
      <p >${element.wiki}</p>
    </div>
    <div class="detailsInfoContainer">
      <div id="weatherContainer"></div>
      <div id="watchContainer">
        <p>Local Time</br>  
          <span class="watchDisplay">--:--:--</span>
        </p>
      </div> 
    </div>
  <div id="map">map</div>
  <button  class="secondaryButton" onclick="eraseEntryFromLocalStorage(${id})">DELETE POST</button>
  <button  class="primaryButton" onclick="gotoOverviewPage()"> &lt; BACK</button>
  `;

  blogContainer.appendChild(newArticle);
  initMap(element.coords);
  getWeather(element.coords);

  watchID = setInterval(watch, 1000, element.utc_offset);
}

// add map to Details Page
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

// Weather
// ==========================================================================

function addWeatherToPage(temperature, iconUrl) {
  const weatherContainer = document.getElementById('weatherContainer');
  weatherContainer.innerHTML = `
  <p>Local Weather</p>
    <span id="weatherDisplay" class="watchDisplay">
    ${temperature} <img src="${iconUrl}" style="height: 4rem; width:auto;">
    </span>
  `;
}

function getWeather(coords) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=80ab875a41f65bcfc23fdbad56346559&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      const actualTemperature = Math.round(data.main.temp) + ' °C';

      addWeatherToPage(actualTemperature, iconUrl);
    })
    .catch((error) => {
      console.error('Weather: Something went wrong... ' + error);
    });
}

// Watch
// ==========================================================================

function watch(offset) {
  const watchContainer = document.getElementById('watchContainer');
  console.log('Watch - ID:  ', watchID);
  if (watchContainer === null) {
    clearInterval(watchID);
    console.log('Watch stopped');
    return;
  }
  const targetTime = new Date();
  var localTime = new Date(targetTime.getTime() + offset * 60 * 1000);
  localTime.setMinutes(localTime.getMinutes() + localTime.getTimezoneOffset());

  const timeString = localTime.toLocaleTimeString('de', {
    hour12: false,
  });

  watchContainer.innerHTML = `
  <p>Local Time</br>
    <span class="watchDisplay">${timeString}</span>
  </p>`;
}

// ==========================================================================
// PAGE: ADD NEW POST
// ==========================================================================
function gotoAddPostPage() {
  console.log('-> Add Post page');

  showActiveLink(gotoNewPostLink, gotoNewPostSideMenu);
  blogContainer.innerHTML = '';

  bannerImage.classList.remove('hidden');
  // bannerImage.style.backgroundImage = `url(https://picsum.photos/id/0/1000/535)`;
  bannerImage.style.backgroundImage = `url(./assets/addPostPic1000x535.jpg)`;
  bannerButton.innerText = '< Back';
  bannerButton.setAttribute('onclick', 'gotoOverviewPage()');

  bannerTitle.innerHTML = 'Add new post...';

  addPostForm.classList.remove('hidden');
  overviewMapContainer.classList.add('hidden');
  window.scrollTo(0, 0);
  searchTextField.focus();
}

// location autocomplete for Add Post-Page */
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

    if (place.place_id) {
      // => this is a valid location, if photos exist
      console.log('complete Location');
      currentPlace = place;
      getWiki(place.name);
      locationIsValid();
    } else {
      // -> inclomplete location
      alert('Please select a Location from the list');
    }
  });
}
google.maps.event.addDomListener(window, 'load', initialize);

function locationIsValid() {
  console.log('loc is valid:', currentPlace.photos);
  searchTextField.setAttribute('disabled', true);
  searchTextField.setAttribute('type', 'text');
  // searchTextField.classList.add('fieldDisabled');

  searchTextUnderline.classList.remove('hidden');
  locationLabel.classList.add('hidden');
  titleField.focus();
  if (currentPlace.photos) {
    bannerImage.style.backgroundImage = `url(${currentPlace.photos[0].getUrl()})`;
  }

  bannerTitle.innerHTML = `${currentPlace.name}`;
}

// ==========================================================================
//  HANDLING OF NEW ENTRY (after pressing the Submit Button)
// ==========================================================================

function onSubmit(event) {
  if (!titleField.value) {
    alert('Please enter a Title');
    return;
  }
  // check, if the entered place is valid
  if (currentPlace === 'noValidPlace') {
    alert('Please select a Location from the list');
  } else {
    // -> is valid..
    // -> check, if photos are available.. or use fallback-photos
    if (currentPlace.photos) {
      if (currentPlace.photos[0]) {
        postImage1URL = currentPlace.photos[0].getUrl();
      }
      if (currentPlace.photos[1]) {
        postImage2URL = currentPlace.photos[1].getUrl();
      }
    }

    // create the new Entry
    const newEntry = {
      name: currentPlace.name,
      longName: currentPlace.formatted_address,
      coords: currentPlace.geometry.location.toJSON(),
      coords: currentPlace.geometry.location,
      postTitle: titleField.value,
      postDescription: descriptionField.value,
      rating: ratingField.value,
      month: monthField.value,
      year: yearField.value,
      postImage1URL: postImage1URL,
      postImage2URL: postImage2URL,
      wiki: wikiField.value,
      utc_offset: currentPlace.utc_offset_minutes,
    };
    addToLocalStorage(newEntry);
    // hide and reset form, reset 'currentPlace' and go back to Overview-Page
    addPostForm.reset();
    addPostForm.classList.add('hidden');
    currentPlace = 'noValidPlace';
    wikiField.innerHTML = '';
    window.open('./index.html', '_self');
  }
}

// Reset Form
// ==========================================================================
function resetInputForm() {
  addPostForm.reset();
  searchTextField.removeAttribute('disabled', true);
  searchTextField.focus();
  wikiField.innerHTML = '';
  currentPlace = 'noValidPlace';
  bannerImage.style.backgroundImage = `url(https://picsum.photos/id/0/1000/535)`;
  bannerTitle.innerHTML = 'Add new post...';
  // searchTextField.classList.remove('fieldDisabled');
  searchTextField.setAttribute('type', 'search'); // just for Safari...
  searchTextUnderline.classList.add('hidden');
  locationLabel.classList.remove('hidden');
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

/* remove the '(listen)'-text from the wiki - only works, when inside () */
function removeUnwantedWiki(text) {
  return text.replaceAll('(listen)', '');
}

// ==========================================================================
// PAGE: OVERVIEW-MAP
// ==========================================================================

function gotoMapPage() {
  console.log('-> Map Page');
  showActiveLink(gotoMapLink, gotoMapSideMenu);
  initOverviewMap();

  blogContainer.classList.add('hidden');
  bannerImage.classList.add('hidden');
  addPostForm.classList.add('hidden');
  overviewMapContainer.classList.remove('hidden');

  blogContainer.innerHTML = '';

  window.scrollTo(0, 0);
}

// Create the Overview-Map
function initOverviewMap() {
  const options = {
    maxZoom: 10,
    minZoom: 2,
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

    // info window
    const infoWindow = new google.maps.InfoWindow({
      content: `
      <div class="infoWindow" onclick="gotoDetailsPage(${i})" style="width: 200px;">
        <h3>${location.name}</h3>
        <p>${location.postTitle}</p>
        <div class="infoWindowImage" style="background-image: url(${location.postImage1URL});"></div>
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

//
// HIDE OVERVIEW MAP ON PAGE LOAD
//
overviewMapContainer.classList.add('hidden');

// ==========================================================================
// PAGE: ABOUT
// ==========================================================================
function gotoAboutPage() {
  console.log('-> AboutPage');
  showActiveLink(gotoAboutPageLink, gotoAboutPageSideMenu);
  blogContainer.innerHTML = '';
  blogContainer.classList.remove('hidden');
  bannerImage.classList.remove('hidden');
  addPostForm.classList.add('hidden');
  overviewMapContainer.classList.add('hidden');

  bannerImage.classList.remove('hidden');
  // bannerImage.style.backgroundImage = `url(https://picsum.photos/id/123/1000/535)`;
  bannerImage.style.backgroundImage = `url(./assets/aboutPic1000x535.jpg)`;
  bannerButton.innerText = '< Back';
  bannerButton.setAttribute('onclick', 'gotoOverviewPage()');

  bannerTitle.innerHTML = 'About this project';

  blogContainer.innerHTML = `
  <div id="aboutContainer">
    <div class="aboutArticle">
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
      <a href="https://github.com/shaefelinger/HCS-project1-travelBlog" target="_blank">
        <i class="fab fa-github"></i>
        This project and documentation on Github
      </a>
  
    </div>
  </div>
  <section class="aboutBottom">
    <div class="aboutAuthorInfo">
      <div class="authorPic  aboutAuthorPic">
        <img src="./assets/Steffen_square.png">
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
