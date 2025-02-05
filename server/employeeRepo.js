const fs = require('fs');
const filePath = './assets/employees.json';

let employeeRepo = {
    get: function(resolve, reject) {
        fs.readFile(filePath, function(error, data) {
            if (error) reject(error);
            else resolve(JSON.parse(data));
        });
    },

    insert: function(employee, resolve, reject) {
        fs.readFile(filePath, function(error, data) {
            if (error) reject(error);
            else {
                let employees = JSON.parse(data);
                employees.push(employee);
                fs.writeFile(filePath, JSON.stringify(employees, null, 2), function(error) {
                    if (error) reject(error);
                    else resolve(employee);
                });
            }
        });
    },

    update: function(id, updatedData, resolve, reject) {
        fs.readFile(filePath, function(error, data) {
            if (error) reject(error);
            else {
                let employees = JSON.parse(data);
                let employee = employees.find(emp => emp.id == id);
                if (employee) {
                    Object.keys(updatedData).forEach(key => {
                        if (updatedData[key]) employee[key] = updatedData[key];
                    });

                    fs.writeFile(filePath, JSON.stringify(employees, null, 2), function(error) {
                        if (error) reject(error);
                        else resolve(employee);
                    });
                } else {
                    reject("Employee not found");
                }
            }
        });
    },

    search: function(query, resolve, reject) {
        fs.readFile(filePath, function(error, data) {
            if (error) reject(error);
            else {
                let employees = JSON.parse(data);
                let result = employees.find(emp => emp.id == query || emp.name.toLowerCase() === query.toLowerCase());
                resolve(result);
            }
        });
    }
};

module.exports = employeeRepo;
