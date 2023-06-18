const mongoose= require('mongoose');
// const shortid = require('shortid');
const shortId= require('shortid');
// shortId.generate();
const shortUrlSchema=new mongoose.Schema({
    full:{
        type:String,
        required:true
    },

    short: {
       type:String,
       required:true,
       default: shortId.generate
    },

    clicks: {
      type: Number, 
      required: true,
      default: 0
    }
})
// hooks up our database and actual model
module.exports=mongoose.model('ShortUrl',shortUrlSchema)