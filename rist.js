const input = document.getElementById("todo-input");
const difficultySelect = document.getElementById("difficulty-select");
const attributeSelect = document.getElementById("attribute-select");
const addBtn = document.getElementById("addbtn");
const list = document.getElementById("todo-list");
const charImg = document.getElementById("character");
const resetBtn = document.getElementById("reset-btn");

let tasks = [];
let points = Number(localStorage.getItem("points")) || 0;
let life = Number(localStorage.getItem("lifepoints")) || 0;
let skill = Number(localStorage.getItem("skillpoints")) || 0;
let work = Number(localStorage.getItem("workpoints")) || 0;

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
        if (task.attribute === "生活") life++;
        if (task.attribute === "技能") skill++;
        if (task.attribute === "仕事") work++;
        localStorage.setItem("lifepoints", life);
        localStorage.setItem("skillpoints", skill);
        localStorage.setItem("workpoints", work);
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
    const maxAttr = Math.max(life, skill, work);
    let dominant = "";
    if (life === maxAttr) dominant = "life";
    if (skill === maxAttr) dominant = "skill";
    if (work === maxAttr) dominant = "work";

    const evolveRules = [
        {
            range: [0, 9],
            image: { life: "animation/1.gif", skill: "animation/1.gif", work: "animation/1.gif" }
        },
        {
            range: [10, 29],
            image: { life: "animation/2.gif", skill: "animation/2.gif", work: "animation/2.gif" }
        },
        {
            range: [30, 49],
            image: { life: "animation/3.gif", skill: "animation/3.gif", work: "animation/3.gif" }
        },
        {
            range: [50, 69],
            image: { life: "animation/4.gif", skill: "animation/4.gif", work: "animation/4.gif" }
        },
        {
            range: [70, Infinity],
            image: { life: "animation/5.gif", skill: "animation/6.gif", work: "animation/7.gif" }
        }
    ];
    const rule = evolveRules.find(r =>
        points >= r.range[0] && points <= r.range[1]);
    if (rule) {
        charImg.src = rule.image[dominant];
    }
}

resetBtn.addEventListener("click", () => {
    if (confirm("育成状況をリセットしますか？")) {
        alert("育成状況ををリセットしました！");
        points = life = skill = work = 0;
        localStorage.clear();
        saveTasks();
        updateCharacter();
    }
});