const mongooes = require('mongoose');

mongooes.connect("mongodb://localhost:27017/chatapplication").then(()=>{
    console.log("database connected ");
}).catch((err) =>{
    console.log(err)
});
 
