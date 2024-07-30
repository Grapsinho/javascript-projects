export function renderTaskHtml(input, counter) {
    let progHtml = `
    
        <tr class="task in-progress">
            <th scope="row">${counter += 1}</th>
            <td class="taskINP">${input}</td>
            <td><span class="badge badge-warning">In Progress</span></td>
            <td>
            <button type="button" class="btn btn-danger btn-sm deleteBtn" data-id='${counter}'>Delete</button>
            <button type="button" class="btn btn-success btn-sm ms-1 finishBtn" data-id='${counter}'>Finish</button>
            </td>
        </tr>

    `

    saveTask(input, counter, 'In Progress')

    return progHtml
}

export function renderLocalHtml() {
    let localTasks

    if (localStorage.getItem('task') && localStorage.getItem('task') != '[]') {
        localTasks = JSON.parse(localStorage.getItem('task'))
        let taskList = document.querySelector('.taskList')
        document.querySelector('.noNewTasks').style.display = 'none'

        console.log(localTasks)

        localTasks.forEach(element => {
            if (element[2] == 'In Progress') {

                taskList.innerHTML += `
        
                <tr class="task in-progress">
                    <th scope="row">${element[1]}</th>
                    <td class="taskINP">${element[0]}</td>
                    <td><span class="badge badge-warning">In Progress</span></td>
                    <td>
                    <button type="button" class="btn btn-danger btn-sm deleteBtn" data-id='${element[1]}'>Delete</button>
                    <button type="button" class="btn btn-success btn-sm ms-1 finishBtn" data-id='${element[1]}'>Finish</button>
                    </td>
                </tr>
    
            `
            } else if (element[2] == 'Completed') {

                taskList.innerHTML += `
    
                <tr class="task completed">
                    <th scope="row">${element[1]}</th>
                    <td class="taskINP">${element[0]}</td>
                    <td><span class="badge badge-success">Completed</span></td>
                    <td>
                    <button type="button" class="btn btn-danger btn-sm deleteBtn" data-id='${element[1]}'>Delete</button>
                    <button type="button" class="btn btn-secondary btn-sm ms-1 finishBtn" data-id='${element[1]}'>Finished</button>
                    </td>
                </tr>
    
            `
            }
        });
    } else {
        document.querySelector('.noNewTasks').style.display = 'block'
        return
    }
}

export function saveTask(input, counter, progress) {
    const allTask = [input, Number(counter), progress]
    let localTasks

    if (localStorage.getItem('task')) {
        localTasks = JSON.parse(localStorage.getItem('task'))
    } else {
        localStorage.setItem('task', JSON.stringify([]))

        localTasks = JSON.parse(localStorage.getItem('task'))
    }

    // Hash function to create a unique string representation of each sub-array
    const hashArray = (arr) => JSON.stringify(arr);

    // Create a Set of hashed sub-arrays
    const taskSet = new Set(localTasks.map(hashArray));

    // Check if the target array is included in the Set
    const includesTarget = taskSet.has(hashArray(allTask));
      
    if (includesTarget) {
        const targetHash = hashArray(allTask);

        const index = localTasks.findIndex(task => hashArray(task) === targetHash);

        localTasks[index][2] = 'Completed'
        //localTasks.splice(localTasks.indexOf([input.trim(), element.dataset.id, 'In Progress']), 1)
        localStorage.setItem('task', JSON.stringify(localTasks))
        return
    }

    localTasks.push(allTask)

    localStorage.setItem('task', JSON.stringify(localTasks))
}

export function completeTaskHtml(element2, completeTask, parentEl) {
    element2.textContent = 'Finished'
    element2.style.pointerEvents = 'none'
    element2.classList.add('btn-secondary')
    element2.classList.remove('btn-success')

    completeTask.textContent = 'Completed'
    completeTask.classList.remove('badge-warning')
    completeTask.classList.add('badge-success')
    parentEl.classList.remove('in-progress')
    parentEl.classList.add('completed')

}