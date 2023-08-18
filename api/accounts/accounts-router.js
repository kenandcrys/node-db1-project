const router = require('express').Router()
const md = require('./accounts-middleware')
const Account = require('./accounts-model')

router.get('/', async (req, res, next) => { 
  try{
     const accounts = await Account.getAll();
     res.status(200).json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', md.checkAccountId, async (req, res, next) => {

  res.json(req.account)
})

router.post('/',
  md.checkAccountPayload,
  md.checkAccountNameUnique,
  (req, res, next) => {
  // DO YOUR 
  try{
    res.json('post accounts')
  } catch (err) {
    next(err)
  }
})

router.put('/:id',
  md.checkAccountNameUnique,
  md.checkAccountPayload,
  md.checkAccountId, 
  (req, res, next) => {
  // DO YOUR 
  try{
    res.json('update accounts ny id')
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', md.checkAccountId, (req, res, next) => {
  // DO YOUR 
  try{
    res.json('get accounts')
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => {
  // DO YOUR 
  res.status(err.status || 500).json({
    message: err.message,
  })
})

module.exports = router;
