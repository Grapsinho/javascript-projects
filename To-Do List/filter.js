export function filterTasks(filterInp) {
    const tasks = document.querySelectorAll('.task')

    if (filterInp == 'in-progress') {
        tasks.forEach(element => {
            element.style.display = 'table-row'
            if (!element.classList.contains('in-progress')) {
                element.style.display = 'none'
            }
        });
    } else if (filterInp == 'completed') {
        tasks.forEach(element => {
            element.style.display = 'table-row'
            if (!element.classList.contains('completed')) {
                element.style.display = 'none'
            }
        });
    } else {
        tasks.forEach(element => {
            element.style.display = 'table-row'
        });
    }
}