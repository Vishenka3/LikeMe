import express from 'express';

const router = express.Router();
/* GET home page. */
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/api/customers', (req, res) => {
    const customers = [
        { id: 1, firstName: 'Jhon', lastName: 'Doe' },
        { id: 2, firstName: 'Alex', lastName: 'Davydov' },
    ];
    res.json(customers);
});

export default router;
