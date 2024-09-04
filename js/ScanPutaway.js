const sidebar = document.querySelector('.sidebar');
const toggleArrow = document.querySelector('.toggle-arrow');
const toggleArrowHidden = document.querySelector('.toggle-arrow-hidden');

// Dummy data for testing
let items = JSON.parse(localStorage.getItem('items')) || [
    { name: "Sofa", sku: "SKU001", upc: "UPC001", price: 500, cost: 300, profit: 200, margin: 40, inventoryQty: 10, locations: [{ code: "A1001", qty: 5 }, { code: "A1002", qty: 5 }] },
    { name: "Recliner", sku: "SKU002", upc: "UPC002", price: 300, cost: 150, profit: 150, margin: 50, inventoryQty: 20, locations: [{ code: "A1001", qty: 10 }, { code: "A1003", qty: 10 }] },
    { name: "Mattress", sku: "SKU003", upc: "UPC003", price: 400, cost: 200, profit: 200, margin: 50, inventoryQty: 15, locations: [{ code: "A1004", qty: 15 }] },
    { name: "Dining Table", sku: "SKU004", upc: "UPC004", price: 600, cost: 400, profit: 200, margin: 33.33, inventoryQty: 5, locations: [{ code: "A1005", qty: 5 }] },
    { name: "Coffee Table", sku: "SKU005", upc: "UPC005", price: 200, cost: 100, profit: 100, margin: 50, inventoryQty: 12, locations: [{ code: "A1006", qty: 12 }] },
    { name: "Bookshelf", sku: "SKU006", upc: "UPC006", price: 150, cost: 70, profit: 80, margin: 53.33, inventoryQty: 8, locations: [{ code: "A1007", qty: 8 }] },
    { name: "TV Stand", sku: "SKU007", upc: "UPC007", price: 250, cost: 125, profit: 125, margin: 50, inventoryQty: 6, locations: [{ code: "A1008", qty: 6 }] },
    { name: "Office Chair", sku: "SKU008", upc: "UPC008", price: 120, cost: 60, profit: 60, margin: 50, inventoryQty: 14, locations: [{ code: "A1009", qty: 14 }] },
    { name: "Bed Frame", sku: "SKU009", upc: "UPC009", price: 350, cost: 200, profit: 150, margin: 42.86, inventoryQty: 7, locations: [{ code: "A1010", qty: 7 }] },
    { name: "Wardrobe", sku: "SKU010", upc: "UPC010", price: 700, cost: 400, profit: 300, margin: 42.86, inventoryQty: 3, locations: [{ code: "A1011", qty: 3 }] }
];

let locations = JSON.parse(localStorage.getItem('locations')) || {
    "A1001": [{ sku: "SKU001", qty: 5 }, { sku: "SKU002", qty: 10 }],
    "A1002": [{ sku: "SKU001", qty: 5 }],
    "A1003": [{ sku: "SKU002", qty: 10 }],
    "A1004": [{ sku: "SKU003", qty: 15 }],
    "A1005": [{ sku: "SKU004", qty: 5 }],
    "A1006": [{ sku: "SKU005", qty: 12 }],
    "A1007": [{ sku: "SKU006", qty: 8 }],
    "A1008": [{ sku: "SKU007", qty: 6 }],
    "A1009": [{ sku: "SKU008", qty: 14 }],
    "A1010": [{ sku: "SKU009", qty: 7 }],
    "A1011": [{ sku: "SKU010", qty: 3 }]
};

// Display the logged-in user
const loggedInUserDisplay = document.getElementById('logged-in-user');
const loggedInUser = localStorage.getItem('loggedInUser');
if (loggedInUser) {
    loggedInUserDisplay.textContent = `Logged in as: ${loggedInUser}`;
}

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

const links = document.querySelectorAll('.sidebar a');
const contents = document.querySelectorAll('.scanputaway-content');

links.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const contentId = link.id.replace('-link', '-content');
        contents.forEach(content => content.style.display = 'none');
        document.getElementById(contentId).style.display = 'block';
    });
});

document.getElementById('add-item-tab').addEventListener('click', () => {
    document.getElementById('add-item-form').style.display = 'block';
    document.getElementById('item-list').style.display = 'none';
    document.getElementById('locations-content').style.display = 'none';
});

document.getElementById('item-list-tab').addEventListener('click', () => {
    document.getElementById('add-item-form').style.display = 'none';
    document.getElementById('item-list').style.display = 'block';
    document.getElementById('locations-content').style.display = 'none';
});

