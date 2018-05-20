//
database.ref('timetable').once('value').then(function (snapshot) {
    snapshot.forEach(function (dailySnapshot) {
        let day = dailySnapshot.key

        dailySnapshot.forEach(function (hourlySnapshot) {
            let hour = hourlySnapshot.key

            workertableInsertHeader(day, hour)

            hourlySnapshot.forEach(function (personSnapshot) {
                let name = personSnapshot.key

                workertableInsert(name)
            })
        })
    })
})

// Tab switcher
function onTab(tabItem) {
    // for all tabs, remove 'active' class
    let tabs = document.getElementsByClassName('topbarElement')
    for (var i = 0; i < tabs.length; i++) {
        tabs.item(i).classList.remove('active')
    }

    // for only the desired tab, add 'active' class
    tabItem.classList.add('active')

    // unhide desired body, hide others for all bodies
    let articles = document.getElementsByClassName('tab')
    for (var i = 0; i < articles.length; i++) {
        if (articles.item(i).id === tabItem.innerHTML + 'Tab') {
            articles.item(i).removeAttribute('hidden')
        } else {
            articles.item(i).setAttribute('hidden', true)
        }
    }
}

function onclickTab(index) {
    let tabs = document.getElementsByClassName('topbarElement')

    for (i = 1; i < tabs.length; i++) {
        if (i === index + 1) {
            tabs.item(i).classList.add('active')
        } else {
            tabs.item(i).classList.remove('active')
        }
    }

    let articles = document.getElementsByClassName('tab')
    for (i = 0; i < articles.length; i++) {
        if (i === index) {
            articles.item(i).removeAttribute('hidden')
        } else {
            articles.item(i).setAttribute('hidden', true)
        }
    }
}

// test graphs
for (i = 0; i < 20; i++) {
    let div = document.createElement('div')
    let chart = document.createElement('canvas')

    document.getElementById(`timetableContainer`).appendChild(div)
    div.appendChild(chart)

    createChart(chart, [i, 30-i, 30])

    div.setAttribute('onclick', 'onclickTimetable(this)')
    div.setAttribute('align', 'center')
}

function onclickTimetable(element) {
    console.log(element)
}

// record table
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

function recordInput() { // take the input and upload to server. clear the input, and get focused.
    let now = (new Date()).getTime()

    var name = 'Anonymous'

    document.getElementsByName('authorSelector').forEach(function(value) {
        if (!value.checked) {
            return
        }
        if (value.value != 'Anonymous') {
            name = value.value
            return
        }
    })

    database.ref('record/'+now).set({
        author:name,
        message:textfield.value,
        hidden:false
    })

    textfield.value = ""
    textfield.focus()
}

onclickTab(0)

$( document ).ready(function(element) {
    // onclickTab(0)
    textfield.focus()
})

$( '#textfield' ).keyup(function(event) {// detect Enter keydown event
    if (event.key == 'Enter') {
        recordInput()
    }
})