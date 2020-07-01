const router = require('express').Router();
const apiRoutes = require('./users');

router.get('/', (req, res) => {
  res.send('hello world');
});

router.use('/api/users', apiRoutes);

module.exports = router;
