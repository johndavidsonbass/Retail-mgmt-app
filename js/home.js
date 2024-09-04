document.addEventListener('DOMContentLoaded', function() {
    // Event listener for Up Sheet button
    document.getElementById('upSheetButton').addEventListener('click', function() {
        window.location.href = 'UpSheet.html';
    });

    // Event listener for Delivery & Pickup button
    document.getElementById('deliveryPickupButton').addEventListener('click', function() {
        window.location.href = 'Delivery&Pickup.html';
    });

    // Event listener for Scan Putaway button
    document.getElementById('scanPutawayButton').addEventListener('click', function() {
        window.location.href = 'ScanPutaway.html';
    });

    // Event listener for Receiving button
    document.getElementById('receivingButton').addEventListener('click', function() {
        window.location.href = 'Receiving.html';
    });

    // Event listener for Reports button
    document.getElementById('reportsButton').addEventListener('click', function() {
        window.location.href = 'Reports.html';
    });

    // Event listener for Options button
    document.getElementById('optionsButton').addEventListener('click', function() {
        window.location.href = 'Options.html';
    });

    // Event listener for Logout button
    document.getElementById('logout-button').addEventListener('click', function() {
        window.location.href = '../login.html';
    });
});
