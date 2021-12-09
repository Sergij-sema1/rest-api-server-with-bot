const data = require('../../../DAO/classesQuery').ProductsQuery;
const logger = require('../../errorsLogger');

module.exports = {
  async getProductModels(req, res) {
    try {
      const response = await data.getProductModels();

      if (response.length) return res.status(200).json(response);
      return res.status(200).json([]);
    } catch (error) {
      logger({ res, error });
    }
  },
  async addProductModels(req, res) {
    try {
      const { name, price, model_id, taste_name } = from.req;

      if (!name || !price || !model_id || !taste_name) return res.status(206).end();

      await data.addProductModels({ name, price, taste_name, model_id });
      return res.status(201).end();
    } catch (error) {
      logger({ res, error });
    }
  },
  async deleteProductModels(req, res) {
    try {
      const { name, taste_name } = req.body;

      if (!name || !taste_name) return res.status(206).end();

      await data.deleteProductModels({ name, taste_name });
      return res.status(201).end();
    } catch (error) {
      logger({ res, error });
    }
  },
  async getProductTastes(req, res) {
    try {
      const productId = req.body.model_id;

      if (!productId) return res.status(206).end();

      const response = await data.getProductTastes({ productId });

      if (response.length) return res.status(200).json(response);
      return res.status(200).json([]);
    } catch (error) {
      logger({ res, error });
    }
  },
  async updateProductsPrice(req, res) {
    try {
      const { name, price } = req.body;

      if (!name || !price) return res.status(206).end();

      await data.updateProductsPrice({ name, price });
      return res.status(201).end();
    } catch (error) {
      logger({ res, error });
    }
  },
};
