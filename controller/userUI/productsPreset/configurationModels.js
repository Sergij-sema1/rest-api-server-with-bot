const data = require('../../../DAO/classesQuery').PreConfigurationsProduct;
const logger = require('../../errorsLogger');

module.exports = {
  async getModels(req, res) {
    try {
      const result = await data.getModels();

      if (result.length) return res.status(200).json(result);
      return res.status(200).json([]);
    } catch (error) {
      logger({ res, error });
    }
  },
  async addModels(req, res) {
    try {
      const name = req.body.name;

      if (!name) return res.status(206).end();

      await data.addModels({ name });
      return res.status(201).end();
    } catch (error) {
      logger({ res, error });
    }
  },
  async updateModels(req, res) {
    try {
      const { id, name } = from.req;
      if (!id || !name) return res.status(206).end();

      await data.updateModels({ id, name });
      return res.status(201).end();
    } catch (error) {
      logger({ res, error });
    }
  },
  async deleteModels(req, res) {
    try {
      const id = req.body.id;

      if (!id) return res.status(206).end();

      await data.deleteModels({ id });
      return res.status(201).end();
    } catch (error) {
      logger({ res, error });
    }
  },
};
