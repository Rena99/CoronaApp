'use strict!';
let patientsPath = {
    startDate: '',
    endDate: '',
    city: '',
    locationOfPerson: ''
};

const dataTable = document.getElementById('dataTable');
const newPatient = document.getElementById('addUser');
const newPath = document.getElementById('addNewRow');
const table = document.getElementById('table');
const inputedPatientsID = document.getElementById('inputedPatientsID');
const switchPatient = document.getElementById('switchPatient');
const patientID = document.getElementById('patientID');
const startDateOfPath = document.getElementById('startDate');
const endDateOfPath = document.getElementById('endDate');
const cityOfPath = document.getElementById('city');
const locationOfPath = document.getElementById('location');
const oReq = new XMLHttpRequest();
const urlPath = "https://localhost:44381/patient";

let changeHTML = function changeHTMLAttributes() {
    patientID.style.display = 'none';
    inputedPatientsID.innerText = patientID.value;
    table.style.display = 'block';
    inputedPatientsID.style.display = 'block';
    switchPatient.style.display = 'block';
    newPatient.style.display = 'none';
};

let AddNewPatient = function AddNewPatientToDB(patientID) {
    let url = urlPath;
    let promise = new Promise(function (resolve, reject) {
        oReq.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                resolve();
            }
            if (this.readyState === 4 && this.status !== 200) {
                reject();

            }
        }
    }).then(
        result => {
            console.log("success");
        },
        reject => alert("Bad Response")
    ).catch(e => {
        console.log(e);
    });
    oReq.open("POST", url, true);
    let jsonString = JSON.stringify(patientID);
    oReq.setRequestHeader("Content-Type", "application/json");
    oReq.send(jsonString);
}
let addPatient = function addAPatient(patientID) {
    let url = urlPath + "/"+ patientID;
    let promise = new Promise(function (resolve, reject) {
        oReq.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                resolve(JSON.parse(this.responseText));
            }
            if (this.readyState === 4 && this.status !== 200) {
                reject();

            }
        }
    }).then(
        result => {
            for (let i = 0; i < result.path.length; i++) {
                addPath(result.path[i]);
            }
        },
        reject => AddNewPatient(patientID)
    );
    oReq.open("Get", url, true);
    oReq.send();
    changeHTML();
};

let deleteInput = function deleteInputItems() {
    startDateOfPath.value = '';
    endDateOfPath.value = '';
    cityOfPath.value = '';
    locationOfPath.value = '';
};

let fillCell0 = function fillFirstCell(newCell, patientPath, numOfRows) {
    const string = document.createTextNode(patientPath.startDate);
    newCell.appendChild(string);
};

let fillCell1 = function fillFirstCell(newCell, patientPath, numOfRows) {
    const string = document.createTextNode(patientPath.endDate);
    newCell.appendChild(string);
};

let fillCell2 = function fillFirstCell(newCell, patientPath, numOfRows) {
    const string = document.createTextNode(patientPath.city);
    newCell.appendChild(string);
};

let fillCell3 = function fillFirstCell(newCell, patientPath, numOfRows) {
    const string = document.createTextNode(patientPath.locationOfPerson);
    newCell.appendChild(string);
};

let fillCell4 = function fillFourthCell(newCell, numOfRows) {
    const deleted = document.createElement('button');
    deleted.innerText = 'X';
    deleted.setAttribute("id", numOfRows);
    deleted.setAttribute("class", "deleted");
    newCell.setAttribute("class", "button");
    oldPath(deleted);
    newCell.appendChild(deleted);
};

let fillCell = function (newCell, cellId, numOfRows, patientPath) {
    //button to delete
    if (cellId === 4) {
        fillCell4(newCell, numOfRows);
    }
    else {
        //add start date
        if (cellId === 0) {
            fillCell0(newCell, patientPath, numOfRows);
        }
        //add end date
        else if (cellId === 1) {
            fillCell1(newCell, patientPath, numOfRows);
        }
        //add city
        else if (cellId === 2) {
            fillCell2(newCell, patientPath, numOfRows);
        }
        //addlocation
        else if (cellId === 3) {
            fillCell3(newCell, patientPath, numOfRows);
        }
    }

};

