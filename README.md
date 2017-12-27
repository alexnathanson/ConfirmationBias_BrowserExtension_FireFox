# Confirmation Bias Browser Extension for Firefox
A Firefox browser extension designed to mitigate confirmation bias in media consumption.

When the user visits a given news site, the extension will prompt them to visit a website that features opposing view points to those that they are usually exposed to. 


## Differences between versions
* browser namespace changed to chrome namespace (ex. chrome.storage.local vs browser.storage.local)
* chrome.storage.local requires a function and the ".then" promise doesn't work. In Firefox, the function is optional and isn't being used.
* the applications key in the manifest file was removed for the Chrome version, but is required for Firefox.


## About
More about confirmation bias on https://en.wikipedia.org/wiki/Confirmation_bias. <br>
This is an open source project created by Alex Nathanson. <br> 
Full project details and notes on my methodology are available at https://github.com/alexnathanson/ConfirmationBias_BrowserExtension. <br>
Collaborators welcome. 

## Methodology
The vector assigned to each media source is deeply subjective. The trust variation isn't a measure of trustworthyness or truthfullness, rather it is a relational value. Someone who trusts The Indypendent will not trust Breitbart or vice versa, and the value I've assigned to them is meant to describe this relationship.

## Instructions for installing the Confirmation Bias extension as a temporary Firefox extension
1) Download and install Firefox www.mozilla.org
2) Download this ConfirmationBias_BrowserExtension folder https://github.com/alexnathanson/confirmationbias_browserextension
3) Open Firefox and enter about:debugging in the browser’s address bar
4) Click on the Load Temporary Add-on button
5) Navigate to the project folder you downloaded and select the manifest.json file.

## List of news site vectors currently implemented <br>
You can see all the included media sources in the mediasources.js file.
  
## Future changes and additions
* Track user behaviour over time and adjust behavior accordingly.
* Make suggestions based not only on the media source, but also on the specific subject matter of an article or specific auther. 
* Anonymously compare multiple user's behaviour to each other to measure trends and make more relevant recommendations.
* More extension behavior options for the user.
