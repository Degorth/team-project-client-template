import React from 'react';
import ReactDOM from 'react-dom';

var data ={
  "Events": {
    "1": {
      "_id": 1,
      "name": "Umass Shotokan Karate Club",
      "desc": "The Umass Shotokan Karate Club is a long standing branch of the Internation Shotokan Karate Federation. We are the 6th club founded though the organization in the United States and have been at this university for over 40 years!"
      "owner": 1,
      "loc": "Boyden Gym Basement Squash Courts",
      "start": 1478803334000,
      "length": 7200000,
      "offset": 604800000 //Weekly recurrence
    }
    "2": {
      "_id": 2,
      "name": "Pentesting Lab Club Meetings",
      "desc": "Training and meetings for cybersecurity competition.",
      "owner": 2,
      "loc": "LGRT 212",
      "start": 1478962800000, //Sat, Nov. 12 2016
      "length": 5400000, //1.5 hours long
      "offset": 604800000 //Weekly recurrence
    }
    "3": {
      "_id": 3,
      "name": "Game Hobbyists' League",
      "desc": "The GHL is an RSO that brings anyone and everyone at UMass to have a great time. The GHL holds weekly game nights - featuring board, card, and video games",
      "owner": 3,
      "loc": "Campus Center",
      "start": 1478736000000,
      "length": 18000000, //5 hrs
      "offset": 604800000
    }
  }
}
