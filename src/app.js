//    for make both required and  import working ona single file  
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

const session = require('express-session');
const express = require('express');
const register2 = require('./register2');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyparsher = require('body-parser');
const { urlencoded } = require('express');
const Register = require('./register2');
const Active_room = require('./activeRoom');
const { runInContext } = require('vm');
const { findSourceMap } = require('module');
const { Collection } = require('mongoose');
const saved = require('./register2');
const collection = require('./register2');
const cookieParser = require('cookie-parser');
const { json } = require('body-parser');
const fs = require('fs');

// const uuid = require('uuid');
const { v1: uuidv4 } = require('uuid');
const { threadId } = require('worker_threads');
// const Register2 = require('./registerNew');
app.use(cookieParser());
app.use(session({
    secret: 'sangita panhal', // this text decrypt keys
    resave: false,
    saveUninitialized: false,
}));

var SignIn = false;
var LogIn = false;

app.use(express.json());

// global middleware ............
app.use((req,res,next)=>{
    console.log("harsh i am middlware again !!!!");
    console.log(`${new Date().toISOString()}: ${req.url}`);
    // res.send("hello form  middlware");
    next();
})
// app.use(express.urlencoded({extended : false}));

// const path1 = path.join(__dirname, "../views");
const path1 = path.join(__dirname, "../public/");
const path2 = path.join(__dirname, "../templaets/views");
const path_partials = path.join(__dirname, "../templaets/partial");
const path_file = path.join(__dirname, "../server/");

// console.log(path3);
// const p = path.join(__dirname,"../navbar.html");
app.set('view engine', 'hbs');
app.set('views', path2);
hbs.registerPartials(path_partials);
app.use(express.static(path1));

app.use(bodyparsher.json());
// app.use(bodyparsher.raw();


app.use(bodyparsher.urlencoded({ extended: true }));

app.get("/harsh", (req, res) => {
    req.session.isHere = true;
    req.session.sangita = "panchal";
    console.log(req.session);
    var sid = req.session.id;
    // res.cookie("sesoin_id",sid ,{
    //     secure : false, 
    //     httpOnly : true,
    //     sameSite: 'lax' 

    // });  
    // res.send("hello " + sid + "(your session id is )");
    res.redirect('login')

})


app.get("/", (req, res) => {
    let option = {
        'message': 'Hello'
    };
    res.render('register');
    // res.render('register',option); // jyare view engine vapro (hbs) tyare RANDER lakhvu pade SEND ni jagya per 
})

