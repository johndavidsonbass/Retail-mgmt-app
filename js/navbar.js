// js/navbar.js

console.log('Navbar script loaded');

document.addEventListener("DOMContentLoaded", function () {
    const navbarContainer = document.getElementById('navbar-container');

    if (navbarContainer) {
        const page = window.location.pathname.split('/').pop();

        let navItems = [];

        switch (page) {
            case 'options.html':
                navItems = [
                    { name: 'Appearance', link: '#' },
                    { name: 'Users', link: '#' },
                    { name: 'Scan Putaway Maintenance', link: '#' },
                    { name: 'Back to Home', link: '../pages/index.html' }
                ];
                break;

            case 'Delivery&Pickup.html':
                navItems = [
                    { name: 'Schedule Delivery', link: '#' },
                    { name: 'Pickup Management', link: '#' },
                    { name: 'Back to Home', link: '../pages/index.html' }
                ];
                break;

            case 'Receiving.html':
                navItems = [
                    { name: 'Receiving Schedule', link: '#' },
                    { name: 'Inventory Management', link: '#' },
                    { name: 'Back to Home', link: '../pages/index.html' }
                ];
                break;

            case 'ScanPutaway.html':
                navItems = [
                    { name: 'Scan Item', link: '#' },
                    { name: 'Putaway Management', link: '#' },
                    { name: 'Back to Home', link: '../pages/index.html' }
                ];
                break;

            case 'Reports.html':
                navItems = [
                    { name: 'Sales Report', link: '#' },
                    { name: 'Inventory Report', link: '#' },
                    { name: 'Back to Home', link: '../pages/index.html' }
                ];
                break;

            default:
                navbarContainer.innerHTML = ''; // Clear the navbar if not needed
                return; // Exit the function if no navbar is needed
        }

        let navHTML = '<div class="sidebar">';
        navItems.forEach(item => {
            navHTML += `<a href="${item.link}">${item.name}</a>`;
        });
        navHTML += '</div>';

        // Inject the navbar into the navbarContainer
        navbarContainer.innerHTML = navHTML;
    } else {
        console.error('Navbar container not found');
    }
});
