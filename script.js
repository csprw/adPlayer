console.log("Script loaded");

var mainVid = document.getElementById("mainVid");
var ad1 = document.getElementById("ad1");
ad1.style.display = "none"

var ad2 = document.getElementById("ad2");
ad2.style.display = "none"

var ad3 = document.getElementById("ad3");
ad3.style.display = "none"

mainVid.onloadeddata = function() {
    // mainVid.currentTime = 10;
    mainVid.play()
};

ad3.onloadeddata = function() {
  ad3.currentTime = 1; //Just to illusrate as begining is black screen
  ad3.pause()
};

ad1.onended = function() {
  mainVid.play()
  ad1.style.display = "none"
  mainVid.style.display = "block"
  
  var skipButton = document.getElementById("buttonPlaceholder");
    skipButton.style.display="none"
};
ad2.onended = function() {
  mainVid.play()
  ad2.style.display = "none"
  mainVid.style.display = "block"

  var skipButton = document.getElementById("buttonPlaceholder");
  skipButton.style.display="none"
};
ad3.onended = function() {
  mainVid.play()
  ad3.style.display = "none"
  mainVid.style.display = "block"
  var skipButton = document.getElementById("buttonPlaceholder");
  skipButton.style.display="none"
};


// ad1.onloadeddata = function() {
//     // ad1.currentTime = 80; //Just to illusrate as begining is black screen
//     ad1.pause()
// };

// mainVid.onended = function() {
//     ad1.play()
//     mainVid.style.display = "none"
//     ad1.style.display = "block"
// };



// ad1.onended = function() {
//   mainVid.play()
//   ad1.style.display = "none"
//   mainVid.style.display = "block"

//   console.log("BACK TO MAIN?");
//   var skipButton = document.getElementById("buttonPlaceholder");
//   skipButton.style.display="none"
// };


function play_commercial(adNumber) {
  console.log("[Debug] play commercial: ", adNumber);

  var adName = "ad" + adNumber;
  var adElement = document.getElementById(adName);
  
  mainVid.pause();
  adElement.play();
  mainVid.style.display = "none";
  adElement.style.display = "block";

  setTimeout(function () {
    var skipButton = document.getElementById("buttonPlaceholder");
    skipButton.style.display = "block"
  }, 1000);
  
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

// For timeUpdates
var lastSecond = null;
var secondsToAd1 = 29;
var secondsToAd2 = 17;
var secondsToAd3 = 12;
var arr = [0];

$(mainVid).on('timeupdate', function(e) {
  var seconds = Math.floor(e.target.currentTime);

  if (seconds == secondsToAd1 && !(isInArray(seconds, arr))) {
    arr.push(seconds);
    play_commercial(1);
  };

  if (seconds == secondsToAd2 && !(isInArray(seconds, arr))) {
    arr.push(seconds);
    play_commercial(2);
  };

  if (seconds == secondsToAd3 && !(isInArray(seconds, arr))) {
    arr.push(seconds);
    play_commercial(3);
  };
});


// For skipping ads
var skipButton = document.getElementById("buttonPlaceholder");
skipButton.addEventListener("click", skipAd);

function skipAd() {
  console.log("[debug] skipAd");
  var vids = document.querySelectorAll('video');

  for (const item of vids) {
      console.log("Looping:  " + item.style.display );

      if (item.style.display == "block") {
        console.log("DISPLAYED: ", item);
        item.pause();
        item.style.display = "none";
      }

      mainVid.play()
      mainVid.style.display = "block"
      console.log("[debug] Back to main after clicking");
      
  }

  var skipButton = document.getElementById("buttonPlaceholder");
  skipButton.style.display="none"
}