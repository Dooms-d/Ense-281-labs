// The 5 colors 
const noteColors = ["#ff7eb9", "#ff65a3", "#7afcff", "#feff9c", "#fff740"];
let currentColorPointer = 0;

// Grab DOM elements
const postButton = document.getElementById("post-btn");
const noteInput1 = document.getElementById("note-text1");
const noteInput2 = document.getElementById("note-text2");
const notesContainer = document.getElementById("notes-container");

postButton.addEventListener("click", function() {
    const content1 = noteInput1.value.trim();
    const content2 = noteInput2.value.trim();

    if (content1 === "") {
        alert("Please write something first!");     
        return;
    }

    // note element
    const noteElement = document.createElement("div");
    noteElement.className = "sticky-note card";
    
    
    noteElement.style.backgroundColor = noteColors[currentColorPointer];
    currentColorPointer = (currentColorPointer + 1) % noteColors.length;

    //Card body and Burn button
    noteElement.innerHTML = `
        <div class="card-body">
            <p class="card-text-large">${content1}</p>
            <p class="card-text-small">${content2}</p>
            <button class="btn btn-dark btn-sm burn-btn">Burn</button>
        </div>
    `;

  
    const burnBtn = noteElement.querySelector(".burn-btn");
    burnBtn.addEventListener("click", function() {
        noteElement.remove();
    });

    // Add to page and clear the input
    notesContainer.appendChild(noteElement);
    noteInput1.value = "";
    noteInput2.value = "";
    noteInput1.focus();
});