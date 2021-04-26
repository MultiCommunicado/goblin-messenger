## Link to Scratch Project Brief:
https://docs.google.com/document/u/1/d/1gWyFsTJTRG-iP151L52lPeDW6Z-AIHCm/edit?usp=drive_web&ouid=103962004804879882499&rtpof=true

## What was the original vision for the project?
The original version is as we present.

## If the project has strayed from the original vision, why?
It hasn't really.  There's definitely some room for improvement, but I'll leave that up to you guys.

## How far has the project progressed?
We have a working mvp.  We are able to create messages that differentially render and send to people on a successful login.  The messages also automatically translate or not depending on the target recipient's desired reading language.  

## What are some current issues/roadblocks?
Some issues with the creation and deletion of sessions.  Somewhat worked out, but didn't actually implement the deletion of sessions.

## What are some suggestions for iterating on this project?
So there could be a deletion of the messages option, but we kind of like the permanence of them.  It should also be possible to combine the sent messages and translated messages to the same database, but to have a translated key that is either true or false if its pre or post translation, and should allow the rendering of conversations more similar to text messaging or other messaging services than the current model is.
___________________________________________________________

### International Communication App

This app's purpose is to create a messaging service between users allowing them to write messages in their native language and read messages sent to them in their native language, no matter what the message's initial language was, using a translation API.

### Level of authentication 

This could use some work, definitely not working ideally, but overall does work as intended when using the logout button.  We are making sessions, I don't think we're deleting any at the moment, however we provided some middleware to to that as well as delete the cookies, just implementing them with a call to /logout will be necessary.  

### Data types stored in the database

We are currently storing two different types of messages.  One pre translation, one post translation.  There was discussion of merging the two databases into one, but inputting both versions of the message into the same database with a translated key and a value of a boolean to say whether or not the translation had happened yet, and using the $in in the query to the message database to get messages based on translated conditions and if rendering sent or received messages is the goal.

### API used in initial development

We are using the google translate API.  It won't charge anything upon the first 500K characters, so if you'd like, contact whit and he'll get you the app account keys and help to make sure that it's placed properly, but the required file cannot be pushed to gitHub as it then sends him a bunch of alerts in scary you could get charged a lot of money by people that wanna translate things or use the other API's under your CC.  