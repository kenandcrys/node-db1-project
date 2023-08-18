const router = require('express').Router()
const md = require('./accounts-middleware')

router.get('/', (req, res, next) => { 
  try{
      res.json([{},{}])
  } catch (err) {
    next(err)
  }
})

router.get('/:id', md.checkAccountId, (req, res, next) => {
  // DO YOUR 
  try{
    res.json('get accounts by id')
  } catch (err) {
    next(err)
  }
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
