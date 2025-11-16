const tabTodo = document.getElementById('tab-todo');
const tabBlank = document.getElementById('tab-blank');
const pageTodo = document.getElementById('page-todo');
const pageBlank = document.getElementById('page-blank');

function showPage(page) {
    pageTodo.classList.remove('active');
    pageBlank.classList.remove('active');
    tabTodo.classList.remove('active');
    tabBlank.classList.remove('active');

    if (page === 'todo') {
        pageTodo.classList.add('active');
        tabTodo.classList.add('active');
    } else {
        pageBlank.classList.add('active');
        tabBlank.classList.add('active');
    }
}
tabTodo.addEventListener('click', () => showPage('todo'));
tabBlank.addEventListener('click', () => showPage('blank'));