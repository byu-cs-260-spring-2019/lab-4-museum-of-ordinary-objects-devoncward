const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

const app = express();


// Create a new item in the museum: takes a title and a path to an image.
var db = firebase.firestore();
var itemsRef = db.collection('items');

// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try{
    let querySnapshot = await itemsRef.get();
    res.send(querySnapshot.docs.map(doc => doc.data()));
  }catch(err){
    res.sendStatus(500);
  }
});

app.post('/api/items', async (req, res) => {
  try {
    let querySnapshot = await itemsRef.get();
    let numRecords = querySnapshot.docs.length;
    let item = {
      id: numRecords + 1,
      title: req.body.title,
      path: req.body.path,
      description: req.body.description
    };
    console.log("idem: ", item);
    itemsRef.doc(item.id.toString()).set(item);
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  console.log("Something is happening-----------------");
  try {
    let id = req.params.id.toString();
    console.log("I reached here", id);
    var documentToDelete = itemsRef.doc(id);
    var doc = await documentToDelete.get();
    if(!doc.exists) {
      res.status(404).send("Sorry that item doesn't exist");
      return;
    } else {
      documentToDelete.delete();
      res.sendStatus(200);
      return;
    }
  } catch (error) {
    res.status(500).send("Error deleting document: ", error);
  }
});

app.put('/api/items/:id', async (req, res) => {
  console.log("Entered the put function-----------------");
  try {
    let id = req.params.id.toString();
    console.log(id, " is the id");
    var documentToEdit = itemsRef.doc(id);

    // var temp = await documentToEdit.get();
    // console.log("document is ", temp.data());
    // var object = JSON.parse(temp.data());
    // console.log(object);
    // var specificDoc = itemsRef.doc(id).get()
    // console.log(specificDoc.data(), "this is it");
    //
    var doc = await documentToEdit.get();
    if(!doc.exists) {
      return;
    } else {
      let newObj = {
        title: req.body.title,
        path: req.body.path,
        description: req.body.description,
      }
      console.log("We made it to herer");
      documentToEdit.set(newObj);
      res.sendStatus(200);
      return;
    }
  } catch (error) {
    res.status(500).send("Error deleting document: ", error);
  }
});
exports.app = functions.https.onRequest(app);
