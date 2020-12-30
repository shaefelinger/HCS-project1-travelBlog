const blogPosts = [
  {
    name: 'Tübingen, Germany',
    coords: { lat: 48.5216364, lng: 9.0576448 },
    postTitle: 'The lovely City i used to live in',
    postDescription:
      'mir geht es gut, wie geht es dir? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! perferendis eaque, exercitationem praesentium nihil. Nulla! perferendis eaque, exercitationem praesentium nihil. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! perferendis eaque, exercitationem praesentium nihil. Nulla! perferendis eaque, exercitationem praesentium nihil Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! perferendis eaque, exercitationem praesentium nihil. Nulla! perferendis eaque, exercitationem praesentium nihil. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! perferendis eaque, exercitationem praesentium nihil. Nulla!Schluss',
    rating: '4',
    date: 'Visited in May 2019',
    postImage1URL:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwJr07k53jQW9IvYkW1H-muAZc8BrLM7WbpBKxfr6jWqzl-gpXwlNCUpLdd4Hw2-2y6QxzwAMYyk6fBHecgFjwF07DWiPcxI9QI674x9iy5KKAwoRGgWRiKetr0DovD7A3--8PHf0TIjBvJu8RHRwzqmYJrPEolskNKaAmTaxvchkiaG&3u1599&5m1&2e1&callback=none&key=AIzaSyC6iru9XKYIvVQaPG6oK1sLFBXyeSJkwWs&token=67626',
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
    postImage1URL:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwI2OePT8IOxK_qO1okxl-aY233Z1cL6RW3xgShigsuxKrtO2Vd6V-Sy_2igVEodwlXwq4fHNuoZR1tjEvBfUlwMmYR0VF2gxiWJZCNWvJ_q6U6aWzzFkGxJmIgWXy94sbF5n3x4IPN4IrRi8yzMNi5LGjFyeBudT-FU9E6e4Q0GOSpN&3u4208&5m1&2e1&callback=none&key=AIzaSyC6iru9XKYIvVQaPG6oK1sLFBXyeSJkwWs&token=49277',
    postImage2URL: 'https://picsum.photos/id/356/500',
    postAuthor: 'Guest',
  },
  {
    name: 'Los Angeles, USA',
    coords: { lat: 34.052235, lng: -118.243683 },

    postTitle: 'The ole Schlicktown i used to live in',
    postDescription:
      'mir geht es nocht so gut, wie geht es dir? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! perferendis eaque, exercitationem praesentium nihil',
    rating: '1',
    date: '',
    postImage1URL: 'https://picsum.photos/id/600/500',
    postImage2URL: 'https://picsum.photos/id/151/500',
    postAuthor: 'Guest',
  },
];

// localStorage.setItem('allLocations', JSON.stringify(blogPosts));

const blogContainer = document.getElementById('blogContainer');
/*
 ***** ALL POSTS AS OVERVIEW *****
 */
function printAllPosts() {
  // blogPosts.forEach((element) => {
  //   console.log(element.name);
  // });
  const allLocations = localStorage.getItem('allLocations');
  allLocationsParsed = JSON.parse(allLocations);
  // console.log(allLocationsParsed);
  // blogPosts.forEach(addOnePost);
  allLocationsParsed.forEach(addOnePost);
}

printAllPosts();

/* ***** ADD SINGLE POSTS AS CARD TO DOM ***** */
function addOnePost(element, index) {
  // console.log(element, index);
  // const blogContainer = document.getElementById('blogContainer');
  const newArticle = document.createElement('div');
  newArticle.classList.add('blogPost');
  // newArticle.setAttribute('id', `${index}`);

  newArticle.innerHTML = `
  <div class="overlayButton" id="${index}"></div>
    <div class="blogImage" 
      style="background-image: url(${element.postImage1URL}); 
      width: 100%;
      height: 200px;
      background-repeat: no-repeat;
      background-size: 100%;">
    </div>
    <div class="blogTextWrapper">
        <h2>${element.name}</h2>
      
        <h3>${element.postTitle}</h3>
        <p>${element.postDescription}</p>
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

//

// <!--   <div class="blogImage"
// style="background-image: url(${element.postImage2URL});
// width: 25%;
// height: 220px;
// background-repeat: no-repeat;
// background-size: 100%;">
// </div> --!>

/* ===================== SINGLE POST-BLOGPAGE => RESULT  ===================== */
function onClick(object) {
  console.log(object);
  console.log(object.srcElement.id);

  // const id = object.path[0].id;
  const id = object.srcElement.id;
  const array = JSON.parse(localStorage.getItem('allLocations'));
  // const element = blogPosts[id];
  const element = array[id];

  // const blogContainer = document.getElementById('blogContainer');
  blogContainer.innerHTML = '';

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

  // <div class="overlayButton"></div>
  newArticle.innerHTML = `
 
<div class="blogpageTextWrapper">
    <h3>${element.postTitle}</h3>
    
    <div class="blogpageArticeImage" 
      style="background-image: url(${element.postImage2URL}); 
      width: 100%;
      height: 400px;
      background-repeat: no-repeat;
      background-size: 100%;
      margin-bottom: 2rem">
    </div>

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
}

// addOnePost(blogPosts[0]);

// const newArticle = document.createElement('div');
// newArticle.classList.add('blogPost');

// console.log(newArticle);

// ----

function initMap(coords) {
  // The location of Uluru
  // console.log(coords);
  // const uluru = { lat: coords[0], lng: coords[1] };
  const uluru = coords;
  // const uluru = '40.712775,-74.005973';
  // console.log(uluru);
  const options = {
    zoom: 6,
    center: uluru,
    mapTypeId: 'hybrid',
    disableDefaultUI: true,
  };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById('map'), options);
  const marker = new google.maps.Marker({
    // position: uluru,
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
    // infowindow.close();
    const place = autocomplete.getPlace();
    // console.log(place);
    currentPlace = place;
    // if (!place.geometry) {
    //   return;
    // }

    // if (place.geometry.viewport) {
    //   map.fitBounds(place.geometry.viewport);
    // } else {
    //   map.setCenter(place.geometry.location);
    //   map.setZoom(17);
    // }
    // // Set the position of the marker using the place ID and location.
    // marker.setPlace({
    //   placeId: place.place_id,
    //   location: place.geometry.location,
    // });
    // marker.setVisible(true);
    // infowindowContent.children.namedItem('place-name').textContent = place.name;
    // infowindowContent.children.namedItem('place-id').textContent =
    //   place.place_id;
    // infowindowContent.children.namedItem('place-address').textContent =
    //   place.formatted_address;
    // console.log(place);

    // storeResult(place, input.value);
    // printResult(place, input.value);
  });
}
google.maps.event.addDomListener(window, 'load', initialize);

const addPostForm = document.getElementById('addPostForm');

// alert(addPostForm);
addPostForm.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  // console.log(currentPlace, titleField.value, descriptionField.value);
  // const place = autocomplete.getPlace();
  // console.log(place);
  // const location = searchTextField.value;
  // getInfoFromGoogleApi(location);
  // getMap(location);
  // userInputForm.reset();
  // console.log(currentPlace);
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
  };

  // const stringifiedNewEntry = JSON.stringify(newEntry);
  // console.log(stringifiedNewEntry);
  addToLocalStorage(newEntry);
}

function addToLocalStorage(newElement) {
  let array = [];
  array = JSON.parse(localStorage.getItem('allLocations'));
  array.push(newElement);
  // blogPosts = array;
  // console.log(blogPosts);

  localStorage.setItem('allLocations', JSON.stringify(array));
  blogContainer.innerHTML = '';

  printAllPosts();
}
