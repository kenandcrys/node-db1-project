const Account = require('./accounts-model')


exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  console.log('checkAccountPayload middleware');
  next();
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  console.log('checkAccountNameUnique middleware');
  next();
}

exports.checkAccountId = async (req, res, next) => {
   try {

    const account = await Account.getById(req.params.id);
    if(!account) {
      next({ status: 404, message: "Not Found!"})
    } else {
      req.account = account;
      next()
    }

   } catch (err) {
     next(err)
   }
}
