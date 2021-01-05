const blogPosts = [
  {
    name: 'Hamburg',
    coords: { lat: 53.5510846, lng: 9.9936818 },
    postTitle: 'The most beatiful city in the world',
    postDescription: 'This is where i live...',
    rating: '5',
    month: 'May',
    year: '1997',
    postImage1URL:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwK6NLYi-_Ni4ir7MgAkg2DLGuzxv-AiM1x7lmPv0WWDPGWUMR-toZGWOG4o5Vee18oI7RvS2xJEruZUF7giIOb_wbLCDZN-jeXkgTM-eKKhzjsSDoDomfLan5XIT3HxGPsHaeHftCnQEB3EZvVoJdo3cr74q3kjDgAWA9Y_Anyy0LJb&3u900&5m1&2e1&callback=none&key=AIzaSyC6iru9XKYIvVQaPG6oK1sLFBXyeSJkwWs&token=78995',
    postImage2URL:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwINqX6w5Njs_0f-RJ4lP8YCrDvXu0FYmgEUsnU5GfoOZ1jmztUZgc0Td1B4PrS2zff86bojGnKoYMO8YkcTw-r0F-Sq1vYK8jxJZMwPKQ3apAuZeNpdg-b4lPUx-pHo51lul7kJtS_xtyWuEcDglUkb89ncmDRm-M0sV5FeS5ip-tJg&3u3000&5m1&2e1&callback=none&key=AIzaSyC6iru9XKYIvVQaPG6oK1sLFBXyeSJkwWs&token=40008',
    wiki: `Hamburg is the second-largest city in Germany after Berlin and 7th largest city in the European Union with a population of over 1.84 million.One of Germany's 16 federated states, it is surrounded by Schleswig-Holstein to the north and Lower Saxony to the south. The city's metropolitan region is home to more than five million people. Hamburg lies on the River Elbe and two of its tributaries, the River Alster and the River Bille.`,
    postAuthor: 'Steffen Häfelinger',
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
    postAuthor: 'Steffen Häfelinger',
    wiki:
      'Zürich is the largest city in Switzerland, and the capital of the canton of Zürich. It is located in north-central Switzerland, at the northwestern tip of Lake Zürich. As of January 2020, the municipality has 434,335 inhabitants, the urban area (agglomeration) 1.315 million (2009), and the Zürich metropolitan area 1.83 million (2011).',
  },
];

// ==========================================================================
// HANDLE LOCAL STORAGE
// ==========================================================================

// reset Local Storage and add default entries
function resetLocalStorage() {
  // alert('Reset Locat Storage');
  localStorage.setItem('allLocations', JSON.stringify(blogPosts));
  window.open('./index.html', '_self');
}

function addToLocalStorage(newElement) {
  array = getArrayFromLocalStorage();
  array.push(newElement);
  pushArrayToLocalStorage(array);
  // blogContainer.innerHTML = '';
  printAllPosts();
}

function getArrayFromLocalStorage() {
  let array = [];
  array = JSON.parse(localStorage.getItem('allLocations'));
  return array;
}

function pushArrayToLocalStorage(array) {
  localStorage.setItem('allLocations', JSON.stringify(array));
}

function eraseEntryFromLocalStorage(id) {
  const array = getArrayFromLocalStorage();
  array.splice(id, 1);
  pushArrayToLocalStorage(array);
  window.open('./index.html', '_self');
}

// ==========================================================================
// Get elements from dom - GLOBAL
// ==========================================================================
const proxyurl = 'https://cors-anywhere.herokuapp.com/';

const blogContainer = document.getElementById('blogContainer');
const overviewMapContainer = document.getElementById('overviewMap');

const bannerImage = document.getElementById('bannerImage');
const bannerTitle = document.getElementById('bannerTitle');
const bannerButton = document.getElementById('bannerButton');
const bannerLink = document.getElementById('bannerLink');

// input form for new entry -> Submit-Button-> call onSubmit()
const addPostForm = document.getElementById('addPostForm');
addPostForm.addEventListener('submit', onSubmit);

// ==========================================================================
// ALL POSTS AS CARDS => OVERVIEW
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
  let overwiewText = element.postDescription || element.wiki;

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
        <p>${overwiewText}</p>
    </div>
    
    <div class="cardBottom">
      
        <div>
          
            <svg class="ratingContainer">
              <use xlink:href="#starRating${element.rating}">
            </svg>
        </div>
       
    </div>
