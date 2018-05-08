//Declare variables
var names = [];
var dates = [];
var passed = [];
var i, text, daysPassed;

function LSload() {
    names = JSON.parse(localStorage.getItem("LSnames"));
    
    if (names === null){
        names = [];
    }
    
    dates = JSON.parse(localStorage.getItem("LSdates"));
    
    if (dates === null){
        dates = [];
    }
    
    loadList();
}

//Display the input box
function displayInputDiv() {
    document.getElementById("inputDiv").style.display = "block";
    document.getElementById("inputName").value = '';
    document.getElementById("inputDate").value = '';
    document.body.style.backgroundColor = "rgb(27, 135, 181)";
}

//Add the information to their relevent arrays
function newEntry() {
    var inputName = document.getElementById("inputName").value;
    var inputDate = document.getElementById("inputDate").value;
    
    if (inputName === '' || inputDate === '') {
        alert("Please enter a name, and a valid prior date");
    }
    
    else {            
        names.push(inputName);
        dates.push(inputDate);
        localStorage.setItem("LSnames", JSON.stringify(names));
        localStorage.setItem("LSdates", JSON.stringify(dates));
        document.getElementById("inputDiv").style.display = "none";
        document.body.style.backgroundColor = "rgb(41, 170, 225)";
        loadList();
    }
}

//Calculate elapsed time
function timeCalc() {
    passed = [];
    for (i = 0; i < dates.length; i++) {
        var lastDate = new Date(dates[i]);
        var lastDateMS= lastDate.getTime(lastDate);
        
        var nowDate = new Date();
        var nowDateMS= nowDate.getTime(nowDate); 
        
        var difference= nowDateMS-lastDateMS;
        var daysPassed= Math.floor((difference / (1000*60*60*24)));
        passed.push(daysPassed);
    }
}

function visited(x) {
    dates[x] = new Date();
    localStorage.setItem("LSdates", JSON.stringify(dates));
    loadList();
}

function remove(x) {
    names.splice(x, 1);
    dates.splice(x, 1);
    localStorage.setItem("LSnames", JSON.stringify(names));
    localStorage.setItem("LSdates", JSON.stringify(dates));
    loadList();
}

function loadList(){    
    timeCalc();
    text = "";
    for (i = 0; i < dates.length; i++) {
        text += "<tr>" + "<td class='nameCell'>" + names[i] + "</td>" + "<td class='passedCell'>" + "Last seen: ";
        if (passed[i] == 0) {
            text += "Today" + "</td>";
        }
        if (passed[i] == 1) {
            text += passed[i] + " day ago" + "</td>";
        }
        if (passed[i] > 1) {
            text += passed[i] + " days ago" + "</td>";
        }
        text += "<td id='buttons'>" + "<button class='btnVisit' onclick='visited(" + i + ")'>✓</button>" + "<button class='btnDel' onclick='remove(" + i + ")'>✕</button>" + "</tr>";
    }
    
    document.getElementById("output").innerHTML = text;
}