let addCells = function addCellsToRow(newRow, numOfRows, patientPath) {
    for (let i = 0; i < 5; i++) {
        let newCell = newRow.insertCell(i);
        newCell.setAttribute("class", "cell");
        fillCell(newCell, i, numOfRows, patientPath);
    }
};

let addPath = function addAPathToAPatient(patientPath) {
    let numOfRows = dataTable.rows.length;
    if (numOfRows === 0 || dataTable.style.display === "none") {
        dataTable.style.display = 'block';
    }
    let newRow = dataTable.insertRow(numOfRows);
    newRow.setAttribute("class", "row");
    addCells(newRow, numOfRows, patientPath);
};

let DeletePaths = function savePathsOfPatient(path) {
    let url = urlPath + "/" + inputedPatientsID.innerText;
    let promise = new Promise(function (resolve, reject) {
        oReq.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                resolve();
            }
            if (this.readyState === 4 && this.status !== 200) {
                reject();
            }
        }
    }).then(
        result => console.log("Worked"),
        reject => alert("Bad Response")
    );
    oReq.open("DELETE", url, true);
    oReq.setRequestHeader("Content-Type", "application/json");
    let jsonString = JSON.stringify(path);
    console.log(jsonString);
    oReq.send(jsonString);
}

let addPathObject = function addANewObjectToPatientPathArray(path) {
    let url = urlPath + "/" + inputedPatientsID.innerText;
    let promise = new Promise(function (resolve, reject) {
        oReq.onreadystatechange = function () {
            if (this.readyState === 4) {
                resolve();
            }
            if (this.readyState === 4 && this.status !== 200) {
                reject();
            }
        }
    }).then(
        result => console.log("Worked"),
        reject => alert("Bad Response")
    );
    oReq.open("PUT", url, true);
    oReq.setRequestHeader("Content-Type", "application/json");
    let jsonString = JSON.stringify(path);
    console.log(jsonString);
    oReq.send(jsonString);
};

let removePath = function removeApathFromAPatient(rowID) {
    var row = dataTable.rows.item(rowID);
    patientsPath.city = row.cells.item(2).firstChild.innerText;
    patientsPath.locationOfPerson = row.cells.item(3).firstChild.innerText;
    patientsPath.startDate = row.cells.item(0).firstChild.innerText;
    patientsPath.endDate = row.cells.item(1).firstChild.innerText;
    let removedRow = dataTable.deleteRow(rowID);
    DeletePaths(patientsPath);
};

let oldPath = function setsClickForDeleteButton(deleted) {
    deleted.addEventListener('click', function () {
        removePath(deleted.id);
    });
};

let removeDataTable = function removeDataTableFromDisplay() {
    let max = dataTable.rows.length;
    for (let i = 0; i < max; i++) {
        dataTable.deleteRow(0);
    }
};

newPatient.addEventListener('click', function () {
    if (patientID.value.trim() === '') {
        alert('No ID Inputed');
    }
    else {
        addPatient(patientID.value);
    }
});

newPath.addEventListener('click', function () {
    patientsPath.startDate = startDateOfPath.value;
    patientsPath.endDate = endDateOfPath.value;
    patientsPath.city = cityOfPath.value;
    patientsPath.locationOfPerson = locationOfPath.value;
    let patientPath = addPathObject(patientsPath);
    deleteInput();
    addPath(patientsPath);
});

switchPatient.addEventListener('click', function () {
    switchPatient.style.display = 'none';
    patientID.value = '';
    patientID.style.display = 'inline';
    newPatient.style.display = 'inline';
    table.style.display = 'none';
    inputedPatientsID.style.display = 'none';
    dataTable.style.display = 'none';
    switchPatient.setAttribute("className", 1);
    removeDataTable();
    deleteInput();
});

