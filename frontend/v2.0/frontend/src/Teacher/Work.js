import React from "react";
import './Work.css';

function callGetWork(credentials) {
    // return fetch('http://localhost:8080/classes', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(credentials)
    // })
    // .then(data => data.json())
    return {
        "studentName": "Trần Vũ Tuấn Kiệt",
        "class": "Math 2",
        "school": "TH Thịnh Liệt",
        "status": "Graded",
        "grade": "9",
        "works": [
            "sample/data/AssignmentDetail/Trần Vũ Tuấn Kiệt/trang_0.jpg",
            "sample/data/AssignmentDetail/Trần Vũ Tuấn Kiệt/trang_1.jpg"
        ]
    }
}

export default function Work(props) {
    const work = callGetWork()
    console.log("asd" + props.assignment.id);
    return (
        <>
            <button>Pen</button>
            <button>Symbol</button>
            <button>Comment</button>
            <img src={work.works[0]} />
        </>
    )
}