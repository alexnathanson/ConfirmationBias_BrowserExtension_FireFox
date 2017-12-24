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

  
## Future changes and additions
* Track user behaviour over time and adjust behavior accordingly
* Make suggestions based not only on the media source, but also on the specific subject matter of an article or specific auther. 
* Compare multiple user's behaviour to each other to measure trends and make more relevant recommendations
* More extension behavior options for the user.
* remove duplication of media list
* make dropdown websites hyperlinks
