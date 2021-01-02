const blogPosts = [
  {
    name: 'Tübingen, Germany',
    coords: { lat: 48.5216364, lng: 9.0576448 },
    postTitle: 'The lovely City i used to live in',
    postDescription:
      'mir geht es gut, wie geht es dir? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! perferendis eaque, exercitationem praesentium nihil. Nulla! perferendis eaque, exercitationem praesentium nihil. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! perferendis eaque, exercitationem praesentium nihil. Nulla! perferendis eaque, exercitationem praesentium nihil Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! perferendis eaque, exercitationem praesentium nihil. Nulla! perferendis eaque, exercitationem praesentium nihil. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! perferendis eaque, exercitationem praesentium nihil. Nulla!Schluss',
    rating: '4',
    date: 'Visited in May 2019',
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
    date: 'Visited in August 1989',
    postImage1URL: 'https://picsum.photos/id/449/500',
    postImage2URL: 'https://picsum.photos/id/356/500',
    postAuthor: 'Guest',
  },
];

/* ===== HANDLE LOCAL STORAGE ===== */

function resetLocalStorage() {
  alert('Reset Locat Storage');
  localStorage.setItem('allLocations', JSON.stringify(blogPosts));
  window.open('./index.html');
}
// resetLocalStorage();

function addToLocalStorage(newElement) {
  // let array = [];
  // array = JSON.parse(localStorage.getItem('allLocations'));
  array = getArrayFromLocalStorage();
  array.push(newElement);
  // localStorage.setItem('allLocations', JSON.stringify(array));
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
  // console.log(array);
  array.splice(id, 1);
  // console.log(array);
  pushArrayToLocalStorage(array);
  window.open('./index.html');
  // printAllPosts();
}

const blogContainer = document.getElementById('blogContainer');

/*
 ***** ALL POSTS AS OVERVIEW *****
 */
function printAllPosts() {
  blogContainer.innerHTML = '';
  const allLocations = localStorage.getItem('allLocations');
  allLocationsParsed = JSON.parse(allLocations);
  allLocationsParsed.forEach(printOnePost);
}

printAllPosts();

/* ***** ADD SINGLE POSTS AS CARD TO DOM ***** */
function printOnePost(element, index) {
  const newArticle = document.createElement('div');
  newArticle.classList.add('blogPost');
  // use descricption text if available, otherwise use wiki
  let overwiewText = element.postDescription || element.wiki;

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
  // console.log(newArticle);

  blogContainer.appendChild(newArticle);
  // const overlayButton = blogContainer.querySelector('.overlayButton');
  const overlayButton = document.getElementById(index);
  // console.log(overlayButton);
  overlayButton.addEventListener('click', onClick);
}

/* ===================== SINGLE POST-BLOGPAGE => RESULT  ===================== */
function onClick(object) {
  // console.log(object);
  // console.log(object.srcElement.id);

  const id = object.srcElement.id;
  const array = JSON.parse(localStorage.getItem('allLocations'));
  // const element = blogPosts[id];
  const element = array[id];

  // const blogContainer = document.getElementById('blogContainer');
  blogContainer.innerHTML = '';

  // const addPostForm = document.getElementById('addPostForm');

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
    <p>${element.date}</p>

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
  // console.log(element.coords);
  initMap(element.coords);
  let weather = getWeather(element.name);
  setInterval(watch, 1000);
  // console.log(weather);
  getWikipedia(element.name);
}

// ----

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

// =================================================

/* location autocomplete for New Post-Page */
let currentPlace = 'currentPlace';

function initialize() {
  var options = {
    types: ['(regions)'],
  };
  var input = document.getElementById('searchTextField');
  var autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    currentPlace = place;
    console.log(place.name);
    // const descriptionField = document.getElementById('descriptionField');
    // descriptionField.setAttribute('placeholder', place.name);
  });
}
google.maps.event.addDomListener(window, 'load', initialize);

const addPostForm = document.getElementById('addPostForm');

/* 
===== HANDLING OF NEW ENTRY ===== 
*/

addPostForm.addEventListener('submit', onSubmit2);

// function onSubmit(event) {
//   event.preventDefault();
//   const wiki = getWikipedia(currentPlace.name);
//   console.log(wiki);
//   const newEntry = {
//     name: currentPlace.formatted_address,
//     coords: currentPlace.geometry.location.toJSON(),
//     postTitle: titleField.value,
//     postDescription: descriptionField.value,
//     rating: ratingField.value,
//     date: 'Visited in May 2019',
//     postImage1URL: currentPlace.photos[0].getUrl(),
//     postImage2URL: currentPlace.photos[1].getUrl(),
//     postAuthor: 'Guest',
//     wiki: 'no wiki',
//   };
//   addToLocalStorage(newEntry);
//   addPostForm.reset();
// }

