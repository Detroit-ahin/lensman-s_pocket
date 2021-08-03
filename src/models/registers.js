const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema({ //define the structure of schema with new instance
    fristname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phonenum:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    tokens :[{
        token:{
        types:String
    }
    }]
})

userSchema.methods.generateAuthToken =async function(){ 
    try {
        const token= jwt.sign({_id:this._id.toString()}, "Detroitisheretorecallthehostsecurity");
        this.tokens =this.tokens.concat({token:token})
        await this.save();
        return token;
    } catch (error) {
        res.send("the error part"+ error);
        console.log("the error part" + error);
    }
}

const Register =new mongoose.model("Register",userSchema);

module.exports=Register;