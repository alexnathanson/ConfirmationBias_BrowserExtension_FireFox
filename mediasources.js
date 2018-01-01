function mediaList(){
  /*array guide
  [0] = URL
  [1] political position (left < Right)
  [2] trust relationship (More > Less)
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
  mediaSources[22] = new Array ("the-daily-show-with-trevor-noah", -.8, .4, 4); //trigger only, no redirection. (would need to link to www.dailyshow.com)
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
  mediaSources[47] = new Array ("fivethirtyeight.com", -.2, .85, 2);  
  mediaSources[48] = new Array ("forbes.com", .15, .85, 1);
  mediaSources[49] = new Array ("yournewswire.com", 1, .1, 1);  
  mediaSources[50] = new Array ("thegatewaypundit.com", 1, .2, 1);
  mediaSources[51] = new Array ("scientificamerican.com", -.35, .9, 1);
  mediaSources[52] = new Array ("rollingstone.com", -.75, .5, 1);
  mediaSources[53] = new Array ("palmerreport.com", -.8, 0, 4);
  mediaSources[54] = new Array ("dallasnews.com", .2, .7, 1);
  mediaSources[55] = new Array ("kansascity.com", 0, .5, 1);
  mediaSources[56] = new Array ("seattletimes.com", -.2, .7, 1);
  mediaSources[57] = new Array ("denverpost.com", 0, .5, 1);
  mediaSources[58] = new Array ("occupydemocrats.com", -1, .1, 4);
  mediaSources[59] = new Array ("newsweek.com", -.2, .7, 1); //added 12/27
  mediaSources[60] = new Array ("villagevoice.com", -.4, .75, 1); //added 12/28
  
  /*More websites to add (not tested):
  mediaSources[61] = new Array ("washingtonexaminer.com",  ,  ,   ); //added 1/1
  mediaSources[62] = new Array ("vox.com",  ; //added 1/1
  mediaSources[63] = new Array ("usnews.com",  ; //added 1/1
  mediaSources[64] = new Array ("thesmokinggun.com", .8, .1, 1 ; //added 1/1
  mediaSources[65] = new Array ("weeklystandard.com", ; //added 1/1
  mediaSources[66] = new Array ("slate.com",  ; //added 1/1
  mediaSources[67] = new Array ("salon.com",  ; //added 1/1
  mediaSources[68] = new Array ("observer.com",  ; //added 1/1
  mediaSources[69] = new Array ("vulture.com", ; //added 1/1
  mediaSources[70] = new Array ("csmonitor.com",  ; //added 1/1
  mediaSources[71] = new Array ("spectator.org", ; //added 1/1
  mediaSources[72] = new Array ("cbn.com",  ; //added 1/1
  mediaSources[73] = new Array ("thedailybeast.com",  ; //added 1/1
  mediaSources[74] = new Array ("mediamatters.org",  ; //added 1/1
  mediaSources[75] = new Array ("newrepublic.com" ; //added 1/1
  mediaSources[76] = new Array ("nypost.com",  ; //added 1/1
  mediaSources[77] = new Array ("thinkprogress.org", ; //added 1/1
  mediaSources[78] = new Array ("alternet.org", ; //added 1/1
  mediaSources[79] = new Array ("gizmodo.com",  ; //added 1/1
  mediaSources[80] = new Array ("inthesetimes.com", ; //added 1/1
  mediaSources[81] = new Array ("mashable.com", ; //added 1/1
  mediaSources[82] = new Array ("pastemagazine.com", ; //added 1/1
  mediaSources[83] = new Array ("talkingpointsmemo.com",  ; //added 1/1
  mediaSources[84] = new Array ("thegrio.com", ; //added 1/1
  mediaSources[85] = new Array ("upworthy.com", ; //added 1/1
  mediaSources[86] = new Array ("tytnetwork.com",  ; //added 1/1
  mediaSources[87] = new Array ("wonkette.com ; //added 1/1
  mediaSources[88] = new Array ("theroot.com", ; //added 1/1
  mediaSources[89] = new Array ("atlantablackstar.com/ ; //added 1/1
  mediaSources[90] = new Array ("businessinsider.com",  ; //added 1/1
  mediaSources[91] = new Array ("cbc.ca", ; //added 1/1
  mediaSources[92] = new Array ("rt.com", .8, 0, 4) ; //added 1/1
  mediaSources[93] = new Array ("cjr.org ; //added 1/1
  mediaSources[94] = new Array ("eastbaytimes.com", ; //added 1/1
  mediaSources[95] = new Array ("gaystarnews.com",  ; //added 1/1
  mediaSources[96] = new Array ("haaretz.com",  ; //added 1/1
  mediaSources[97] = new Array ("nydailynews.com",  ; //added 1/1
  mediaSources[98] = new Array ("philly.com",  ; //added 1/1
  mediaSources[99] = new Array ("sfgate.com",  ; //added 1/1
  mediaSources[100] = new Array ("nj.com", ; //added 1/1
  mediaSources[101] = new Array ("thebaffler.com", ; //added 1/1
  mediaSources[102] = new Array ("forward.com", ; //added 1/1
  mediaSources[103] = new Array ("nola.com",  ; //added 1/1
  mediaSources[104] = new Array ("wired.com", ; //added 1/1
  mediaSources[105] = new Array ("c-span.org",  ; //added 1/1
  mediaSources[106] = new Array ("politifact.com  ; //added 1/1
  mediaSources[107] = new Array ("ft.com", ; //added 1/1
  mediaSources[108] = new Array ("stripes.com", ; //added 1/1
  mediaSources[109] = new Array ("fortune.com/  ; //added 1/1
  mediaSources[110] = new Array ("realclearpolitics.com", ; //added 1/1
  */
  
  
  return mediaSources;
}
