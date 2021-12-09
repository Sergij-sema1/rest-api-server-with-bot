const data = require('../../../DAO/classesQuery').ProductsQuery;
const logger = require('../../errorsLogger');

module.exports = {
  async getDeliveryMethods(req, res) {
    try {
      const response = await data.getProductDeliveryMethods();

      if (response.length) return res.status(200).json(response);
      return res.status(200).json([]);
    } catch (error) {
      logger({ res, error });
    }
  },
  async updateDeliveryMethods(req, res) {
    try {
      const { id, name, price } = from.req;

      if (!id || !name || !price) return res.status(206).end();

      await data.updateProductDeliveryPrice({ id, name, price });

      return res.status(201).end();
    } catch (error) {
      logger({ res, error });
    }
  },
};
