// menu_scripts.js

// Function to toggle sub-menus
function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    const icon = document.getElementById(menuId + '-icon');

    if (menu.style.display === 'block') {
        menu.style.display = 'none';
        icon.innerHTML = '+';
    } else {
        menu.style.display = 'block';
        icon.innerHTML = '-';
    }
}

// Sidebar Toggle Functionality
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
}

// Function to copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Date copied to clipboard!');
    }).catch(err => {
        alert('Failed to copy!');
    });
}

// Function to change date format
function changeDateFormat() {
    const dateElement = document.querySelector('.current-date');
    if (dateElement) {
        let currentFormat = dateElement.dataset.format;
        const date = new Date(dateElement.dataset.date);
        let newFormat;

        switch(currentFormat) {
            case 'dd/mm/yyyy':
                newFormat = 'dd.mm.yyyy';
                break;
            case 'dd.mm.yyyy':
                newFormat = 'ddmmyyyy';
                break;
            case 'ddmmyyyy':
                newFormat = 'dd/mm/yyyy';
                break;
            default:
                newFormat = 'dd/mm/yyyy';
        }

        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = date.getFullYear();

        switch(newFormat) {
            case 'dd/mm/yyyy':
                dateElement.textContent = `${day}/${month}/${year}`;
                break;
            case 'dd.mm.yyyy':
                dateElement.textContent = `${day}.${month}.${year}`;
                break;
            case 'ddmmyyyy':
                dateElement.textContent = `${day}${month}${year}`;
                break;
        }

        dateElement.dataset.format = newFormat;
    }
}

// Initialize Sidebar Toggle
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggle-sidebar');
    toggleButton.addEventListener('click', toggleSidebar);
});
