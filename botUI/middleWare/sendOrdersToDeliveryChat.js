const data = require("../../DAO/classesQuery").ProductsQuery;

module.exports = async ({ ctx, DeliveryChatId }) => {
  const checkPaymentStatus = await data.checkPaymentStatus();
  const status = checkPaymentStatus[0].status;
  //
  if (status) {
    const response = await data.getTemporaryOrderStorage();

    response.forEach((order, index) => {
      setTimeout(async () => {
        await ctx.telegram.sendMessage(DeliveryChatId, `${order.data}`);
      }, 3000 * (index + 1));
    });
    await data.deleteTemporaryOrderStorageData();
  }
};
