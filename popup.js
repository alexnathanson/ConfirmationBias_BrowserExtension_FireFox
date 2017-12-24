//USER SETTINGS-----------------------------------------------------------------------------

// settings variables
var checkEl = document.getElementById("settings");
var thisEl = checkEl.getElementsByTagName("input");

var stats = {};
var opps = {};

const {hostNavigationStats} = stats;
const {opposingHostnames} = opps;

var test = "test";

const MAX_ITEMS = 5;

function checkStoredSettings(storedSettings) {
  if (!storedSettings.userSettings) {
    userSettings = {
      check: 1,
      slide: 50
      }
    browser.storage.local.set({userSettings});
  } else {
    userSettings = storedSettings.userSettings;
    }
  
  thisEl[0].checked = userSettings.check;
  thisEl[1].value = userSettings.slide;
}

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(checkStoredSettings, onError);


//this is redundant - on click could call storage() directly
//on off toggle
thisEl[0].onclick = function(){
  storage();
}
//slider bar
thisEl[1].oninput = function(){
  storage();
}

function storage(){
  userSettings = {
      check: thisEl[0].checked,
      slide: thisEl[1].value
    }

  // store the objects
  browser.storage.local.set({userSettings});
  }


//GET WEBSITE STATS--------------------------------------------------------------------------

// Get the saved stats and render the data in the popup window.
const gettingStoredStats = browser.storage.local.get("hostNavigationStats"); 
const getOpposingStats = browser.storage.local.get("opposingNavigationStats");

gettingStoredStats.then(navStats, onError);
getOpposingStats.then(oppStats, onError);
 

  //listIt(hostNavigationStats, opposingHostnames);

//GRAPH---------------------------------------------------------------------------------------------

function graphIt(faveSites){
  //canvas
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");

  //var canvasImage = new Image;
  //canvasImage.src = "images/ConfirmationBias_mediavectorgraph.jpg";

  //ctx.drawImage(canvasImage, 0, 0);

    //white
  ctx.fillStyle = "#ffffff";

  var mediaSources = mediaList();

  //draw all points
  for (i = 0; i< mediaSources.length; i++){
    var X2 = mediaSources[i][1];
    var Y2 = mediaSources[i][2];

    ctx.beginPath();
    ctx.arc((((X2+1)*170)+30),(((1-Y2)*340)+30),2,0,2*Math.PI);
    ctx.fill();
  }

  //draw favorites
  //green
  ctx.fillStyle = "#00ff00";

  //loop through all 5 favorites
  for (c = 0; c< faveSites.length; c++){

    var checkSite = faveSites[c];
    //console.log(checkSite);
    var checkString = checkSite.toString();
    

    //get X and Y of message
    for (i = 0; i< mediaSources.length; i++){
      let mediaString = mediaSources[i][0].toString();

      if (checkString.includes(mediaString) == true){
        //console.log("True!");
        X1 = mediaSources[i][1];
        Y1 = mediaSources[i][2];

        var size = 7 - c;
        ctx.beginPath();
        ctx.arc((((X1+1)*170)+30),(((1-Y1)*340)+30),size,0,2*Math.PI);
        ctx.fill();

        break;
      };
    };
  };
  // draw opposition sites
  //yellow
  ctx.fillStyle = "#ffff00";
}

function navStats(nav){
  if (!nav.hostNavigationStats){
    stats = {}
    //console.log("new nav");
  }
  stats = nav.hostNavigationStats;

  const sortedHostnames = Object.keys(stats).sort((a, b) => {
    return stats[a] <= stats[b];
  });

  listNav(sortedHostnames, stats);

  graphIt(sortedHostnames);
}

function oppStats(opp){
  if (!opp.opposingNavigationStats){
      opps = {}
      //console.log("new opps");
    }
  opps = opp.opposingNavigationStats;

  const sortedOpps = Object.keys(opps).sort((a, b) => {
    return opps[a] <= opps[b];
  });

  listOpp(sortedOpps);

}

function listNav(hostNavigationStats, stats){
 //fave sites
  let listEl = document.getElementById("fave");
  listEl.removeChild(listEl.firstChild);

  //console.log(hostNavigationStats.length);
    
    for (let i=0; i < hostNavigationStats.length; i++) {//
      if (i >= MAX_ITEMS) {
        break;
      }

    const listItem = document.createElement("li");
    const hostname = hostNavigationStats[i];

    listItem.textContent = `${hostname}: ${stats[hostname]} visit(s)`;
    listEl.appendChild(listItem);
    }
}

function listOpp(opposingHostnames){
// hated sites
  let HlistEl = document.getElementById("hated");
    HlistEl.removeChild(HlistEl.firstChild);

    for (let i=0; i < opposingHostnames.length; i++) {
      if (i >= MAX_ITEMS) {
        break;
      }

    var a = document.createElement("a");
    const HlistItem = document.createElement("li");
    const hostname = opposingHostnames[i];
    const prepend = "https://www.";
    var linkHost = prepend.concat(hostname);
    console.log(linkHost);
    a.textContent = `${hostname}`;
    a.setAttribute('href', linkHost);
    HlistItem.appendChild(a);
    HlistEl.appendChild(HlistItem);
    }
}

