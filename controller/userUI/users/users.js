const data = require('../../../DAO/classesQuery').UsersQuery;
const jwt = require('jsonwebtoken');
const hashing = require('../../hashing');
const checkRequestData = require('./checkRequestData');
const logger = require('../../errorsLogger');

module.exports = {
  usersRegistration: async (req, res) => {
    try {
      const name = req.body.name;
      const password = req.body.password;

      const response = await data.getUsers();
      if (response.length) return res.status(403).end();

      const result = checkRequestData({ name, password });
      if (!result) return res.status(206).end();

      const hash = hashing.hashingPassword(password);
      await data.addUsers({ name, hash });
      return res.status(201).end();
    } catch (error) {
      logger({ res, error });
    }
  },
  usersLogin: async (req, res) => {
    try {
      const name = req.body.name;
      const password = req.body.password;
      if (!name || !password) return res.status(206).end();

      const response = await data.getCurrentUserData({ name });
      if (!response.length) return res.status(401).end();

      const result = hashing.checkingHash(password, response[0].hash);
      if (result) {
        const token = jwt.sign({ name: name }, process.env.secret, { expiresIn: '8h' });
        const userId = response[0].id;

        await data.addUserToken({ userId, token });
        return res.status(200).json({ bearer: token });
      }
      return res.status(401).end();
    } catch (error) {
      logger({ res, error });
    }
  },
  usersData: async (req, res) => {
    try {
      const response = await data.getUsersData();
      if (!response.length) return res.status(200).end([]);

      return res.status(200).json(response);
    } catch (error) {
      logger({ res, error });
    }
  },
  updateUser: async (req, res) => {
    try {
      const id = req.body.id;
      const newName = req.body.name;
      const newPassword = req.body.password;

      if (!id || !newName || !newPassword) return res.status(206).end();
      const newHash = hashing.hashingPassword(newPassword);
      await data.updateUsersData({ id, newName, newHash });

      return res.status(201).end();
    } catch (error) {
      logger({ res, error });
    }
  },
};
