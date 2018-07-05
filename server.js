const express = require('express');

const app = express();

app.get('/api/customers', (req, res) => {
    const customers = [
        {id: 1, firstNmae: 'Jhon', Lastname: 'Doe'},
        {id: 2, firstNmae: 'Alex', Lastname: 'Davydov'}
    ];
    res.json(customers);
});

const port = 4000;

app.listen(port, () => console.log(`Server started on port ${port}`));