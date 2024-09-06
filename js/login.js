document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            // Call the local server API for login
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Save the JWT token in local storage
                localStorage.setItem('token', data.token);
                // Redirect to home page after successful login
                window.location.href = 'pages/home.html';
            } else {
                // Display an error message if the login fails
                errorMessage.textContent = 'Invalid username or password';
            }
        } catch (error) {
            console.error('Error logging in:', error);
            errorMessage.textContent = 'An error occurred. Please try again later.';
        }
    });
});
