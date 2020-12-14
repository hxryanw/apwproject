/*
Ryan Weaver
Node.js Project
Streaming music from mongoDB
Version:1
Date: 12/13/2020
*/

// These are the modules used for this project
var path = require('path');
var express = require('express');
var app = express();
var fs = require('fs');
const assert = require('assert');
const Grid = require('gridfs-stream');

const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const musicTrack = require('mongodb').musicTrack;


const url = 'mongodb://localhost:27017/mymusic';


const dbName = 'mymusic';

//Creates MongoClient
const client = new MongoClient(url,{ useUnifiedTopology: true });


//Intializes express to use the /public folder to execute the html/css code
app.use(express.static(__dirname + '/public'));

//The next 3 functions are app.get functions to req and res to the server with the html code and of course error file handling.
app.get('/', function(req, res) {
    fs.readFile('/public/index.html', function (err, data) { 
        if(err){
            res.status(404).end('Not found 404 error status');
        }
        else{
    res.sendFile(path.join(__dirname + '/index.html'));
        }
    });
});

app.get('/', function(req, res) {
    fs.readFile('/public/music.html', function (err, data) { 
        if(err){
            res.status(404).end('Not found 404 error status');
        }
        else{
    res.sendFile(path.join(__dirname + '/music.html'));
        }
    });
});

app.get('/', function(req, res) {
    fs.readFile('/public/musicplayer.html', function (err, data) { //error file handling
        if(err){
            res.status(404).end('Not found 404 error status');//If file is not found
        }
        else{
    res.sendFile(path.join(__dirname + '/musicplayer.html'));//Sends html File to the client  (res.render uses a view engine, ask prof)
        }
    });
});







//This function connects to the server. Below I know I did not use good practice with the app.listen
app.listen(3000, () => {
    console.log('Running http://localhost:3000');     

});


  // Use connect method to connect to the Server
    var connect = client.connect(async function(err) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
        
    //variables to initialize gridfs and the mongodb
    const db = client.db(dbName);
    const gfs = Grid(db, mongodb);

    

    app.get('/public/tracks/:trackID', (req, res) => {

        //this code was taken off of the Gridfs github  https://github.com/aheckmann/gridfs-stream
        var readstream = gfs.createReadStream({
            _id: ObjectID(req.params.trackID)
           // _id: ObjectID( '5fc990a81d41c883f3b4d7a1')
          });

       
          // This code was used to check if the files in gridfs was being read and streamed. I found this code on yahoo answers. I couldn't find the link
         // gfs.exist({_id: req.params.trackID}, function (err, found) {
         //   if (err) return handleError(err);
           // found ? console.log('File exists') : console.log('File does not exist');
         //   res.send(found)
        //  });

          //error handling, e.g. file does not exist
          readstream.on ( 'error', error => {

            // error occured when piping the http.response for serving file from GridFS
             console.log ( "serving files error" ); 
             console.log( error ); 
             throw error; 
 
         } );

        //Sending the audio file to client
        res.set('content-type', 'audio/mp3');
        res.set('accept-ranges', 'bytes');
        res.type('audio/mpeg')
  
        readstream.pipe(res);

      });

     });