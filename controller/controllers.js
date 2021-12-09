class Controllers {
  usersRegistration() {
    return require('./userUI/users/users').usersRegistration;
  }
  usersLogin() {
    return require('./userUI/users/users').usersLogin;
  }
  usersData() {
    return require('./userUI/users/users').usersData;
  }
  updateUser() {
    return require('./userUI/users/users').updateUser;
  }
  //-----------------------------------------------
  getModels() {
    return require('./userUI/productsPreset/configurationModels').getModels;
  }
  addModels() {
    return require('./userUI/productsPreset/configurationModels').addModels;
  }
  updateModels() {
    return require('./userUI/productsPreset/configurationModels').updateModels;
  }
  deleteModels() {
    return require('./userUI/productsPreset/configurationModels').deleteModels;
  }

  getTastes() {
    return require('./userUI/productsPreset/configurationTastes').getTastes;
  }
  addTastes() {
    return require('./userUI/productsPreset/configurationTastes').addTaste;
  }
  updateTastes() {
    return require('./userUI/productsPreset/configurationTastes').updateTaste;
  }
  deleteTastes() {
    return require('./userUI/productsPreset/configurationTastes').deleteTaste;
  }

  //-----------------------------------------------
  getDeliveryMethods() {
    return require('./userUI/delivery/delivery').getDeliveryMethods;
  }
  updateDeliveryMethods() {
    return require('./userUI/delivery/delivery').updateDeliveryMethods;
  }
  //------------------------------------------------
  getProductModels() {
    return require('./userUI/products/configurationsProduct').getProductModels;
  }
  addProductModels() {
    return require('./userUI/products/configurationsProduct').addProductModels;
  }
  deleteProductModels() {
    return require('./userUI/products/configurationsProduct').deleteProductModels;
  }
  getProductTastes() {
    return require('./userUI/products/configurationsProduct').getProductTastes;
  }
  updateProductsPrice() {
    return require('./userUI/products/configurationsProduct').updateProductsPrice;
  }
}
module.exports = new Controllers();
