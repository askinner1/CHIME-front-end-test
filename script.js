document.addEventListener('DOMContentLoaded', () => {
    const searchPage = document.getElementById('searchPage');
    const infoPage = document.getElementById('infoPage');
    const searchBox = document.getElementById('searchBox');
    const suggestions = document.getElementById('suggestions');
    const infoBox = document.getElementById('infoBox');
    const infoTitle = document.querySelector('.infoTitle');
    const infoContent = document.getElementById('infoContent');
    const closeButton = document.getElementById('closeButton');
    let data = [];

    // Load JSON data
    fetch('front-end-task.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
        });

    // Filter suggestions based on input
    searchBox.addEventListener('input', () => {
        const query = searchBox.value.toLowerCase();
        suggestions.innerHTML = '';
        if (query && query.length > 2) {
            const filteredData = data.filter(item => filterData(item, query));
            filteredData.forEach(item => {
                const li = document.createElement('li');
                if (item.firstname) {
                    li.textContent = item.firstname + ' ' + item.lastname;
                    li.addEventListener('click', () => {
                        displayPerson(item);
                    });
                } else if (item.name) {
                    li.textContent = item.name;
                    li.addEventListener('click', () => {
                        displayPlace(item);
                    });
                } else {
                    li.textContent = item.title;
                    li.addEventListener('click', () => {
                        displayQuote(item);
                    });
                }
                suggestions.appendChild(li);
            });
        }
    });

    // Display info of the selected person
    function displayPerson(item) {
        infoTitle.textContent = item.firstname;
        infoContent.innerHTML = `
            <img src="${item.avatar}" alt="${item.firstname}">
            <div class="infoDetails">
                <p><strong>Firstname</strong></p>
                <p>${item.firstname}</p>
                <p><strong>Lastname</strong></p>
                <p>${item.lastname}</p>
                <p><strong>Age</strong></p>
                <p>${item.age}</p>
                <p><strong>Sex</strong></p>
                <p>${item.sex}</p>
                <p><strong>Status</strong></p>
                <p>${item.status}</p>
            </div>
        `;
        searchPage.classList.add('hidden');
        infoPage.classList.remove('hidden');
    }

    // Display info of the selected place
    function displayPlace(item) {
        infoTitle.textContent = item.name;
        infoContent.innerHTML = `
            <img src="${item.avatar}" alt="${item.name}">
            <div class="infoDetails">
                <p><strong>Name</strong></p>
                <p>${item.name}</p>
                <p><strong>Region</strong></p>
                <p>${item.region}</p>
                <p><strong>Longitude</strong></p>
                <p>${item.longitude}</p>
                <p><strong>Latitude</strong></p>
                <p>${item.latitude}</p>
            </div>
        `;
        searchPage.classList.add('hidden');
        infoPage.classList.remove('hidden');
    }

    // Display info of the selected quote
    function displayQuote(item) {
        infoTitle.textContent = item.title;
        infoContent.innerHTML = `
            <img src="${item.avatar}" alt="${item.title}">
            <div class="infoDetails">
                <p><strong>Title</strong></p>
                <p>${item.title}</p>
                <p><strong>Description</strong></p>
                <p>${item.description}</p>
                <p><strong>Author</strong></p>
                <p>${item.author}</p>
            </div>
        `;
        searchPage.classList.add('hidden');
        infoPage.classList.remove('hidden');
    }

    function filterData(item, query) {
        if (!item) return false;
        if (item.firstname) {
            return (item.firstname.toLowerCase().includes(query)
                    || item.lastname.toLowerCase().includes(query));
        } else if (item.title) {
            return item.title.toLowerCase().includes(query);
        }
        return item.name.toLowerCase().includes(query);
    }

    // Close info box and return to search page
    closeButton.addEventListener('click', () => {
        infoPage.classList.add('hidden');
        searchPage.classList.remove('hidden');
    });
});