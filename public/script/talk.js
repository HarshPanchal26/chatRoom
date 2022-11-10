// const url = require('url');
import {WebSocket} from 
console.log("harsh panchal")
// const { Cookie } = require('express-session');
// console.log(login_error);
// const status = require('../../src/app');
var address = document.URL;
console.log(address);

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
    element.value = null;
    // submit.form.reset();
}

submit.addEventListener('click',send,false);
console.log(array);
let x = document.cookie;
console.log(x);
