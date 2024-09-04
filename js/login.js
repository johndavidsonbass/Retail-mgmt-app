document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Retrieve the list of users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the entered username and password match any user in the list
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            // If credentials match, save the logged-in user to localStorage and redirect
            localStorage.setItem('loggedInUser', username);
            window.location.href = 'pages/index.html';  // Adjusted path for index.html
        } else {
            // If credentials don't match, display an error message
            errorMessage.textContent = 'Invalid username or password';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Check if users exist in localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // If no users exist, create a default user
    if (users.length === 0) {
        const defaultUser = {
            username: 'admin',
            password: 'admin', // Use a stronger password in production
            level: 'admin' // Default user level
        };
        users.push(defaultUser);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Default user created: admin/password123');
    }

    // Rest of your login logic
    const loginButton = document.getElementById('login-btn');
    loginButton.addEventListener('click', function () {
        const enteredUsername = document.getElementById('username').value;
        const enteredPassword = document.getElementById('password').value;

        // Check if the entered credentials match any stored user
        const foundUser = users.find(
            user =>
                user.username === enteredUsername &&
                user.password === enteredPassword
        );

        if (foundUser) {
            // Success! Log the user in
            localStorage.setItem('loggedInUser', foundUser.username);
            window.location.href = 'index.html'; // Redirect to homepage or another page
        } else {
            // Display error
            alert('Invalid username or password');
        }
    });
});

