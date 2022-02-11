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

function getTeacherAssignments() {
    if (ajaxRequest) {
        ajaxRequest.onreadystatechange = loadAssignments;
        ajaxRequest.open("GET", "http://localhost:5000/teachers/1/assignments")
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
                cell.innerHTML = assignments[i].assignment_name;
                cell.classList.add("assignment-name");
                if (i == 0) {
                    cell.classList.add("table-active")
                }
                var cell = row.insertCell(0);
                cell.innerHTML = assignments[i].assignment_id;
                cell.classList.add("assignment-id");
                cell.hidden = true
            }
        }
    }
}

getTeacherAssignments()