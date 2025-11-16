const input = document.getElementById("todo-input");
const difficultySelect = document.getElementById("difficulty-select");
const attributeSelect = document.getElementById("attribute-select");
const addBtn = document.getElementById("addbtn");
const list = document.getElementById("todo-list");

addBtn.addEventListener("click", () => {
    const task = {
        text: input.value.trim(),
        difficulty: difficultySelect.value,
        attribute: attributeSelect.value
    };
    if (task.text === "") return;
    addTaskToList(task);
    input.value = "";
    difficultySelect.value = "易";
    attributeSelect.value = "生活";

    function addTaskToList(task) {
        const li = document.createElement("li");
        li.textContent = `${task.text}（難易度：${task.difficulty}、属性：${task.attribute}）`;

        const delbtn = document.createElement("button");
        delbtn.textContent = "削除";
        delbtn.addEventListener("click", () => {
            li.remove();
        });

        li.appendChild(delbtn);
        list.appendChild(li);
    }
});