/* 
===== WEATHER =====  
*/

function addWeatherToPage(temperature) {
  console.log('bla:', temperature);
  const weatherContainer = document.getElementById('weatherContainer');
  console.log(weatherContainer);
  weatherContainer.innerHTML = `The current Temperature is ${temperature} degrees Celsius`;
}

function getWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=80ab875a41f65bcfc23fdbad56346559&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const actualTemperature = data.main.temp;
      // const feelsLike = data.main.feels_like;
      // console.log(actualTemperature);
      // const resultText = createWeatherInformation(
      //   city,
      //   actualTemperature,
      //   feelsLike
      // );
      // console.log(resultText);
      addWeatherToPage(actualTemperature);
      return actualTemperature;
    })
    .catch((error) => {
      return 'Something went wrong...' + error;
    });
}

function watch(offset) {
  const watchContainer = document.getElementById('watchContainer');
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
  watchContainer.innerHTML = `UTC Time is: ${hour}:${mins}:${seconds}`;
  return `${hour}:${mins}:${seconds} - ${offset} - ${time}`;
}

/* 
===== wiki =====
 */

// function getWikipedia(name) {
//   fetch(
//     `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=1&exsentences=3&explaintext&origin=*&titles=${name}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       const pageID = Object.keys(data.query.pages);
//       const wiki = data.query.pages[pageID].extract;
//     });
// }

// const getWikipedia = async (name) => {
//   const response = await fetch(
//     `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=1&exsentences=3&explaintext&origin=*&titles=${name}`
//   );
//   const data = await response.json();
//   const pageID = Object.keys(data.query.pages);
//   return data.query.pages[pageID].extract;
// };

function onSubmit2(event) {
  event.preventDefault();
  const name = currentPlace.name;
  console.log(event);
  fetch(
    `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=1&exsentences=3&explaintext&origin=*&titles=${name}`
  )
    .then((response) => response.json())
    .then((data) => {
      const pageID = Object.keys(data.query.pages);
      let wiki;

      /* check if wiki is correct */
      if (pageID[0] == '-1') {
        wiki = '';
      } else {
        wiki = data.query.pages[pageID].extract;
        if (wiki.length < 100) {
          wiki = '';
          console.log('no wiki answer');
        }
      }
      wiki = removeUnwantedWiki(wiki);

      const newEntry = {
        name: currentPlace.formatted_address,
        coords: currentPlace.geometry.location.toJSON(),
        postTitle: titleField.value,
        postDescription: descriptionField.value,
        rating: ratingField.value,
        date: 'Visited in May 2019',
        postImage1URL: currentPlace.photos[0].getUrl(),
        postImage2URL: currentPlace.photos[1].getUrl(),
        postAuthor: 'Guest',
        wiki: wiki,
      };
      addToLocalStorage(newEntry);
      addPostForm.reset();
      // const addPostForm = document.getElementById('addPostForm');
      addPostForm.classList.toggle('hidden');
    });
}

/* remove the 'listen'-text from the wiki - only works, when inside () */
function removeUnwantedWiki(text) {
  // console.log('dasjasklsdakdasjklad', text);
  return text.replaceAll('(listen)', '');
}

// ==========================================
function addPost() {
  // const addPostForm = document.getElementById('addPostForm');
  // addPostForm.classList.toggle('hidden');

  // const blogContainer = document.getElementById('blogContainer');
  blogContainer.innerHTML = '';
  // alert('dddd');

  /* ===== STYLE BANNER ===== */
  const bannerImage = document.getElementById('bannerImage');
  const bannerTitle = document.getElementById('bannerTitle');
  const bannerButton = document.getElementById('bannerButton');
  const bannerLink = document.getElementById('bannerLink');

  bannerImage.style.backgroundImage = `url(https://picsum.photos/id/0/1000/535)`;
  bannerButton.innerText = '< Back';
  bannerLink.setAttribute('href', './index.html');
  bannerTitle.innerHTML = 'Add new post...';

  const addPostForm = document.getElementById('addPostForm');
  addPostForm.classList.remove('hidden');
  window.scrollTo(0, 0);
}
