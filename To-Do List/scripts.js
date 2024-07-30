import { filterTasks } from "./filter.js"
import { completeTaskHtml, renderLocalHtml, renderTaskHtml, saveTask } from "./utils.js"

const elements = {
    addTaskBtn: document.querySelector('.saveTskBtn'),
    filterAllBtn: document.querySelector('.allFilter'),
    progFilterBtn: document.querySelector('.progFilter'),
    compFilterBtn: document.querySelector('.compFilter'),
    taskList: document.querySelector('.taskList'),
    noTasks: document.querySelector('.noNewTasks')
}

renderLocalHtml()

function addTask() {
    let input = document.querySelector('#form1').value
    const tasks = document.querySelectorAll('.task')
    let taskCounter

    if (tasks.length > 0) {
        taskCounter = tasks.item(tasks.length - 1).firstChild.nextSibling.textContent.trim()
    } else {
        taskCounter = 0
    }

    if (input) {
        elements.noTasks.style.display = 'none'
        elements.taskList.innerHTML += renderTaskHtml(input.trim(), Number(taskCounter))
        document.querySelector('#form1').value = ''
    } else {
        alert(`We can't add empty task`)
    }

    
}

elements.addTaskBtn.addEventListener('click', ()=> {
    addTask()

    const allFinishBtn = document.querySelectorAll('.finishBtn')
    const allDeleteBtn = document.querySelectorAll('.deleteBtn')


    allDeleteBtn.forEach(element => {
        element.addEventListener('click', ()=> {
            element.parentElement.parentElement.remove()
            let input = element.closest('.task').querySelector('.taskINP').textContent.trim()
            let taskBudge = element.closest('.task').querySelector('.badge').textContent.trim()

            const tasks = document.querySelectorAll('.task')
            let taskCounter = tasks.length

            const alltask = [input.trim(), Number(element.dataset.id), taskBudge]
    
            if (taskCounter == 0) {
                elements.noTasks.style.display = 'block'
            }
            
            let localTasks = JSON.parse(localStorage.getItem('task'))

            const hashArray = (arr) => JSON.stringify(arr);

            const targetHash = hashArray(alltask);

            const index = localTasks.findIndex((task) => hashArray(task) === targetHash);

            localTasks.splice(index, 1)
        
            localStorage.setItem('task', JSON.stringify(localTasks))
        })
    });

    allFinishBtn.forEach(element2 => {
        element2.addEventListener('click', ()=> {
            let completeTask = element2.closest('.task').querySelector('.badge')
            let input = element2.closest('.task').querySelector('.taskINP').textContent.trim()
            let parentEl = element2.parentElement.parentElement

            completeTaskHtml(element2, completeTask, parentEl)
            saveTask(input, element2.dataset.id, 'In Progress')
        })
    });

})

const allFinishBtn = document.querySelectorAll('.finishBtn')
const allDeleteBtn = document.querySelectorAll('.deleteBtn')


allDeleteBtn.forEach(element => {
    element.addEventListener('click', ()=> {
        element.parentElement.parentElement.remove()
        let input = element.closest('.task').querySelector('.taskINP').textContent.trim()
        let taskBudge = element.closest('.task').querySelector('.badge').textContent.trim()

        const tasks = document.querySelectorAll('.task')
        let taskCounter = tasks.length

        if (taskCounter == 0) {
            elements.noTasks.style.display = 'block'
        }
        
        let localTasks = JSON.parse(localStorage.getItem('task'))

        const hashArray = (arr) => JSON.stringify(arr);

        const targetHash = hashArray([input.trim(), Number(element.dataset.id), taskBudge]);

        const index = localTasks.findIndex(task => hashArray(task) === targetHash);

        localTasks.splice(index, 1)
    
        localStorage.setItem('task', JSON.stringify(localTasks))
    })
});

allFinishBtn.forEach(element2 => {
    element2.addEventListener('click', ()=> {
        let completeTask = element2.closest('.task').querySelector('.badge')
        let input = element2.closest('.task').querySelector('.taskINP').textContent.trim()

        let parentEl = element2.parentElement.parentElement

        completeTaskHtml(element2, completeTask, parentEl)
        saveTask(input, element2.dataset.id, 'In Progress')
    })
});

elements.filterAllBtn.addEventListener('click', ()=> {
    filterTasks('all')
})
elements.compFilterBtn.addEventListener('click', ()=> {
    filterTasks('completed')
})
elements.progFilterBtn.addEventListener('click', ()=> {
    filterTasks('in-progress')
})


{/* <tr class="task in-progress">
<th scope="row">1</th>
<td>Buy groceries for next week</td>
<td><span class="badge badge-warning">In progress</span></td>
<td>
  <button type="button" class="btn btn-danger btn-sm deleteBtn">Delete</button>
  <button type="button" class="btn btn-success btn-sm ms-1 finishBtn">Finished</button>
</td>
</tr>
<tr class="task completed">
<th scope="row">3</th>
<td>Sign up for online course</td>
<td><span class="badge badge-success">Completed</span></td>
<td>
  <button type="button" class="btn btn-danger btn-sm">Delete</button>
  <button type="button" class="btn btn-secondary btn-sm ms-1">In Progress</button>
</td>
</tr> */}