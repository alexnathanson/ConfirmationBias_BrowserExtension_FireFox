// Get the saved stats and render the data in the popup window.
var gettingStoredStats = browser.storage.local.get("hostNavigationStats");
gettingStoredStats.then(results => {
  if (!results.hostNavigationStats) {
    return;
  }

  const {hostNavigationStats} = results;
  const sortedHostnames = Object.keys(hostNavigationStats).sort((a, b) => {
    return hostNavigationStats[a] <= hostNavigationStats[b];
  });

  if (sortedHostnames.length === 0) {
    return;
  }

  let listEl = document.querySelector("ul");
  while(listEl.firstChild)
    listEl.removeChild(listEl.firstChild);

  const MAX_ITEMS = 5;
  for (let i=0; i < sortedHostnames.length; i++) {
    if (i >= MAX_ITEMS) {
      break;
    }

    const listItem = document.createElement("li");
    const hostname = sortedHostnames[i];
    listItem.textContent = `${hostname}: ${hostNavigationStats[hostname]} visit(s)`;
    listEl.appendChild(listItem);
  }
});

/*
//Get the saved settings
var getSet = browser.storage.local.get("intensity");
getSet.then(intensity => {
  if (!intensity.intensity) {
    return;
  }
  var getIntense = browser.storage.local.get("intensity");
  var getOff = browser.storage.local.get("onOff");
  //set elements
  if (getOff = 1 ){
    thisEl[0].checked = true;
  } else {
    thisEl[0].checked = false;
  }
  
  thisEl[1].value = getIntense;

  //set value number
  var output = document.getElementById("value");
  output.innerHTML = getIntense;
})


// settings
var checkEl = document.getElementById("settings");
var thisEl = checkEl.getElementsByTagName("input")

thisEl[0].onclick = function(){
  let onOff = {onOff: this.value}
  browser.storage.local.set({onOff});
  if (thisEl[0].checked == true){
    console.log("Wow~ On");
  } else {
    console.log("Wow~ Off");
  }
}
thisEl[1].oninput = function(){
    //console.log(this.value);
    var output = document.getElementById("value");
    let intensity = {intensity: this.value}
    //store settings
    browser.storage.local.set({intensity});
  }

var getSet = browser.storage.local.get("intensity");
getSet.then(onGot);
function onGot(item) {
  if(item.intensity.newValue.intensity){
  var slider = item.intensity.newValue.intensity;
  var output = document.getElementById("value");
  output.innerHTML = slider;
}}
*/

/*
//Choose and retrieve images
var imageNum = (Math.random() * 4) + 1;
imageNum = Math.trunc(imageNum);

//console.log("the random number is:" + imageNum);

var imageSel = "http://themonkeycage.org/wp-content/uploads/2012/04/Post3Figure1.png";

switch(imageNum){
  case 1:
    imageSel = "http://themonkeycage.org/wp-content/uploads/2012/04/Post3Figure1.png" ;
    break;
  case 2:
    imageSel = "http://alexnathanson.com/images/sewage1.jpg";
    break;
  case 3:
    imageSel = "http://alexnathanson.com/images/sewage2.jpg";
    break;
  case 4:
    imageSel = "http://alexnathanson.com/images/sewage3.jpg";
    break;
}

document.getElementById("img").src= imageSel;
*/

//canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var canvasImage = new Image;
canvasImage.src = "images/ConfirmationBias_mediavectorgraph.jpg";
ctx.drawImage(canvasImage, 0, 0);

ctx.fillStyle = "#ffffff";

for (i=0; i<50;i++){
ctx.beginPath();
ctx.arc((Math.random()*400),(Math.random()*400),2,0,2*Math.PI);
ctx.fill();
}