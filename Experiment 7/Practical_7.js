// 1. Select the initial root DOM Nodes
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// 2. Add Task Functionality
function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create container list item
    const li = document.createElement('li');

    // Create span to hold text
    const span = document.createElement('span');
    span.classList.add('task-text');
    span.textContent = taskText;

    // Create action buttons wrapper
    const buttonGroup = document.createElement('div');

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.textContent = 'Edit';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';

    // Assemble and inject into DOM tree
    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(buttonGroup);
    todoList.appendChild(li);

    // Reset layout
    todoInput.value = "";
}

// 3. Handle Add Interactions
addBtn.addEventListener('click', addTask);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// 4. Event Delegation for Edit, Save, and Delete Actions
todoList.addEventListener('click', (e) => {
    const target = e.target;

    // --- DELETE FEATURE ---
    if (target.classList.contains('delete-btn')) {
        // Traversal: Find the closest <li> ancestor and remove it from the DOM tree
        const li = target.closest('li');
        li.remove(); 
    }

    // --- EDIT FEATURE ---
    else if (target.classList.contains('edit-btn')) {
        // Traversal: Up to the parent list item
        const li = target.closest('li');
        // Traversal: Down to find the specific element displaying text
        const span = li.querySelector('.task-text');
        
        // Create an interactive editable input field
        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add('edit-input');
        input.value = span.textContent;

        // Perform DOM Update: Swap text view for input field
        li.replaceChild(input, span);

        // Update Edit button state to Save configuration
        target.textContent = 'Save';
        target.classList.remove('edit-btn');
        target.classList.add('save-btn');
    }

    // --- SAVE FEATURE ---
    else if (target.classList.contains('save-btn')) {
        // Traversal: Up to parent, then down to target editing field
        const li = target.closest('li');
        const input = li.querySelector('.edit-input');
        
        const updatedText = input.value.trim();
        if (updatedText === "") {
            alert("Task content cannot be empty!");
            return;
        }

        // Rebuild static text node
        const span = document.createElement('span');
        span.classList.add('task-text');
        span.textContent = updatedText;

        // Perform DOM Update: Swap input field back to text display
        li.replaceChild(span, input);

        // Revert Save button behavior back to Edit mode
        target.textContent = 'Edit';
        target.classList.remove('save-btn');
        target.classList.add('edit-btn');
    }
});