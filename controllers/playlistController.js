var mongoose= require('mongoose');
const User = require('../models/user');
const { requireAuth } = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');

module.exports=function(app){
    app.get('/playlist',requireAuth,function(req,res){
        const token =req.cookies.jwt;
        if (token) {
          jwt.verify(token, 'devsoc music player', async (err, decodedToken) => {
            if (err) {
             
              console.log(err);
            } else {
                User.findOne({_id:decodedToken.id}).then(function(record){
                    if(err) throw err;
                    res.render('playlist',{songs:record.playlist});
                });  
              
            }
          });
        }  
       
    });
};