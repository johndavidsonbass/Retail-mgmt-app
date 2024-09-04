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
