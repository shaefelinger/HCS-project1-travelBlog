const blogPosts = [
  {
    name: 'Tübingen, Germany',
    coords: { lat: 48.5216364, lng: 9.0576448 },
    postTitle: 'The lovely City i used to live in',
    postDescription:
      'mir geht es gut, wie geht es dir? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! perferendis eaque, exercitationem praesentium nihil. Nulla! perferendis eaque, exercitationem praesentium nihil. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! perferendis eaque, exercitationem praesentium nihil. Nulla! perferendis eaque, exercitationem praesentium nihil Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! perferendis eaque, exercitationem praesentium nihil. Nulla! perferendis eaque, exercitationem praesentium nihil. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! perferendis eaque, exercitationem praesentium nihil. Nulla!Schluss',
    rating: '4',
    month: 'May',
    year: '1918',
    postImage1URL: 'https://picsum.photos/id/248/500',
    postImage2URL: 'https://picsum.photos/id/249/500',
    postAuthor: 'Steffen Häfelinger',
  },
  {
    name: 'Wilhelmshaven, Germany',
    coords: { lat: 53.53234029999999, lng: 8.1068722 },
    postTitle: 'Schlicktown i used to live in',
    postDescription:
      'mir geht es nocht so gut, wie geht es dir? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia',
    rating: '2',
    month: 'May',
    year: '2018',
    postImage1URL: 'https://picsum.photos/id/459/500',
    postImage2URL: 'https://picsum.photos/id/356/500',
    postAuthor: 'Guest',
  },
];

// ==========================================================================
// HANDLE LOCAL STORAGE
// ==========================================================================

// reset Local Storage and add default entries
function resetLocalStorage() {
  alert('Reset Locat Storage');
  localStorage.setItem('allLocations', JSON.stringify(blogPosts));
  window.open('./index.html');
}

function addToLocalStorage(newElement) {
  array = getArrayFromLocalStorage();
  array.push(newElement);
  pushArrayToLocalStorage(array);
  blogContainer.innerHTML = '';
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
  window.open('./index.html');
}

// ==========================================================================
// Get elements from dom
// ==========================================================================

const blogContainer = document.getElementById('blogContainer');
const allMapContainer = document.getElementById('mapAll');

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
            <div class="authorPic">
                <img src="assets/jane_doe.jpg">
            </div>
            <p class="author">${element.postAuthor}</p>
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
  const bannerImage = document.getElementById('bannerImage');
  const bannerTitle = document.getElementById('bannerTitle');
  const bannerButton = document.getElementById('bannerButton');
  const bannerLink = document.getElementById('bannerLink');

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
    
    <div class="blogpageArticeImage" 
      style="background-image: url(${element.postImage2URL}); 
      width: 75%;
      height: 400px;
      background-repeat: no-repeat;
      background-size: 100%;
      background-position: center;
      margin-bottom: 2rem">
    </div>
    <button onclick="eraseEntryFromLocalStorage(${id})">Delete Entry</button>

    <div class="authorPic largePic">
      <img src="../assets/jane_doe.jpg">
  </div>
  <div>
      <p class="author">${element.postAuthor}</p>
  </div>

    <svg class="ratingContainer">
      <use xlink:href="#starRating${element.rating}">
    </svg>
    <p>Visited in ${element.month} ${element.year}</p>

    <p>${element.postDescription}</p>
    <p>${element.wiki}</p>
    <p id="weatherContainer">Temperature: </p> 
    <p id="watchContainer">Clock: </p> 
    
  </div>
  <div id="map">map</div>
  <section class="blogpageBottom">
  </section>
`;

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
  getWikipedia(element.name);
}

// ==========================================================================
// add mapp to SinglePost
// ==========================================================================

function initMap(coords) {
  const uluru = coords;
  const options = {
    zoom: 6,
    center: uluru,
    mapTypeId: 'hybrid',
    disableDefaultUI: true,
  };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById('map'), options);
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

// ==========================================================================
// location autocomplete for New Post-Page */
// ==========================================================================

let currentPlace = 'noValidPlace';

function initialize() {
  var options = {
    // types: ['(regions)'],
    fields: ['geometry', 'name', 'photos'],
  };
  var input = document.getElementById('searchTextField');
  var autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    // if photos is not empty it is a valid location ->
    if (place.photos) {
      currentPlace = place;
      getWiki(place.name);
    }
  });
}
google.maps.event.addDomListener(window, 'load', initialize);

// ==========================================================================
//  HANDLING OF NEW ENTRY
// ==========================================================================

function onSubmit(event) {
  // check, if the entered place is valid
  if (currentPlace === 'noValidPlace') {
    alert('Please select a Location from the list');
    event.preventDefault();
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
  const bannerImage = document.getElementById('bannerImage');
  const bannerTitle = document.getElementById('bannerTitle');
  const bannerButton = document.getElementById('bannerButton');
  const bannerLink = document.getElementById('bannerLink');

  bannerImage.style.backgroundImage = `url(https://picsum.photos/id/0/1000/535)`;
  bannerButton.innerText = '< Back';
  bannerLink.setAttribute('href', './index.html');
  bannerTitle.innerHTML = 'Add new post...';

  addPostForm.classList.remove('hidden');
  window.scrollTo(0, 0);
}

// ==========================================================================
// PAGE: Overview-Map
// ==========================================================================

function overviewMapPage() {
  blogContainer.innerHTML = '';

  const bannerImage = document.getElementById('bannerImage');
  const bannerTitle = document.getElementById('bannerTitle');
  const bannerButton = document.getElementById('bannerButton');
  const bannerLink = document.getElementById('bannerLink');

  bannerImage.style.backgroundImage = `url(https://picsum.photos/id/0/1000/535)`;
  bannerButton.innerText = '< Back';
  bannerLink.setAttribute('href', './index.html');
  bannerTitle.innerHTML = 'Overview...';

  allMapContainer.classList.remove('hidden');
  blogContainer.classList.add('hidden');
  window.scrollTo(0, 370);
}

function initMapAll() {
  // The location of Uluru
  const uluru = { lat: 30, lng: 2 };
  const options = {
    zoom: 2,
    center: uluru,
    // mapTypeId: 'hybrid',
    // disableDefaultUI: true,
  };
  // The map, centered at Uluru
  const mapAll = new google.maps.Map(
    document.getElementById('mapAll'),
    options
  );

  function addMarker(props) {
    const marker = new google.maps.Marker({
      position: props.coords,
      map: mapAll,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: props.name,
    });
    marker.addListener('click', function () {
      infoWindow.open(mapAll, marker);
    });

    // check content
    // if (props.content) {
    //   const infoWindow = new google.maps.InfoWindow({
    //     content: props.content,
    //   });
    //   marker.addListener('click', function () {
    //     infoWindow.open(map, marker);
    //   });
    // }
  }

  // array of markers
  // const markers = [
  //   {
  //     coords: { lat: 53.551086, lng: 9.993682 },
  //     iconImage:
  //       'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
  //     content: '<h2>Hamburchh</h2>',
  //   },
  //   {
  //     coords: { lat: 54.551086, lng: 8.993682 },
  //     content: 'fick dich',
  //   },
  //   {
  //     coords: { lat: 51.509865, lng: -0.118092 },
  //   },
  //   {
  //     coords: { lat: 41.509865, lng: -2.118092 },
  //   },
  // ];
  const markers = getArrayFromLocalStorage();

  markers.forEach(addMarker);
}

initMapAll();
