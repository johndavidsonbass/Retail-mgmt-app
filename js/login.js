document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('login-btn');
    loginButton.addEventListener('click', function () {
        const enteredUsername = document.getElementById('username').value;
        const enteredPassword = document.getElementById('password').value;

        // Hardcoded credentials for testing on GitHub Pages
        const defaultUser = {
            username: 'admin',
            password: 'password123'
        };

        if (
            enteredUsername === defaultUser.username &&
            enteredPassword === defaultUser.password
        ) {
            // Log the user in
            alert('Login successful! Redirecting...');
            window.location.href = 'pages/home.html'; // Redirect to homepage or another page
        } else {
            // Display error
            alert('Invalid username or password');
        }
    });
});



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
            window.location.href = 'pages/home.html';  // Adjusted path for index.html
        } else {
            // If credentials don't match, display an error message
            errorMessage.textContent = 'Invalid username or password';
        }
    });
});
