document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const toggleArrow = document.querySelector('.toggle-arrow');
    const toggleArrowHidden = document.querySelector('.toggle-arrow-hidden');

    // Display the logged-in user
    const loggedInUserDisplay = document.getElementById('logged-in-user');
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        loggedInUserDisplay.textContent = `Logged in as: ${loggedInUser}`;
    }

    // Define the toggleSidebar function
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

    // Attach the toggleSidebar function to the arrow elements
    toggleArrow.addEventListener('click', toggleSidebar);
    toggleArrowHidden.addEventListener('click', toggleSidebar);

    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth', // Set the default view (month view)
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay' // Options for month, week, and day views
        },
        events: [
            // Example events; these can be replaced with dynamic data
            {
                title: 'Delivery 1',
                start: '2024-09-01',
            },
            {
                title: 'Pickup 1',
                start: '2024-09-02',
            },
            // More events...
        ]
    });
    calendar.render();

    const links = document.querySelectorAll('.sidebar a');
    const contents = document.querySelectorAll('.delivery-pickup-content');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const contentId = link.id.replace('-link', '-content');
            contents.forEach(content => content.style.display = 'none');
            document.getElementById(contentId).style.display = 'block';
        });
    });

    // Initialize the first section to show
    document.getElementById('calendar-content').style.display = 'block';
});
