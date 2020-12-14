# apwproject
Gridfs music streaming server

Sources:

https://github.com/aheckmann/gridfs-stream
https://mongodb.github.io/node-mongodb-native/3.4/tutorials/gridfs/
https://github.com/mongodb/specifications/blob/master/source/gridfs/gridfs-spec.rst
https://www.tutorialspoint.com/mongodb/mongodb_gridfs.htm
https://docs.mongodb.com/manual/core/gridfs/
https://github.com/DaftCreation/Custom-Audio-Player
https://docs.mongodb.com/manual/reference/program/mongofiles/
https://docs.mongodb.com/database-tools/installation/installation-linux/
https://www.npmjs.com/package/gridfs-stream

NPM modules:
var path = require('path');
var express = require('express');
var app = express();
var fs = require('fs');
const assert = require('assert');
const Grid = require('gridfs-stream');

index.html and music.html is mine

musicplayer.html is somebody's code to test a musicplayer on a single page alone
https://github.com/DaftCreation/Custom-Audio-Player


This is a website I have created for my own personal music producer/dj career.  For an app, I created a music player that can stream music through the mongodb using Gridfs.  This was a very intricate project as a beginner. To fully understand express, mongodb, gridfs and to use it was a challenge.  In the readme I will walk through how I got everything up and running and the commands used to upload the files and utilize the database.

1. First start up mongodb 'sudo systemctl start mongod'. Enter the commandline by typing 'mongo' create a db using the command 'use (dbname)' The database I used in this project is called 'mymusic'. It will be best to use 'mymusic' as well. Display the DB by using show dbs.
2. In the website folder you will find a javascript file that says uploadgridfs.js that can be used to upload the music to the database as long as it follows the correct file path. so editing the code and putting in the correct path would look like this: /home/ryan/Mysite/public/tracks/song.mp3

3. Another easy way I used to upload a track is mongofiles. This can be installed by doing: sudo dpkg -l mongodb-database-tools

4. The command to upload the music to the database with mongofiles would look like this: mongofiles --db mymusic put /home/ryan/Mysite/public/tracks/song.mp3

5. In the mongo command line to make sure the files were uploaded and to view the file collection data use this command 'db.fs.files.find()'

6. After setting up the DBS, everything should be set.

7. Now go into the music.html file and scroll down to where it says <script type="text/javascript">.  Under it should be an Array called var songs.
  
8. In order for the .html file to receive the uploaded music file and stream it you need to edit in the relative path of the object in the database.

9. Now you need to go back to the mongo commandline use the earlier command db.fs.files.find() to show the music files uploaded and copy the objects _id
it will look like this "_id" : ObjectId("5fc990a81d41c883f3b4d7a1"),  take the string 5fc990a81d41c883f3b4d7a1 and go back var song array and add in the files
object ID to the string.  it should look like this "/public/track/5fc990a81d41c883f3b4d7a1"

10. Now you are ready to start the server and app up.

11. Go to the folder Mysite/  type in node app.js  the server should start and connect to the DB

12. Go to localhost:3000  click on the music link and your song should start playing. If not click on the pause button.
If the title of the file is displaying /public/track/5fc990a81d41c883f3b4d7a1  then you can go into the code in music.html and edit this code to add the right title
  
  	if (currentSong == 0)
		{

			songTitle.textContent = "song1";
		}
		if (currentSong == 1)
		{
			songTitle.textContent = "song2";
		}
		if (currentSong == 2)
		{
			songTitle.textContent = "song3";
		}
		
    
  I didnt have the time to figure out how to read the file name properly and not the string from the array. So this was a quick fix


 Go to the command terminal in linux and folder path of Mysite/ and type in node app.js.  The web server should start and connect to the mongodb.

