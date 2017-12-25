//import {mediaList} from 'mediasources.js';

var globalURL;
var oldURL = "genericwebsite";
var slider;
var check;

var opposing = {};
var mediaStor = {};

//load settings

function onGot(item) {

//added 12/23
  if (!item.userSettings) {
    userSettings = {
      check: 1,
      slide: 50
      }
    browser.storage.local.set({userSettings});
  } else {

  slider = item.userSettings.slide;
  check = item.userSettings.check;
    }
  //console.log("slide: " + slider);
  //console.log("check: " + check);
}

function settings(){
  // load user settings
  var getSettings = browser.storage.local.get("userSettings");
  getSettings.then(onGot);
  }

// Load existent stats with the storage API.
var gettingStoredStats = browser.storage.local.get("hostNavigationStats");
//var opposingStoredStats = browser.storage.local.get("opposingNavigationStats");

settings();

gettingStoredStats.then(results => {

  

  // Initialize the saved stats if not yet initialized.
  if (!results.hostNavigationStats) {
    results = {
      hostNavigationStats: {}
    };
  }

  if (!opposing.opposingNavigationStats){
    opposing = {
      opposingNavigationStats: {}
    };
  }

  console.log("Confirmation Bias Extension BEGIN");

  const {opposingNavigationStats} = opposing;
  const {hostNavigationStats} = results;

  // Monitor completed navigation events and update
  // stats accordingly.
  browser.webNavigation.onCompleted.addListener(evt => {
    settings();

    if (check == true){

      // Filter out any sub-frame related navigation event
      if (evt.frameId !== 0) {
        return;
      }

      const url = new URL(evt.url);

      //check if url is considered a news site
      if (checkMedia(url) == 1){
        hostNavigationStats[url.hostname] = hostNavigationStats[url.hostname] || 0;
        hostNavigationStats[url.hostname]++;

        //make notification
        //checks to make sure it wont be redundant
        globalURL = oppositionMedia(url);
        var thisURL = url.toString();

        if (thisURL.includes(oldURL) == false){
          notify(globalURL, polX);
          oldURL = globalURL;

          opposingNavigationStats[globalURL] = opposingNavigationStats[globalURL] || 0;
          opposingNavigationStats[globalURL]++;
    
        }

        // Persist the updated stats.
        browser.storage.local.set(results);
        browser.storage.local.set(opposing);

      };
    }
  }, {
    url: [{schemes: ["http", "https"]}]});
});

//clickable notification link
browser.notifications.onClicked.addListener(()=> {
  notificationClick(globalURL);
  });
  

function notificationClick(link){
    //go to url
    //console.log("clicked: " + link);
    browser.tabs.create({url: "http://www." + link});
  }

/*
Log that we received the message.
Then display a notification. The notification contains the URL,
which we read from the message.
*/

function notify(message, polX) {
  //console.log("background script received message!");
  var title = browser.i18n.getMessage("notificationTitle");
  var content = browser.i18n.getMessage("notificationContent", message);
  var politics;

  if (polX > 0){
    politics = "more left wing";
  } else if (polX = 0){
    politics = "politically similar";
  } else {
    politics = "more right wing";
  }


  browser.notifications.create({
    "type": "basic",
    "iconUrl": browser.extension.getURL("icons/confirmationicon3b-48.png"),
    "title": title,
    "message": `${content} \n \n It's ${politics} and trusted differently.`
  });
}

function checkMedia(message){
  //console.log("checking media: " + message);
  var isNews = 0;
  var theMessage = message.toString();

  // get the media array
  var mediaSources = mediaList();

  //get length of list of media sources
  for (i = 0; i< mediaSources.length; i++){
    var checkIt = mediaSources[i][0];
    if (theMessage.includes(checkIt) == true){
      return 1;
    };
  };
}

/*determine and retrieve media in opposition to the users behaviour.
Determines distance based on the politics (X) and 
the subjective trustworthyness (Y) of a given publication.
Does not recommend social media sites, but does factor it into calculations.
*/
function oppositionMedia(message){
  var mediaSources = mediaList();
  var theMessage = message.toString();
  var X1;
  var Y1;
  var distance;
  // must be scale to account for hypotenues
  //console.log(slider);
  var min = ((.3 + (slider * .0025))* 2.236);  //minimum media difference to be considered.
  var max = ((.5 + (slider * .005))* 2.236);

  var f = 0; //index for possibles

//  check min scaling
//console.log("slider: " + slider + ", min: " + min + ", max: " + max);

  //get X and Y of message
  for (i = 0; i< mediaSources.length; i++){
    var checkIt = mediaSources[i][0];
    if (theMessage.includes(checkIt) == true){
      X1 = mediaSources[i][1];
      Y1 = mediaSources[i][2];
      break;
    };
  };

  //got through array and run equation, pull out indexes of possible outputs
  var possibles = new Array();

  for (i = 0; i< mediaSources.length; i++){
    var X2 = mediaSources[i][1];
    var Y2 = mediaSources[i][2];

    distance = Math.sqrt(Math.pow((X1 - X2), 2) + Math.pow((Y1 - Y2), 2));
    //console.log("distance: " + distance);
    if (distance >= min && distance <= max){
      if (mediaSources[i][3] <= 2){ //check that it isn't a social media or extremist site
        possibles[f] = i; //add new possibility to list
        f++;
      }
    }
  }

  //randomly select one of the possible outputs
  var pickIt = Math.trunc(Math.random() * possibles.length); //check that it isn't short 1

  getDistance(X1, Y1, mediaSources[possibles[pickIt]][1], mediaSources[possibles[pickIt]][2]);
  //returns a link to suggest
  return mediaSources[possibles[pickIt]][0];
}

var polX;
var trustY;

function getDistance(X1, Y1, X2, Y2){
  polX = (X1 + 1) - (X2 + 1);
  trustY = Y1 - Y2;
}