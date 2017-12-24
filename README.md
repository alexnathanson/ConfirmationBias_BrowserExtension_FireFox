# Confirmation Bias Browser Extension
A Firefox browser extension designed to mitigate confirmation bias in media consumption.

## Instructions for installing the Confirmation Bias demo Firefox extension
1) Download and install Firefox www.mozilla.org
2) Download this ConfirmationBias_BrowserExtension folder https://github.com/alexnathanson/confirmationbias_browserextension
3) Open Firefox and enter about:debugging in the browser’s address bar
4) Click on the Load Temporary Add-on button
5) Navigate to the Confirmationbias_nov8 folder you downloaded and select the manifest.json file.
6) Visit one of the websites below.

# List of news site vectors currently implemented <br>

  <br>mediaSources[0] = new Array ("nytimes.com", 0, 1, 1); 
  <br>mediaSources[1] = new Array ("theintercept.com", -.9, 1, 1);
  <br>mediaSources[2] = new Array ("npr.org", 0, 1, 1);
  <br>mediaSources[3] = new Array ("wsj.com", .5, 1, 1);
  <br>mediaSources[4] = new Array ("facebook.com", 0, 0, 3);
  <br>mediaSources[5] = new Array ("twitter.com", 0, 0, 3);
  <br>mediaSources[6] = new Array ("foxnews.com", .8, -.5, 1);
  <br>mediaSources[7] = new Array ("breitbart.com", .9, -.8, 1);
  <br>mediaSources[8] = new Array ("indypendent.org", -1, .8, 1);
  <br>mediaSources[9] = new Array ("snopes.com", 0, 1, 2);
  <br>mediaSources[10] = new Array ("theatlantic.com", -.8, 1, 1);
  <br>mediaSources[11] = new Array ("washingtonpost.com", .2, 1, 1);
  <br>mediaSources[12] = new Array ("newyorker.com", -.1, 1, 1);
  <br>mediaSources[13] = new Array ("miamiherald.com", 0, 1, 1);
  <br>mediaSources[14] = new Array ("heraldtribune.com", 0, 1, 1);
  <br>mediaSources[15] = new Array ("huffingtonpost.com", -.1, 1, 1);
  <br>mediaSources[16] = new Array ("cnn.com", 0, 1, 1);
  <br>mediaSources[17] = new Array ("nbcnews.com", 0, 1, 1);
  <br>mediaSources[18] = new Array ("abcnews.go.com", 0, 1, 1);
  <br>mediaSources[19] = new Array ("bbcnews.com", 0, 1, 1);
  <br>mediaSources[20] = new Array ("latimes.com", 0, 1, 1);
  <br>mediaSources[21] = new Array ("pewresearch.org", 0, 1, 1); 
  <br>mediaSources[22] = new Array ("the-daily-show-with-trevor-noah", -.8, 1, 1); //triggers notifications, not redirection
  <br>mediaSources[23] = new Array ("businessinsider.com", 0, 1, 1);
  <br>mediaSources[24] = new Array ("theeconomist.com", 0, 1, 1);
  <br>mediaSources[25] = new Array ("buzzfeed.com", -.2, 1, 1);
  <br>mediaSources[26] = new Array ("rushlimbaugh.com", 1, .5, 1);
  <br>mediaSources[27] = new Array ("thehill.com", 0, 1, 1);
  <br>mediaSources[28] = new Array ("pbs.org", 0, 1, 1);
  <br>mediaSources[29] = new Array ("usatoday.com", 0, 1, 1);
  <br>mediaSources[30] = new Array ("reuters.com", 0, 1, 1);
  <br>mediaSources[31] = new Array ("yahoo.com/news", 0, 1, 1);
  <br>mediaSources[32] = new Array ("theblaze.com", 1, 1, 1);
  <br>mediaSources[33] = new Array ("msnbc.com", -.2, 1, 1);
  <br>mediaSources[34] = new Array ("theguardian.com", 0, 1, 1);
  <br>mediaSources[35] = new Array ("bloomberg.com", 0, 1, 1);
  <br>mediaSources[36] = new Array ("politico.com", -.1, 1, 1);
  <br>mediaSources[37] = new Array ("motherjones.com", -.6, 1, 1);
  <br>mediaSources[38] = new Array ("slate.com", -.2, 1, 1);
  <br>mediaSources[39] = new Array ("thinkprogress.org", -.5, 1, 1);
  <br>mediaSources[40] = new Array ("drudgereport.com", 0, 1, 1);
  <br>mediaSources[41] = new Array ("dailykos.com", -.1, 1, 1);
  <br>mediaSources[42] = new Array ("vice.com", -.3, .8, 1);
  <br>mediaSources[43] = new Array ("aljazeera.com", -.2, 1, 1);
  <br>mediaSources[44] = new Array ("infowars.com", 1, 0, 4);// triggers notifications, not redirection
  <br>mediaSources[45] = new Array ("democracynow.org", -1, 1, 1);
  <br>mediaSources[46] = new Array ("reddit.com", 0, 0, 3);
  <br>mediaSources[47] = new Array ("fivethirtyeight.com", -.1, 1, 2);
  <br>mediaSources[48] = new Array ("forbes.com", .2, 1, 1);
  <br>mediaSources[49] = new Array ("yournewswire.com", 1, .1, 1);
  <br>mediaSources[50] = new Array ("thegatewaypundit.com", 1, .2, 1); 
  
## Future changes and additions
* Track user behaviour over time and adjust behavior accordingly
* Make suggestions based not only on the media source, but also on the specific subject matter of an article or specific auther. 
* Compare multiple user's behaviour to each other to measure trends and make more relevant recommendations
* More extension behavior options for the user.
* remove duplication of media list
* make dropdown websites hyperlinks
