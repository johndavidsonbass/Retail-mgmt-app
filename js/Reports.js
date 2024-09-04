document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    const sidebar = document.querySelector('.sidebar');
    const toggleArrow = document.querySelector('.toggle-arrow');
    const toggleArrowHidden = document.querySelector('.toggle-arrow-hidden');

    if (!sidebar || !toggleArrow || !toggleArrowHidden) {
        console.error("Required elements not found in the DOM.");
        return; // Exit if any element is not found
    }

    function toggleSidebar() {
        sidebar.classList.toggle('hidden');
        
        if (sidebar.classList.contains('hidden')) {
            console.log("Hiding sidebar");
            toggleArrowHidden.style.display = 'flex'; // Show hidden arrow
            toggleArrow.style.display = 'none'; // Hide visible arrow
            document.querySelector('.content').style.marginLeft = '25px';
        } else {
            console.log("Showing sidebar");
            toggleArrowHidden.style.display = 'none'; // Hide hidden arrow
            toggleArrow.style.display = 'flex'; // Show visible arrow
            document.querySelector('.content').style.marginLeft = '25px'; // Adjust this if necessary
        }
    }

    // Attach the toggleSidebar function to the click event of the arrows
    toggleArrow.addEventListener('click', toggleSidebar);
    toggleArrowHidden.addEventListener('click', toggleSidebar);

    const links = document.querySelectorAll('.sidebar a');
    const contents = document.querySelectorAll('.options-content');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const contentId = link.id.replace('-link', '-content');
            contents.forEach(content => content.style.display = 'none');
            document.getElementById(contentId).style.display = 'block';
        });
    });

    // New code to display the logged-in user in the sidebar
    const loggedInUser = localStorage.getItem('loggedInUser');

    console.log("Logged in user from localStorage:", loggedInUser); // Log the retrieved username

    const usernameDisplayElement = document.getElementById('username-display');
    if (usernameDisplayElement) {
        console.log("Username display element found:", usernameDisplayElement); // Log the element to confirm it's found
        if (loggedInUser) {
            usernameDisplayElement.textContent = loggedInUser;
        } else {
            usernameDisplayElement.textContent = 'Guest';
        }
    } else {
        console.error("Username display element not found in the DOM.");
    }
});
