// Initialize Firebase

const firebaseConfig = {
    apiKey: "AIzaSyCnHaMm5StGftYlz59tvmEhMuLYccJUsBs",
    authDomain: "invisual-987ae.firebaseapp.com",
    projectId: "invisual-987ae",
    storageBucket: "invisual-987ae.appspot.com",
    messagingSenderId: "1052769647409",
    appId: "1:1052769647409:web:22f168879c1cd6658dce10",
    measurementId: "G-0C0RXW3P19"
};

firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

