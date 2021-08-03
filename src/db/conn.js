const mongoose=require ("mongoose");
mongoose.connect("mongodb://localhost:27017/userdata", //to connect mongodb include port and database name
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
.then(()=>
console.log("connected")) // connection sucessfull message
.catch((err) =>
console.log(err));