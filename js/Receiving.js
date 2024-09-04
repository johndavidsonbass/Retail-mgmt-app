document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const toggleArrow = document.querySelector('.toggle-arrow');
    const toggleArrowHidden = document.querySelector('.toggle-arrow-hidden');

    function toggleSidebar() {
        sidebar.classList.toggle('hidden');
        
        if (sidebar.classList.contains('hidden')) {
            toggleArrow.style.display = 'none';
            toggleArrowHidden.style.display = 'block';
            document.querySelector('.content').style.marginLeft = '25px';
        } else {
            toggleArrow.style.display = 'block';
            toggleArrowHidden.style.display = 'none';
            document.querySelector('.content').style.marginLeft = '25px';
        }
    }

    toggleArrow.addEventListener('click', toggleSidebar);
    toggleArrowHidden.addEventListener('click', toggleSidebar);

    // Display the logged-in user in the sidebar
    const loggedInUser = localStorage.getItem('loggedInUser');
    const usernameDisplayElement = document.getElementById('username-display');
    if (usernameDisplayElement) {
        if (loggedInUser) {
            usernameDisplayElement.textContent = loggedInUser;
        } else {
            usernameDisplayElement.textContent = 'Guest';
        }
    } else {
        console.error("Username display element not found in the DOM.");
    }
});
