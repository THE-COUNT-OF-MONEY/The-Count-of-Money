var firebase = require('firebase');

var admin = require('firebase-admin');

// Add the Firebase products that you want to use
require('firebase/auth');
require('firebase/firestore');

module.exports = {
  initialize(credentials, databaseUrl) {
    const firebaseConfig = {
      apiKey: 'AIzaSyDndtZWxGbteNSLobZ5O2CmS1fyX-2sAGg',
      authDomain: 'count-of-money-dev.firebaseapp.com',
      databaseURL: 'https://count-of-money-dev.firebaseio.com',
      projectId: 'count-of-money-dev',
      storageBucket: 'count-of-money-dev.appspot.com',
      messagingSenderId: '516320172645',
      appId: '1:516320172645:web:cfb490ef4bf66a96d3848c',
      measurementId: 'G-5N4WKF17VF'
    };

    firebase.default.initializeApp(firebaseConfig);

    admin.initializeApp({
      credential: admin.credential.cert(credentials),
      databaseURL: databaseUrl
    });
  },

  async getDocument(collectionName, id) {
    const db = firebase.firestore();
    const collectionRef = db.collection(collectionName);

    if (collectionRef === undefined) return undefined;

    const document = collectionRef.doc(id);
    let data = undefined;

    await document.get().then((snapshot) => {
      data = snapshot.data();
      if (data !== undefined) data.id = snapshot.id;
    });

    return data;
  },

  async getDocuments(collectionName, ids) {
    const db = firebase.firestore();
    const collectionRef = db.collection(collectionName);

    if (collectionRef === undefined || ids === undefined) return undefined;

    const data = [];

    let tmp = null;

    for (let index = 0; index < ids.length; index++) {
      tmp = await this.getDocument(collectionName, ids[index]);
      data.push(tmp);
    }

    return data;
  },

  async getCollection(collectionName) {
    const db = firebase.firestore();
    const collectionRef = db.collection(collectionName);

    if (collectionRef === undefined) return undefined;

    const data = [];

    await collectionRef.get().then((snapshots) => {
      snapshots.forEach((snapshot) => {
        data.push(snapshot.data());
      });
    });

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

    newDocumentReference
      .set(data)
      .then((documentReference) => {
        data.id = documentReference.id;
        return data;
      })
      .catch((error) => {
        console.log('Error newDocumentWithId: ', error);
        return undefined;
      });
  },

  updateDocument(collectionName, data, id) {
    var db = firebase.firestore();

    db.collection(collectionName).doc(id).update(data);

    return 'updated';
  },

  deleteDocument(collectionName, id) {
    const db = firebase.firestore();
    const collectionRef = db.collection(collectionName);

    collectionRef.doc(id).delete();

    return true;
  },
  DeleteAllCryptos(collectionName) {
    const db = admin.firestore();
    db.collection(collectionName)
      .get()
      .then((res) => {
        res.forEach((element) => {
          element.ref.delete();
        });
      });
  },
  newUser(fields) {
    if (fields.email === undefined || fields.password === undefined)
      return undefined;

    return firebase
      .auth()
      .createUserWithEmailAndPassword(fields.email, fields.password)
      .then((user) => {
        const userId = user.uid;
        delete fields.password;

        this.newDocumentWithId('Users', fields, userId);
        fields.id = userId;
        return fields;
      })
      .catch((error) => {
        console.log('error: ', error);
        return undefined;
      });
  },
  signInWithEmailAndPassword(email, password) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        return user.uid;
      })
      .catch((error) => {
        console.log('sign In failed: ', error.code, ', ', error.message);
        return false;
      });
  },

  generateToken(userId) {
    let additionalClaims = {
      premiumAccount: true
    };

    return admin
      .auth()
      .createCustomToken(userId, additionalClaims)
      .then(function (customToken) {
        return customToken;
      })
      .catch(function (error) {
        console.log('Error creating custom token:', error);
        return undefined;
      });
  },

  verifyToken(token) {
    return firebase
      .auth()
      .signInWithCustomToken(token)
      .then((user) => {
        return user.uid;
      })
      .catch((error) => {
        return undefined;
      });
  },

  signInWithGoogle(email, password) {
    return 'Work In progress';
  },
  newCrypto(fields) {
    fields.id = fields.Id;
    fields.Id = null;
    if (fields.id === undefined || fields.Name === undefined) return undefined;
    // this.newDocumentWithId("Cryptos", fields, fields.Id);
    var tmp = this.newDocumentWithId('Cryptos', fields, fields.id);
    return 'Pushed Successfully';
  },
  // async getOneCryptoDocument(collectionName, id) {

  //     const db = firebase.firestore();
  //     const collectionRef = db.collection(collectionName);
  //     console.log("TEST000");
  //     let data = await db.collection(collectionRef).where(firebase.firestore.FieldPath.documentId(), '==', id).get();
  //     console.log("TEST099");
  //     return data;
  // },
  async getOneCryptoDocument(collectionName, id) {
    const db = firebase.firestore();
    let Data = await db.collection('Cryptos').doc(id).get();
    return await Data;
  },
  async getOneCryptoDocumentByName(collectionName, name) {
    let status = false;
    const db = firebase.firestore();
    const citiesRef = db.collection(collectionName);
    const snapshot = await citiesRef.where('Name', '==', name).get();
    if (snapshot.empty) {
      status = false;
      console.log('No matching documents.');
    } else {
      status = true;
    }
    return await status;
  },
  async deleteOneCryptoDocument(collectionName, id) {
    const db = firebase.firestore();
    let Data = await db.collection('Cryptos').doc(id).delete();
    return await Data;
  },
  async createNewCryptowithId(collectionName, fields) {
    const db = firebase.firestore();
    const docRef = await db.collection('_').doc(); // db.createId(); Ne marche pas il faut crée virtuellement un doc puis recup l'id que ca lui attribu
    const newId = docRef.id;
    let data = await db
      .collection(collectionName)
      .doc(newId + 'Manual')
      .set(fields)
      .then((documentReference) => {
        fields.id = documentReference.id;
        return fields;
      })
      .catch((error) => {
        console.log('Error newDocumentWithId: ', error);
        return undefined;
      });
    return null;
  },
  async createNewCryptoInBankFromUserwithCrypto(collectionName, user, curr) {
    const db = firebase.firestore();
    const docRef = await db.collection('_').doc(); // db.createId(); Ne marche pas il faut crée virtuellement un doc puis recup l'id que ca lui attribu
    const newId = docRef.id;
    let fields = new Object();
    fields.user = user.uid;
    fields.currency = curr.id;
    fields.status = true;

    let data = await db
      .collection(collectionName)
      .doc(newId)
      .set(fields)
      .then((documentReference) => {
        fields.id = newId;
        // fields.id = documentReference.id;
        return fields;
      })
      .catch((error) => {
        console.log('Error newDocumentWithId: ', error);
        return undefined;
      });
    return data;
  },
  async getOneCryptoBankDocument(collectionName, id) {
    const db = firebase.firestore();
    let Data = await db.collection(collectionName).doc(id).get();
    return await Data;
  },
  async getOneUsersDocument(collectionName, id) {
    const db = firebase.firestore();
    let Data = await db.collection(collectionName).doc(id).get();
    return await Data;
  },
  async getOneUserNoError(collectionName, id) {
    let data;
    await admin
      .auth()
      .getUser(id)
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        //   console.log(userRecord);
        //   console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
        data = userRecord;
      })
      .catch((error) => {
        data = null;
        //   console.log('Error fetching user data:', error);
      });
    return data;
  },
  async deleteOneCryptoBankDocument(collectionName, id) {
    const db = firebase.firestore();
    let Data = await db.collection(collectionName).doc(id).delete();
    return await Data;
  },
  async getPkCryptoBankrow(collectionName) {
    const db = firebase.firestore();
    const data = db.collection(collectionName);
    let dataretrn = [];
    const snapshot = await data.get();
    snapshot.forEach((doc) => {
      let tmp = doc.data();
      tmp.id = doc.id;
      dataretrn.push(tmp);
    });
    return dataretrn;
  },
  async getOneSettingDocument(collectionName, id) {
    // const collectionRef = db.collection(collectionName);
    // if (collectionRef === undefined) return undefined;
    const db = firebase.firestore();
    const collectionRef = db.collection(collectionName);
    let object = [];

    if (collectionRef === undefined) return undefined;

    const document = collectionRef.doc(id);
    let data = undefined;

    await document.get().then((snapshot) => {
      data = snapshot.data();
      if (data !== undefined) data.id = snapshot.id;
    });

    if (data.role == 'ROLE_ADMIN') {
      const settingsRef = db.collection('Settings').doc('config');
      const doc = await settingsRef.get();
      if (!doc.exists) {
        let settingData = {
          cryptoLimit: 0,
          feedLimit: 0
        };
        object.push(await settingsRef.set(settingData));
        console.log('No such document!');
      } else {
        object.push(doc.data());
        console.log('Document data:', doc.data());
      }
    }
    return object;
  },
  async updateOneSettingDocument(collectionName, id, params) {
    const db = firebase.firestore();
    const collectionRef = db.collection(collectionName);
    let object = [];

    if (collectionRef === undefined) return undefined;

    const document = collectionRef.doc(id);
    let data = undefined;

    await document.get().then((snapshot) => {
      data = snapshot.data();
      if (data !== undefined) data.id = snapshot.id;
    });

    if (data.role == 'ROLE_ADMIN') {
      const settingsRef = db.collection('Settings').doc('config');
      const doc = await settingsRef.get();
      if (!doc.exists) {
        let settingData = {
          cryptoLimit: params.cryptoLimit,
          feedLimit: params.feedLimit
        };
        await settingsRef.set(settingData).then(function () {
          console.log('No such document! But initalised now', settingData);
        });
      } else {
        let settingData = {
          cryptoLimit: params.cryptoLimit,
          feedLimit: params.feedLimit
        };
        await settingsRef.set(settingData).then(function () {
          object.push(doc.data());
          console.log('Document data:', doc.data());
          settingsRef.get().then(function (sedata) {
            console.log(
              "If well saved it wouldn't be empty -->",
              sedata.data()
            );
          });
        });
      }
    }
    return object;
  }
};