document.getElementById('location-tab').addEventListener('click', () => {
    document.getElementById('add-item-form').style.display = 'none';
    document.getElementById('item-list').style.display = 'none';
    document.getElementById('locations-content').style.display = 'block';
});

function calculateProfitAndMargin() {
    const price = parseFloat(document.getElementById('item-price').value);
    const cost = parseFloat(document.getElementById('item-cost').value);

    if (!isNaN(price) && !isNaN(cost)) {
        const profit = price - cost;
        const margin = (profit / price) * 100;

        document.getElementById('item-profit').value = profit.toFixed(2);
        document.getElementById('item-margin').value = margin.toFixed(2);
    }
}

document.getElementById('item-price').addEventListener('input', calculateProfitAndMargin);
document.getElementById('item-cost').addEventListener('input', calculateProfitAndMargin);

function addItem() {
    const itemName = document.getElementById('item-name').value;
    const itemSKU = document.getElementById('item-sku').value;
    const itemUPC = document.getElementById('item-upc').value;
    const itemPrice = document.getElementById('item-price').value;
    const itemCost = document.getElementById('item-cost').value;
    const itemProfit = document.getElementById('item-profit').value;
    const itemMargin = document.getElementById('item-margin').value;
    const itemQty = parseInt(document.getElementById('item-qty').value);

    const newItem = {
        name: itemName,
        sku: itemSKU,
        upc: itemUPC,
        price: itemPrice,
        cost: itemCost,
        profit: itemProfit,
        margin: itemMargin,
        locations: [],
        inventoryQty: itemQty || 0
    };

    items.push(newItem);
    localStorage.setItem('items', JSON.stringify(items));
    renderItemList();
    clearItemForm();
}

function renderItemList() {
    const itemListBody = document.getElementById('item-list-body');
    itemListBody.innerHTML = '';

    items.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="#" onclick="viewItem(${index})">${item.name}</a></td>
            <td>${item.sku}</td>
            <td>${item.upc}</td>
            <td>$${item.price}</td>
            <td>$${item.cost}</td>
            <td>$${item.profit}</td>
            <td>${item.margin}%</td>
            <td>${item.locations.length > 0 ? item.locations.length : 'None'}</td>
            <td>${item.inventoryQty}</td>
        `;
        itemListBody.appendChild(row);
    });
}

function clearItemForm() {
    document.getElementById('item-name').value = '';
    document.getElementById('item-sku').value = '';
    document.getElementById('item-upc').value = '';
    document.getElementById('item-price').value = '';
    document.getElementById('item-cost').value = '';
    document.getElementById('item-profit').value = '';
    document.getElementById('item-margin').value = '';
    document.getElementById('item-qty').value = '';
}

function viewItem(itemIndex) {
    const item = items[itemIndex];

    const itemPopup = document.getElementById('item-popup');
    document.getElementById('popup-item-name').textContent = item.name;
    document.getElementById('popup-item-sku').textContent = item.sku;
    document.getElementById('popup-item-upc').textContent = item.upc;
    document.getElementById('popup-item-price').textContent = `$${item.price}`;
    document.getElementById('popup-item-cost').textContent = `$${item.cost}`;
    document.getElementById('popup-item-profit').textContent = `$${item.profit}`;
    document.getElementById('popup-item-margin').textContent = item.margin + '%';
    document.getElementById('popup-item-qty').textContent = item.inventoryQty;

    const locationList = document.getElementById('popup-location-list');
    locationList.innerHTML = '';

    item.locations.forEach(location => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td onclick="highlightLocation(this, '${location.code}')">${location.code}</td>
            <td>${location.notes || ''}</td>
            <td>${location.qty}</td>
        `;
        locationList.appendChild(row);
    });

    itemPopup.classList.add('active');
    itemPopup.style.zIndex = '2000';

    document.getElementById('item-action-sku').value = item.sku;
}

function highlightLocation(element, code) {
    const rows = document.querySelectorAll('#popup-location-list tr');
    const actionButtons = document.querySelectorAll('.location-actions button');

    if (element.parentNode.classList.contains('selected')) {
        element.parentNode.classList.remove('selected');
        document.getElementById('item-action-location').value = ''; // Clear location field
        actionButtons.forEach(button => button.removeAttribute('data-selected-location'));
    } else {
        rows.forEach(row => row.classList.remove('selected'));
        element.parentNode.classList.add('selected');
        document.getElementById('item-action-location').value = code; // Auto-populate location field
        actionButtons.forEach(button => button.dataset.selectedLocation = code);
    }
}

