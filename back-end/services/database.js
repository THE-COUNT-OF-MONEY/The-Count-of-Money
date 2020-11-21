var firebase = require('firebase')


var admin = require('firebase-admin');

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");


module.exports = {

    initialize(credentials, databaseUrl) {

        const firebaseConfig = {
            apiKey: "AIzaSyDndtZWxGbteNSLobZ5O2CmS1fyX-2sAGg",
            authDomain: "count-of-money-dev.firebaseapp.com",
            databaseURL: "https://count-of-money-dev.firebaseio.com",
            projectId: "count-of-money-dev",
            storageBucket: "count-of-money-dev.appspot.com",
            messagingSenderId: "516320172645",
            appId: "1:516320172645:web:cfb490ef4bf66a96d3848c",
            measurementId: "G-5N4WKF17VF"
        };
    
        firebase.default.initializeApp(firebaseConfig)

        admin.initializeApp({
            credential: admin.credential.cert(credentials),
            databaseURL: databaseUrl
        });
    },

    async getDocument (collectionName, id) {

        const db = firebase.firestore();
        const collectionRef = db.collection(collectionName);

        if (collectionRef === undefined)
            return undefined;
        
        const document = collectionRef.doc(id)
        let data = undefined;

        await document.get().then((snapshot) => {
            data = snapshot.data();
            if (data !== undefined)
                data.id = snapshot.id;
        });

        return data;
    },

    async getDocuments(collectionName, ids) {
        const db = firebase.firestore();
        const collectionRef = db.collection(collectionName);

        if (collectionRef === undefined || ids === undefined)
            return undefined;

        const data = [];
        
        let tmp = null;

        for (let index = 0; index < ids.length; index++) {
            tmp = await this.getDocument(collectionName, ids[index]);
            data.push(tmp)
        }

        return data;
    },

    async getCollection(collectionName) {
        const db = firebase.firestore();
        const collectionRef = db.collection(collectionName);
        
        if (collectionRef === undefined)
            return undefined;

        const data = [];

        await collectionRef.get().then((snapshots) => {
            snapshots.forEach(snapshot => {
                data.push(snapshot.data())
            });
        })

        return data;
    },

    async newDocument(collectionName, data) {
        const db = firebase.firestore();
        const collectionRef = db.collection(collectionName);

        await collectionRef.add(data).then((documentReference) => {
            data.id = documentReference.id;
        });

        return data;
    },

    async newDocumentWithId(collectionName, data, id) {
        const db = firebase.firestore();
        const collectionRef = db.collection(collectionName);
        const newDocumentReference = collectionRef.doc(id);

        newDocumentReference.set(data)
            .then((documentReference) => {
                data.id = documentReference.id;
                return data;
            })
            .catch((error) => {
                console.log("Error newDocumentWithId: ", error)
                return undefined;
            });
    },

    updateDocument(collectionName, data, id) {

        var db = firebase.firestore();

        db.collection(collectionName).doc(id).update(data);

        return "updated";
    },

    deleteDocument(collectionName, id) {
        const db = firebase.firestore();
        const collectionRef = db.collection(collectionName);
        
        collectionRef.doc(id).delete();
            
        return true;
    },

    newUser(fields)
    {
        if (fields.email === undefined || fields.password === undefined)
            return undefined;

        return firebase.auth().createUserWithEmailAndPassword(fields.email, fields.password)
            .then((user) => {
                const userId = user.uid;
                delete fields.password;

                this.newDocumentWithId("Users", fields, userId);
                fields.id = userId;
                return fields;
            })
            .catch((error) => {
                console.log("error: ", error)
                return undefined
            });
    },

    signInWithEmailAndPassword(email, password) {

        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                return user.uid;
            })
            .catch((error) => {
                console.log("sign In failed: ", error.code, ", ", error.message);
                return false;
            });
    },

    generateToken(userId) {
        let additionalClaims = {
          premiumAccount: true
        };
        
        return admin.auth().createCustomToken(userId, additionalClaims)
            .then(function(customToken) {
                return customToken;
            })
            .catch(function(error) {
                console.log('Error creating custom token:', error);
                return undefined;
            });
    },

    verifyToken(token) {
        return firebase.auth().signInWithCustomToken(token)
            .then((user) => {
                return user.uid;
            })
            .catch((error) => {
                return undefined;
            })
    },

    signInWithGoogle(email, password) {
        return "Work In progress";
    }
}