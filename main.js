// function recordInput() { // take the input and upload to server. clear the input, and get focused.
// 	let now = (new Date()).getTime()
//
// 	var name = document.getElementById('anonymousAuthor').value || 'Anonymous'
//
// 	document.getElementsByName('authorSelector').forEach(function(value) {
// 		if (!value.checked) {
// 			return
// 		}
// 		if (value.value != 'Anonymous') {
// 			name = value.value
// 			return
// 		}
// 	})
//
// 	database.ref('record/'+now).set({
// 		author:name,
// 		message:textfield.value,
// 		hidden:false
// 	})
//
// 	textfield.value = ""
// 	textfield.focus()
// }
//
// function additionals(show) {
// 	document.getElementById('jobContainer').classList.toggle('hidden')
// }
//
// $( document ).ready(function(element) {
// 	textfield.focus()
//
// 	for (i = 0; i < 4; i++) { // hour loop
// 		var row = timetable.insertRow(-1)
// 		for (j = -1; j < 5; j++) { // weekday loop
// 			var cell = row.insertCell(-1)
// 			if (j >= 0) {
// 				cell.id = weekdayTable[j] + hourTable[i]
// 				cell.innerHTML = (table[weekdayTable[j]][hourTable[i]] && false) || ''
// 				// cell.style.cursor = 'pointer'
// 			} else {
// 				cell.innerHTML = ['4-5', '5-6', '7-8', '8-9'][i]
// 			}
// 		}
// 	}
//
// 	database.ref('contacts').once('value').then(function(snapshot) {
// 		contacts = snapshot.val()
// 	})
// })

// $( '#textfield' ).keyup(function(event) {// detect Enter keydown event
// 	if (event.key == 'Enter') {
// 		recordInput()
// 	}
// })