function closePopup() {
    document.getElementById('item-popup').classList.remove('active');
}

function showAddPopup() {
    document.getElementById('item-action-form').style.display = 'block';
    document.getElementById('item-action-form').dataset.action = 'add';
    document.getElementById('action-title').textContent = 'Add';
    document.getElementById('item-action-location').value = document.getElementById('location-code-display').textContent;
}

function showRemovePopup() {
    document.getElementById('item-action-form').style.display = 'block';
    document.getElementById('item-action-form').dataset.action = 'remove';
    document.getElementById('action-title').textContent = 'Remove';
    document.getElementById('item-action-location').value = document.getElementById('location-code-display').textContent;
}

function showMovePopup() {
    document.getElementById('item-action-form').style.display = 'block';
    document.getElementById('item-action-form').dataset.action = 'move';
    document.getElementById('action-title').textContent = 'Move';
    document.getElementById('item-action-location').value = document.getElementById('location-code-display').textContent;
    document.getElementById('item-action-to-location-row').style.display = 'block';
}

function closeItemActionForm() {
    document.getElementById('item-action-form').style.display = 'none';
}

function submitItemAction() {
    const actionType = document.getElementById('item-action-form').dataset.action;
    const locationCode = document.getElementById('item-action-location').value;
    const toLocationCode = document.getElementById('item-action-to-location').value;
    const qty = parseInt(document.getElementById('item-action-qty').value);
    const skuOrUpc = document.getElementById('item-action-sku').value;

    if (!locationCode || !skuOrUpc || isNaN(qty)) {
        alert('Please fill all fields.');
        return;
    }

    const item = items.find(i => i.sku === skuOrUpc || i.upc === skuOrUpc);

    if (!item) {
        alert('Item not found.');
        return;
    }

    const existingLocation = item.locations.find(loc => loc.code === locationCode);

    if (actionType === 'add') {
        if (existingLocation) {
            existingLocation.qty += qty;
        } else {
            item.locations.push({ code: locationCode, qty });
        }
        item.inventoryQty += qty;
    } else if (actionType === 'remove') {
        if (existingLocation && existingLocation.qty >= qty) {
            existingLocation.qty -= qty;
            item.inventoryQty -= qty;
            if (existingLocation.qty === 0) {
                item.locations = item.locations.filter(loc => loc !== existingLocation);
            }
        } else {
            alert('Not enough quantity to remove.');
            return;
        }
    } else if (actionType === 'move') {
        if (existingLocation && existingLocation.qty >= qty) {
            const toLocation = item.locations.find(loc => loc.code === toLocationCode);
            existingLocation.qty -= qty;
            if (toLocation) {
                toLocation.qty += qty;
            } else {
                item.locations.push({ code: toLocationCode, qty });
            }
            if (existingLocation.qty === 0) {
                item.locations = item.locations.filter(loc => loc !== existingLocation);
            }
        } else {
            alert('Not enough quantity to move.');
            return;
        }
    }

    localStorage.setItem('items', JSON.stringify(items));
    renderItemList();
    closeItemActionForm();
    viewItem(items.indexOf(item)); // Refresh the item view
    updateLocationList();
}

function deleteAllLocations() {
    if (confirm('Are you sure you want to delete all locations?') && confirm('Are you really sure?')) {
        const itemName = document.getElementById('popup-item-name').textContent;
        const item = items.find(i => i.name === itemName);
        item.locations = [];
        item.inventoryQty = 0;
        localStorage.setItem('items', JSON.stringify(items));
        renderItemList();
        viewItem(items.indexOf(item));
        updateLocationList();
    }
}

function addLocation() {
    const locationCode = document.getElementById('location-code').value;
    if (locationCode && /^[A-Z]\d{4}$/.test(locationCode)) {
        if (!locations[locationCode]) {
            locations[locationCode] = [];
            localStorage.setItem('locations', JSON.stringify(locations));
            renderLocationList();
            document.getElementById('location-code').value = '';
        } else {
            alert('Location already exists.');
        }
    } else {
        alert('Invalid location code. Please use a letter followed by 4 digits (e.g., A1234).');
    }
}