function mediaList(){
  /*array guide
  [0] = URL
  [1] political position (left < Right)
  [2] factualness (True > False)
  [3] = media type (traditional - 1, fact checker - 2, social media - 3, 
  not linked to too (url wierdness, conspiracy theories, hate site, etc.) - 4)
  */

//This is a little redundant, because it duplicates some data from the background.js file. In the future they should just read from the same array.
  var mediaSources = new Array();
  mediaSources[0] = new Array ("nytimes.com", -.1, .85, 1);
  mediaSources[1] = new Array ("theintercept.com", -.8, .9, 1);
  mediaSources[2] = new Array ("npr.org", -.2, .9, 1);
  mediaSources[3] = new Array ("wsj.com", .5, .85, 1);
  mediaSources[4] = new Array ("facebook.com", 0, 0, 3);
  mediaSources[5] = new Array ("twitter.com", 0, 0, 3);
  mediaSources[6] = new Array ("foxnews.com", .8, .29, 1);
  mediaSources[7] = new Array ("breitbart.com", .9, .1, 1);
  mediaSources[8] = new Array ("indypendent.org", -1, .6, 1);
  mediaSources[9] = new Array ("snopes.com", 0, .95, 2);
  mediaSources[10] = new Array ("theatlantic.com", -.75, .9, 1);
  mediaSources[11] = new Array ("washingtonpost.com", .1, .85, 1);
  mediaSources[12] = new Array ("newyorker.com", -.2, .9, 1);
  mediaSources[13] = new Array ("miamiherald.com", 0, .9, 1);
  mediaSources[14] = new Array ("heraldtribune.com", 0, .9, 1);
  mediaSources[15] = new Array ("huffingtonpost.com", -.1, .8, 1);
  mediaSources[16] = new Array ("cnn.com", 0, .8, 1);
  mediaSources[17] = new Array ("nbcnews.com", 0, .9, 1);
  mediaSources[18] = new Array ("abcnews.go.com", 0, .9, 1);
  mediaSources[19] = new Array ("bbcnews.com", 0, .9, 1);
  mediaSources[20] = new Array ("latimes.com", 0, .9, 1);
  mediaSources[21] = new Array ("pewresearch.org", 0, 1, 1); //journalism.org is another site run by pew
  mediaSources[22] = new Array ("the-daily-show-with-trevor-noah", -.8, .4, 1); //trigger only, no redirection. (would need to link to www.dailyshow.com)
  mediaSources[23] = new Array ("businessinsider.com", 0, .9, 1);
  mediaSources[24] = new Array ("theeconomist.com", 0, .9, 1);
  mediaSources[25] = new Array ("buzzfeed.com", -.25, .45, 1);
  mediaSources[26] = new Array ("rushlimbaugh.com", 1, .25, 1);
  mediaSources[27] = new Array ("thehill.com", 0, .9, 1);
  mediaSources[28] = new Array ("pbs.org", 0, .9, 1);
  mediaSources[29] = new Array ("usatoday.com", 0, .9, 1);
  mediaSources[30] = new Array ("reuters.com", 0, .9, 1);
  mediaSources[31] = new Array ("yahoo.com/news", 0, .9, 1);
  mediaSources[32] = new Array ("theblaze.com", .8, .75, 1);
  mediaSources[33] = new Array ("msnbc.com", -.4, .9, 1);
  mediaSources[34] = new Array ("theguardian.com", -.1, .9, 1);
  mediaSources[35] = new Array ("bloomberg.com", 0, .9, 1);
  mediaSources[36] = new Array ("politico.com", -.1, .9, 1);
  mediaSources[37] = new Array ("motherjones.com", -.6, .9, 1);
  mediaSources[38] = new Array ("slate.com", -.2, .9, 1);
  mediaSources[39] = new Array ("thinkprogress.org", -.5, .9, 1);
  mediaSources[40] = new Array ("drudgereport.com", 0, .9, 1);
  mediaSources[41] = new Array ("dailykos.com", -.1, .7, 1);
  mediaSources[42] = new Array ("vice.com", -.3, .8, 1);
  mediaSources[43] = new Array ("aljazeera.com", -.2, .9, 1);
  mediaSources[44] = new Array ("infowars.com", 1, 0, 4);//include for triggering notifications, not redirection
  mediaSources[45] = new Array ("democracynow.org", -1, .9, 1);
  mediaSources[46] = new Array ("reddit.com", 0, .2, 3);
  mediaSources[47] = new Array ("fivethirtyeight.com", -.1, .9, 2);  
  mediaSources[48] = new Array ("forbes.com", .15, .9, 1);
  mediaSources[49] = new Array ("yournewswire.com", 1, .1, 1);  
  mediaSources[50] = new Array ("thegatewaypundit.com", 1, .2, 1);
  mediaSources[51] = new Array ("scientificamerican.com", -.45, .9, 1);
  mediaSources[52] = new Array ("rollingstone.com", -.8, .5, 1);


  return mediaSources;
}

function onError(error) {
  console.log(`Error: ${error}`);
}
