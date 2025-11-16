const input = document.getElementById("todo-input");
const difficultySelect = document.getElementById("difficulty-select");
const attributeSelect = document.getElementById("attribute-select");
const addBtn = document.getElementById("addbtn");
const list = document.getElementById("todo-list");

addBtn.addEventListener("click", () => {
    const text = input.value.trim();
        const difficulty = difficultySelect.value;
        const attribute = attributeSelect.value;
    if (text === "") return;

    const li = document.createElement("li");

    li.textContent = `${text}（難易度：${difficulty}、属性：${attribute}）`;

    const delbtn = document.createElement("button");
    delbtn.textContent = "削除";
    delbtn.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(delbtn);
    list.appendChild(li);
    input.value = "";
    difficultySelect.value = "易";
    attributeSelect.value = "生活";
});