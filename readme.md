# Around the World - The Travel Blog



## About this Project

This is my contribution for the first Project for the Full-Stack Web Development-Course at the [Hamburg Coding School.](https://hamburgcodingschool.com/)

The Page is live here: https://shaefelinger.github.io/HCS-project1-travelBlog/index.html

## Features

The page is fully responsive.  

It uses no frameworks, just vanilla HTML, CSS and Javascript. It's a single HTML-Page and all content is added and removed via Javascript.

All data is stored in the Local Storage of the Browser, the App fetches information from the following APIs:

- Google Maps
- Wikipedia
- Openweathermaps

There are 5 main pages: Overview-Page, Details-Page, Map-Page, +AddPost-page, and the About-Page: 

### Overview-Page

Displays all posts als cards.

Each card shows an image, a part of the discription (if there is no description, it will show the Wiki-text) and the rating.

If you click on a card, it will open the Details-Page for that location.

### Details-Page

This shows all available information for that location:

- Images
- Travel-Date
- Rating
- All Text (Title, description, wiki)
- Local Weather - fetched from https://openweathermap.org/
- Local Time (Timezone is fetched from Google Maps)
- A map for that Location
- Delete-Button to remove the post

### Map-Page

Shows all locations on a map. The zoom is automatically adapted to fit all locations.

Clicking on a marker opens an Info-popup for that location. Clicking on this popup opens the corresponding Details-Page. 

### +Add-Post-Page

Here you enter a new post. Location, Title and Date are required, the rest is optional. 

The Location-Field uses Googlemaps-Autocomplete.  After entering a valid location from the list, the Input-Field gets locked and the following Information is fetched:

###### From Googlemaps:

- 2 images. If no images are available, it uses fallback-images. 
- The Location (lat, lng)
- The Timezone
- Name & Country
- Place-ID

###### From Wikipedia:

- A short desciption  (if available). The text can then be edited.

### Reset All

Resets the Local Storage to 2 default values. This is also automatically done if the Local Storage is empty.

### About Page

Shows some information about this project and about me.

------

(c) 2021 - Steffen Häfelinger. Pictures by https://unsplash.com/ and https://picsum.photos/  

Steffen Häfelinger is a web developer located in Hamburg, Germany. He is currently studying Full Stack Web Developement at [Hamburg Coding School.](https://hamburgcodingschool.com/) He is also working as a professional Musician, Songwriter & Audio Engineer.

Web: www.steffen-haefelinger.com

Mail: mail@steffen-haefelinger.com

GitHub: https://github.com/shaefelinger

Facebook: https://www.facebook.com/steffen.hafelinger/