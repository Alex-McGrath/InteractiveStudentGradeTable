var average = 0;
calculateAverage();

function addRow() {
  var name = prompt("Enter Full Name:");
  var id = prompt("Enter Student ID:");

  var table = document.getElementById("grades");
  var row = table.insertRow(-1);

  var nameCell = row.insertCell(0);
  var idCell = row.insertCell(1);

  nameCell.innerHTML = name;
  idCell.innerHTML = id;

  for (var i = 2; i < 7; i++) {
    var cell = row.insertCell(i);
    cell.classList.add("assignment");
    cell.contentEditable = true;
    cell.innerHTML = "";
    // add input event listener to the new cell
    cell.addEventListener("input", function(event) {
      var cellValue = event.target.textContent.trim();
      if (/^[+-]?\d+(\.\d+)?$/.test(cellValue) && cellValue >= 0 && cellValue <= 100) {
        event.target.style.textAlign = "right";
      } else {
        event.target.style.textAlign = "center";
        event.target.textContent = "-";
        if (/^-{1}$/.test(cellValue))  {
          event.target.classList.add('unsubmitted');
        } else {
          event.target.classList.remove('unsubmitted');
        }
      }
      calculateAverage();
    });
  }

  var cell8 = row.insertCell(7);
  cell8.classList.add("average");
  cell8.innerHTML = "";

  var cell9 = row.insertCell(8);
  var deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "Delete";
  deleteBtn.onclick = function() {
    table.deleteRow(row.rowIndex);
  };
  cell9.appendChild(deleteBtn);

  
  // recalculate the average grades after inserting the new row
  calculateAverage();
}


function deleteRow(row) {
    // Get the row index of the row to delete
    var rowIndex = row.parentNode.parentNode.rowIndex;

    // Remove the row from the table
    document.getElementById("grades").deleteRow(rowIndex);
}
function calculateAverage(average) {
  var rows = document.querySelectorAll("#grades tbody tr");
  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].querySelectorAll(".assignment");
    var sum = 0;
    var count = 0;
    for (var j = 0; j < cells.length; j++) {
      var cellValue = cells[j].textContent.trim();
      if (/^[+-]?\d+(\.\d+)?$/.test(cellValue)) {
        var floatValue = parseFloat(cellValue);
        sum += floatValue;
        count++;
        cells[j].classList.remove("center", "unsubmitted");
        cells[j].classList.add("right");
      } else if (cellValue === "-") {
        cells[j].classList.remove("right");
        cells[j].classList.add("unsubmitted");
        cells[j].style.textAlign = "center"; // add this line to center the dash
      } else {
        cells[j].classList.remove("right", "unsubmitted");
        cells[j].classList.add("center");
      }
    }
    average = sum / count;
    var averageCell = rows[i].querySelector(".average");
    if (average < 60) {
      averageCell.classList.add("below-sixty");
    } else {
      averageCell.classList.remove("below-sixty");
    }
    averageCell.textContent = isNaN(average) ? "" : (average * 1).toFixed(0) + "%";
    averageCell.classList.remove("center");
    averageCell.classList.add("right");
  }
}





document.addEventListener("DOMContentLoaded", function() {
  // add event listeners to all editable cells
  var cells = document.querySelectorAll(".assignment");
  for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("input", function(event) {
      var cellValue = event.target.textContent.trim();
      if (/^[+-]?\d+(\.\d+)?$/.test(cellValue) && cellValue >= 0 && cellValue <= 100) {
        event.target.style.textAlign = "right";
      } else {
        event.target.style.textAlign = "center";
        event.target.textContent = "-";
        if (/^-{1}$/.test(cellValue))  {
          event.target.classList.add('unsubmitted');
          event.target.style.textAlign = "center";

        } else {
          event.target.classList.remove('unsubmitted');
        }
      }
      calculateAverage();
    });
  }

  // calculate initial average grades
  calculateAverage();
});


