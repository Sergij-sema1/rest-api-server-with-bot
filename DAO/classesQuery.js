const util = require("util");
const pool = require("./DBConnection");
const query = util.promisify(pool.query).bind(pool);
class ProductsQuery {
  getProductModels() {
    return query("select distinct name,price,model_id from products;", []);
  }
  addProductModels({ name, price, taste_name, model_id }) {
    return query("insert into products (name,price,taste_name,model_id)values(?,?,?,?);", [
      name,
      price,
      taste_name,
      model_id,
    ]);
  }
  deleteProductModels({ name, taste_name }) {
    return query("delete  FROM products WHERE  name=? AND  taste_name=?;", [name, taste_name]);
  }
  getProductTastes = ({ productId }) => {
    return query("select taste_name from products WHERE model_id=?;", [productId]);
  };
  updateProductsPrice({ price, name }) {
    return query("update products set price=? WHERE name=?;", [price, name]);
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
