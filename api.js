var express = require("express");
var Obj = express();
var axios = require('axios');


Obj.get("/api/ping", (req, res, next) => {
    res.status(200).json({ "success": true });
});

Obj.get("/api/posts", async (req, res, next) => {
    //make sure a tag value exists.
    var tag = req.query.tag;
    if (tag == undefined) {
        return res.status(400).json({ "error": "Tags parameter is required" });
    }

    
    var permittedtag = ["id", "reads", "likes", "popularity"]
    var sortBy = req.query.sortBy;
    if (sortBy == undefined || permittedtag.indexOf(sortBy) <= -1) {
        console.log(sortBy)
        return res.status(400).json({ "error": "sortBy parameter is invalid" });
    }

    //assending or decending 
    var permmiteddir = ["asc", "desc"]
    var direction = req.query.direction;
    if (direction == undefined || permmiteddir.indexOf(direction) <= -1) {
        console.log(direction)
        return res.status(400).json({ "error": "direction parameter is invalid" });
    }

    //split function 
    var nameArr = tag.split(',');
    var array = []
    //data retrival in array format 
    for (var i = 0; i < nameArr.length; i++) {
        await axios.get('https://hatchways.io/api/assessment/blog/posts?tag=' + nameArr[i] + '&sortBy=' + sortBy + '&direction=' + direction)
            .then(function (response) {
                // handle success
                for (var t = 0; t < response.data.posts.length; t++) {
                    array.push(response.data.posts[t]);
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    
    var clean = array.filter((arr, index, self) =>
        index === self.findIndex((t) => (t.id === arr.id && t.authorId === arr.authorId)))
    
    return res.status(200).json({ Body: { posts: clean } });
});


Obj.listen(8080, () => {
    console.log("Server running on port 8080");
});
//testing export obj
module.exports = Obj;