app.get("/login", (req, res) => {
    res.render('login');

})
app.get("/home", (req, res) => {
    let username = req.cookies.username;
    let sigin = req.cookies.signin;
    let login = req.cookies.login;
    let sessionid = req.session.id;
    let query = req.query.room_id
    // console.log(sessionid); .................. session id is here .................

    if (username == query && login) {
        // console.log("doesn't match");
        res.render('home');

    }
    else if (sigin && username == query) {
        res.redirect('home/?room_id=' + username);
    }
    else {
        res.render('login');
        console.log("Not logeed in user");
    }

});
app.post("/", async (req, res) => {
    // if(!req.cookies.SignIn)
    // {
    console.log(req.body);
    const uuid = uuidv4().toString();
    const error = false;
    // console.log(path3);
    const pass = req.body.password;
    const cpas = req.body.password2;
    const name = req.body.yname;
    const email = req.body.email;
    if (pass === cpas) {
        try {
            const registerEmployee = new Register({
                name: req.body.yname,
                room_name: req.body.roomname,
                email: req.body.email,
                password: req.body.password,
                cpassword: req.body.password2,
                room_uuid: uuid,
                room_document : "file"
            });
            // console.log(typeof(name));

            const save = await registerEmployee.save();
            const check2 = await Register.findOne({ email: email }, { _id: 1 });
            console.log(check2._id);
            let file_name = check2._id.toString();
            // let file_name = room_uuid;
            const path3 = path.join(path_file, file_name+".json");
            var SignIn = true;
            res.cookie("signin", SignIn);
            res.cookie("login", LogIn);
            res.cookie("username", check2._id);
            let Sigin_option = {
                'status1': SignIn,
                'status2': LogIn,
                'name': name
            }
            try {
                // fs.openSync(path3,'W',(error,file)=>{
                //   if(error) throw error;
                //   console.log("File Created");
                // })
                fs.open(path3, 'w', function (err, file) {
                    if (err) throw err;
                    console.log('File is opened in write mode.');
                });

            } catch (error) {
                console.log(error);
            }
            // var url = "http://localhost:8000/home";
            // res.status(201).render('home',Sigin_option);
            res.status(201).redirect('home/?room_id=' + check2._id);

        } catch (error) {
            error_option = {

                'error': error.message
            }
            console.log(error.message);
            error = true;
            // res.render('register',error_option);
            res.redirect('/');
        }
        var signIn = true;

    }
    else {
        console.log("naaaaaa");
        res.redirect('/');
    }



    // }else {
    //     res.render('home');
    // }
});
var login_error = null;
app.post("/login", async (req, res) => {
    var id = req.body.roomid;
    var password = req.body.password;
    try {
        const check = await Register.findOne({ _id: id });

        // console.log(check2);
        if (check) {
            if (check.password === password) {


                res.cookie("username", id, {
                    // maxAge : new Date('22 08 2022'),
                    secure: false,
                    httpOnly: true,
                    sameSite: 'lax' // nathi kbr 
                })
                let nameofuser = check.name;
                var LogIn = true;
                res.cookie("signin", SignIn);
                res.cookie("login", LogIn);
                // res.cookie("username", id);
                let Login_option = {
                    'status1': SignIn,
                    'status2': LogIn
                }
                res.redirect('home/?room_id=' + id);
            } else {
                // res.send("not a valid email or password ");
                login_error = "There must be a wronk email or password";
                console.log("login error ");
                res.reder('login');

            }
        } else {
            res.redirect('login');
        }
        //   res.send(check);
    } catch (error) {
        // res.status(404).send(error);
        console.log(error.message);
        res.redirect('login');
    }


});

// code for active rooms 


app.get("/create",(req,res,next) =>{
    res.send("hello");
    // console.log(req);
    // console.log("hello harsh i am Middleware")
}, (req, res) => {
    res.cookie("name", "harshpanchal is a good  and handsome man ", {
        maxAge: 5000,
        // expires : new Date('22 08 2022'),
        secure: false,
        httpOnly: true,
        sameSite: 'lax'

    });

    res.send("cookie has been created ");
    //    HTTPonly ensures that a cookie is not accessible using the JavaScript code. This is the most crucial form of protection against cross-scripting attacks,,
    // A secure attribute ensures that the browser will reject cookies unless the connection happens over HTTPS.
    //  localhost per kam kare tyare false rakhvu km km localhost e secure HTTPS NATHI 

    // expires : new Date()  works same as the maxAge
})
app.get("/getcookie", (req, res) => {
    console.log(req.cookies);
    res.send(req.cookies);
})

app.get('*', (req, res) => {
    let error = " chutiye sahi se likh........."
    res.status(404).send(`<h1>Chutiya sahi se likh </h1>`);

});
// res.status(404).send\
app.listen(8000, () => {
    console.log("listning you harsh darling meet me at home")
});



// res.send();
//  me string pass kroge to string jayegi as a response
// Par object yaa array pass kroge to JSON data Jayega .
// Par agar res.json(); use Kara hai to Kuch bhi daalo json file hi return krega.

// app.post("/login",async (req,res)=>{
//     try{
//         const password = req.body.password;
//         const cpassword = req.body.cpassword;
//          if(password === cpassword){
//              console.log(password);
//          }else {
//              res.send("password is not matching")
//          }
//     }catch(error){
//         res.status(400).send(error);
//     }
// })



// app.use(bodyparsher.raw({ inflate: true, limit: '100kb', type: 'text/xml' }));