require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Tokenni .env fayldan olamiz
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// /start komandasi
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || "Do‘stim";

  const options = {
    reply_markup: {
      keyboard: [
        ['ℹ️ Bot haqida', '📞 Aloqa'],
        ['🌐 Websayt']
      ],
      resize_keyboard: true,
      one_time_keyboard: false
    }
  };

  bot.sendMessage(chatId, `Assalomu alaykum, ${firstName}! 🤖 PowerClick: Anime Rise botiga xush kelibsiz!`, options);
});

// Tugma javoblari
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === 'ℹ️ Bot haqida') {
    bot.sendMessage(chatId, "🎮 Bu bot *PowerClick: Anime Rise* o‘yiniga bag‘ishlangan!\n🔥 O‘yinchi sifatida klik qiling, kuch yig‘ing va reytingda yuqoriga chiqing!");
  }
  if (text === '📞 Aloqa') {
    bot.sendMessage(chatId, "📩 Savol va takliflar uchun: @behruz8005");
  }
  if (text === '🌐 Websayt') {
    const options = {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🌐 PowerClick: Anime Rise saytiga o‘tish", url: "https://pc-anime-rise.netlify.app/" }]
        ]
      }
    };
    bot.sendMessage(chatId, "Saytga kirish uchun tugmani bosing 👇", options);
  }
  if (text?.toLowerCase() === 'start') {
    bot.sendMessage(chatId, "😂 To‘g‘risi 👉 /start bo‘ladiii 😉");
  }
});
