document.addEventListener('DOMContentLoaded', function() {
    const todoList = document.getElementById('ft_list');
    const newButton = document.getElementById('New');
    
    loadTodosFromCookies();
    
    newButton.addEventListener('click', function() {
        const todoText = prompt('Enter a new TODO:');
        if (todoText && todoText.trim() !== '') {
            addTodoItem(todoText);
            saveTodosToCookies();
        }
    });
    
    function addTodoItem(text) {
        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';
        todoItem.textContent = text;
        
        todoItem.addEventListener('click', function() {
            if (confirm('Do you want to remove this TODO?')) {
                todoItem.remove();
                saveTodosToCookies();
            }
        });
        
        todoList.insertBefore(todoItem, todoList.firstChild);
    }
    
    function saveTodosToCookies() {
        const todos = [];
        const todoItems = document.querySelectorAll('.todo-item');
        
        todoItems.forEach(function(item) {
            todos.push(item.textContent);
        });
        
        const todosJSON = JSON.stringify(todos);
        document.cookie = "todos=" + todosJSON + "; expires=" + getExpiryDate() + "; path=/";
    }
    
    function loadTodosFromCookies() {
        const cookies = document.cookie.split(';');
        let todosCookie = '';
        
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.indexOf('todos=') === 0) {
                todosCookie = cookie.substring('todos='.length);
                break;
            }
        }
        
        if (todosCookie) {
            try {
                const todos = JSON.parse(todosCookie);
                todos.forEach(function(text) {
                    addTodoItem(text);
                });
            } catch (e) {
                console.error('Error parsing todos from cookie:', e);
            }
        }
    }
    
    function getExpiryDate() {
        const date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days
        return date.toUTCString();
    }
});