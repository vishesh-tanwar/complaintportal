const mongoose=require('mongoose');

const dburl = "mongodb+srv://visheshtanwar:v1n2820a@cluster0.rxa0l.mongodb.net/grievance?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(dburl)
    .then(async () => {
        console.info("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });