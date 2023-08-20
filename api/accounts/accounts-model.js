const db = require('../../data/db-config')

const getAll = () => {
 return db('accounts');
}

const getById = id => {
  return db('accounts')
         .where("id", id)
         .first();
}

const create = account => {
  return db('accounts')
         .insert(account)
         .then (ids => {
          const {id} = ids;
          return getById(id)
         });
}

const updateById = (id, account) => {

  return db( "accounts" )
            .where("id", id)
            .update(account)
            .then( () => {
              return getById(id)
            });

}



const deleteById = id => {
  return db("accounts")
    .where('id', id)
    .del()
}
module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
