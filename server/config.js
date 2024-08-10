const { initializeApp } = require("firebase/app");
const {errorHandler} = require("./helpers");
const {getFirestore,doc,setDoc} = require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyBS_kP1J-TisyGYr16deDtdKCPN1rWLpKY",
    authDomain: "ph3042-35eb5.firebaseapp.com",
    databaseURL: "https://ph3042-35eb5-default-rtdb.firebaseio.com",
    projectId: "ph3042-35eb5",
    storageBucket: "ph3042-35eb5.appspot.com",
    messagingSenderId: "480661534990",
    appId: "1:480661534990:web:ff6e996ec54cf50175bf5f"
  };
let app; 
let firestoreDb; //db connection 

const uploadProcessedData = async(lon,lat,belt,extra)=>{
  const dataToUpload = {
    lon:lon,
    lat:lat,
    belt:belt,
    extra:extra,
  };
  try {
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + ""
                + (currentdate.getMonth()+1)  + "" 
                + currentdate.getFullYear() + ""  
                + currentdate.getHours() + ""  
                + currentdate.getMinutes() + "" 
                + currentdate.getSeconds();
    // Assuming "Devices" is your collection name and "D001" is the document name
    const documentRef = doc(firestoreDb, "Devices", "D001");

    await setDoc(documentRef, dataToUpload);

    return dataToUpload;
  } catch (error) {
    errorHandler(error,"firebase-uploadProcessedData");
  }
}
const initializeFirebaseApp=()=>{
  try {
    app = initializeApp(firebaseConfig);
    firestoreDb = getFirestore();
  } catch (error) {
    errorHandler(error,"firebase-initializeFirebaseApp");
  }
}
const getFirebaseApp = () => app;
module.exports={
  initializeFirebaseApp,
  getFirebaseApp,
  uploadProcessedData,
}; 
  // const db = firebase.firestore();
  // const User = db.collection("User");
  // module.exports=User;