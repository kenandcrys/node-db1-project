const router = require('express').Router()
const md = require('./accounts-middleware')
const Account = require('./accounts-model')

router.get('/', async (_req, res, next) => { 
  try{
     const accounts = await Account.getAll();
     res.status(200).json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', md.checkAccountId, async (req, res, next) => {

  try {
    const account = await Account.getById(req.params.id);
    if(account){
      res.json(req.account)
      next()
    } else {
      next({
        status: 404,
        message: "account not found"
      })
    }

  } catch (err) {
    next(err)
  }
 
})

router.post('/',
  md.checkAccountPayload,
  md.checkAccountNameUnique,
  (req, res, next) => {
    let { name, budget } = req.body;

    // Trim whitespace from the account name
    name = name.trim();

    // Convert budget to a number using Number()
    budget = Number(budget);

    Account.create({ name, budget })
      .then(newAccount => {
        res.status(201).json(newAccount);
      })
      .catch(err => {
        if (err.message.includes('name_unique_constraint')) {
          res.status(400).json({ message: 'Name is already taken' });
        } else {
          next(err);
        }
      });
});

module.exports = router;

module.exports = router;



router.put('/:id',
  md.checkAccountId,
  md.checkAccountPayload,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      let { name, budget } = req.body;

      name = name.trim();
      budget = Number(budget);

      if (name === undefined || budget === undefined) {
        return res.status(400).json({ message: 'name and budget are required' });
      }

      const updatedAccount = {
        name,
        budget
      };

      const updated = await Account.updateById(id, updatedAccount);
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
});


router.delete('/:id', md.checkAccountId, async (req, res, next) => {
  try {
    const { id } = req.params;

    await Account.deleteById(id);

    res.json({ message: `Account with ID ${id} has been deleted.` });
    
  } catch (err) {
    next(err);
  }
});


router.use((err, _req, res, next) => {
  // Handle the error
  res.status(err.status || 500).json({
    message: err.message,
  });
  next()
});
module.exports = router;
