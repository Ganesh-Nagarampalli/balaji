document.getElementById('employee-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let id = document.getElementById('employee-id').value;
    let name = document.getElementById('employee-name').value;
    let age = document.getElementById('employee-age').value;
    let department = document.getElementById('employee-department').value;
    let salary = document.getElementById('employee-salary').value;

    fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, age, department, salary })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        fetchEmployees();
    })
    .catch(error => console.error('Error:', error));
});

// Update employee details
document.getElementById('update-btn').addEventListener('click', function() {
    let id = document.getElementById('employee-id').value;
    let name = document.getElementById('employee-name').value;
    let age = document.getElementById('employee-age').value;
    let department = document.getElementById('employee-department').value;
    let salary = document.getElementById('employee-salary').value;

    fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age, department, salary })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Employee Updated:", data);
        fetchEmployees();
    })
    .catch(error => console.error('Error:', error));
});

// Get employee by ID or Name
document.getElementById('get-btn').addEventListener('click', function() {
    let searchValue = document.getElementById('search-input').value;

    fetch(`http://localhost:5000/api/employees/search?query=${searchValue}`)
    .then(response => response.json())
    .then(data => {
        console.log("Employee Found:", data);
        let employeeList = document.getElementById('employee-list');
        employeeList.innerHTML = ''; 

        if (data.data) {
            let li = document.createElement('li');
            li.textContent = `${data.data.name} (Age: ${data.data.age}, Dept: ${data.data.department}, Salary: ${data.data.salary})`;
            employeeList.appendChild(li);
        } else {
            alert("Employee not found!");
        }
    })
    .catch(error => console.error('Error:', error));
});

// Delete employee by ID
document.getElementById('delete-btn').addEventListener('click', function() {
    let id = document.getElementById('delete-input').value;
    deleteEmployee(id);
});

function deleteEmployee(id) {
    fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log("Employee Deleted:", data);
        fetchEmployees();
    })
    .catch(error => console.error('Error:', error));
}

// Fetch and display all employees
function fetchEmployees() {
    fetch('http://localhost:5000/api/employees')
    .then(response => response.json())
    .then(data => {
        let employeeList = document.getElementById('employee-list');
        employeeList.innerHTML = '';  

        data.data.forEach(employee => {
            let li = document.createElement('li');
            li.textContent = `${employee.id} - ${employee.name} (Age: ${employee.age}, Dept: ${employee.department}, Salary: ${employee.salary})`;
            employeeList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Load employees initially
fetchEmployees();
