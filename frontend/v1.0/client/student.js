// https://stackoverflow.com/questions/18064666/update-div-with-jquery-ajax-response-html
// jquery ajax 

function getXMLHttpRequest() {
    var req, err;
    try {
        req = new XMLHttpRequest();
    } catch (err) {
        try {
            req = new ActiveXObject("MSXML2.XMLHttp.6.0");
        } catch (err) {
            try {
                req = new ActiveXObject("MSXML2.XMLHttp.3.0");
            } catch (err) {
                req = false;
            }
        }
    }
    return req;
}

var ajaxRequest = getXMLHttpRequest();

function getStudentAssignments() {
    if (ajaxRequest) {
        ajaxRequest.onreadystatechange = loadAssignments;
        ajaxRequest.open("GET", "http://localhost:5000/students/1/assignments")
        ajaxRequest.send(null)
    }
}
function loadAssignments() {
    if (ajaxRequest.readyState != 4) return;
    else {
        if (ajaxRequest.status == 200) {
            var assignments = JSON.parse(ajaxRequest.responseText);
            var table = document.getElementById("assignment-list")
            for (let i = 0; i < assignments.length; i++) {
                var row = table.insertRow(-1);
                var cell = row.insertCell(0);
                cell.innerHTML = assignments[i].name;
                cell.classList.add("assignment-name");
                var cell = row.insertCell(0);
                cell.innerHTML = assignments[i].id;
                cell.classList.add("assignment-id");
                cell.hidden = true
            }
        }
    }
}

getStudentAssignments()
