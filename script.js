// Memory to store students
let students = [];

// Called when button is clicked
function addStudent() {
  const nameInput = document.getElementById("name");
  const marksInput = document.getElementById("marks");

  const name = nameInput.value;
  const marks = Number(marksInput.value);

  if (name === "" || marks === "") {
    alert("Please enter name and marks");
    return;
  }

  students.push({ name, marks });

  nameInput.value = "";
  marksInput.value = "";

  renderTable();
  updateSummary();
}

function renderTable() {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  students.forEach(student => {
    const row = document.createElement("tr");

    const status = student.marks >= 35 ? "Pass" : "Fail";
        const statusClass = student.marks >= 35 ? "pass" : "fail";

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.marks}</td>
            <td class="${statusClass}">${status}</td>
    `;

    tableBody.appendChild(row);
  });
}

function updateSummary() {
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