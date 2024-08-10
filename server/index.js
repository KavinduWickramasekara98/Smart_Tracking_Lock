const express = require("express");
const fs = require("fs");
const User = require('./config');
const {uploadProcessedData,initializeFirebaseApp} = require("./config");
const app = express()
//app.use(express.json())
initializeFirebaseApp();
app.use((req, res, next) => {
    const log = `${Date.now()}: ${req.url} \n`;
    fs.appendFile("log.txt", log, (err, data) => {
        next();
    });
    console.log("URL Parameters:", req.params);
    console.log(req.headers);
});

//This is my URL with 0 parameters home
app.post('/create',async(req,res)=>{
    //const data = req.body;
    //console.log("Data of users",data);
    // await User.add(data)
    res.send("User added");
});
app.get('/position',async(req,res)=>{
    await uploadProcessedData("3.22","4.56");
    // const data = req.body;
    // console.log("Data of users",data);
    // await User.add(data)
    res.send("Upload Success");
});

app.get('/', (req, res) => {
    res.end("HomePage");
});
//This is my URL with 4 parameters about/
app.get('/detail/:param1/:param2/:param3/:param4', async(req, res) => {
    
    // Access parameters using req.params
    const param1 = req.params.param1;
    const param2 = req.params.param2;
    const param3 = req.params.param3;
    const param4 = req.params.param4; 
    
    await uploadProcessedData(param1,param2,param3,param4);
    console.log("Parameter 1:", param1);
    console.log("Parameter 2:", param2);
    console.log("Parameter 3:", param3);
    console.log("Parameter 4:", param4);
    res.end("Smart Tracking device" + param1 + " " + param2 + " " + param3+ " " + param4);
});

// app.use((req, res) => {
//     res.status(404).end("404 not found tracking server");
// });

const PORT = 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
