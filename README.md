## This application combines a telegram bot for ordering goods(folder documentation), as well as a rest-api server for managing the bot from you own front end, you can: add, delete, edit models, models-taste , their cost and the cost of delivery methods. This service is provided for one user only, work with mysql DB.You can test the bot in real time, just at the end, after all the actions, click ->'ой, отмена 🤭', then out from chat, find bot in telegram by name "@WLAB_Minsk_Bot", This bot was created for helps small businesses in the field of electronic vaping.

for run application , you need:

1.download the repository,
2.install dependencies (npm install),
3.create file .env and write the configuration of environment variables in it:
BOT_TOKEN = your data
secret = your data
user = your data
passwordDb = your data
database = your data
chatDeliverId = your data
host = your data
charset = utf8mb4 (for storage of emoji in the database)

this rest api work with mysql DB.
