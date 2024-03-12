const calendar = document.querySelector('.calendar');
const monthYearElement = document.getElementById('monthYear');
const daysElement = document.getElementById('days');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');
const monthsDropdown = document.getElementById('months');
const yearsDropdown = document.getElementById('years');
const todayBtn = document.getElementById('todayBtn');

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function renderCalendar() {
    // Clear existing days
    daysElement.innerHTML = '';

    // Set the month and year text
    monthYearElement.textContent = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' });

    // Get the first day of the month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    // Get the last day of the month
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Get the last day of the previous month
    const lastDayOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    // Fill in the days
    for (let i = 0; i < firstDayOfMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day', 'other-month');
        dayElement.textContent = lastDayOfPrevMonth - firstDayOfMonth + 1 + i;
        daysElement.appendChild(dayElement);
    }

    for (let i = 1; i <= lastDayOfMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = i;
        if (currentYear === currentDate.getFullYear() && currentMonth === currentDate.getMonth() && i === currentDate.getDate()) {
            dayElement.classList.add('today');
        }
        daysElement.appendChild(dayElement);
    }

    const totalDays = firstDayOfMonth + lastDayOfMonth;
    const remainingDays = totalDays % 7;
    if (remainingDays !== 0) {
        for (let i = 0; i < 7 - remainingDays; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day', 'other-month');
            dayElement.textContent = i + 1;
            daysElement.appendChild(dayElement);
        }
    }
    yearsDropdown.value = currentYear;
    monthsDropdown.value = currentMonth;
}

function populateMonthsDropdown() {
    monthsDropdown.innerHTML = '';
    const months = Array.from({ length: 12 }, (_, i) => {
        return { value: i, name: new Date(currentYear, i).toLocaleString('default', { month: 'long' }) };
    });
    months.forEach(month => {
        const option = document.createElement('option');
        option.value = month.value;
        option.textContent = month.name;
        monthsDropdown.appendChild(option);
    });

    // Set the default value to the current month
    monthsDropdown.value = currentMonth;
}

function populateYearsDropdown() {
    yearsDropdown.innerHTML = '';
    const years = Array.from({ length: 35 }, (_, i) => currentDate.getFullYear() - 30 + i);
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearsDropdown.appendChild(option);
    });

    // Set the default value to the current year
    yearsDropdown.value = currentYear;
}

function goToPreviousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

function goToNextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}

function goToToday() {
    currentDate = new Date();
    currentMonth = currentDate.getMonth();
    currentYear = currentDate.getFullYear();
    renderCalendar();
}

prevBtn.addEventListener('click', goToPreviousMonth);
nextBtn.addEventListener('click', goToNextMonth);
prevMonthBtn.addEventListener('click', goToPreviousMonth);
nextMonthBtn.addEventListener('click', goToNextMonth);
todayBtn.addEventListener('click', goToToday);

monthsDropdown.addEventListener('change', (e) => {
    currentMonth = parseInt(e.target.value);
    renderCalendar();
});

yearsDropdown.addEventListener('change', (e) => {
    currentYear = parseInt(e.target.value);
    renderCalendar();
});

document.addEventListener('DOMContentLoaded', () => {
    populateMonthsDropdown();
    populateYearsDropdown();
    populateMonthsDropdown();
    populateMonthsDropdown();
    renderCalendar();
});