function calculateGrades() {
  console.log("Button clicked");

  // Get the table and rows from the HTML
  var table = document.getElementById("grades");
  var rows = table.rows;

  // Add new header cells for "Average", "Letter Grade", and "GPA"
  var headerRow = rows[0];
  var newHeader1 = headerRow.insertCell(-1);
  newHeader1.textContent = "Average";
  var newHeader2 = headerRow.insertCell(-1);
  newHeader2.textContent = "Letter Grade";
  var newHeader3 = headerRow.insertCell(-1);
  newHeader3.textContent = "GPA";

  // Loop through each row (excluding the header row)
  for (var i = 1; i < rows.length; i++) {

    // Get all cells with class "assignment"
    var cells = rows[i].querySelectorAll(".assignment");

    // Calculate the sum of all assignment grades
    var sum = 0;
    var count = 0;
    for (var j = 0; j < cells.length; j++) {
      var cell = cells[j];
      var value = parseFloat(cell.textContent);

      // If the value is a number, add it to the sum and increase the count
      if (!isNaN(value)) {
        sum += value;
        count++;
      }
    }

    // Include the new column in the calculation
    var newCell = rows[i].cells[cells.length];
    var value = parseFloat(newCell.textContent);
    if (!isNaN(value)) {
      sum += value;
      count++;
    }

    // Calculate the average grade
    var average = sum / count;
    var letterGrade = "";
    var GPA = "";

    // Determine the letter grade and GPA based on the average grade
    if (!isNaN(average)) {
      if (average >= 93) {
        letterGrade = "A";
        GPA = "4.0";
      } else if (average >= 90) {
        letterGrade = "A-";
        GPA = "3.7";
      } else if (average >= 87) {
        letterGrade = "B+";
        GPA = "3.3";
      } else if (average >= 83) {
        letterGrade = "B";
        GPA = "3.0";
      } else if (average >= 80) {
        letterGrade = "B-";
        GPA = "2.7";
      } else if (average >= 77) {
        letterGrade = "C+";
        GPA = "2.3";
      } else if (average >= 73) {
        letterGrade = "C";
        GPA = "2.0";
      } else if (average >= 70) {
        letterGrade = "C-";
        GPA = "1.7";
      } else if (average >= 67) {
        letterGrade = "D+";
        GPA = "1.3";
      } else if (average >= 63) {
        letterGrade = "D";
        GPA = "1.0";
      } else if (average >= 60) {
        letterGrade = "D-";
        GPA = "0.7";
      } else {
        letterGrade = "F";
        GPA = "0.0";
      }
    }

// Add new cells for the average grade, letter grade, and GPA
    var newCell = rows[i].insertCell(-1);
    newCell.textContent = average.toFixed(0) + "%";
    var newCell = rows[i].insertCell(-1);
    newCell.textContent = letterGrade;
    var newCell = rows[i].insertCell(-1);
    newCell.textContent = GPA;
  }
}





document.getElementById("finalGrades").onclick = function() {
  calculateGrades();
};
window.onload = function() {
  var finalGradesButton = document.getElementById("finalGrades");
  finalGradesButton.onclick = calculateGrades;
}

// This function adds a new assignment column to a table and recalculates the grades

function addAssignment() {
  // Get the table element by its ID
  var table = document.getElementById("grades");

  // Get the first row (header) of the table
  var headerRow = table.rows[0];

  // Initialize the index of the "Assignment 5" cell to -1
  var assignmentIndex = -1;
  
  // Find the index of the "Assignment 5" cell in the header row
  for (var i = 0; i < headerRow.cells.length; i++) {
    if (headerRow.cells[i].textContent === "Assignment 5") {
      assignmentIndex = i;
      break;
    }
  }
  
  // If the "Assignment 5" cell is not found, log an error message and exit the function
  if (assignmentIndex === -1) {
    console.log("Error: could not find 'Assignment 5' header cell");
    return;
  }
  
  // Create a new header cell for the new assignment column
  var newHeaderCell = document.createElement("th");

  // Ask the user to enter a name for the new assignment
  var newAssignmentName = prompt("Enter new assignment name:");

  // Set the text content of the new header cell to the new assignment name
  newHeaderCell.textContent = newAssignmentName;

  // Insert the new header cell after the "Assignment 5" cell in the header row
  headerRow.insertBefore(newHeaderCell, headerRow.cells[assignmentIndex+1]);
  
  // Insert a new assignment cell in each row of the table (excluding the header row)
  for (var i = 1; i < table.rows.length; i++) {
    var newRow = table.rows[i];
    var newCell = document.createElement("td");

    // Set the new assignment cell to be editable
    newCell.contentEditable = true;

    // Add a class name to the new assignment cell
    newCell.className = "assignment";

    // Insert the new assignment cell after the "Assignment 5" cell in the current row
    newRow.insertBefore(newCell, newRow.cells[assignmentIndex+1]);
  }

  // Recalculate the grades after adding the new assignment column
  calculateGrades();
}


