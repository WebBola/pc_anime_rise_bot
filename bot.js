require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Tokenni .env fayldan olamiz
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Admin chatId (sening chatId’ingni shu yerga yozasan)
const adminId = 7760337711; // 👉 bu joyni o'zingnikiga almashtir

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
    bot.sendMessage(chatId, "🎮 Bu bot *PowerClick: Anime Rise* o‘yiniga bag‘ishlangan!\n🔥 O‘yinchi sifatida klik qiling, kuch yig‘ing va reytingda yuqoriga chiqing!", { parse_mode: "Markdown" });
  }

  if (text === '📞 Aloqa') {
    const options = {
      reply_markup: {
        keyboard: [
          ['✉️ Admin ga yozish', '🔙 Bosh menyu']
        ],
        resize_keyboard: true,
        one_time_keyboard: false
      }
    };
    bot.sendMessage(chatId, "📩 Savol va takliflar uchun:\n\n👉 Telegram: @behruz_dot\n👉 Instagram: [dyrroth.n1](https://instagram.com/dyrroth.n1)", {
      parse_mode: "Markdown",
      reply_markup: options.reply_markup
    });
  }

  if (text === '✉️ Admin ga yozish') {
    bot.sendMessage(chatId, "✍️ Admin uchun xabaringizni yozib yuboring:");
    bot.once('message', (msg2) => {
      // Admin ga yuborish
      bot.sendMessage(adminId, `📩 Foydalanuvchi: ${msg2.from.first_name} (@${msg2.from.username || "no_username"})\n\n${msg2.text}`);

      // Foydalanuvchini bosh menyuga qaytarish
      const mainMenu = {
        reply_markup: {
          keyboard: [
            ['ℹ️ Bot haqida', '📞 Aloqa'],
            ['🌐 Websayt']
          ],
          resize_keyboard: true,
          one_time_keyboard: false
        }
      };
      bot.sendMessage(chatId, "✅ Xabaringiz adminga yuborildi! 🔙 Bosh menyuga qaytdingiz.", mainMenu);
    });
  }

  if (text === '🔙 Bosh menyu') {
    const mainMenu = {
      reply_markup: {
        keyboard: [
          ['ℹ️ Bot haqida', '📞 Aloqa'],
          ['🌐 Websayt']
        ],
        resize_keyboard: true,
        one_time_keyboard: false
      }
    };
    bot.sendMessage(chatId, "🔙 Bosh menyu", mainMenu);
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
