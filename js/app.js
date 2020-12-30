/* location autocomplete  */
// function initialize() {
//   var options = {
//     types: ['(regions)'],
//   };
//   var input = document.getElementById('searchTextField');
//   var autocomplete = new google.maps.places.Autocomplete(input, options);
// }
// google.maps.event.addDomListener(window, 'load', initialize);

/* ================================ */
const blogPosts = [
  {
    name: 'Tübingen, Germany',
    coords: [48.5216364, 9.0576448],

    postTitle: 'The lovely City i used to live in',
    postDescription:
      'mir geht es gut, wie geht es dir? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! perferendis eaque, exercitationem praesentium nihil. Nulla! perferendis eaque, exercitationem praesentium nihil. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! perferendis eaque, exercitationem praesentium nihil. Nulla! perferendis eaque, exercitationem praesentium nihil Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! perferendis eaque, exercitationem praesentium nihil. Nulla! perferendis eaque, exercitationem praesentium nihil. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! perferendis eaque, exercitationem praesentium nihil. Nulla!Schluss',
    rating: '4',
    date: 'Visited in May 2019',
    postImage1URL:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwJr07k53jQW9IvYkW1H-muAZc8BrLM7WbpBKxfr6jWqzl-gpXwlNCUpLdd4Hw2-2y6QxzwAMYyk6fBHecgFjwF07DWiPcxI9QI674x9iy5KKAwoRGgWRiKetr0DovD7A3--8PHf0TIjBvJu8RHRwzqmYJrPEolskNKaAmTaxvchkiaG&3u1599&5m1&2e1&callback=none&key=AIzaSyC6iru9XKYIvVQaPG6oK1sLFBXyeSJkwWs&token=67626',
    postImage2URL: 'https://picsum.photos/id/249/500',
    postImage3URL: 'https://picsum.photos/id/240/500',
    postImage4URL: 'https://picsum.photos/id/340/500',
    postAuthor: 'Steffen Häfelinger',
  },
  {
    name: 'Wilhelmshaven, Germany',
    coords: [53.53234029999999, 8.1068722],
    postTitle: 'Schlicktown i used to live in',
    postDescription:
      'mir geht es nocht so gut, wie geht es dir? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia',
    rating: '2',
    date: 'Visited in August 1989',
    postImage1URL:
      'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sATtYBwI2OePT8IOxK_qO1okxl-aY233Z1cL6RW3xgShigsuxKrtO2Vd6V-Sy_2igVEodwlXwq4fHNuoZR1tjEvBfUlwMmYR0VF2gxiWJZCNWvJ_q6U6aWzzFkGxJmIgWXy94sbF5n3x4IPN4IrRi8yzMNi5LGjFyeBudT-FU9E6e4Q0GOSpN&3u4208&5m1&2e1&callback=none&key=AIzaSyC6iru9XKYIvVQaPG6oK1sLFBXyeSJkwWs&token=49277',
    postImage2URL: 'https://picsum.photos/id/356/500',
    postImage3URL: 'https://picsum.photos/id/351/500',
    postImage4URL: 'https://picsum.photos/id/451/500',
    postAuthor: 'Guest',
  },
  {
    name: 'Wilhelmshaven, Germany',
    coords: [53.53234029999999, 8.1068722],

    postTitle: 'The ole Schlicktown i used to live in',
    postDescription:
      'mir geht es nocht so gut, wie geht es dir? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! perferendis eaque, exercitationem praesentium nihil',
    rating: '3',
    date: 'Visited in May 2019',
    postImage1URL: 'https://picsum.photos/id/15/500',
    postImage2URL: 'https://picsum.photos/id/353/500',
    postImage3URL: 'https://picsum.photos/id/351/500',
    postImage4URL: 'https://picsum.photos/id/451/500',

    postAuthor: 'Guest',
  },
  {
    name: 'Los Angeles, USA',
    coords: [34.052235, -118.243683],

    postTitle: 'The ole Schlicktown i used to live in',
    postDescription:
      'mir geht es nocht so gut, wie geht es dir? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! perferendis eaque, exercitationem praesentium nihil',
    rating: '1',
    date: '',
    postImage1URL: 'https://picsum.photos/id/600/500',
    postImage2URL: 'https://picsum.photos/id/151/500',
    postImage3URL: 'https://picsum.photos/id/161/500',
    postImage4URL: 'https://picsum.photos/id/161/500',

    postAuthor: 'Guest',
  },
];

// console.log(blogPosts);

function printAllPosts() {
  // blogPosts.forEach((element) => {
  //   console.log(element.name);
  // });
  blogPosts.forEach(addOnePost);
}

printAllPosts();

/* ***** ALL POSTS AS OVERVIEW ***** */
function addOnePost(element, index) {
  const blogContainer = document.getElementById('blogContainer');
  const newArticle = document.createElement('div');
  newArticle.classList.add('blogPost');
  newArticle.setAttribute('id', `${index}`);

  newArticle.innerHTML = `
   <div class="overlayButton"></div>
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
  newArticle.addEventListener('click', onClick);
  blogContainer.appendChild(newArticle);
}

//

// <!--   <div class="blogImage"
// style="background-image: url(${element.postImage2URL});
// width: 25%;
// height: 220px;
// background-repeat: no-repeat;
// background-size: 100%;">
// </div> --!>

/* ===================== SINGLE POST-BLOGPAGE ===================== */
function onClick(object) {
  const id = object.path[1].id;
  const element = blogPosts[id];

  const blogContainer = document.getElementById('blogContainer');
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

  {
    /* <div class="blogpageArticeImage" 
  style="background-image: url(${element.postImage2URL}); 
  width: 40%;
  height: 400px;
  background-repeat: no-repeat;
  background-size: 100%;
  float: right">
</div> */
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
  console.log(coords);
  const uluru = { lat: coords[0], lng: coords[1] };
  console.log(uluru);
  const options = {
    zoom: 8,
    center: uluru,
    // mapTypeId: 'hybrid',
    disableDefaultUI: true,
  };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById('map'), options);
  const marker = new google.maps.Marker({
    // position: uluru,
    position: uluru,
    map: map,
  });
  // function addMarker(props) {
  //   const marker = new google.maps.Marker({
  //     position: props.coords,
  //     map: map1,
  //   });
}

// check for custom image
// check content
// if (props.content) {
//   const infoWindow = new google.maps.InfoWindow({
//     content: props.content,
//   });
//   marker.addListener('click', function () {
//     infoWindow.open(map, marker);
//   });
// }

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
// markers.forEach(addMarker);

/*
  const infoWindow = new google.maps.InfoWindow({
      content: '<h1>Hallo</h1',
  });
  marker.addListener('click', function () {
      infoWindow.open(map, marker);
  })
  */
