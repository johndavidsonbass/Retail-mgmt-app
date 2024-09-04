    console.log('Hello World!');


        const startTimeButton = document.getElementById('start-time-button');
        const endTimeButton = document.getElementById('end-time-button');
        const startTimeSpan = document.getElementById('start-time');
        const endTimeSpan = document.getElementById('end-time');
        const upSheetList = document.getElementById('up-sheet-list');
        const upSheetForm = document.getElementById('up-sheet-form');
        const dateInput = document.getElementById('date');
        const addEntryTab = document.getElementById('add-entry-tab');
        const editEntryTab = document.getElementById('edit-entry-tab');
        const whosUpTab = document.getElementById('whos-up-tab');
        const addEntryDropdown = document.getElementById('add-entry-dropdown');
        const editEntryDropdown = document.getElementById('edit-entry-dropdown');
        const whosUpDropdown = document.getElementById('whos-up-dropdown');
        const nextUp = document.getElementById('next-up');
        const warningPopup = document.getElementById('warning-popup');
        const proceedButton = document.getElementById('proceed-button');
        const cancelButton = document.getElementById('cancel-button');
        const editRotationToggle = document.getElementById('edit-rotation-toggle');
        const employeeList = document.getElementById('employee-list');
        const rotationList = document.getElementById('rotation-list');

        let editMode = false;

        // Load current date by default
        dateInput.value = new Date().toISOString().split('T')[0];

        editRotationToggle.addEventListener('click', () => {
            editMode = !editMode;
            editRotationToggle.classList.toggle('active');
            setDraggableItems(); // Apply draggable state based on edit mode
            updateCursor(); // Change cursor based on edit mode
        });

        const loadEntries = (selectedDate) => {
            const savedEntries = JSON.parse(localStorage.getItem(`upSheet-${selectedDate}`)) || [];
            upSheetList.innerHTML = ''; // Clear existing entries
            const headerRow = document.createElement('li');
            headerRow.innerHTML = `
                <div><strong>Date</strong></div>
                <div><strong>Start Time</strong></div>
                <div><strong>End Time</strong></div>
                <div><strong>Notes</strong></div>
                <div><strong>Employee Name</strong></div>
                <div><strong>Sale Status</strong></div>
            `;
            upSheetList.appendChild(headerRow);
            savedEntries.forEach(entry => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <div>${entry.date}</div>
                    <div>${entry.startTime}</div>
                    <div>${entry.endTime}</div>
                    <div>${entry.notes}</div>
                    <div>${entry.employeeName}</div>
                    <div>${entry.saleStatus}</div>
                `;
                upSheetList.appendChild(listItem);
            });

            determineNextUp();
        };

        const determineNextUp = () => {
            const rotationListItems = document.querySelectorAll('#rotation-list li');
            if (rotationListItems.length > 0) {
                let nextEmployee = rotationListItems[0].querySelector('span').textContent;
                // If the first employee is with a Be Back, find the next one who's not
                for (let item of rotationListItems) {
                    if (!item.classList.contains('be-back')) {
                        nextEmployee = item.querySelector('span').textContent;
                        break;
                    }
                }
                nextUp.textContent = nextEmployee;
                highlightNextEmployee(nextEmployee);
            } else {
                nextUp.textContent = ''; // No one is up if rotation list is empty
            }
        };

        const highlightNextEmployee = (nextEmployee) => {
            const rotationListItems = document.querySelectorAll('#rotation-list li');
            rotationListItems.forEach(item => {
                if (item.querySelector('span').textContent === nextEmployee) {
                    item.classList.add('highlighted');
                } else {
                    item.classList.remove('highlighted');
                }
            });
        };

        const loadRotationList = () => {
            rotationList.innerHTML = ''; // Clear existing entries
            const checkboxes = employeeList.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const employeeName = checkbox.value;
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <span>${employeeName}</span>
                        <label>
                            BB <input type="checkbox" onchange="toggleBeBack('${employeeName}', this.checked)">
                        </label>
                    `;
                    rotationList.appendChild(listItem);
                }
            });

            determineNextUp(); // Determine and highlight the "up" employee
            setDraggableItems(); // Set draggable items based on initial state
        };

        const setDraggableItems = () => {
            const rotationListItems = document.querySelectorAll('#rotation-list li');
            rotationListItems.forEach(item => {
                item.draggable = editMode; // Set draggable state based on editMode

                item.removeEventListener('dragstart', dragStart);
                item.removeEventListener('dragend', dragEnd);

                if (editMode) {
                    item.addEventListener('dragstart', dragStart);
                    item.addEventListener('dragend', dragEnd);
                }
            });
        };

        const dragStart = (e) => {
            e.target.classList.add('dragging');
        };

        const dragEnd = (e) => {
            e.target.classList.remove('dragging');
            saveRotationOrder();
        };

        document.getElementById('rotation-list').addEventListener('dragover', (e) => {
            e.preventDefault();
            if (!editMode) return; // Only allow dragging if in edit mode
            const afterElement = getDragAfterElement(document.getElementById('rotation-list'), e.clientY);
            const draggingItem = document.querySelector('.dragging');
            if (afterElement == null) {
                document.getElementById('rotation-list').appendChild(draggingItem);
            } else {
                document.getElementById('rotation-list').insertBefore(draggingItem, afterElement);
            }
        });

        const saveRotationOrder = () => {
            const rotationListItems = document.querySelectorAll('#rotation-list li');
            const newRotation = Array.from(rotationListItems).map(item => item.querySelector('span').textContent);
            localStorage.setItem('rotation', JSON.stringify(newRotation));
            determineNextUp(); // Update who is up next based on new order
        };

        const getDragAfterElement = (container, y) => {
            const draggableElements = [...container.querySelectorAll('.rotation-editable:not(.dragging)')];

            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element;
        };

        const loadEmployeeList = () => {
            const employeeList = document.getElementById('employee-list');
            employeeList.innerHTML = ''; // Clear existing entries
            const allEmployees = JSON.parse(localStorage.getItem('users')) || []; // Load users from localStorage
            const rotation = JSON.parse(localStorage.getItem('rotation')) || [];
            allEmployees.forEach(employee => {
                const listItem = document.createElement('li');
                const isChecked = rotation.includes(employee.username) ? 'checked' : '';
                listItem.innerHTML = `
                    <label>
                        <input type="checkbox" value="${employee.username}" ${isChecked} onchange="toggleEmployeeInRotation('${employee.username}', this.checked)">
                        ${employee.username}
                    </label>
                `;
                employeeList.appendChild(listItem);
            });
        };

        const toggleEmployeeInRotation = (employee, isChecked) => {
            loadRotationList();
        };

        const toggleBeBack = (employee, isChecked) => {
            const rotationListItems = document.querySelectorAll('#rotation-list li');
            rotationListItems.forEach(item => {
                if (item.querySelector('span').textContent === employee) {
                    if (isChecked) {
                        item.classList.add('be-back');
                        determineNextUp(); // Recalculate who is up next when a BB is checked
                    } else {
                        item.classList.remove('be-back');
                        moveEmployeeToTop(employee);
                    }
                }
            });
        };

        const moveEmployeeToTop = (employeeName) => {
            const rotationListItems = Array.from(document.querySelectorAll('#rotation-list li'));
            const employeeItem = rotationListItems.find(item => item.querySelector('span').textContent === employeeName);

            if (employeeItem) {
                rotationList.removeChild(employeeItem);
                rotationList.insertBefore(employeeItem, rotationList.firstChild); // Move to the top
                saveRotationOrder(); // Save the updated order after moving
                determineNextUp(); // Recalculate who is up next after reordering
            }
        };

        const updateCursor = () => {
            const rotationListItems = document.querySelectorAll('#rotation-list li');
            rotationListItems.forEach(item => {
                item.style.cursor = editMode ? 'grab' : 'default';
            });
        };

        startTimeButton.addEventListener('click', () => {
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            startTimeSpan.textContent = time;
        });

        endTimeButton.addEventListener('click', () => {
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            endTimeSpan.textContent = time;
        });

        upSheetForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const startTime = startTimeSpan.textContent;
            const endTime = endTimeSpan.textContent;
            const notes = document.getElementById('notes').value;
            const saleStatus = document.querySelector('input[name="sale-status"]:checked').value;
            const employeeName = localStorage.getItem('loggedInUser');
            const selectedDate = dateInput.value;

            const rotationListItems = document.querySelectorAll('#rotation-list li');
            const currentUp = rotationListItems.length > 0 ? rotationListItems[0].querySelector('span').textContent : '';

            if (rotationListItems.length && employeeName !== currentUp) {
                warningPopup.classList.add('active');
                proceedButton.onclick = () => submitEntry(selectedDate, startTime, endTime, notes, saleStatus, employeeName);
                cancelButton.onclick = () => warningPopup.classList.remove('active');
                return;
            }

            submitEntry(selectedDate, startTime, endTime, notes, saleStatus, employeeName);
        });

        const submitEntry = (selectedDate, startTime, endTime, notes, saleStatus, employeeName) => {
            warningPopup.classList.remove('active');
            const newEntry = {
                date: selectedDate,
                startTime: startTime,
                endTime: endTime,
                notes: notes,
                employeeName: employeeName,
                saleStatus: saleStatus
            };

            const savedEntries = JSON.parse(localStorage.getItem(`upSheet-${selectedDate}`)) || [];
            savedEntries.push(newEntry);
            localStorage.setItem(`upSheet-${selectedDate}`, JSON.stringify(savedEntries));

            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div>${selectedDate}</div>
                <div>${startTime}</div>
                <div>${endTime}</div>
                <div>${notes}</div>
                <div>${employeeName}</div>
                <div>${saleStatus}</div>
            `;
            upSheetList.appendChild(listItem);

            document.getElementById('notes').value = '';
            startTimeSpan.textContent = '';
            endTimeSpan.textContent = '';

            // Move the employee to the bottom of the rotation list
            moveEmployeeToBottom(employeeName);
            determineNextUp();
        };

        const moveEmployeeToBottom = (employeeName) => {
            const rotationListItems = Array.from(document.querySelectorAll('#rotation-list li'));
            const employeeItem = rotationListItems.find(item => item.querySelector('span').textContent === employeeName);

            if (employeeItem) {
                rotationList.removeChild(employeeItem);
                rotationList.appendChild(employeeItem);
                saveRotationOrder(); // Save the updated order after moving
            }
        };

        addEntryTab.addEventListener('click', () => {
            addEntryTab.classList.add('active');
            editEntryTab.classList.remove('active');
            whosUpTab.classList.remove('active');
            addEntryDropdown.classList.add('active');
            editEntryDropdown.classList.remove('active');
            whosUpDropdown.classList.remove('active');
        });

        editEntryTab.addEventListener('click', () => {
            editEntryTab.classList.add('active');
            addEntryTab.classList.remove('active');
            whosUpTab.classList.remove('active');
            editEntryDropdown.classList.add('active');
            addEntryDropdown.classList.remove('active');
            whosUpDropdown.classList.remove('active');
        });

        whosUpTab.addEventListener('click', () => {
            whosUpTab.classList.add('active');
            addEntryTab.classList.remove('active');
            editEntryTab.classList.remove('active');
            whosUpDropdown.classList.add('active');
            addEntryDropdown.classList.remove('active');
            editEntryDropdown.classList.remove('active');
        });

        loadEntries(dateInput.value);
        loadRotationList();
        loadEmployeeList();

        dateInput.addEventListener('change', () => {
            loadEntries(dateInput.value);
        });