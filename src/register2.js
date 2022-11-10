const mongooes = require('mongoose');

mongooes.connect("mongodb://localhost:27017/chatapplication").then(()=>{
    console.log("database connected ");
}).catch((err) =>{
    console.log(err)
});
const room_users = new mongooes.Schema({
name : {
    type : String ,
    require : true ,
    validate : {
        validator : function(v) {
            return /^[a-zA-Z]*$/.test(v);

    },
    message : 'value is not of String data type '
    //   console.log("hi harsh");  
    }, 

    
},
room_name : {
    type : String,
    require : true ,
    validate: {
        validator: function(v) {
            return /^[a-zA-Z]*$/.test(v);
        },
        message: '{VALUE} is not a valid 10 digit number!'
    }
},
email : {
    type : String,
    require : true,
    unique : true,
      
 },
password : {
    type : String , 
    required : true,

},
cpassword : {
   type : String , 
   require : true 
},

room_uuid : {
    type : String,
    require : false
},
room_document : {
    type : String,
    require : false 
}


});

const collection = new mongooes.model("user_list",room_users);

module.exports = collection;





// const room_created = new mongooes.Schema({
    //     name : {
        //         type : String,
        //         require : true ,
        //     },
        //     room_name : {
            //         type : String ,
            //         require : true
            //     },
            //     email : {
                //         type : String,
                //         require : true,
//         unique : true,

//      },
//     password : {
    //         type : String , 
    //         required : true,
    
    //     },
    //     cpassword : {
        //        type : String ,
        //        require : true 
        //     }
        
        //     // name : String ,
        
        
        // });
        
          // module.exports= saved;
        
        // const saved = new mongooes.model("users", room_created); 