`;

  {
    /* <div class="authorPic">
<img src="assets/jane_doe.jpg">
</div>
<p class="author">${element.postAuthor}</p> */
  }

  blogContainer.appendChild(newArticle);

  // overlayButton makes the Card clickable and passes the index of the entry
  const overlayButton = document.getElementById(index);
  overlayButton.addEventListener('click', onClick);
  // overviewMap();
}

// ==========================================================================
// SINGLE POST-BLOGPAGE => RESULT
// ==========================================================================
function onClick(object) {
  const id = object.srcElement.id;
  const array = JSON.parse(localStorage.getItem('allLocations'));
  const element = array[id];
  blogContainer.innerHTML = '';

  /* ===== STYLE BANNER ===== */
  // const bannerImage = document.getElementById('bannerImage');
  // const bannerTitle = document.getElementById('bannerTitle');
  // const bannerButton = document.getElementById('bannerButton');
  // const bannerLink = document.getElementById('bannerLink');

  bannerImage.style.backgroundImage = `url(${element.postImage1URL})`;
  bannerButton.innerText = '< Back';
  bannerLink.setAttribute('href', './index.html');
  bannerTitle.innerHTML = element.name;

  window.scrollTo(0, 0);

  const newArticle = document.createElement('div');

  newArticle.classList.add('blogpageArticle');

  newArticle.innerHTML = `
 
  <div class="blogpageTextWrapper">
    <h3>${element.postTitle}</h3>
    <h2>${element.name}</h2>
  


    

 

    <p>${element.postDescription}</p>
    <p>${element.wiki}</p>
    <svg class="ratingContainer">
    <use xlink:href="#starRating${element.rating}">
  </svg>
  <p>Visited in ${element.month} ${element.year}</p>
    <p id="weatherContainer">Temperature: </p> 
    <p id="watchContainer">Clock: </p> 
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

  {
    /* <div class="authorPic largePic">
<img src="../assets/jane_doe.jpg">
</div>
<div>
<p class="author">${element.postAuthor}</p>
</div> */
  }

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
  let weather = getWeather(element.name);
  setInterval(watch, 1000);
  // getWikipedia(element.name);
}

// ==========================================================================
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
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById('map'), options);
  const marker = new google.maps.Marker({
    position: mapCenter,
    map: map,
  });
}

// ==========================================================================
// location autocomplete for New Post-Page */
// ==========================================================================

// function testSubmit(event) {
//   console.log(searchTextField.value);
// }

let currentPlace = 'noValidPlace';

function initialize() {
  var options = {
    types: ['(regions)'],
    fields: [
      // 'geometry',
      // 'name',
      // 'photos',
      // 'formatted_address',
      // 'utc_offset_minutes',
      'place_id',
    ],
  };
  const input = document.getElementById('searchTextField');
  const autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.addListener('place_changed', () => {
    let place = autocomplete.getPlace();
    // console.log(place);
    // ==========================================================================

    const googleDOMNodes = document.getElementsByClassName('pac-item');

    // ==========================================================================

    let googlePlaceID = place.place_id;
    // console.log(googlePlaceID);

    // if place_id is not empty => it is a valid location ->
    if (googlePlaceID) {
      console.log('complete Location');
      getGoogleInfoByPlaceId(googlePlaceID);
      // currentPlace = place;
      // console.log(place);
      // getWiki(place.name);
    } else {
      console.error('SH: inclomplete Location');
      // console.log(googleDOMNodes);
      const forcedResult =
        googleDOMNodes[0].children[1].innerText +
        ', ' +
        googleDOMNodes[0].children[2].innerText;
      searchTextField.value = forcedResult;

      const proxyurl = 'https://cors-anywhere.herokuapp.com/';

      /* get place-ID */
      fetch(
        proxyurl +
          `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&key=AIzaSyC6iru9XKYIvVQaPG6oK1sLFBXyeSJkwWs&input=${forcedResult}`
      )
        .then((res) => res.json())
        .then(
          (data) => {
            // console.log(data.candidates[0].place_id);
            googlePlaceID = data.candidates[0].place_id;
            getGoogleInfoByPlaceId(googlePlaceID);
          }
          // .catch(onError);
        );
      getWiki(forcedResult);
      console.log(googlePlaceID);
    }

    /* get google info by placeID */

    // currentPlace = place;
    // getWiki(place.name);
  });
}
google.maps.event.addDomListener(window, 'load', initialize);

function getGoogleInfoByPlaceId(placeId) {
  console.log('get aufgerufen mit:', placeId);
}

// ==========================================================================
//  HANDLING OF NEW ENTRY
// ==========================================================================

