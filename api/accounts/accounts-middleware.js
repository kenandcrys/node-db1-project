// api/accounts/accounts-middleware.js

const db = require('../../data/db-config');
const Account = require('./accounts-model');

exports.checkAccountPayload = async (req, res, next) => {
  try {
    const { name, budget } = req.body;

    if (name === undefined || budget === undefined) {
      return res.status(400).json({ message: 'name and budget are required' });
    } else if (typeof name !== 'string') {
      return res.status(400).json({ message: 'name of account must be a string' });
    } else if (name.trim().length < 3 || name.trim().length > 100) {
      return res.status(400).json({ message: 'name of account must be between 3 and 100' });
    } else if (typeof budget !== 'number' || isNaN(budget)) {
      return res.status(400).json({ message: 'budget of account must be a number' });
    } else if (budget < 0 || budget > 1000000) {
      return res.status(400).json({ message: 'budget of account is too large or too small' });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const { name } = req.body;
    const existingAccount = await db('accounts').where('name', name.trim()).first();

    if (existingAccount) {
      return res.status(400).json({ message: 'that name is taken' });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id);
    
    if (!account) {
      return res.status(404).json({ message: 'account not found' });
    } else {
      req.account = account;
      next();
    }
  } catch (err) {
    next(err);
  }
};

