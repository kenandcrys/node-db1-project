const router = require('express').Router()

router.get('/', (req, res, next) => {
  // DO YOUR 
  try{
      res.json([{},{}])
  } catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  // DO YOUR 
  try{
    throw new Error("This is router.get `/:id`")
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  // DO YOUR 
  try{
    throw new Error("This is router.post `/`")
  } catch (err) {
    next(err)
  }
})

router.put('/:id', (req, res, next) => {
  // DO YOUR 
  try{
    throw new Error("This is router.put `/:id`")
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR 
  try{
    throw new Error("This is router.delete `/:id`")
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR 
  res.status(err.status || 500).json({
    message: err.message,
  })
})

module.exports = router;
