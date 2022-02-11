
var gradingStatus = ''
$('#btnComment').click(function () {
    gradingStatus = 'Comment'
    $(".btn").removeClass('active')
    $(this).addClass('active')
})
$('#btnTrue').click(function () {
    gradingStatus = 'True'
    $(".btn").removeClass('active')
    $(this).addClass('active')
})
$('#btnFalse').click(function () {
    gradingStatus = 'False'
    $(".btn").removeClass('active')
    $(this).addClass('active')
})
var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

var x = "black",
    y = 2;

function children(el) {
    var i = 0, children = [], child;
    while (child = el.childNodes[i++]) {
        if (child.nodeType === 1) children.push(child);
    }
    return children;
}
var work_index = 0;
img_srcs = []

canvas = document.getElementById('can');
ctx = canvas.getContext("2d");

$('#work-list').click(async function(e) {
    var i = 0, tgt = e.target, items;
    if (tgt === this) return;
    items = children(this);
    while (tgt.parentNode !== this) tgt = tgt.parentNode;
    while (items[i] !== tgt) i++;
    if (i !== work_index){
        old_work_index = work_index;
        work_index = i;
        img_srcs[old_work_index] = canvas.toDataURL();
        // document.getElementById("work-list").getElementsByTagName("td")[work_index].removeChild(document.getElementById("work-list").getElementsByTagName("img")[work_index]);
        // document.getElementById("work-list").getElementsByTagName("td")[work_index].appendChild(img)
        console.log(old_work_index, work_index)
        img = new Image();
        img.src = img_srcs[work_index];
        console.log(img.src);
        console.log("begin draw");
        setTimeout(() => {drawImg(ctx, img);}, 100);
        console.log("end draw");
    }
})

function drawImg(ctx, img) {
    ctx.drawImage(img, 0, 0);
}


function init() {
    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    work_list = document.getElementById("work-list").getElementsByTagName("tr")
    for(let i = 0; i < work_list.length; i++) {
        img_srcs.push(work_list[i].getElementsByTagName("td")[0].getElementsByTagName("img")[0].getAttribute("src"))
    }

    var img = new Image();
    img.src = img_srcs[work_index]
    ctx.drawImage(img, 0, 0)

    imgs = [img] // for undo, redo or reset

    $('#btnReset').click(function() {
        img.src = img_srcs[work_index]
        ctx.drawImage(img, 0, 0)
    })

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
        if (gradingStatus == 'True') {
            drawCorrect();
        } else if (gradingStatus == 'False') {
            drawWrong();
        } else if (gradingStatus == 'Comment') {
            drawComment();
        }
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            // draw();
        }
    }
}

function drawCorrect() {
    ctx.beginPath();
    ctx.moveTo(currX - $('#can').offset().left + canvas.offsetLeft - 10, currY - $('#can').offset().top + canvas.offsetTop - 20);
    ctx.lineTo(currX - $('#can').offset().left + canvas.offsetLeft, currY - $('#can').offset().top + canvas.offsetTop);
    ctx.strokeStyle = "green";
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(currX - $('#can').offset().left + canvas.offsetLeft, currY - $('#can').offset().top + canvas.offsetTop);
    ctx.lineTo(currX - $('#can').offset().left + canvas.offsetLeft + 20, currY - $('#can').offset().top + canvas.offsetTop - 30);
    ctx.strokeStyle = "green";
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function drawWrong() {
    ctx.beginPath();
    ctx.moveTo(currX - $('#can').offset().left + canvas.offsetLeft - 10, currY - $('#can').offset().top + canvas.offsetTop - 10);
    ctx.lineTo(currX - $('#can').offset().left + canvas.offsetLeft + 10, currY - $('#can').offset().top + canvas.offsetTop + 10);
    ctx.strokeStyle = "red";
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.moveTo(currX - $('#can').offset().left + canvas.offsetLeft + 10, currY - $('#can').offset().top + canvas.offsetTop - 10);
    ctx.lineTo(currX - $('#can').offset().left + canvas.offsetLeft - 10, currY - $('#can').offset().top + canvas.offsetTop + 10);
    ctx.strokeStyle = "red";
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function drawComment() {
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "red";
    comment = $('#comment').val();
    ctx.fillText(comment, currX - $('#can').offset().left + canvas.offsetLeft, currY - $('#can').offset().top + canvas.offsetTop);
}

// function color(obj) {
//     switch (obj.id) {
//         case "green":
//             x = "green";
//             break;
//         case "blue":
//             x = "blue";
//             break;
//         case "red":
//             x = "red";
//             break;
//         case "yellow":
//             x = "yellow";
//             break;
//         case "orange":
//             x = "orange";
//             break;
//         case "black":
//             x = "black";
//             break;
//         case "white":
//             x = "white";
//             break;
//     }
//     if (x == "white") y = 14;
//     else y = 2;

// }

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX - $('#can').offset().left + canvas.offsetLeft, prevY - $('#can').offset().top + canvas.offsetTop);
    ctx.lineTo(currX - $('#can').offset().left + canvas.offsetLeft, currY - $('#can').offset().top + canvas.offsetTop);
    ctx.strokeStyle = "black";
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

// function erase() {
//     var m = confirm("Want to clear");
//     if (m) {
//         ctx.clearRect(0, 0, w, h);
//         document.getElementById("canvasimg").style.display = "none";
//     }
// }

// function save() {
//     document.getElementById("canvasimg").style.border = "2px solid";
//     var dataURL = canvas.toDataURL();
//     document.getElementById("canvasimg").src = dataURL;
//     document.getElementById("canvasimg").style.display = "inline";
// }