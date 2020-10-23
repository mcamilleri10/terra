## Intro
Terra is a climate data educational tool that uses multiple statistical models to view visualize how different level of emissions will impact the climate in a particular location. Users can select both the location and a climate indicator (avg high temps, total precipitation, etc.), and view an animated and dynamic chart of historical data beginning in 1950, and multiple models of future data until 2100.

### Technologies Used in Building Terra
* JavaScript
* D3.js
* Webpack
* Babel
* HTML5
* CSS3

### APIs and Third Party Resources
* Azavea Climate API (Climate Data)
* Google Maps API (Maps Data)
* Font Awesome (Icons)
* Unsplash (Background Image)

## Features
### User Selected Parameters
Users are able to select both a location and climate indicator to view a customized animated line chart.
![form](https://github.com/troubadour10/terra/blob/gh-pages/src/images/form-screenshot.png "Form")
### Animated Line Chart
Utilizing D3.js, an animated line chart is rendered based on the user selected inputs.
![chart](https://media.giphy.com/media/XPOyA8lErOeWDlLABj/giphy.gif)
### Google Maps Integration
Upon user selection, an embedded map travels to the chosen location.
