document.addEventListener('DOMContentLoaded', function() {
    // Check if default user is already in localStorage
    if (!localStorage.getItem('users')) {
        const defaultUser = {
            username: 'admin',
            password: 'admin123',
            role: 'Admin'
        };
        
        // Store the default user in localStorage
        localStorage.setItem('users', JSON.stringify([defaultUser]));
    }
});

function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        // Store the logged-in user in localStorage
        localStorage.setItem('loggedInUser', username);
        alert('Login successful!');
        window.location.href = 'home.html'; // Redirect to home page
    } else {
        alert('Invalid username or password');
    }
}
