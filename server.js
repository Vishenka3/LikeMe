const express = require('express');

const app = express();

app.get('/api/customers', (req, res) => {
    const customers = [
        {id: 1, firstName: 'Jhon', lastName: 'Doe' },
        { id: 2, firstName: 'Alex', lastName: 'Davydov' },
    ];
    res.json(customers);
});

const port = 4000;

app.listen(port, () => console.log(`Server started on port ${port}`));
