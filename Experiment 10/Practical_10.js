// Configuration: Target API URL
const apiUrl = 'https://typicode.com';

// --- METHOD 1: Native JavaScript fetch() ---
function loadDataWithFetch() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const tbody = document.getElementById('fetch-tbody');
            let rows = '';
            
            data.forEach(user => {
                rows += `<tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                </tr>`;
            });
            
            tbody.innerHTML = rows;
        })
        .catch(error => console.error('Fetch error:', error));
}

// --- METHOD 2: jQuery $.getJSON() ---
function loadDataWithjQuery() {
    $.getJSON(apiUrl, function(data) {
        let rows = '';
        
        $.each(data, function(index, user) {
            rows += `<tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
            </tr>`;
        });
        
        $('#jquery-tbody').html(rows);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error('jQuery error:', textStatus, errorThrown);
    });
}

// Execute both methods when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadDataWithFetch();
    loadDataWithjQuery();
});