function onSubmit(event) {
  // check, if the entered place is valid
  event.preventDefault();

  if (currentPlace === 'noValidPlace') {
    alert('Please select a Location from the list');
  } else {
    // create and add new entry to Local Storage:
    const newEntry = {
      name: currentPlace.name,
      coords: currentPlace.geometry.location.toJSON(),
      postTitle: titleField.value,
      postDescription: descriptionField.value,
      rating: ratingField.value,
      month: monthField.value,
      year: yearField.value,
      postImage1URL: currentPlace.photos[0].getUrl(),
      postImage2URL: currentPlace.photos[1].getUrl(),
      postAuthor: 'Guest',
      wiki: wikiField.value,
    };
    addToLocalStorage(newEntry);
    // hide and reset form and reset 'currentPlace'
    addPostForm.reset();
    addPostForm.classList.add('hidden');
    currentPlace = 'noValidPlace';
    wikiField.innerHTML = '';
    window.open('./index.html');
    // window.scrollTo(0, 0);
  }
}

// ==========================================================================
// WEATHER
// ==========================================================================

function addWeatherToPage(temperature) {
  const weatherContainer = document.getElementById('weatherContainer');
  // console.log(weatherContainer);
  weatherContainer.innerHTML = `The current Temperature is ${temperature} degrees Celsius`;
}

function getWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=80ab875a41f65bcfc23fdbad56346559&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      const actualTemperature = data.main.temp;
      addWeatherToPage(actualTemperature);
      return actualTemperature;
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
  const now = new Date();

  const seconds = now.getUTCSeconds();

  const mins = now.getUTCMinutes();

  const hour = now.getUTCHours();
  const time = now.getTime();

  // console.log(hour, mins, seconds, time);
  watchContainer.innerHTML = `UTC Time is: ${hour}:${mins}:${seconds}`;
  return `${hour}:${mins}:${seconds} - ${offset} - ${time}`;
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

  /* ===== STYLE BANNER ===== */
  // const bannerImage = document.getElementById('bannerImage');
  // const bannerTitle = document.getElementById('bannerTitle');
  // const bannerButton = document.getElementById('bannerButton');
  // const bannerLink = document.getElementById('bannerLink');
  bannerImage.classList.remove('hidden');
  bannerImage.style.backgroundImage = `url(https://picsum.photos/id/0/1000/535)`;
  bannerButton.innerText = '< Back';
  bannerLink.setAttribute('href', './index.html');
  bannerTitle.innerHTML = 'Add new post...';

  addPostForm.classList.remove('hidden');
  overviewMapContainer.classList.add('hidden');
  window.scrollTo(0, 0);
}

// ==========================================================================
// goto post overview
// ==========================================================================
function gotoPostOverwiew() {
  window.open('./index.html', '_self');
  // window.scrollTo(0, 400);
  overviewMapContainer.classList.remove('hidden');
}

// ==========================================================================
// PAGE: Overview-Map
// ==========================================================================

function overviewMapPage() {
  // blogContainer.innerHTML = '';
  initOverviewMap();

  // const bannerImage = document.getElementById('bannerImage');
  // const bannerTitle = document.getElementById('bannerTitle');
  // const bannerButton = document.getElementById('bannerButton');
  // const bannerLink = document.getElementById('bannerLink');

  bannerImage.style.backgroundImage = `url(https://images.unsplash.com/photo-1498354178607-a79df2916198?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2002&q=80)`;
  bannerButton.innerText = '< Back';
  bannerLink.setAttribute('href', './index.html');
  bannerTitle.innerHTML = 'Map-Overview';

  blogContainer.classList.add('hidden');
  // overviewMapContainer.classList.remove('hidden');
  // window.scrollTo(0, 230);

  bannerImage.classList.add('hidden');

  addPostForm.classList.add('hidden');
  overviewMapContainer.classList.remove('hidden');

  window.scrollTo(0, 0);
  // window.open('#overviewMapContainer', '_self');
}

// ==========================================================================
// init overview Map

function initOverviewMap() {
  const mapCenter = { lat: 53.5510846, lng: 9.9936818 };

  const options = {
    // zoom: 2.5,
    maxZoom: 10,
    // center: mapCenter,
    mapTypeControl: false,
    streetViewControl: false,
  };

  const overviewMap = new google.maps.Map(
    document.getElementById('overviewMap'),
    options
  );

  const markers = getArrayFromLocalStorage();

  let bounds = new google.maps.LatLngBounds();
  // console.log('bounds start:', bounds);

  function addMarker(location, i) {
    const marker = new google.maps.Marker({
      position: location.coords,
      map: overviewMap,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: location.name,
    });
    marker.addListener('click', function () {
      infoWindow.open(overviewMap, marker);
    });

    bounds.extend(location.coords);
  }

  markers.forEach(addMarker);
  overviewMap.fitBounds(bounds);

  // overviewMap.panToBounds(bounds);
  // overviewMap.setCenter(bounds.getCenter());
  overviewMap.setCenter(mapCenter);

  // overviewMap.setZoom(Math.max(6, overviewMap.getZoom()));
}

// initOverviewMap();
overviewMapContainer.classList.add('hidden');
// ==========================================================================
