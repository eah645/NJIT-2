// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (/* function */ callback, /* DOMElement */ element) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
  requestAnimFrame(animate);
  var currentTime = new Date().getTime();
  if (mLastFrameTime === 0) {
    mLastFrameTime = currentTime;
  }

  if (currentTime - mLastFrameTime > mWaitTime) {
    swapPhoto();
    mLastFrameTime = currentTime;
  }
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
  //Makes index repeat itself once it reaches end
  if (mCurrentIndex >= mImages.length) {
    mCurrentIndex = 0;
  }

  //Sets value to last object if you go backwards from start
  if (mCurrentIndex < 0) {
    mCurrentIndex = mImages.length - 1;
  }
  //Adds in the actual data to the page so it's visible (at least the photo definitely)
  document.getElementById("photo").src = mImages[mCurrentIndex].img;
  var loc = document.getElementsByClassName("location");
  loc[0].innerHTML = "Location: " + mImages[mCurrentIndex].location;

  var des = document.getElementsByClassName("description");
  des[0].innerHTML = "Description: " + mImages[mCurrentIndex].description;

  var dt = document.getElementsByClassName("date");
  dt[0].innerHTML = "Date: " + mImages[mCurrentIndex].date;

  mLastFrameTime = 0; //Restarts timer
  mCurrentIndex += 1; //Adds one when swapPhoto works

  //Add code here to access the #slideShow element.
  //Access the img element and replace its source
  //with a new image from your images array which is loaded
  //from the JSON string
  //console.log('swap photo');
}

function reversePhoto() {
  //Makes index repeat itself once it reaches end
  if (mCurrentIndex >= mImages.length) {
    mCurrentIndex = 0;
  }

  //Sets value to last object if you go backwards from start
  if (mCurrentIndex < 0) {
    mCurrentIndex = mImages.length - 1;
  }
  //Adds in the actual data to the page so it's visible (at least the photo definitely)
  document.getElementById("photo").src = mImages[mCurrentIndex].img;
  var loc = document.getElementsByClassName("location");
  loc[0].innerHTML = "location: " + mImages[mCurrentIndex].location;

  var des = document.getElementsByClassName("description");
  des[0].innerHTML = "Description: " + mImages[mCurrentIndex].description;

  var dt = document.getElementsByClassName("date");
  dt[0].innerHTML = "Date: " + mImages[mCurrentIndex].date;

  mLastFrameTime = 0; //Restarts timer
  mCurrentIndex -= 1; //Minus one when reversePhoto works

  //Add code here to access the #slideShow element.
  //Access the img element and replace its source
  //with a new image from your images array which is loaded
  //from the JSON string
  //console.log('swap photo');
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = "extra.json";

//Part 2 function
//Pulls out Json data
function fetchJSON() {
  mRequest.onreadystatechange = function () {
    console.log("on ready state change");
    if (this.readyState == 4 && this.status == 200) {
      mJson = JSON.parse(mRequest.responseText);
      iterateJson(mJson);
    }
  };
  mRequest.open("GET", mUrl, true);
  mRequest.send();
}

//Moving through JSON file and making it into a new object?
//Pretty sure this adds the info about each image in the gallery
function iterateJson(mJson) {
  for (x = 0; x < mJson.images.length; x++) {
    mImages[x] = new GalleryImage();
    mImages[x].location = mJson.images[x].imgLocation;
    mImages[x].description = mJson.images[x].description;
    mImages[x].img = mJson.images[x].imgPath;
    mImages[x].date = mJson.images[x].date;
  }
}

//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
  return function (e) {
    galleryImage.img = e.target;
    mImages.push(galleryImage);
  };
}

$(document).ready(function () {
  $("#nextPhoto").position({
    my: "right center",
    at: "right",
    of: "#nav",
  });

  //Part 5- so make this
  const urlParams = new URLSearchParams(window.location.search);

  for (const [key, value] of urlParams) {
    console.log(`${key}:${value}`);
    mUrl = value;
  }
  if (mUrl == undefined) {
    mUrl = "https://api.npoint.io/a2a427005054ea24b4ae";
  }

  //$.get("json", function{
  //if()
  //})

  // This initially hides the photos' metadata information
  fetchJSON();
  //$('.details').eq(0).hide();
});

window.addEventListener(
  "load",
  function () {
    console.log("window loaded");
  },
  false
);

//Assigning data from JSON list to variables that will be used
function GalleryImage() {
  //implement me as an object to hold the following data about an image:
  //1. location where photo was taken
  //2. description of photo
  //3. the date when the photo was taken
  //4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
  // document.getElementById('photo').src = mImages[currentLocation].img
  // var location = document.getElementsByClassName('location');
  // location[0].innerHTML + 'Location' + mImages[mCurrentIndex].location;
  // var description = description[0].innerHTML + 'Description' + mImages[mCurrentIndex].description;
  // var date = date[0].innerHTML + 'Date' + mImages[mCurrentIndex].date;
  // var img = imgPath[0].innerHTML + 'Image' + mImages[mCurrentIndex].imgPath;
  var location = "";
  var description = "";
  var date = "";
  var source = "";
}

//Part 3 I think this is javascript
//Makes icon rotate and show/hide details
function rotate() {
  if ($(".moreIndicator").hasClass("rot90")) {
    $(".moreIndicator").removeClass("rot90");
    $(".moreIndicator").addClass("rot270");
    $(".details").slideToggle();
  } else {
    $(".moreIndicator").removeClass("rot270");
    $(".moreIndicator").addClass("rot90");
    $(".details").slideToggle();
  }
}
