//TOPCODER CALENDAR FILE

const axios = require("axios");
var mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({
  eventId: Number
});
var Event = mongoose.model("TC",eventSchema,"tc");

const {google} = require("googleapis");
const {OAuth2} = google.auth;
const oAuth2Client = new OAuth2('559457536695-cthei1cssreijgu2dh8f0451r90n0oqr.apps.googleusercontent.com','1lsRrga2xDzGuhGq_-lZLhVD'); 
oAuth2Client.setCredentials({
  refresh_token: '1//04i3alE4KMzNNCgYIARAAGAQSNwF-L9Irrh7pB_ucxNaIQqmmwQmvv6F_orRNA5ny7dpm5ECBVBWNkIqB3Vqu62jYrh2h_DyHo18'  
});
const calendar = google.calendar({version: 'v3' , auth: oAuth2Client})

var URL = "https://clist.by/api/v1/json/contest/?limit=1000&resource__name=topcoder.com&event__regex=(%3F%3ASRM%20%5B0-9%5D%5B0-9%5D%5B0-9%5D%7CTCO%5B0-9%5D%5B0-9%5D%20Round%20%5B0-9%5D%7C20%5B0-9%5D%5B0-9%5D%20TCO%20%5B0-9%5D%7C20%5B0-9%5D%5B0-9%5D%20TCO%20Algo%20%5B0-9%5D%7CTCO%5B0-9%5D%5B0-9%5D%20Semifinal%20%5B0-9%5D%7C20%5B0-9%5D%5B0-9%5D%20TCO%20Semi%20%5B0-9%5D%7CTCO%2020%5B0-9%5D%5B0-9%5D%20Semifinal%20%5B0-9%5D%7C20%5B0-9%5D%5B0-9%5D%20TCO%20Semifinal%7CTCO%5B0-9%5D%5B0-9%5D%20Final%7C20%5B0-9%5D%5B0-9%5D%20TCO%20Final%7CTCO%2020%5B0-9%5D%5B0-9%5D%20Final%7CTCO%5B0-9%5D%5B0-9%5D%20Championship%20Round)&start__gte=2020-07-1T00%3A00%3A00&username=Ssomya&api_key=c951303aa1d1a71d9baab5d7570a79d9f35de3a0";

axios.get(URL)
.then(async function (response) {
for( var i=0 ; i<Object.keys(response.data.objects).length ; i++)
{  
  try
  {
    const result = await Event.findOne({eventId: response.data.objects[i].id}) 
      if(result==null)
      {
        // console.log("Lets create an event!");
         const event = {
         summary: String(response.data.objects[i].event),
         // location: 'Hacker Rank',
         // htmlLink: String(response.data.objects[0].href),
         // source: { source.url: String(response.data.objects[0].href)},
         description: String(response.data.objects[i].href)+' - TopCoder',
         start:{
            dateTime: response.data.objects[i].start,
            timeZone: 'Asia/Kolkata',
         },
         end:{
            dateTime: response.data.objects[i].end,
            timeZone: 'Asia/Kolkata',
         },
       }
       await calendar.events.insert({calendarId : 'ag5r87b6kaus6nogsisu69qfho@group.calendar.google.com',resource: event}, err => {
         if(err)
           return console.error('Calendar event creation error: ',err);
         console.log('Calendar event created!');
       }); //calendar event ended

       var identification = response.data.objects[i].id;
       var newEvent = new Event({
         eventId: identification
       });
       await newEvent.save(function(err) {
       if (err) 
       {
        console.log("ERROR IN SAVING EVENT ID TO DB TC "+err);
       }  
      //  console.log('EventId successfully saved.');
       });
      } //if ends 
      else
      {
        console.log("Event already present!");
      } // else ends 
  } //try block ends
  catch (error) {
      console.log("There was an error" + error);
  }
} //end of for loop
}) //end of .then

.catch(function (error) {
  console.log("API URL "+error);
});

module.exports = {calendar};
