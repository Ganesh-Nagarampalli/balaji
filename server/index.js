const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const employeeRepo = require('./employeeRepo');

app.use(cors());
app.use(express.json());
app.use('/api', router);

// Get all employees
router.get('/employees', function(req, res, next) {
    employeeRepo.get(data => res.status(200).json({ "status": 200, "data": data }), next);
});

// Create new employee
router.post('/employees', function(req, res, next) {
    employeeRepo.insert(req.body, data => res.status(201).json({ "status": 201, "data": data }), next);
});

// Update employee by ID
router.put('/employees/:id', function(req, res, next) {
    employeeRepo.update(req.params.id, req.body, data => res.status(200).json({ "status": 200, "data": data }), next);
});

// Search employee by ID or Name
router.get('/employees/search', function(req, res, next) {
    employeeRepo.search(req.query.query, data => {
        if (data) res.status(200).json({ "status": 200, "data": data });
        else res.status(404).json({ "status": 404, "error": "Employee not found" });
    }, next);
});

// Delete employee by ID
router.delete('/employees/:id', function(req, res, next) {
    employeeRepo.delete(req.params.id, data => res.status(200).json({ "status": 200, "data": data }), next);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
