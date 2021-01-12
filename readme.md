# Around the World - The Travel Blog



## About this Project

This Project was done as part of the Full-Stack Web Development-Course at the [Hamburg Coding School.](https://hamburgcodingschool.com/)

## Features

The page is fully responsive.  

It uses no Frameworks, just vanilla HTML, CSS and Javascript. It is just a single HTML-Page and all Content is added and removed via Javascript.

All Information is stored in the Local Storage of the Browser, the App fetches information from the following APIs:
\- Google Maps
\- Wikipedia
\- Openweathermaps

There are 5 Main Pages: Overview-Page, Details-Page, Map-Page, +AddPost-page, and the About-Page: 

### Overview-Page

Displays all Posts als Cards.

Each Card shows a Photo, the beginning of the discription (if there is no description, it will show the Wiki-text) and the Rating.

If you click on a Card, it will open the Details-Page for that location.

### Details-Page

This shows all available Information for that Location:

- Pictures
- Travel-Date
- Rating
- All Text (Title, description, wiki)
- Local Weather - fetched from https://openweathermap.org/
- Local Time (Timezone is fetched from Google Maps)
- A Map for that Location
- Delete-Button to remove the Post

### Map-Page

Shows all Locations on a map. The Zoom is automatically adapted to show all Locations.

Clicking on a marker opens a Info-popup for that Location. Clicking on the popup opens the correspondong Details-Page. 

### +Add-Post-Page

Here you enter a new Post. Location and Title are required, the rest is optional. 

The Location-Field uses Googlemaps- Autocomplete.  After entering a valid location from the list, the Input-Field gets locked and the following Information is fetched:

###### From Googlemaps:

- 2 Photos. If no Photos are available, it uses fallback-photos. 
- The Location (lat, lng)
- The Timezone
- Name&Country

###### From Wikipedia:

- A short desciption  (if available). The Text can then be edited.

### Reset All

Resets the Local Storage to 2 default Values. This is also automatically done, if the Local Sorage is empty.

### About Page

Shows some information about this Project and about me.

------

(c) 2021 - Steffen Häfelinger. Pictures by https://unsplash.com/ and https://picsum.photos/  

Steffen Häfelinger is a web developer located in Hamburg, Germany. He is currently studying Full Stack Web Developement at [Hamburg Coding School.](https://hamburgcodingschool.com/) He is also working as a professional Musician, Songwriter & Audio Engineer.



www.steffen-haefelinger.com	

mail: mail@steffen-haefelinger.com

GitHub: https://github.com/shaefelinger

Slack: 

Facebook: https://www.facebook.com/steffen.hafelinger/

Instagram: https://www.instagram.com/steffenhaefelinger/



