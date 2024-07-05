const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator=require('validator');
// created models
const userSchema = new Schema({                   
    enrollment_no:{
        type : Number ,
        required : true
    },
    name : {
        type : String ,
        required : true 
    },
    father_name : {
        type : String ,
        required : true 
    },
    email : {
        type : String ,
        required : true ,
        unique:[true,"Email ID already exists"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("INVALID EMAIL");
            }
        }
    },
    mobile : {
        type : Number ,
        required : true ,
        minlength:10,
        maxlength:10
    },
    password : {
        type : String ,
        required : true, 
        minlength: 5
    },
    grievances:[
        {   
            name:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            enrollment_no:{
                type:Number,
                required:true
            },
            grievance:{
            type:String,
            required:true
            },
            image : {
                type : String,
                default : null
            },
            status:{
                type:String,
                default:"Not seen"
            },
            feedback:{
                type:String,
                default:""
            },
            date:{
                type:Date,
                default:Date.now
            }
        } 
    ]
});
//store the grievance
userSchema.methods.addGrievance=async function(name,email,enrollment_no,grievance,imagepath){
    try{
      this.grievances=this.grievances.concat({name,email,enrollment_no,grievance,image:imagepath });
      await this.save();
      return this.messages;
    }catch(err){
        console.log(err);
    }
}
//creating a collection
const User= new mongoose.model('User',userSchema);

module.exports=User;