const input = document.getElementById("todo-input");
const addBtn = document.getElementById("addbtn");
const list = document.getElementById("todo-list");

addBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (text === "") return;

    const li = document.createElement("li");
    li.textContent = text;

    const delbtn = document.createElement("button");
    delbtn.textContent = "削除";
    delbtn.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(delbtn);
    list.appendChild(li);
    input.value = "";
});