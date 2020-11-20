var admin = require('firebase-admin');

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

var Database = class Firebase {

    constructor(credentials, databaseUrl) {
        admin.initializeApp({
            credential: admin.credential.cert(credentials),
            databaseURL: databaseUrl
        });
    }

    async getDocument (collectionName, id) {

        const db = admin.firestore();
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
    }

    async getDocuments(collectionName, ids) {
        const db = admin.firestore();
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
    }

    async getCollection(collectionName) {
        const db = admin.firestore();
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
    }

    async newDocument(collectionName, data) {
        const db = admin.firestore();
        const collectionRef = db.collection(collectionName);

        await collectionRef.add(data).then((documentReference) => {
            data.id = documentReference.id;
        });

        return data;
    }

    async new(collectionName, data, id) {
        const db = admin.firestore();
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
    }

    update(collectionName, data, id) {
        // TO-DO
        return "Work In progess";
    }

    delete(collectionName, id) {
        const db = admin.firestore();
        const collectionRef = db.collection(collectionName);
        
        collectionRef.doc(id).delete();
        
        return true;
    }

    signInWithEmailAndPassword(email, password) {
        // TO-DO
        return "Work In progess";
    }

    signInWithGoogle(email, password) {
        // TO-DO
        return "Work In progess";
    }
}

module.exports = {
    Database,
}