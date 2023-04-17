const express = require("express");
const app = express();

const multer = require("multer");
const cors = require("cors");

const firebase = require("firebase/app");
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const {
  getFirestore,
  query,
  collection,
  where,
  addDoc,
  doc,
  getDoc,
  getDocs,
} = require("firebase/firestore");
const { sendWelcomeEmail } = require("./email");
// const { query } = require("express");

app.use(express.json());
app.use(cors());
const firebaseConfig = {
  apiKey: "AIzaSyDaKCByiwY4DHgeH7MPEG9XTLtnTkQ8H4o",
  authDomain: "northwestconference-e048f.firebaseapp.com",
  projectId: "northwestconference-e048f",
  storageBucket: "northwestconference-e048f.appspot.com",
  messagingSenderId: "335112680242",
  appId: "1:335112680242:web:211379e3381d5ebcdadd2b",
  measurementId: "G-M0LXWCS31B",
};
firebase.initializeApp(firebaseConfig);
const fapp = initializeApp(firebaseConfig);
const db = getFirestore(fapp);
const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });

app.post("/", upload.single(), async (req, res) => {
  //   res.json("Firebase Storage");
  // console.log(req.body);

  const email = req.body.Email;
  const password = req.body.Password;
  // console.log(email);
  // console.log(password);
  // const docRef = await firebase.firestore().collection("users").where("Email"==email).where("Password"==password)
  // where("Email","==",email),where("Password","==",password)
  await getDocs(collection(db, "users")).then((snap) => {
    var some = snap.docs[0].data();
    // console.log(snap.docs[0].id);
    var some2 = [];
    snap.docs.forEach((doc) => {
      var temp = [];
      temp.push(doc.id);
      temp.push(doc.data());
      some2.push(temp);
    });
    some2.forEach(s=>{
      // console.log(s[1]);
    })
    var final = some2.filter((s) => {
      return s[1].Email == email && s[1].Password == password;
    });

    // console.log(final);
    if (final.length > 0) {
      res.send(final);
    } else {
      var error = "Wrong data";
      res.send(error);
    }
    // console.log(final);
  });

  // const docRef = await getDocs(collection(db,"users"))
  // // console.log(docRef.size());
  // console.log(docRef.docs[0]);
  // docRef.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots

  //   const d = doc.data();
  //   // console.log(d)
  // });
  // const docSnap = await getDoc(docRef);
  // console.log(docSnap.data());
  //   const snapshot = await docRef.get();
  // snapshot.forEach(doc => {
  //   console.log(doc.id, '=>', doc.data());
  // });
  // const docSnap = await getDoc(docRef);
  // console.log(docSnap);
  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   console.log("No such document!");
  // }
  // console.log(email,password);
});

app.post("/", (req, res) => {
  const itemRef = collection(db, "users");
  var data = { ...req.body };
  console.log(data);
  addDoc(itemRef, data)
    .then(() => {
      console.log("Enter the Data");
      sendWelcomeEmail(data.Email, data.FirstName);
    })
    .catch(() => {
      console.log("An Error occured");
    });

  res.status(200).send({ message: "File uploaded successfully" });
});

app.listen(5000, () => console.log("Databsase started"));
