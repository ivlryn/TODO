$(document).ready(function() {
    let taskToDelete;
    let taskToEdit;
    let isEditing = false;

    function updateRemainingTodos() {
        let remaining = $('#task-list .task-text').not('.completed').length;
        $('#remaining-todos').text(`Your remaining todos: ${remaining}`);
    }

    $('#new-task').keydown(function(event) {
        let taskText = $(this).val();
        if ($(this).val().length >= 50 && event.keyCode !== 8) { // Allow backspace
            event.preventDefault();
        }
        if (event.keyCode === 32) { // 32 is the keyCode for space bar
            let spaceCount = taskText.split(' ').length - 1;
            if (taskText.trim() === "" || spaceCount >= 4) {
                event.preventDefault();
            }
        }
        if (event.keyCode === 46 || event.keyCode === 47) { // 46 is the keyCode for . and 47 is the keyCode for /
            let dotCount = taskText.split('.').length - 1;
            let slashCount = taskText.split('/').length - 1;
            if (taskText.length === 0 || dotCount >= 2 || slashCount >= 2) {
                event.preventDefault();
            }
        }
    });

    $('#new-task').keyup(function(event) {
        let taskText = $(this).val();
        if (taskText.startsWith('./') || taskText.startsWith('/.') || taskText.startsWith('.') || taskText.startsWith('/')) {
            $(this).val('');
        }
    });

    $('#add-task-btn').click(function() {
        let taskText = $('#new-task').val();
        if (isEditing) {
            taskToEdit.find('.task-text').text(taskText);
            isEditing = false;
            taskToEdit = null;
            $(this).find('.icon').text('+'); // Change icon back to plus
        } else if (taskText.trim() !== "") {
            if (taskText.match(/^[0-9\W]+$/) || taskText.match(/^[0-9]+$/) || taskText.match(/^[\W]+$/)) {
                alert("Please enter a valid task name. Task name cannot be only number or symbol.");
            } else {
                $('#task-list').append(`
                    <li>
                        <input type="checkbox" class="task-checkbox">
                        <span class="task-text">${taskText}</span>
                        <button class="edit-btn">✏️</button>
                        <button class="delete-btn">x</button>
                    </li>
                `);
            }
        }
        $('#new-task').val('');
        updateRemainingTodos();
    });

    $('#task-list').on('click', '.task-checkbox', function() {
        $(this).siblings('.task-text').toggleClass('completed');
        updateRemainingTodos();
    });

    $('#task-list').on('click', '.delete-btn', function() {
        taskToDelete = $(this).parent();
        $('#popup-modal').show();
    });

    $('#task-list').on('click', '.edit-btn', function() {
        taskToEdit = $(this).parent();
        $('#new-task').val(taskToEdit.find('.task-text').text()).focus();
        isEditing = true;
        $('#add-task-btn .icon').text('✔'); // Change icon to tick
    });

    $('#confirm-delete-btn').click(function() {
        if (taskToDelete) {
            taskToDelete.remove();
            taskToDelete = null;
            updateRemainingTodos();
        }
        $('#popup-modal').hide();
    });

    $('#cancel-btn').click(function() {
        $('#popup-modal').hide();
    });

    $('.close').click(function() {
        $('#popup-modal').hide();
    });

    updateRemainingTodos();
});