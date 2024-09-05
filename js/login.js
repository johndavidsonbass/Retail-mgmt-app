document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    // Check if the user is already logged in and redirect if token is present
    if (localStorage.getItem('token')) {
        window.location.href = 'pages/home.html'; // Adjust path to your home page
    }

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Use the Heroku-deployed API URL for login
        const API_URL = 'https://retail-mgmt-app-backend-9867d5537e1a.herokuapp.com/api/auth/login';

        try {
            // Send a POST request to the backend for authentication
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // If login is successful, store the token in localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('loggedInUser', username);  // Optional: store the username
                
                // Redirect to the home page
                window.location.href = 'pages/home.html';  // Adjusted path for your home page
            } else {
                // Display error message from the backend
                errorMessage.textContent = data.message || 'Invalid username or password';
            }
        } catch (error) {
            // Handle any unexpected errors
            console.error('Error logging in:', error);
            errorMessage.textContent = 'An error occurred. Please try again later.';
        }
    });
});
