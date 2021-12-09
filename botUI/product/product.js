//data it's a class with all request methods,for working with products table
const data = require('../../DAO/classesQuery').ProductsQuery;
const logger = require('../../controller/errorsLogger');
// getModels,getTastes methods return actual  list  or a stub to inform the bot users
module.exports = {
  async getModels() {
    try {
      const response = await data.getProductModels();
      if (!response.length) return [{ name: 'Нет товаров' }];
      return response;
    } catch (error) {
      logger({ error });
      return [{ name: 'Ошибка загрузки моделей' }];
    }
  },
  async getTastes(productId) {
    try {
      const response = await data.getProductTastes({ productId });
      if (!response.length) return [{ taste_name: 'Нет вкусов, вернутся' }];
      response.unshift({ taste_name: 'Только глянул(а)вкусы.Вернуться в главное меню' });
      return response;
    } catch (error) {
      logger({ error });
      return [{ taste_name: 'Ошибка получения списка вкусов' }];
    }
  },
};
