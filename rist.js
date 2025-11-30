const input = document.getElementById("todo-input");
const difficultySelect = document.getElementById("difficulty-select");
const attributeSelect = document.getElementById("attribute-select");
const addBtn = document.getElementById("addbtn");
const list = document.getElementById("todo-list");
const charImg = document.getElementById("character");
const resetBtn = document.getElementById("reset-btn");
const messages = [
    "よく頑張ったね！",
    "休むことも大事だよ！",
    "次は何をしようか？",
    "君ならできるって信じてたよ！",
    "一歩一歩進もう！"
]
const talkmessage = [
    "ぷにっ　ぷにっ",
    "にょ～ん",
    "きゅるるん！",
    "もにゃもにゃ…",
    "うにゃー！"
];

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

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addBtn.click();
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
        alert(getRandomMessage());
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

        checkAchievements();
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

function getRandomMessage() {
    const index = Math.floor(Math.random() * messages.length);
    return messages[index];
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
            range: [70, 99],
            image: { life: "animation/5.gif", skill: "animation/6.gif", work: "animation/7.gif" }
        },
        {
            range: [100, Infinity],
            image: { life: "animation/8.gif", skill: "animation/9.gif", work: "animation/10.gif" }
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

function showBalloon() {
    const balloon = document.getElementById("balloon");
    const balloonText = document.getElementById("balloon-text");
    const talkMessage = talkmessage[Math.floor(Math.random() * talkmessage.length)];

    balloonText.textContent = talkMessage;
    balloon.style.display = "block";
    balloon.classList.remove("pop");
    void balloon.offsetWidth;
    balloon.classList.add("pop");
}
const talkbtn = document.getElementById("talkbtn");
talkbtn.addEventListener("click", showBalloon);

let achievements = JSON.parse(localStorage.getItem("achievements")) || {
    task10: false,
    task30: false,
    task100: false
}

const achievementNames = {
    task10: "タスク10個達成！",
    task30: "タスク30個達成！",
    task100: "タスク100個達成！"
}

function checkAchievements() {
    const totalTasks = points;

    if (totalTasks >= 10 && !achievements.task10) unlockAchievement("task10");
    if (totalTasks >= 30 && !achievements.task30) unlockAchievement("task30");
    if (totalTasks >= 100 && !achievements.task100) unlockAchievement("task100");

    localStorage.setItem("achievements", JSON.stringify(achievements));
    renderAchievements();
}

function unlockAchievement(key) {
    achievements[key] = true;
    showAchievementPopup(achievementNames[key]);
}

function showAchievementPopup(text) {
    const popup = document.createElement("div");
    popup.className = "achivement-popup";
    popup.textContent = "🏆 " + text;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(),3500);
}

function renderAchievements() {
    const list = document.getElementById("achievement-list");
    list.innerHTML = "";
    Object.keys(achievements).forEach(key => {
        const div =document.createElement("div");
        div.className = "achievement-item " + (achievements[key] ? "unlocked" : "locked");
        div.textContent =achievements[key] ?"🏆 " + achievementNames[key] : "???";
        list.appendChild(div);
    })
}

window.addEventListener("load", renderAchievements);