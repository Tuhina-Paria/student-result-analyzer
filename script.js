// Memory to store students
let students = [];

// Called when button is clicked
function addStudent() {
  const nameInput = document.getElementById("name");
  const rollInput = document.getElementById("roll");

  const marksInput = document.getElementById("marks");

  const name = nameInput.value;
  const roll = Number(rollInput.value);
  const marks = Number(marksInput.value);

  if (name === "" || isNaN(marks) || isNaN(roll)) {
    alert("Please enter name and marks and roll");
    return;
  }

  students.push({ name, marks,roll});

  nameInput.value = "";
  rollInput.value="";
  marksInput.value = "";

  renderTable();
  updateSummary();
}

function renderTable() {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  students.forEach((student ,index)=> {
    const row = document.createElement("tr");

    const status = student.marks >= 35 ? "Pass" : "Fail";
        const statusClass = student.marks >= 35 ? "pass" : "fail";

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.marks}</td>
            <td class="${statusClass}">${status}</td>
             <td>
        <button onclick="deleteStudent(${index})">❌</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}
function deleteStudent(index){
  students.splice(index,1);
  renderTable();
  updateSummary();
}

function updateSummary() {

  const averageEl = document.getElementById("average");
  const topperEl = document.getElementById("topper");

  if(students.length === 0){
      averageEl.innerText = "";
    topperEl.innerText = "";
    return;
  }



  const total = students.reduce((sum, s) => sum + s.marks, 0);
  const average = (total / students.length).toFixed(2);

  const topper = students.reduce((best, s) =>
    s.marks > best.marks ? s : best
  );

  document.getElementById("average").innerText =
    "Average Marks: " + average;

  document.getElementById("topper").innerText =
    "Topper: " + topper.name + " (" + topper.marks + ")";
}