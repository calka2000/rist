const input = document.getElementById("todo-input");
const difficultySelect = document.getElementById("difficulty-select");
const attributeSelect = document.getElementById("attribute-select");
const addBtn = document.getElementById("addbtn");
const list = document.getElementById("todo-list");

let tasks = [];
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
    }

    function addTaskToList(task) {
        const li = document.createElement("li");
        li.textContent = `${task.text}（難易度：${task.difficulty}、属性：${task.attribute}）`;

        const delbtn = document.createElement("button");
        delbtn.textContent = "削除";
        delbtn.addEventListener("click", () => {
            list.removeChild(li);
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
        });

        li.appendChild(delbtn);
        list.appendChild(li);
    }

