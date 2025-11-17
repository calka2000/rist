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
        attribute: attributeSelect.value,
        done: false
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
        task.done = true;
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

     if (!task.done) {
        li.appendChild(donebtn);
    } else {
        li.style.textDecoration = "line-through";
        donebtn.remove();
    }
}

function updateCharacter() {
    if (points < 10) {
        charImg.src = "1.gif";
    } else if (points < 30) {
        charImg.src = "2.gif";
    } else if (points < 50) {
        charImg.src = "3.gif";
    } else if (points < 80) {
        charImg.src = "4.gif";
    } else {
        charImg.src = "5.gif";
    }
}

resetBtn.addEventListener("click", () => {
    if (confirm("育成状況をリセットしますか？")) {
    alert("育成状況ををリセットしました！");
    points = 0;
    saveTasks();
    updateCharacter();
  }
});