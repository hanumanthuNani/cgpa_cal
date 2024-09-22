const form = document.getElementById('cgpa-form');
const semesterInputsContainer = document.getElementById('semester-inputs');
const cgpaProgressContainer = document.getElementById('cgpa-progress');
const overallCgpaContainer = document.getElementById('overall-cgpa');
const undoButton = document.getElementById('undo-button');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const semesters = document.getElementById('semesters').value;
    semesterInputsContainer.innerHTML = '';
    cgpaProgressContainer.innerHTML = '';
    overallCgpaContainer.innerHTML = '';

    for (let i = 1; i <= semesters; i++) {
        const semesterInput = document.createElement('div');
        semesterInput.classList.add('mb-4', 'p-4', 'bg-white', 'rounded', 'shadow');
        semesterInput.innerHTML = `
            <h3 class="text-lg font-semibold">Semester ${i}</h3>
            <label for="courses-${i}" class="block mb-1">Number of Courses:</label>
            <input type="number" id="courses-${i}" class="border border-gray-300 p-2 mb-2 w-full" required>
            <button type="button" onclick="addCourse(${i})" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add Course</button>
            <div id="courses-${i}-container" class="mt-4"></div>
        `;
        semesterInputsContainer.appendChild(semesterInput);
    }
});

function addCourse(semester) {
    const coursesContainer = document.getElementById(`courses-${semester}-container`);
    const numCourses = document.getElementById(`courses-${semester}`).value;
    coursesContainer.innerHTML = '';

    for (let i = 1; i <= numCourses; i++) {
        const courseInput = document.createElement('div');
        courseInput.innerHTML = `
            <label class="block mt-2">Course Name:</label>
            <input type="text" required class="border border-gray-300 p-2 w-full mb-2">
            <label class="block mt-2">Credits:</label>
            <input type="number" required class="border border-gray-300 p-2 w-full mb-2">
            <label class="block mt-2">Grade:</label>
            <select required class="border border-gray-300 p-2 w-full mb-4">
                <option value="">Select Grade</option>
                <option value="O">O</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
            </select>
        `;
        coursesContainer.appendChild(courseInput);
    }

    const addGradesButton = document.createElement('button');
    addGradesButton.innerHTML = 'Add Grades';
    addGradesButton.classList.add('bg-blue-500', 'text-white', 'p-2', 'rounded', 'hover:bg-blue-600');
    addGradesButton.onclick = () => addGrades(semester);
    coursesContainer.appendChild(addGradesButton);
}

function addGrades(semester) {
    const coursesContainer = document.getElementById(`courses-${semester}-container`);
    const grades = [];
    const courseInputs = coursesContainer.children;

    for (let i = 0; i < courseInputs.length - 1; i++) {
        const courseInput = courseInputs[i];
        const courseName = courseInput.querySelector('input[type="text"]').value;
        const courseCredits = parseInt(courseInput.querySelector('input[type="number"]').value);
        const courseGrade = courseInput.querySelector('select').value;
        grades.push({ name: courseName, credits: courseCredits, grade: courseGrade });
    }
    calculateCGPA(grades, semester);
}

function calculateCGPA(grades, semester) {
    let totalCredits = 0;
    let totalGradePoints = 0;

    for (let i = 0; i < grades.length; i++) {
        const grade = grades[i];
        totalCredits += grade.credits;
        switch (grade.grade) {
            case 'O':
                totalGradePoints += grade.credits * 10;
                break;
            case 'A+':
                totalGradePoints += grade.credits * 9;
                break;
            case 'A':
                totalGradePoints += grade.credits * 8;
                break;
            case 'B+':
                totalGradePoints += grade.credits * 7;
                break;
            case 'B':
                totalGradePoints += grade.credits * 6;
                break;
            case 'C':
                totalGradePoints += grade.credits * 5;
                break;
            case 'D':
                totalGradePoints += grade.credits * 4;
                break;
        }
    }

    const cgpa = totalGradePoints / totalCredits;
    displayCGPA(cgpa, semester);
}

function displayCGPA(cgpa, semester) {
    const cgpaProgressContainer = document.getElementById('cgpa-progress');
    const cgpaProgressHTML = `<h3 class="text-lg font-semibold">Semester ${semester} CGPA: ${cgpa.toFixed(2)}</h3>`;
    cgpaProgressContainer.innerHTML += cgpaProgressHTML;

    const overallCgpaHTML = `<h2 class="text-2xl font-bold">Overall CGPA: ${cgpa.toFixed(2)}</h2>`;
    overallCgpaContainer.innerHTML = overallCgpaHTML;

    showPopup(cgpa);
}

function showPopup(cgpa) {
    let message;
    if (cgpa > 9) {
        message = "Great! 🎉";
    } else if (cgpa > 8) {
        message = "Good! 👍";
    } else if (cgpa > 7) {
        message = "Nice, need to grow! 🚀";
    } else {
        message = "Need to study, bro! 📚";
    }

    popupMessage.textContent = message;
    popup.classList.remove('hidden');
    popup.classList.add('popup');
    
    setTimeout(() => {
        popup.classList.add('hidden');
    }, 2000);
}

undoButton.addEventListener('click', () => {
    semesterInputsContainer.innerHTML = '';
    cgpaProgressContainer.innerHTML = '';
    overallCgpaContainer.innerHTML = '';
});