function renderLocationList() {
    const locationListBody = document.getElementById('location-list-body');
    locationListBody.innerHTML = '';

    for (const code in locations) {
        const numOfSkus = locations[code].length;
        const numOfItems = locations[code].reduce((sum, item) => sum + item.qty, 0);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="#" onclick="viewLocation('${code}')">${code}</a></td>
            <td>${numOfSkus}</td>
            <td>${numOfItems}</td>
            <td>${locations[code].notes || ''}</td>
        `;
        locationListBody.appendChild(row);
    }
}

function updateLocationList() {
    for (const code in locations) {
        const numOfSkus = locations[code].length;
        const numOfItems = locations[code].reduce((sum, item) => sum + item.qty, 0);

        const locationRow = [...document.querySelectorAll('#location-list-body tr')].find(row => row.querySelector('td a').textContent === code);

        if (locationRow) {
            locationRow.children[1].textContent = numOfSkus;
            locationRow.children[2].textContent = numOfItems;
        }
    }
}

function viewLocation(locationCode) {
    const locationPopup = document.getElementById('location-popup');
    const locationItemList = document.querySelector('#location-item-list tbody');
    document.getElementById('location-code-display').textContent = locationCode;
    locationItemList.innerHTML = '';

    const itemsInLocation = items.filter(item => item.locations.some(loc => loc.code === locationCode));

    itemsInLocation.forEach(item => {
        const location = item.locations.find(loc => loc.code === locationCode);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td onclick="highlightItemInLocation(this, '${item.sku}')">${item.name}</td>
            <td>${item.sku}</td>
            <td>${item.upc}</td>
            <td>${location.qty}</td>
            <td><button onclick="viewItem(${items.indexOf(item)})">View</button></td>
        `;
        locationItemList.appendChild(row);
    });

    locationPopup.classList.add('active');

    document.getElementById('location-action-location').value = locationCode;
    updateLocationList();
}

function highlightItemInLocation(element, sku) {
    const rows = document.querySelectorAll('#location-item-list tbody tr');
    const locationActions = document.querySelectorAll('.location-actions button');

    if (element.parentNode.classList.contains('selected')) {
        element.parentNode.classList.remove('selected');
        document.getElementById('location-action-sku').value = ''; // Clear SKU/UPC field
        locationActions.forEach(button => button.removeAttribute('data-selected-item'));
    } else {
        rows.forEach(row => row.classList.remove('selected'));
        element.parentNode.classList.add('selected');
        document.getElementById('location-action-sku').value = sku; // Auto-populate SKU/UPC field
        locationActions.forEach(button => button.dataset.selectedItem = sku);
    }
}

function closeLocationPopup() {
    document.getElementById('location-popup').classList.remove('active');
}

function showLocationAdd() {
    document.getElementById('location-action-form').style.display = 'block';
    document.getElementById('location-action-form').dataset.action = 'add';
    document.getElementById('location-action-title').textContent = 'Add';
    document.getElementById('location-action-location').value = document.getElementById('location-code-display').textContent;
}

function showLocationRemove() {
    document.getElementById('location-action-form').style.display = 'block';
    document.getElementById('location-action-form').dataset.action = 'remove';
    document.getElementById('location-action-title').textContent = 'Remove';
    document.getElementById('location-action-location').value = document.getElementById('location-code-display').textContent;
}

function showLocationMove() {
    document.getElementById('location-action-form').style.display = 'block';
    document.getElementById('location-action-form').dataset.action = 'move';
    document.getElementById('location-action-title').textContent = 'Move';
    document.getElementById('location-action-location').value = document.getElementById('location-code-display').textContent;
    document.getElementById('location-action-to-location-row').style.display = 'block';
}

function closeLocationActionForm() {
    document.getElementById('location-action-form').style.display = 'none';
}

