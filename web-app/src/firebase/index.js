import { initializeApp } from "firebase/app"
import { getStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaS0pyt1iTzpJDDNNVaINdZ12OVI-vjYYsB4c",
    authDomain: "demo-project.firebaseapp.com",
    databaseURL: "https://demo-project.firebaseio.com",
    projectId: "demo-project",
    storageBucket: "demo-project.appspot.com",
    messagingSenderId: "123456788890",
    appId: "1:123456788890:web:cf6503b7ef6503b7ddaa22ba7605",
    measurementId: "G-NSV2KEG0KD",
}

const app = initializeApp(firebaseConfig)

export const firebaseStorage = getStorage(app)

connectStorageEmulator(firebaseStorage, '127.0.0.1', 9199)