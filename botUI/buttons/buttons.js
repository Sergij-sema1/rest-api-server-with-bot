module.exports = {
  buttonsGenerator(list) {
    const values = list.map((item) => {
      return [{ text: item.name?.trim() || item.taste_name?.trim() }];
    });
    return { reply_markup: { keyboard: values } };
  },
  staticButtonsDecision: {
    reply_markup: {
      keyboard: [
        [
          {
            text: "да",
          },
          {
            text: "нет",
          },
        ],
      ],
    },
  },
  staticButtonsConfirmation: {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Все правильно 😊",
          },
        ],
        [
          {
            text: "ой, отмена 🤭",
          },
        ],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  },
  staticButtonsHide: {
    reply_markup: {
      keyboard: [],
      hide_keyboard: true,
    },
  },
};
