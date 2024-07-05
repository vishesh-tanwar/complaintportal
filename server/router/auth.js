const express = require("express");
const router = express.Router();
const User = require("../model/userschema");
//const sgMail = require('@sendgrid/mail');
const sendEmail = require('../config/emailConfig'); 
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const authenticate =require('../middleware/authenticate');
const jwtSecret = "thisismybvicamjwtokenforthelogin";

// new /////////////////////
const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads');
//     },
//     filename: function(req,file,cb){
//         cb(null,Date.now() + '-' + file.originalname);
//     }
// });
const upload = multer({ dest: "uploads/"}); 

router.post("/uploads",upload.single("image"),(req,res) => {
    console.log(req.file);
})

router.post("/register", async (req, res) => {
    const { enrollment_no, name, father_name, email, mobile, password } = req.body;

    // Input validation
    if (!enrollment_no || !name || !father_name || !email || !mobile || !password) {
        return res.status(400).json({ error: "Please fill all the required fields" });
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate mobile number format (assuming 10-digit Indian mobile numbers)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
        return res.status(400).json({ error: "Invalid mobile number format" });
    }

    const passwordRegex = /^.{5,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: "Password must be at least 5 characters long" });
    }

    try {
        // Check if user already exists
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({ enrollment_no, name, father_name, email, mobile, password: hashedPassword });

        // Save the user to the database
        await user.save();

        await sendEmail(email, 'Successfully Registered!!', `Hello ${name}, You have been successfully registered on BVICAM Grievance Portal. Kindly login. Thank you.`);

        res.status(200).json({ message: "Registration Successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/signin",async(req,res)=>{
  try{
    const {email,password}=req.body;
       //console.log(`Data posted: ${email} and ${password}`);

    if(!email || !password){
        return res.status(400).json({ error:"Please enter data"});
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    //userLogin will be the document with whom email matches
    const userLogin=await User.findOne({email:email});

    //if user exists
    if(userLogin){
    //trying to compare the passwords
    const isMatch=await bcrypt.compare(password,userLogin.password);

    if(!isMatch){
      return res.status(400).json({ error:"Invalid Credentials"})
    }
    else{
    const data = {
        user : {
            id:userLogin.id, 
            name: userLogin.name, // Include other user data as needed
            email: userLogin.email,
            enrollment_no: userLogin.enrollment_no,
            mobile : userLogin.mobile,
            father_name : userLogin.father_name,
            grievances : userLogin.grievances.map(({ grievance, status, feedback, date }) => ({ grievance, status, feedback, date }))  
        }
    };
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30); // 30 days from now

    // Generate JWT token with expiry date
    const authtoken = jwt.sign(data, jwtSecret, { expiresIn: '30d' });  
    return res.status(200).json({message:"Login Succesful",authtoken:authtoken})  
    }
    }
    //if user does not exist
    else{
      return res.status(400).json({ error:"User not registered"})
    }
    
  }catch(err){
      console.log(err);
  } 
})

router.post("/grievance", async (req, res) => {
    try {
        const { name, email, enrollment_no, grievance} = req.body;

        if (!name || !email || !enrollment_no || !grievance) {
            console.log("Empty data in grievance portal");
            return res.status(400).json({ error: "Please fill all the details" });
        }

        const userContact = await User.findOne({ enrollment_no: enrollment_no });
        if (userContact) { 
            const userMsg = await userContact.addGrievance(name, email, enrollment_no, grievance); 
            await userContact.save();

            await sendEmail(email, 'Grievance Filed Successfully', `Hello ${name}, Your grievance has been filed successfully. We will inform you when there is a response.`);

            return res.status(200).json({ message: "Grievance Filed Successfully" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/getdata',authenticate , async (req, res) => {  
    try {  
        const token = req.header("Authorization");
        console.log("Received token:", token);
        const userdata = req.isverified ; 
        console.log("decoded",userdata); 
        res.status(200).json({userdata});   
    } catch (e) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route to fetch all grievance data
router.get('/grievancedata', async (req, res) => {
    try {
        // Fetch all users along with their grievances
        const users = await User.find({}, { grievances: 1 }).exec();
        
        // Extract and combine all grievances from different users
        const allGrievances = users.reduce((acc, user) => {
            return acc.concat(user.grievances);
        }, []);
        console.log(allGrievances);
        res.status(200).json(allGrievances);
    } catch (error) {
        console.error("Error fetching grievances:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/grievance/:grievanceId', async (req, res) => {
    const { grievanceId } = req.params;

    try {
        const user = await User.findOne({ 'grievances._id': grievanceId }, { 'grievances.$': 1 });
        
        if (!user || user.grievances.length === 0) {
            return res.status(404).json({ message: 'Grievance not found' });
        }

        res.json(user.grievances[0]);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching grievance', error });
    }
});

router.put('/update/:grievanceId', async (req, res) => {
    const { grievanceId } = req.params;
    const { status, feedback } = req.body;

    try {
        // Find and update the specific grievance
        const user = await User.findOneAndUpdate(
            { 'grievances._id': grievanceId },
            {
                $set: {
                    'grievances.$.status': status,
                    'grievances.$.feedback': feedback
                }
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'Grievance not found' });
        }

        // Find the updated grievance
        const updatedGrievance = user.grievances.id(grievanceId);
        res.json(updatedGrievance);
        await sendEmail(user.email, 'Grievance Status Updated', `Hello ${user.name}, Your grievance status has been updated. Please check the BVICAM website for details.`);
    } catch (error) {
        console.error('Error updating grievance:', error);
        res.status(400).json({ message: 'Error updating grievance', error });
    }
});

router.delete('/delete/:grievanceId', async (req, res) => {
    const { grievanceId } = req.params;

    try {
        // Find the user containing the specific grievance and pull it from the grievances array
        const user = await User.findOneAndUpdate( 
            { 'grievances._id': grievanceId },
            { $pull: { grievances: { _id: grievanceId } } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'Grievance not found' });
        }

        res.json({ message: 'Grievance deleted successfully' });
    } catch (error) {
        console.error('Error deleting grievance:', error);
        res.status(400).json({ message: 'Error deleting grievance', error });
    }
});

module.exports = router;




