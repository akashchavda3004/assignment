document.addEventListener('DOMContentLoaded', function() {
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const excludeDateInput = document.getElementById('exclude-date');
    const addExcludedDateButton = document.getElementById('add-excluded-date');
    const excludedDatesList = document.getElementById('excluded-dates-list');
    const selectedMonth = document.getElementById('selected-month');
    const selectedYear = document.getElementById('selected-year');
    const numDays = document.getElementById('num-days');
    const numberOfLeadsInput = document.getElementById('number-of-leads');
    const expectedLeadCount = document.getElementById('expected-lead-count');
    const saveButton = document.getElementById('save-button');

    // Initialize the array for excluded dates
    const excludedDates = [];

    // Function to update date information
    function updateDateInfo() {
        const start = new Date(startDateInput.value);
        const end = new Date(endDateInput.value);

        // Calculate the number of days within the current month
        const today = new Date();
        const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        if (start < firstDayOfCurrentMonth) {
            start = firstDayOfCurrentMonth;
        }

        if (end > lastDayOfCurrentMonth) {
            end = lastDayOfCurrentMonth;
        }

        // Filter out the excluded dates that are outside the selected date range
        const validExcludedDates = excludedDates.filter(date => date >= start && date <= end);

        // Calculate the number of days between start and end dates excluding excluded dates
        const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) - validExcludedDates.length;

        // Update the UI elements
        selectedMonth.textContent = start.toLocaleString('default', { month: 'long' });
        selectedYear.textContent = start.getFullYear();
        numDays.textContent = daysDiff;

        // Calculate expected lead count
        const leads = numberOfLeadsInput.value;
        expectedLeadCount.textContent = daysDiff * leads;
    }

    // Add excluded date
    addExcludedDateButton.addEventListener('click', function() {
        const excludeDate = new Date(excludeDateInput.value);

        if (!excludedDates.includes(excludeDate)) {
            excludedDates.push(excludeDate);
            updateExcludedDatesList();
        }

        excludeDateInput.value = '';
        updateDateInfo();
    });

    // Function to update the excluded dates list in the UI
   
    // Function to update the excluded dates list in the table
function updateExcludedDatesList() {
    excludedDatesList.innerHTML = '';
    excludedDates.forEach(date => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${date.toDateString()}</td>
            <td>
                <button onclick="removeExcludedDate(this)">Remove</button>
            </td>
        `;
        excludedDatesList.appendChild(row);
    });
}

// Function to remove an excluded date
function removeExcludedDate(button) {
    const row = button.parentNode.parentNode;
    const dateStr = row.cells[0].textContent;
    const dateToRemove = new Date(dateStr);
    const index = excludedDates.findIndex(date => date.getTime() === dateToRemove.getTime());
    if (index !== -1) {
        excludedDates.splice(index, 1);
        row.remove();
        updateDateInfo();
        // You can call any other necessary functions here
    }
}

    // Handle Save button click with Ajax submission
    // saveButton.addEventListener('click', function() {
    //     // Add your Ajax submission code here
    //     // You can use the Fetch API or any preferred method to send data to the server
    // });

    // Event listeners for date input changes
    startDateInput.addEventListener('change', updateDateInfo);
    endDateInput.addEventListener('change', updateDateInfo);
    numberOfLeadsInput.addEventListener('input', updateDateInfo);

    // Initial call to update the date information
    updateDateInfo();
    // Function to update the excluded dates list in the table


});
