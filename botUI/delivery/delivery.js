const data = require('../../DAO/classesQuery').ProductsQuery;
const logger = require('../../controller/errorsLogger');

module.exports = {
  async getDeliveryMethods(positionCounter) {
    try {
      const response = await data.getProductDeliveryMethods();
      // customDelivery update delivery type list if user select more one products
      const customDelivery = (list) => {
        if (positionCounter > 2) {
          list[0].name = 'Бесплатно (Минск)🎁';
          list[0].price = 0;
        }
        return list;
      };
      return customDelivery(response);
    } catch (error) {
      logger({ error });
      return [{ name: 'Ошибка получения метода доставки' }];
    }
  },

  phoneNumbersCheck(usersTextInput) {
    const numCheck = Number(usersTextInput.slice(0, 10));
    const pattern = /^[0-9]*$/;
    return pattern.test(numCheck);
  },
};
