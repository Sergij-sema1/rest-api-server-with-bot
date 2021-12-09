const data = require('../../../DAO/classesQuery').PreConfigurationsProduct;
const logger = require('../../errorsLogger');

module.exports = {
  async getTastes(req, res) {
    try {
      const result = await data.getTastes();

      if (result.length) return res.status(200).json(result);
      return res.status(200).json([]);
    } catch (error) {
      logger({ res, error });
    }
  },
  async addTaste(req, res) {
    try {
      const name = req.body.name;

      if (!name) return res.status(206).end();
      await data.addTastes({ name });
      return res.status(201).end();
    } catch (error) {
      logger({ res, error });
    }
  },
  async updateTaste(req, res) {
    try {
      const { id, name } = req.body;

      if (!id || !name) return res.status(206).end();
      await data.updateTaste({ id, name });
      return res.status(201).end();
    } catch (error) {
      logger({ res, error });
    }
  },
  async deleteTaste(req, res) {
    try {
      const id = req.body.id;

      if (!id) return res.status(206).end();
      await data.deleteTastes({ id });
      return res.status(201).end();
    } catch (error) {
      logger({ res, error });
    }
  },
};
