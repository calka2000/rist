const input = document.getElementById("todo-input");
const difficultySelect = document.getElementById("difficulty-select");
const attributeSelect = document.getElementById("attribute-select");
const addBtn = document.getElementById("addbtn");
const list = document.getElementById("todo-list");
const charImg = document.getElementById("character");
const pointView = document.getElementById("point-view");
const resetBtn = document.getElementById("reset-btn");

let tasks = [];
let points = Number(localStorage.getItem("points")) || 0;
updateCharacter();

window.addEventListener("load", () => {
    const data = localStorage.getItem("tasks");
    if (data) {
        tasks = JSON.parse(data);
        tasks.forEach(task => addTaskToList(task));
    }
});

addBtn.addEventListener("click", () => {
    const task = {
        id: Date.now(),
        text: input.value.trim(),
        difficulty: difficultySelect.value,
        attribute: attributeSelect.value
    };
    if (task.text === "") return;
    tasks.push(task);
    saveTasks();
    addTaskToList(task);

    input.value = "";
    difficultySelect.value = "易";
    attributeSelect.value = "生活";
});

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("points", points);
}

function addTaskToList(task) {
    const li = document.createElement("li");
    li.textContent = `${task.text}（難易度：${task.difficulty}、属性：${task.attribute}）`;


    const donebtn = document.createElement("button");
    donebtn.textContent = "完了";
    donebtn.addEventListener("click", () => {
        points += (task.difficulty === "易" ? 1 : task.difficulty === "普" ? 2 : 3);
        updateCharacter();
        saveTasks();
        donebtn.remove();
        li.style.textDecoration = "line-through";
    });

    const delbtn = document.createElement("button");
    delbtn.textContent = "削除";
    delbtn.addEventListener("click", () => {
        list.removeChild(li);
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
    });

    li.appendChild(delbtn);
    li.appendChild(donebtn);
    list.appendChild(li);
}

function updateCharacter() {
    if (points < 20) {
        charImg.src = "1.gif";
    } else if (points < 50) {
        charImg.src = "2.gif";
    } else if (points < 100) {
        charImg.src = "3.gif";
    } else {
        charImg.src = "4.gif";
    }
}

resetBtn.addEventListener("click", () => {
    points = 0;
    saveTasks();
    updateCharacter();
});