const express=require("express"); //include express
const app=express(); 
const path=require("path");
const hbs = require("hbs");//include hbs
const jwt=require("jsonwebtoken");//include jsonwebtoken

require("./db/conn");//include database connection file
const Register =require("./models/registers");//include model for database 
const { json } =require("express"); //to get json data
const port =process.env.PORT || 3000;//global port

const static_path = path.join(__dirname ,"../public"); //include public for index.html and style.css
const templates_path = path.join(__dirname ,"../templates/views");//include template for handel bars(hbs)
const partials_path = path.join(__dirname ,"../templates/partials");//include patials for navbar or header

app.use(express.json());
app.use(express.urlencoded({extended:false}));//extendead option allows to choose between parsing the url encoded data with query string 

app.use(express.static(static_path ));//to get hbs we use static path
app.set('view engine','hbs' );

app.set("views", templates_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res) =>{ //to get index.hbs
    res.render("index")
});
app.get("/home",(req,res) =>{//to get home.hbs
    res.render("home")
});
app.get("/aboutus",(req,res) =>{//to get aboutus.hbs
    res.render("aboutus")
});

app.get("/services",(req,res) =>{//to get aboutus.hbs
    res.render("services")
});

app.get("/contact",(req,res) =>{//to get aboutus.hbs
    res.render("contact")
});

app.get("/mygallery",(req,res) =>{//to get mygallery.hbs
    res.render("mygallery")
});

app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/index");
});

//registration check
app.get("/login",(req,res) =>{//to get login details throw loogin.hbs
    res.render("login")
});

app.get("/registration",(req,res) =>{//to get registration form registration.hbs
    res.render("registration");

});



app.post("/registration",async(req,res) =>{ //to post the value form to database
    try {
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;

            if(password == cpassword){ //check password and confirmpassword

                const registerUser=new Register({
                    fristname :req.body.fristname,
                    lastname :req.body.lastname,
                    email :req.body.email,
                    phonenum :req.body.phonenum,
                    password :password,
                    confirmpassword :cpassword
                          })

                          //to generate token with json web token(jwt)
                          const token =await registerUser.generateAuthToken();
            //to save details
          const registered =await registerUser.save();//simply await the function that returns the promise
          res.status(201).render("login");//201 created sucess status response code indicates that the request
          //it's the result of POST request

            }
            else{
                res.send("password not matched");

            }
    } catch (error) {
        res.status(400).send(error);
    }

});

//login check
app.post("/login",async(req,res) =>{
    try{
        const email=req.body.email;
        const password=req.body.password;

        const useremail= await Register.findOne({email:email});// find the user in Mongodb database
        if(useremail.password == password){
            res.status(201).render("home");

        }
        else{
            res.send("invalid log in details");
        }
    }
    catch(error){
        res.status(400).send("invalid log in details");
    }
});

app.listen(port, () =>{
    console.log(`Server listening on port ${port}`);
})

//contact us

//var emailRouter = require('./email-route');
//app.use('/', emailRouter);