function submitLocationAction() {
    const actionType = document.getElementById('location-action-form').dataset.action;
    const locationCode = document.getElementById('location-action-location').value;
    const toLocationCode = document.getElementById('location-action-to-location').value;
    const qty = parseInt(document.getElementById('location-action-qty').value);
    const skuOrUpc = document.getElementById('location-action-sku').value;

    if (!locationCode || !skuOrUpc || isNaN(qty)) {
        alert('Please fill all fields.');
        return;
    }

    const item = items.find(i => i.sku === skuOrUpc || i.upc === skuOrUpc);

    if (!item) {
        alert('Item not found.');
        return;
    }

    const existingLocation = locations[locationCode].find(loc => loc.sku === skuOrUpc);

    if (actionType === 'add') {
        if (existingLocation) {
            existingLocation.qty += qty;
        } else {
            locations[locationCode].push({ sku: skuOrUpc, qty });
        }
        item.inventoryQty += qty;
    } else if (actionType === 'remove') {
        if (existingLocation && existingLocation.qty >= qty) {
            existingLocation.qty -= qty;
            item.inventoryQty -= qty;
            if (existingLocation.qty === 0) {
                locations[locationCode] = locations[locationCode].filter(loc => loc !== existingLocation);
            }
        } else {
            alert('Not enough quantity to remove.');
            return;
        }
    } else if (actionType === 'move') {
        if (existingLocation && existingLocation.qty >= qty) {
            const toLocation = locations[toLocationCode].find(loc => loc.sku === skuOrUpc);
            existingLocation.qty -= qty;
            if (toLocation) {
                toLocation.qty += qty;
            } else {
                locations[toLocationCode].push({ sku: skuOrUpc, qty });
            }
            if (existingLocation.qty === 0) {
                locations[locationCode] = locations[locationCode].filter(loc => loc !== existingLocation);
            }
        } else {
            alert('Not enough quantity to move.');
            return;
        }
    }

    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('locations', JSON.stringify(locations));
    renderLocationList();
    closeLocationActionForm();
    viewLocation(locationCode); // Refresh the location view
}

function deleteAllItemsInLocation() {
    if (confirm('Are you sure you want to delete all items in this location?') && confirm('Are you really sure?')) {
        const locationCode = document.getElementById('location-code-display').textContent;
        items.forEach(item => {
            item.locations = item.locations.filter(loc => loc.code !== locationCode);
        });
        locations[locationCode] = [];
        localStorage.setItem('items', JSON.stringify(items));
        localStorage.setItem('locations', JSON.stringify(locations));
        renderLocationList();
        viewLocation(locationCode);
    }
}

function saveLocationNotes() {
    const locationCode = document.getElementById('location-code-display').textContent;
    const notes = document.getElementById('location-notes').value;

    if (!locations[locationCode]) {
        alert('Invalid location.');
        return;
    }

    locations[locationCode].notes = notes;
    localStorage.setItem('locations', JSON.stringify(locations));
    renderLocationList();
}

function searchItem() {
    const searchQuery = document.getElementById('item-number').value.toLowerCase();
    const resultsBody = document.getElementById('scanner-results-body');
    resultsBody.innerHTML = '';

    const filteredItems = items.filter(item => {
        return item.name.toLowerCase().includes(searchQuery) || item.sku.toLowerCase().includes(searchQuery) || item.upc.toLowerCase().includes(searchQuery);
    });

    filteredItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="#" onclick="viewItem(${index})">${item.name}</a></td>
            <td>${item.sku}</td>
            <td>${item.upc}</td>
            <td>$${item.price}</td>
            <td>$${item.cost}</td>
            <td>$${item.profit}</td>
            <td>${item.margin}%</td>
            <td>${item.locations.length > 0 ? item.locations.length : 'None'}</td>
            <td>${item.inventoryQty}</td>
        `;
        resultsBody.appendChild(row);
    });
}

function startScanner() {
    const video = document.getElementById('scanner-preview');
    video.style.display = 'block';

    Quagga.init({
        inputStream: {
            type: "LiveStream",
            constraints: {
                width: 640,
                height: 480,
                facingMode: "environment"
            },
            target: video
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader", "ean_8_reader", "upc_reader", "upc_e_reader"]
        }
    }, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        Quagga.start();
    });

    Quagga.onDetected(function (result) {
        const code = result.codeResult.code;
        document.getElementById('item-number').value = code;
        searchItem();
        Quagga.stop();
        video.style.display = 'none';
    });
}

function searchLocations() {
    const searchQuery = document.getElementById('location-search').value.toLowerCase();
    const locationListBody = document.getElementById('location-list-body');
    locationListBody.innerHTML = '';

    for (const code in locations) {
        if (code.toLowerCase().includes(searchQuery)) {
            const numOfSkus = locations[code].length;
            const numOfItems = locations[code].reduce((sum, item) => sum + item.qty, 0);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><a href="#" onclick="viewLocation('${code}')">${code}</a></td>
                <td>${numOfSkus}</td>
                <td>${numOfItems}</td>
                <td>${locations[code].notes || ''}</td>
            `;
            locationListBody.appendChild(row);
        }
    }
}

document.getElementById('scanner-content').style.display = 'block';
renderItemList();
renderLocationList();

document.getElementById('item-number').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchItem();
    }
});

document.getElementById('location-search').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchLocations();
    }
});
