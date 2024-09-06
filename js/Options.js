let users = []; // Initialize an empty array

// Fetch users from the backend when the page loads
async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:5000/api/users'); // Adjust API route if needed
        if (response.ok) {
            const result = await response.json();
            console.log('Fetched Users:', result); // Log to see the structure of the response
            // Adjust here based on actual response structure
            if (result && result.users) {  // Check if result contains users array
                users = result.users;  // Extract the users array
                displayUsers(); // Update the user list on the page
            } else {
                console.error('Fetched data does not contain users array:', result);
            }
        } else {
            console.error('Failed to fetch users');
        }
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}



// Function to display users in the user list
function displayUsers() {
    console.log('Users array:', users);  // Log the users array
    const userList = document.getElementById('user-list');
    if (userList) {
        userList.innerHTML = `
            <h3 onclick="toggleUserList()">Active Users: <span id="toggle-symbol">v</span></h3>
            <div id="user-list-items" style="display: block;">
                ${users.map(user => `
                    <p>${user.username} 
                        <button class="edit-btn" onclick="showEditUserPopup('${user.username}')">Edit</button>
                    </p>`).join('')}
            </div>`;
    } else {
        console.error('User list element not found.');
    }
}

// Toggle the visibility of the user list
window.toggleUserList = function () {
    const userListItems = document.getElementById('user-list-items');
    const toggleSymbol = document.getElementById('toggle-symbol');
    if (userListItems.style.display === 'none') {
        userListItems.style.display = 'block';
        toggleSymbol.textContent = 'v';
    } else {
        userListItems.style.display = 'none';
        toggleSymbol.textContent = '^';
    }
};

// Ensure these functions are globally available
function showCreateUserPopup() {
    const popup = document.getElementById('create-user-popup');
    if (popup) {
        popup.style.display = 'block';
    } else {
        console.error('Create User Popup element not found.');
    }
}

window.showCreateUserPopup = showCreateUserPopup;

function closeCreateUserPopup() {
    const popup = document.getElementById('create-user-popup');
    if (popup) {
        popup.style.display = 'none';
    } else {
        console.error('Create User Popup element not found.');
    }
}

function showEditUserPopup(username) {
    const popup = document.getElementById('edit-user-popup');
    const editUsernameDisplay = document.getElementById('edit-username-display');
    const editUserRoleDisplay = document.getElementById('edit-user-role-display'); // Display current user role
    const editRoleSelect = document.getElementById('edit-role');
    const loggedInUserRole = localStorage.getItem('loggedInUserRole');
    const selectedUserObj = users.find(u => u.username === username);

    if (popup && editUsernameDisplay && selectedUserObj) {
        editUsernameDisplay.textContent = username;
        editUserRoleDisplay.textContent = selectedUserObj.role; // Display current user role
        editRoleSelect.value = selectedUserObj.role;

        // Disable role dropdown for lower-level users
        const roleHierarchy = ['Warehouse', 'Sales', 'Manager', 'Executive', 'Admin'];
        if (roleHierarchy.indexOf(loggedInUserRole) <= roleHierarchy.indexOf(selectedUserObj.role)) {
            editRoleSelect.disabled = false;
        } else {
            editRoleSelect.disabled = true; // Prevent role changes if the current user is not allowed
        }

        popup.style.display = 'block';
        window.selectedUser = username;
    } else {
        console.error('Edit User Popup element or user not found.');
    }
}

// Make showEditUserPopup globally accessible
window.showEditUserPopup = showEditUserPopup;

function closeEditUserPopup() {
    const popup = document.getElementById('edit-user-popup');
    if (popup) {
        popup.style.display = 'none';
    } else {
        console.error('Edit User Popup element not found.');
    }
}

window.closeEditUserPopup = closeEditUserPopup;

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const toggleArrow = document.querySelector('.toggle-arrow');
    const toggleArrowHidden = document.querySelector('.toggle-arrow-hidden');

    function toggleSidebar() {
        sidebar.classList.toggle('hidden');
        if (sidebar.classList.contains('hidden')) {
            toggleArrowHidden.style.display = 'flex';
            toggleArrow.style.display = 'none';
            document.querySelector('.content').style.marginLeft = '25px';
        } else {
            toggleArrowHidden.style.display = 'none';
            toggleArrow.style.display = 'flex';
            document.querySelector('.content').style.marginLeft = '25px';
        }
    }

    toggleArrow.addEventListener('click', toggleSidebar);
    toggleArrowHidden.addEventListener('click', toggleSidebar);

    const links = document.querySelectorAll('.sidebar a');
    const contents = document.querySelectorAll('.options-content');

    // Function to show the selected content and hide others
    function showContent(contentId) {
        contents.forEach(content => {
            content.style.display = content.id === contentId ? 'block' : 'none';
        });
    }

    if (contents.length > 0) {
        showContent(contents[0].id);
    }

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const contentId = link.id.replace('-link', '-content');
            showContent(contentId);
        });
    });

    // Dark mode toggle logic
    function toggleDarkMode() {
        const isDarkMode = document.getElementById('dark-mode-toggle').checked;
        document.body.classList.toggle('dark-mode', isDarkMode);
        sidebar.classList.toggle('dark-mode', isDarkMode);
        localStorage.setItem('darkMode', isDarkMode);
    }

    const darkMode = localStorage.getItem('darkMode') === 'true';
    document.getElementById('dark-mode-toggle').checked = darkMode;
    if (darkMode) {
        document.body.classList.add('dark-mode');
        sidebar.classList.add('dark-mode');
    }

    // Fetch users and display them
    fetchUsers(); // Fetch users when the page loads

    function createUser() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const role = document.getElementById('role').value;
    
        if (username && password) {
            const newUser = { username, password, role };

            // Send the new user to the backend API
            fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create user');
                }
                return response.json();
            })
            .then(() => {
                alert('User created successfully!');
                fetchUsers(); // Refresh user list
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
                document.getElementById('role').value = 'Sales'; // Default to Sales for the next entry
                closeCreateUserPopup();
            })
            .catch(error => {
                console.error('Error creating user:', error);
                alert('Error creating user');
            });
        } else {
            alert('Please fill in all fields.');
        }
    }

    function deleteUser() {
        const selectedUser = window.selectedUser;

        // Send a delete request to the backend API
        fetch(`http://localhost:5000/api/users/${selectedUser}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            return response.json();
        })
        .then(() => {
            alert('User deleted successfully!');
            fetchUsers(); // Refresh user list
            closeEditUserPopup();
        })
        .catch(error => {
            console.error('Error deleting user:', error);
            alert('Error deleting user');
        });
    }

    // Make createUser and deleteUser globally available
    window.createUser = createUser;
    window.deleteUser = deleteUser;
    window.toggleDarkMode = toggleDarkMode;
});
