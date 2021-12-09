require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 3000;
const router = require('./routes/routes');
const morgan = require('morgan');
const cors = require('cors');
const Telegraf = require('telegraf');
const { Stage, session } = Telegraf;

const bot = new Telegraf(process.env.BOT_TOKEN);
const sceneGenerator = require('./botUI/scenes');
const currentScene = new sceneGenerator();
const productModels = currentScene.sceneProductModels();
const productTastes = currentScene.sceneProductTastes();
const additionalProducts = currentScene.sceneAdditionalProducts();
const deliveryData = currentScene.sceneDeliveryData();
const commentAddDecision = currentScene.sceneCommentAddDecision();
const checkingOrder = currentScene.sceneCheckingOrder();
const userComments = currentScene.sceneUserComments();
const deliveryMethod = currentScene.sceneDeliveryMethods();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan());
app.use('/api', router);

bot.use(Telegraf.log());
const stage = new Stage([
  productModels,
  additionalProducts,
  productTastes,
  deliveryData,
  deliveryMethod,
  commentAddDecision,
  userComments,
  checkingOrder,
]);

bot.use(session());
bot.use(stage.middleware());
bot.start((ctx) => {
  ctx.session.products;
  ctx.session.order = '';
  ctx.session.positionCounter = 1;
  ctx.session.productId;
  ctx.session.selectedTaste;
  ctx.session.totalPrice = 0;
  ctx.session.deliveryMethod;
  ctx.scene.enter('productModels');
});

app.listen(port, () => {
  bot.launch();
  console.log(`server started on : http://localhost:${port},
   bot started`);
});
