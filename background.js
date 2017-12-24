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
          notify(globalURL);
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

function notify(message) {
  //console.log("background script received message!");
  var title = browser.i18n.getMessage("notificationTitle");
  var content = browser.i18n.getMessage("notificationContent", message);
  var distance = "left";
  var factualness = "less";
  browser.notifications.create({
    "type": "basic",
    "iconUrl": browser.extension.getURL("icons/confirmationicon3b-48.png"),
    "title": title,
    "message": `${content} \n It's more ${distance} wing and ${factualness} fact based`
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
the factualness (Y) of a given publication.
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

  //returns a link to suggest
  return mediaSources[possibles[pickIt]][0];
}

function mediaList(){
  /*array guide
  [0] = URL
  [1] political position (left < Right)
  [2] factualness (True > False)
  [3] = media type (traditional - 1, fact checker - 2, social media - 3, 
  not linked to too (url wierdness, conspiracy theories, hate site, etc.) - 4)
  */

 
//This is the master list. Should be moved to a text file.
  var mediaSources = new Array();
  mediaSources[0] = new Array ("nytimes.com", -.1, .85, 1);
  mediaSources[1] = new Array ("theintercept.com", -.8, .9, 1);
  mediaSources[2] = new Array ("npr.org", -.2, .9, 1);
  mediaSources[3] = new Array ("wsj.com", .3, .85, 1);
  mediaSources[4] = new Array ("facebook.com", 0, 0, 3);
  mediaSources[5] = new Array ("twitter.com", 0, 0, 3);
  mediaSources[6] = new Array ("foxnews.com", .8, .29, 1);
  mediaSources[7] = new Array ("breitbart.com", .9, .1, 1);
  mediaSources[8] = new Array ("indypendent.org", -.9, .6, 1);
  mediaSources[9] = new Array ("snopes.com", 0, .95, 2);
  mediaSources[10] = new Array ("theatlantic.com", -.75, .9, 1);
  mediaSources[11] = new Array ("washingtonpost.com", .1, .85, 1);
  mediaSources[12] = new Array ("newyorker.com", -.3, .85, 1);
  mediaSources[13] = new Array ("miamiherald.com", 0, .85, 1);
  mediaSources[14] = new Array ("heraldtribune.com", 0, .85, 1);
  mediaSources[15] = new Array ("huffingtonpost.com", -.2, .8, 1);
  mediaSources[16] = new Array ("cnn.com", 0, .6, 1);
  mediaSources[17] = new Array ("nbcnews.com", 0, .85, 1);
  mediaSources[18] = new Array ("abcnews.go.com", 0, .85, 1);
  mediaSources[19] = new Array ("bbcnews.com", 0, .9, 1);
  mediaSources[20] = new Array ("latimes.com", 0, .85, 1);
  mediaSources[21] = new Array ("pewresearch.org", 0, 1, 1); //journalism.org is another site run by pew
  mediaSources[22] = new Array ("the-daily-show-with-trevor-noah", -.8, .4, 1); //trigger only, no redirection. (would need to link to www.dailyshow.com)
  mediaSources[23] = new Array ("businessinsider.com", 0, .85, 1);
  mediaSources[24] = new Array ("theeconomist.com", 0, .9, 1);
  mediaSources[25] = new Array ("buzzfeed.com", -.25, .45, 1);
  mediaSources[26] = new Array ("rushlimbaugh.com", 1, .25, 1);
  mediaSources[27] = new Array ("thehill.com", 0, .85, 1);
  mediaSources[28] = new Array ("pbs.org", 0, .9, 1);
  mediaSources[29] = new Array ("usatoday.com", 0, .85, 1);
  mediaSources[30] = new Array ("reuters.com", 0, .9, 1);
  mediaSources[31] = new Array ("yahoo.com/news", 0, .85, 1);
  mediaSources[32] = new Array ("theblaze.com", .8, .75, 1);
  mediaSources[33] = new Array ("msnbc.com", -.5, .7, 1);
  mediaSources[34] = new Array ("theguardian.com", -.1, .9, 1);
  mediaSources[35] = new Array ("bloomberg.com", 0, .85, 1);
  mediaSources[36] = new Array ("politico.com", -.1, .85, 1);
  mediaSources[37] = new Array ("motherjones.com", -.6, .85, 1);
  mediaSources[38] = new Array ("slate.com", -.2, .85, 1);
  mediaSources[39] = new Array ("thinkprogress.org", -.5, .85, 1);
  mediaSources[40] = new Array ("drudgereport.com", 0, .9, 1);
  mediaSources[41] = new Array ("dailykos.com", -.1, .7, 1);
  mediaSources[42] = new Array ("vice.com", -.3, .75, 1);
  mediaSources[43] = new Array ("aljazeera.com", -.2, .85, 1);
  mediaSources[44] = new Array ("infowars.com", 1, 0, 4);//include for triggering notifications, not redirection
  mediaSources[45] = new Array ("democracynow.org", -.9, .85, 1);
  mediaSources[46] = new Array ("reddit.com", 0, .2, 3);
  mediaSources[47] = new Array ("fivethirtyeight.com", -.1, .85, 2);  
  mediaSources[48] = new Array ("forbes.com", .15, .85, 1);
  mediaSources[49] = new Array ("yournewswire.com", 1, .1, 1);  
  mediaSources[50] = new Array ("thegatewaypundit.com", 1, .2, 1);
  mediaSources[51] = new Array ("scientificamerican.com", -.35, .9, 1);
  mediaSources[52] = new Array ("rollingstone.com", -.75, .5, 1);
  mediaSources[53] = new Array ("www.palmerreport.com", -.8, 0, 1)


  return mediaSources;
}