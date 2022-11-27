// const url = require('url');
// import {WebSocket} from 
console.log("harsh panchal")

// var address = document.URL;
// console.log(address);

const socket = io('ws://localhost:8000');


let file = document.getElementById('title').value;
console.log(file);
let submit = document.querySelector("button");
let element = document.getElementById("text-box");
let sender = "Harsh";
let room = "myroom";
let array = [];

var send = ()=>{
    let object = {
        "sender" : sender,
        "room" : room,
        "message" : element.value
    }
    array.push(object);
    // submit.form.reset();
    socket.emit('message' ,element.value);
        
    element.value = null;
}
socket.on('message',(message)=>{
    console.log("Mesage form Server : " + message);

    var div = document.createElement('div');
    div.classList.add("no-of-message");
    var subdiv1 = document.createElement('div');
    var subdiv2 = document.createElement('div');
    
    console.log("start");
    subdiv1.classList.add("chat");
    subdiv2.classList.add("profile");
    console.log("Middle");
    
    subdiv1.innerHTML=message;
    subdiv2.innerHTML="profile";
    document.getElementById("message-is").appendChild(subdiv1);
    document.getElementById("message-is").appendChild(subdiv2);
    document.getElementById("message-body").appendChild(div);
    // document.getElementById("main").appendChild(div);

    console.log("end");
})
submit.addEventListener('click',send,false);
console.log(array);
let x = document.cookie;
console.log(x);


{/* <div class="no-of-message">
  <div class="chat">
 hiiii

</div>
<div class="profile">
profile
</div>

 </div> */}