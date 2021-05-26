const {Router}=require('express');
const songSelectionController = require('../controllers/songSelectionController');
const router=Router();

    
    router.post('/songs',songSelectionController.songs_post);
    router.get('/songs',songSelectionController.songs_get);

module.exports=router;