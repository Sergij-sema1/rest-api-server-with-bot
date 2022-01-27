const data = require("../../DAO/classesQuery").ProductsQuery;

module.exports = async ({ paymentStatus, ctx, userOrders, DeliveryChatId, ordersCount }) => {
  if (paymentStatus) {
    await ctx.telegram.sendMessage(DeliveryChatId, userOrders);
  } else if (!paymentStatus) {
    await data.addTemporaryOrderStorage({ userOrders });
    await ctx.telegram.sendMessage(
      DeliveryChatId,
      `📟 Новый заказ № ${ordersCount[0].count} на сумму :${ctx.session.totalPrice} руб, 
    будет доступен после оплаты  услуги`
    );
  }
};
