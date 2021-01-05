* map-overview for all locations -> auto zoom
* cleanup css
* implement weather -> icon
    * check error of weather
* local time mit nullen oder als uhr
* icon and page title
* burger menu

* links: google, wiki, reiseportal?

* finetune layout -> responsice and design
    * bilder sind zu klein  

* check other browsers
* check: wann werden neue fenster geöffnet?


https://www.mediawiki.org/wiki/API:Main_page

https://www.mediawiki.org/wiki/Extension:TextExtracts#API



https://en.wikipedia.org/w/api.php?action=query&titles=Las Vegas&prop=extracts&format=json&exintro=1&exsentences=3



=============
Hey Jonas,

ich hab mal ne Frage zum Projekt:

Ich will die Google-Places-Api benutzen, um zudatzloche Infos (Location, Bilder, etc.) zu bekommen.

Es funkioniert in Postman, wenn ich zb folgenden Code benutze:

https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&fields=name,geometry&key=AIzaSyC6iru9XKYIvVQaPG6oK1sLFBXyeSJkwWs&input=London, UK

Wenn ich dasselbe im Browser/Javascript benutze, erhalte ich den Error:
Access to fetch at 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&key=AIzaSyC6iru9XKYIvVQaPG6oK1sLFBXyeSJkwWs&input=London,%20UK' from origin 'http://127.0.0.1:5501' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

Ich hab rausgefunden, dass es funktioniert, wenn ich eine Proxy-Adresse ('https://cors-anywhere.herokuapp.com/') davor benutze. Das ist allerdings etwas unzuverlässig: mal war der Proxy down, mal kam ein Error, dass ich zu viele Requests gestellt hätte,...
  
Ich bin auf der Suche nach einer bessere Lösung, hast Du vielleicht einen Tipp für mich?
Vielleicht irgendwie mit: " set the request's mode to 'no-cors' ", wie in der Error-message beschrieben ?? 

Liebe Grüsse
Steffen


