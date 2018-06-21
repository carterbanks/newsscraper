
var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");

var app = express();

var databaseUrl = "scraper";
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
  console.log("Database Error:", error);
});

app.get("/", function (req, res) {
  res.send("Hello world");
});

// TODO: make two more routes

// Route 1
// =======
// This route will retrieve all of the data
// from the scrapedData collection as a json (this will be populated
// by the data you scrape using the next route)
app.get("/all", function (req, res) {
  db.scrapedData.find({}, function (err, data) {
    if (err) {
      console.log("error");
    }
    else {
      res.json(data);
    }
  });
});
// Route 2
// =======
// When you visit this route, the server will
// scrape data from the site of your choice, and save it to
// MongoDB.
// TIP: Think back to how you pushed website data
// into an empty array in the last class. How do you
// push it into a MongoDB collection instead?
app.get("/scrape", function (req, res) {

  console.log("\n***********************************\n" +
    "Grabbing every thread name and link\n" +
    "from yo momma's house:" +
    "\n***********************************\n");

  request("https://www.ign.com/", function (err, data, html) {
    var $ = cheerio.load(html);

    var results = [];

    $("h3.title").each(function(i, element) {

      // Save the text of the h4-tag as "title"
      var title = $(element).text();
  
      // Find the h4 tag's parent a-tag, and save it's href value as "link"
      var link = $(element).parent().attr("href");
  
      // Make an object with data we scraped for this h4 and push it to the results array
      results.push({
        title: title,
        link: link
      });
    });
    
    db.scrapedData.insert({results});
  });
  res.send("Done");
});
app.post("/", function (req, res){
    return (res.json)
})
/* -/-/-/-/-/-/-/-/-/-/-/-/- */

// Listen on port 3000
app.listen(3000, function () {
  console.log("App running on port 3000!");
});
