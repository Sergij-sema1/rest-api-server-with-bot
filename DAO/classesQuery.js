const util = require("util");
const pool = require("./DBConnection");
const query = util.promisify(pool.query).bind(pool);
class ProductsQuery {
  getProductModels() {
    return query("SELECT DISTINCT name,price,model_id FROM products;", []);
  }
  addProductModels({ name, price, taste_name, model_id }) {
    return query("INSERT INTO products (name,price,taste_name,model_id)VALUES(?,?,?,?);", [
      name,
      price,
      taste_name,
      model_id,
    ]);
  }
  deleteProductModels({ name, taste_name }) {
    return query("DELETE  FROM products where  name=? AND  taste_name=?;", [name, taste_name]);
  }
  getProductTastes = ({ productId }) => {
    return query("SELECT taste_name from products where model_id=?;", [productId]);
  };
  updateProductsPrice({ price, name }) {
    return query("UPDATE products set price=? WHERE name=?;", [price, name]);
  }
  getProductDeliveryMethods() {
    return query("SELECT * FROM delivery;", []);
  }
  updateProductDeliveryPrice({ id, name, price }) {
    return query("UPDATE  delivery SET name=?, price=? WHERE id=?;", [name, price, id]);
  }
  getDeliveryCount() {
    return query("SELECT count FROM salesCount WHERE id=0;", []);
  }
  updateDeliveryCount(count) {
    return query("UPDATE  salesCount SET count=? WHERE id=0;", [count]);
  }

  paymentStatusChange({ status }) {
    return query("UPDATE  payment SET status=? WHERE id=1;", [status]);
  }
  checkPaymentStatus() {
    return query("SELECT  status FROM payment WHERE id=1; ", []);
  }

  addTemporaryOrderStorage({ userOrders }) {
    return query("  INSERT INTO blockedOrders (DATA)VALUES(?);", [userOrders]);
  }
  getTemporaryOrderStorage() {
    return query("SELECT * FROM blockedOrders ;", []);
  }
  deleteTemporaryOrderStorageData() {
    return query("TRUNCATE TABLE blockedOrders ;", []);
  }
}
class UsersQuery {
  getUsers() {
    return query("SELECT * FROM users ;", []);
  }
  getUsersData() {
    return query("SELECT id,name FROM users ;", []);
  }
  updateUsersData({ id, newName, newHash }) {
    return query("UPDATE users SET name=? ,hash=? WHERE id=?;", [newName, newHash, id]);
  }
  addUsers({ name, hash }) {
    return query("INSERT INTO users (name,hash)VALUES(?,?);", [name, hash]);
  }
  getCurrentUserData({ name }) {
    return query("SELECT * FROM users WHERE name=?;", [name]);
  }
  addUserToken({ userId, token }) {
    return query("UPDATE  users SET token=? WHERE id=?;", [token, userId]);
  }
  getUsersToken({ token }) {
    return query("SELECT token FROM users WHERE token=?", [token]);
  }
}
class ProductDataPreset {
  getModels() {
    return query("SELECT * FROM models;", []);
  }
  updateModels({ id, name }) {
    return query("UPDATE  models SET name=? WHERE id=?;", [name, id]);
  }
  addModels({ name }) {
    return query("INSERT INTO models(name)VALUES(?);", [name]);
  }
  deleteModels({ id }) {
    return query("DELETE FROM  models  WHERE id=?;", [id]);
  }
  //----------------------------------------------------------------------
  getTastes() {
    return query("SELECT * FROM tastes;", []);
  }
  addTastes({ name }) {
    return query("INSERT INTO tastes(name)VALUES(?);", [name]);
  }
  updateTastes({ name, id }) {
    return query("UPDATE  tastes SET name=? WHERE id=?;", [name, id]);
  }
  deleteTastes({ id }) {
    return query("DELETE FROM tastes WHERE id=?;", [id]);
  }
  //------------------------------
}
module.exports.ProductsQuery = new ProductsQuery();
module.exports.UsersQuery = new UsersQuery();
module.exports.PreConfigurationsProduct = new ProductDataPreset();
