document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cgpa-form");
    const semesterInputsDiv = document.getElementById("semester-inputs");
    const cgpaProgressDiv = document.getElementById("cgpa-progress");
    const overallCgpaDiv = document.getElementById("overall-cgpa");
    const undoButton = document.getElementById("undo-button");
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");

    let semesterGrades = [];

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const numSemesters = parseInt(document.getElementById("semesters").value);
        semesterInputsDiv.innerHTML = "";

        for (let i = 1; i <= numSemesters; i++) {
            semesterInputsDiv.innerHTML += `
                <div class="mb-4">
                    <label for="semester-${i}" class="block mb-2">Semester ${i} Grade:</label>
                    <input type="text" id="semester-${i}" class="border p-2 w-full grade-input" maxlength="1" required>
                </div>
            `;
        }

        semesterInputsDiv.innerHTML += `
            <button id="calculate-cgpa" class="bg-green-500 text-white p-2 rounded hover:bg-green-600 mt-4">Calculate CGPA</button>
        `;
    });

    semesterInputsDiv.addEventListener("click", (event) => {
        if (event.target.id === "calculate-cgpa") {
            const gradeInputs = document.querySelectorAll(".grade-input");
            let totalPoints = 0;
            let validGrades = true;

            gradeInputs.forEach((input, index) => {
                const grade = input.value.toUpperCase();
                const gradeMapping = {
                    "A": 10,
                    "B": 8,
                    "C": 6,
                    "D": 4,
                    "E": 0,
                    "R": 0,
                    "G": 0
                };

                if (gradeMapping.hasOwnProperty(grade)) {
                    totalPoints += gradeMapping[grade];
                    semesterGrades[index] = grade;
                } else {
                    validGrades = false;
                }
            });

            if (!validGrades) {
                showPopup("Invalid grades entered! Only A, B, C, D, E, R, and G are allowed.");
                return;
            }

            const cgpa = (totalPoints / semesterGrades.length).toFixed(2);
            overallCgpaDiv.innerHTML = `<p class="text-xl font-bold">Overall CGPA: ${cgpa}</p>`;
        }
    });

    undoButton.addEventListener("click", () => {
        if (semesterGrades.length > 0) {
            semesterGrades.pop();
            showPopup("Last semester grade removed!");
            overallCgpaDiv.innerHTML = "";
        } else {
            showPopup("No grades to undo!");
        }
    });

    function showPopup(message) {
        popupMessage.textContent = message;
        popup.classList.remove("hidden");
        setTimeout(() => popup.classList.add("hidden"), 3000);
    }
});
