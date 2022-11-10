const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/chatapplication").then(()=>{
    console.log("database connected ");
}).catch((err) =>{
    console.log(err)
});

const active_room = new mongoose.Schema({
 room_id :{
    type : String,
     require : true ,
     validate : {
        validator : function(value){
           return /^[0-9]*$/.test(v);
   
        }
     }   
 },
 room_creator : {
   type : String,
   require : true
},
creator_email :{
    type : String,
    require : true,
    // validate : {
    //     validator : function(value){
    //         return 
    //     }
    // }

}
});

const collection2 = new mongoose.model("active_room",active_room);
module.exports = collection2;

