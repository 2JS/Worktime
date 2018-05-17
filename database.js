// Initialize Firebase
var config = {
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
database.ref('timetable/').on('value', function(snapshot) {// timetable update
	workingPeople = []

	snapshot.forEach(function(childSnapshot) {
		var day = childSnapshot.key
		childSnapshot.forEach(function(grandChildSnapshot) {
			let hour = grandChildSnapshot.key
			document.getElementById(day + hour).innerHTML = ''
			for (name in grandChildSnapshot.val()) {
				let namePath = "'timetable/" + day + "/" + hour + "/'"

				style = (grandChildSnapshot.val()[name] == 'on' && styler("white", getRandomColor(), "cursor: pointer;")) || styler("", "", "cursor: pointer;")
				document.getElementById(day + hour).innerHTML += " <a onclick=\"commute(\'" + name + "\', " + namePath + ")\" id=\'" + name + "\' " + style + ">" + name + "</a> "

				if (grandChildSnapshot.val()[name] == 'on') {// for selector, store working people list
					workingPeople.push(name)
				}
			}
		})
	})

	// author selector: radio input
	var authorSelector = '<input type="radio" name="authorSelector" value="Anonymous" checked="true"><input type="text" placeholder="Anonymous" id="anonymousAuthor" size="10%">'
	for (i in workingPeople) {
		authorSelector += "<br/><input type='radio' name='authorSelector' value='" + workingPeople[i] + "'>"+ workingPeople[i] +"</input>"
	}
	document.getElementById('author').innerHTML = authorSelector
})

// update recordTable entries
database.ref('record/').on('child_added', function(childSnapshot, prevChildKey) {
	let key = childSnapshot.key
	let value = childSnapshot.val()

	var row = recordtable.insertRow(2)
	row.outerHTML = rowConstructor(key, value).outerHTML
})

database.ref('record/').on('child_changed', function(childSnapshot, prevChildKey) {
	let key = childSnapshot.key
	let value = childSnapshot.val()

	document.getElementById(key).outerHTML = rowConstructor(key, value).outerHTML
})

database.ref('record/').on('child_removed', function(oldChildSnapshot) {
	let key = oldChildSnapshot.key

	var row = document.getElementById(key)
	row.parentNode.removeChild(row)
})



function hideRow(key) {
	database.ref('record/' + key + '/hidden').set(true)
}

function unhideRow(key) {
	database.ref('record/' + key + '/hidden').set(false)
}

function deleteRow(key) {
	// if (confirm('Delete this Entry?')) {
		database.ref('record/' + key).remove()
	// }
}

function commute(name, namePath) {//상근자 출근/퇴근
	
	database.ref(namePath + name).once('value').then(function(snapshot) {
		var on = 'on'

		if ('off' == snapshot.val()) {
			database.ref(namePath + name).set('on')
			on = 'on'
		} else {
			database.ref(namePath + name).set('off')
			on = 'off'
		}

		let now = (new Date()).getTime()
		database.ref('record/' + now).set({
			author:name,
			message:on + ' work',
			hidden:false
		})
	})
}

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
auth.signInAnonymously().catch(function(error) {
	console.log(error.code + " : " + error.message)
})

// Sign in handler
auth.onAuthStateChanged(function(currentUser) {
	user = currentUser
	console.log(user.uid)
	if (user) {
		// User is signed in.
	}
});

