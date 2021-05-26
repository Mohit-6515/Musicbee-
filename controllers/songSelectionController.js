var mongoose = require("mongoose");
const User = require("../models/user");
const { requireAuth } = require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken");

//Connect to the database
mongoose.connect(
  "mongodb+srv://devsoc:Musicplayer123@cluster0.vw0nx.mongodb.net/songs?retryWrites=true&w=majority"
).then(()=>console.log("connected to database"),(err)=>console.log(err));

//create a schema
var songSelectionSchema = new mongoose.Schema({
  name: String,
  artist: String,
  mobile_view: String,
  list_view: String,
  laptop_view: String,
  song: String,
});

var SongSelection = mongoose.model("SongSelection", songSelectionSchema);

module.exports.songs_get = (req, res) => {
  //get data from mongodb and pass it to view
  SongSelection.find({}, function (err, data) {
    if (err) throw err;
    res.render("songs", { songs: data });
  });
};

module.exports.songs_post = (req, res) => {
  const token = req.cookies.jwt;
  var song = req.body.song;
  var name = req.body.name;
  var list_view = req.body.list_view;
  var mobile_view = req.body.mobile_view;
  var artist = req.body.artist;
  var laptop_view = req.body.laptop_view;
  console.log(req.body);
  if (token) {
    jwt.verify(token, "devsoc music player", async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.status(500);
      } else {
        console.log("smh");
        User.findOneAndUpdate(
          { _id: decodedToken.id },
          {
            $addToSet: {
              "playlist": {
                name: name,
                artist: artist,
                mobile_view: mobile_view,
                list_view: list_view,
                laptop_view: laptop_view,
                song: song,
              },
            },
          },
          {
            upsert: true, new: true,
            useFindAndModify: false
          }
        )
          .then(() => {
            res.status(201);
          })
          .catch((err) => {
            console.log(err);
            res.status(500);
          });
      }
    });
  } else {
    res.status(500);
  }
};

// User.findOne({_id:String(decodedToken.id)}).then(function(record){
//     record.playlist.push({name,artist,mobile_view,list_view,laptop_view,song});
// });
//  record.save();
// User.update({
//     _id: decodedToken.id, // a valid 'box' ObjectId

//   },
//   {
//     $addToplaylist: { name:name,artist:artist,mobile_view:mobile_view,list_view:list_view,laptop_view:laptop_view,song:song}
//   },
//   function(err) {
//     if (err) // handle err
//     console.log(err);
//   });
//     const result = User.findOne({_id:decodedToken.id});
//     result.playlist.push({name:name,artist:artist,mobile_view:mobile_view,list_view:list_view,laptop_view:laptop_view,song:song});
//     result.save(function (err) {
//         if (err) return handleError(err)
//         console.log('Success!');
//       });
// }
