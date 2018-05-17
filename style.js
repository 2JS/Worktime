let timetable = document.getElementById('timetable')
let jobTable = document.getElementById('jobTable')
let recordtable = document.getElementById('recordtable')

let textfield = document.getElementById('textfield')

let topbar = document.getElementById('topbar')

let hourTable = [4, 5, 7, 8]
let weekdayTable = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

let table = {
	"Fri" : {
	  "4" : { "옥승원":'off', "류승환":'off' },
	  "5" : { "성수안":'off', "한수진":'off' }
	},
	"Mon" : {
	  "4" : { "김수빈":'off', "장원구":'off' },
	  "5" : { "김민석":'off', "박규원":'off' },
	  "7" : { "김승호":'off', "손미나":'off' },
	  "8" : { "김대원":'off', "임재환":'off' }
	},
	"Thu" : {
	  "4" : { "주소연":'off', "진제호":'off' },
	  "5" : { "김주원":'off', "고대력":'off' },
	  "7" : { "김영웅":'off', "이현종":'off' },
	  "8" : { "이선민":'off', "원준희":'off' }
	},
	"Tue" : {
	  "4" : { "장민정":'off', "유지예":'off' },
	  "5" : { "채희석":'off', "장채민":'off' },
	  "7" : { "김채연":'off', "한동훈":'off' },
	  "8" : { "변경호":'off', "이수연":'off' }
	},
	"Wed" : {
	  "4" : { "최준성":'off', "박정언":'off' },
	  "5" : { "진태훈":'off', "2JS":'off' },
	  "7" : { "유시현":'off', "최다은":'off' },
	  "8" : { "김효찬":'off', "박준호":'off' }
	}
}

var contacts = {}

let palette = ["#e24e35","#ea7c3c","#90b100","#34bc99","#3d96e1","#3a4b85","#8b41b3","#5d4531","#375f3d"]

function getRandomColor() {
	return palette[Math.floor(Math.random() * palette.length)]
}

function styler(color, backgroundColor, others) {
	var style = " style='"
	style += (color && ("color: " + color + "; ")) || ""
	style += (backgroundColor && ("background-color: " + backgroundColor + "; ")) || ""
	style += others || ""
	style += "' "
	return style
}

function tagConstructor(tag, content, id, color, backgroundColor, others) {
	var html = "<" + tag
	html += id && (" id='" + id + "'") || ""
	html += styler(color, backgroundColor, others)
	html += ">" + content + "<" + tag + ">"
	return html
}

var people = {}
var workingPeople = [] // for selector, store working people list

function nameStyler(name) {
	if (people[name] == "undefined" && name in workingPeople) {
		people[name] = getRandomColor()
	}
	if (name in workingPeople) {
		return tagConstructor('span', name, '', 'white', people[name], "")
	} else {
		return tagConstructor('span', name, '', '', '', '')
	}
}

function rowConstructor(key, value) {
	var row = document.createElement('tr')

	var timeCell = row.insertCell(0)
	var authorCell = row.insertCell(1)
	var messageCell = row.insertCell(2)
	var buttonCell = row.insertCell(3)

	let time = new Date(parseInt(key))
	let author = value['author']
	let message = value['message']
	let hidden = value['hidden']

	row.id = key

	timeCell.innerHTML = time.getMonth() + 1 + '/' + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
	authorCell.innerHTML = nameStyler(author)

	var deleteButton = "<button onclick='deleteRow(" + key + ")'>Delete</button>"
	// var deleteButton = ""

	if (hidden == true) {
		messageCell.innerHTML = "Hidden message"
		buttonCell.innerHTML = deleteButton + "<button onclick='unhideRow(" + key + ")'>Unhide</button>"

		row.style.color = "lightgray"
	} else {
		messageCell.innerHTML = message
		buttonCell.innerHTML = deleteButton + "<button onclick='hideRow(" + key + ")'>Hide</button>"
	}

	return row
}