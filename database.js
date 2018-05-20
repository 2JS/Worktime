// Initialize Firebase
let config = {
	apiKey: "AIzaSyBnB9kjaofUfPQTIqIe5jwofpJVw9w7AS0",
    authDomain: "worktime-f74c7.firebaseapp.com",
    databaseURL: "https://worktime-f74c7.firebaseio.com",
    projectId: "worktime-f74c7",
    storageBucket: "worktime-f74c7.appspot.com",
    messagingSenderId: "268998698830"
}
firebase.initializeApp(config)

let database = firebase.database()
let auth = firebase.auth()

let user = auth.currentUser

// Firebase Database ------------------


// Firebase Auth ----------------------
// set persistence LOCAL
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
.then(function() {
	console.log("Persistence set LOCAL")
})
.catch(function(error) {
	console.log(error.code + " : " + error.message)
})

// sign in anonymously
auth.signInAnonymously()
.then(function() {
	user = auth.currentUser
    console.log("user.uid:",user.uid)
})
.catch(function(error) {
	console.log(error.code + " : " + error.message)
})


