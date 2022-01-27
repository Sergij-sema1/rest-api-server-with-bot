const Scene = require("telegraf/scenes/base");
const DeliveryChatId = process.env.chatDeliverId;
const buttons = require("./buttons/buttons");
const product = require("./product/product");
const delivery = require("./delivery/delivery");
const data = require("../DAO/classesQuery").ProductsQuery;
const OrderProcessing = require("./middleWare/OrderProcessing");
const EventEmitter = require("events");
const onChangeEmitter = new EventEmitter();
const sendOrdersToDeliveryChat = require("./middleWare/sendOrdersToDeliveryChat");

onChangeEmitter.on("changeStatus", sendOrdersToDeliveryChat);

class sceneGenerator {
  sceneProductModels() {
    const productModels = new Scene("productModels");
    productModels.enter(async (ctx) => {
      const greetings = (num) => {
        return num == 1 ? "Привет! выберите модель 👇" : "Выберите  дополнительную модель 👇";
      };
      //response return all products  list configuration
      const response = await product.getModels();
      ctx.session.products = response;
      await ctx.reply(
        `${ctx.message.from.first_name},${greetings(ctx.session.positionCounter)}`,
        buttons.buttonsGenerator(response)
      );
    });
    productModels.hears("ownSecret", async (ctx) => {
      const response = await data.checkPaymentStatus();
      let status = response[0].status;
      status = !status;
      await data.paymentStatusChange({ status });
      onChangeEmitter.emit("changeStatus", { ctx, DeliveryChatId });
      ctx.reply(`status change to:${status}`);
    });
    productModels.on("text", async (ctx) => {
      // checking, user has chosen one of the proposed options or not
      const selectedButtonText = ctx.message.text;
      const result = ctx.session.products.filter((obj) => obj.name == selectedButtonText);
      // if the user entered something else, result will be an empty []
      if (!result.length) {
        ctx.reply("опечатка 😜");
        ctx.scene.reenter();
      } else {
        ctx.session.order += `${ctx.session.positionCounter} : ${selectedButtonText}`;
        ++ctx.session.positionCounter;
        ctx.session.productId = result[0].model_id;
        ctx.session.totalPrice += +result[0].price;
        ctx.scene.enter("productTastes");
      }
    });
    productModels.on("sticker", (ctx) => {
      ctx.reply("👍");
      ctx.scene.reenter();
    });
    productModels.on("message", async (ctx) => {
      await ctx.reply("⛔️ Вы не выбрали модель");
      ctx.scene.reenter();
    });
    return productModels;
  }
  sceneProductTastes() {
    const productTastes = new Scene("productTastes");
    productTastes.enter(async (ctx) => {
      //response receive all current products tastes list
      const response = await product.getTastes(ctx.session.productId);
      ctx.session.selectedTaste = response;
      await ctx.reply(`Теперь выберите любой вкус 👇`, buttons.buttonsGenerator(response));
    });
    productTastes.on("text", async (ctx) => {
      const selectedButtonText = ctx.message.text;
      const result = ctx.session.selectedTaste.filter(
        (obj) => obj.taste_name == selectedButtonText
      );
      if (ctx.session.selectedTaste[0].taste_name == selectedButtonText) {
        await ctx.reply("🔥 Ok выберите все заново 🔥");
        ctx.session.order = "";
        ctx.session.positionCounter = 1;
        ctx.session.totalPrice = 0;
        ctx.scene.enter("productModels");
      } else if (!result.length) {
        await ctx.reply("Опечатка 😜");
        ctx.scene.reenter();
      } else {
        ctx.session.order += `,вкус: ${result[0].taste_name}`;
        ctx.scene.enter("productsAdd");
      }
    });
    productTastes.on("sticker", (ctx) => {
      ctx.reply("👍");
      ctx.scene.reenter();
    });
    productTastes.on("message", async (ctx) => {
      await ctx.reply("Лучше выберите вкус 🥸");
      ctx.scene.reenter();
    });
    return productTastes;
  }
  sceneAdditionalProducts() {
    const productsAdd = new Scene("productsAdd");
    productsAdd.enter(async (ctx) => {
      await ctx.reply(
        `Хотите выбрать ещё один вейп с другим вкусом ?`,
        buttons.staticButtonsDecision
      );
    });
    productsAdd.on("text", async (ctx) => {
      const selectedButtonText = ctx.message.text;
      if (selectedButtonText == "да") {
        ctx.session.order += `;
        `;
        ctx.scene.enter("productModels");
      } else if (selectedButtonText == "нет") {
        ctx.scene.enter("deliveryData");
      } else {
        await ctx.reply("Опечатка,повторите ⛔️");
        ctx.scene.reenter();
      }
    });
    productsAdd.on("message", async (ctx) => {
      await ctx.reply("Выберите из вариантов 🥸");
      ctx.scene.reenter();
    });
    productsAdd.on("sticker", (ctx) => {
      ctx.reply("👍");
      ctx.scene.reenter();
    });
    return productsAdd;
  }
  sceneDeliveryData() {
    const deliveryData = new Scene("deliveryData");
    deliveryData.enter(
      async (ctx) =>
        await ctx.reply(
          "👉 Введите телефон и адрес доставки.📦 Для доставки почтой:👉 телефон, адрес, индекс, фио 👀",
          buttons.staticButtonsHide
        )
    );
    deliveryData.on("text", async (ctx) => {
      const usersTextInput = ctx.message.text;
      // phoneCheck function checking part of phone number
      if (usersTextInput.length > 14 && delivery.phoneNumbersCheck(usersTextInput)) {
        ctx.session.order += `.
         тел/адрес доставки : ${usersTextInput}`;
        ctx.scene.enter("productDelivery");
      } else {
        await ctx.reply(
          "Введите свой телефон и адрес полностью в таком ключе. Пример: +375291234567 г.Минск  Немига 1. ( Почтовая посылка: +375291234567 г.Брест, индекс 224001, ул.Победы 10, Кот Иван Иваныч"
        ),
          ctx.scene.reenter();
      }
    });
    deliveryData.on("message", async (ctx) => {
      await ctx.reply("Нужен только телефон и адрес 😜");
      ctx.scene.reenter();
    });
    deliveryData.on("sticker", (ctx) => {
      ctx.reply("👍");
      ctx.scene.reenter();
    });
    return deliveryData;
  }
  sceneDeliveryMethods() {
    const productDelivery = new Scene("productDelivery");
    productDelivery.enter(async (ctx) => {
      //response return all productDelivery method list
      const response = await delivery.getDeliveryMethods(ctx.session.positionCounter);
      ctx.session.deliveryMethod = response;
      await ctx.reply(
        "Выберите способ доставки с 10:00 до 20:00 👇",
        buttons.buttonsGenerator(response)
      );
    });
    productDelivery.on("text", async (ctx) => {
      const selectedButtonText = ctx.message.text;
      const result = ctx.session.deliveryMethod.filter((obj) => obj.name == selectedButtonText);
      if (!result.length) {
        await ctx.reply("Опечатка, просто выберите вариант👇");
        ctx.scene.reenter();
      } else {
        ctx.session.order += `.
        Доставка : ${result[0].name} `;
        ctx.session.totalPrice += +result[0].price;
        ctx.scene.enter("commentDecision");
      }
    });
    productDelivery.on("sticker", (ctx) => {
      ctx.reply("👍");
      ctx.scene.reenter();
    });
    productDelivery.on("message", async (ctx) => {
      await ctx.reply("Просто выберите способ доставки 🚕");
      ctx.scene.reenter();
    });
    return productDelivery;
  }
  sceneCommentAddDecision() {
    const commentDecision = new Scene("commentDecision");
    commentDecision.enter(
      async (ctx) =>
        await ctx.reply("Хотите оставить пожелание к заказу?", buttons.staticButtonsDecision)
    );
    commentDecision.on("text", async (ctx) => {
      const selectedButtonText = ctx.message.text;

      if (selectedButtonText == "да") {
        ctx.scene.enter("userComments");
      } else if (selectedButtonText == "нет") {
        ctx.session.order += `.
        Пожелания:нету.`;
        ctx.scene.enter("checkingData");
      } else {
        await ctx.reply("Опечатка, выберите вариант👇");
        ctx.scene.reenter();
      }
    });
    commentDecision.on("message", async (ctx) => {
      ctx.reply("Просто нажмите на нужную кнопку👇");
      ctx.scene.reenter();
    });
    commentDecision.on("sticker", (ctx) => {
      ctx.reply("👍");
      ctx.scene.reenter();
    });
    return commentDecision;
  }
  sceneUserComments() {
    const userComments = new Scene("userComments");
    userComments.enter(async (ctx) => {
      await ctx.reply("Введите комментарий 👇", buttons.staticButtonsHide);
    });
    userComments.on("text", async (ctx) => {
      const userInputText = ctx.message.text;
      ctx.session.order += `.
         Пожелание : ${userInputText}`;
      await ctx.reply("Хорошо✅");
      ctx.scene.enter("checkingData");
    });
    userComments.on("message", async (ctx) => {
      await ctx.reply("Введите комментарий, только текста💡");
      ctx.scene.reenter();
    });
    return userComments;
  }
  sceneCheckingOrder() {
    const checkingData = new Scene("checkingData");
    checkingData.enter(async (ctx) => {
      await ctx.reply(
        `Итак ${ctx.session.order}.
        Сумма заказа :${ctx.session.totalPrice} Pуб.
         Правильно ? ? ?`,
        buttons.staticButtonsConfirmation
      );
    });
    checkingData.on("text", async (ctx) => {
      let ordersCount = await data.getDeliveryCount(); //count return  last order  number from db
      const selectedButtonText = ctx.message.text;
      if (selectedButtonText == "Все правильно 😊") {
        const response = await data.checkPaymentStatus();
        const paymentStatus = response[0].status;

        const userOrders = `📟  Заказ № ${ordersCount[0].count}.
          Имя :${ctx.message.from.first_name}
        ${ctx.session.order}.
        Сумма заказа :${ctx.session.totalPrice} руб`;

        await OrderProcessing({
          paymentStatus,
          ctx,
          userOrders,
          DeliveryChatId,
          ordersCount,
        });

        await ctx.reply(
          `📟 Ваш заказ № ${ordersCount[0].count} оформлен 👍 . 
        Спасибо за выбор Wlab!
          Для нового заказа, жмите 👉 /start`
        );
        await data.updateDeliveryCount(++ordersCount[0].count);
        ctx.scene.leave();
      } else if (selectedButtonText == "ой, отмена 🤭") {
        await ctx.reply("Ok вторая попытка👇");
        ctx.session.order = "";
        ctx.session.positionCounter = 1;
        ctx.session.totalPrice = 0;
        ctx.scene.enter("productModels");
      }
    });
    checkingData.on("message", async (ctx) => {
      await ctx.reply("Нажмите на нужную кнопку👇");
      ctx.scene.reenter();
    });
    checkingData.on("sticker", (ctx) => {
      ctx.reply("👍");
      ctx.scene.reenter();
    });
    return checkingData;
  }
}
module.exports = sceneGenerator;
