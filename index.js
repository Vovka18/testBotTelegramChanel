const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

const bot = new Telegraf("6039842047:AAEVxZCw7X4p-FUhaSa8-wR-jI5wukuCkWI");

// const admin1 = 1044818212
const admin2 = 933429659
let arrLinkPhotos = []
let idTimeOut = -1

bot.start((ctx) => ctx.reply('просто отправь текст/видео/картинки/гиф сюда и оно прийдет админу.'));



//фото
bot.on(message('photo'), (ctx) => {
    // console.log(ctx.message);
    arrLinkPhotos.push({type: 'photo', media: ctx.message.photo[ctx.message.photo.length-1].file_id})
    clearTimeout(idTimeOut)
    idTimeOut = setTimeout(()=>{
        const userData = `\n\n*подпись к фото*\nname: ${ctx.message.from.first_name}\nusername: @${ctx.message.from.username}\nid: ${ctx.message.from.id}`
        bot.telegram.sendMediaGroup(admin2, arrLinkPhotos)
        let meesageUser = '\n'
        if(ctx.message.caption != undefined){meesageUser = ctx.message.caption}
        bot.telegram.sendMessage(admin2, String(meesageUser + userData))
        setTimeout(()=>{arrLinkPhotos = []}, 2500)
    }, 1500)
});
//видео
bot.on(message('video'), async (ctx) =>{
    arrLinkPhotos.push({type: 'video', media: ctx.message.video.file_id})
    clearTimeout(idTimeOut)
    idTimeOut = setTimeout(()=>{
        console.log();
        const userData = `\n\n*подпись к видео*\nname: ${ctx.message.from.first_name}\nusername: @${ctx.message.from.username}\nid: ${ctx.message.from.id}`
        bot.telegram.sendMediaGroup(admin2, arrLinkPhotos)
        let meesageUser = '\n'
        if(ctx.message.caption != undefined){meesageUser = ctx.message.caption}
        bot.telegram.sendMessage(admin2, String(meesageUser + userData))
        setTimeout(()=>{arrLinkPhotos = []}, 2500)
    }, 1500)
})
// гифки, *файлы*
bot.on(message('document'), async (ctx) => {
    bot.telegram.sendDocument(admin2, ctx.message.document.file_id)
})
//текст
bot.on('message', async (ctx)=>{
    if(ctx.message.text){
        const userData = `\n\nname: ${ctx.message.from.first_name}\nusername: @${ctx.message.from.username}\nid: ${ctx.message.from.id}`
        bot.telegram.sendMessage(admin2, `${ctx.message.text}${userData}`)
    }
})

bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));













































// const { Telegraf } = require('telegraf');
// const bot = new Telegraf("6039842047:AAEVxZCw7X4p-FUhaSa8-wR-jI5wukuCkWI");
// const fs = require('fs');
// const axios = require('axios');

// const chatId = 1044818212
// // const chatId = 933429659
// const token = `bot6039842047:AAEVxZCw7X4p-FUhaSa8-wR-jI5wukuCkWI`

// bot.start((ctx) => {
//     console.log(ctx.message.from.id);
//     ctx.reply('Привет, это бот предложка сюда ты можешь накинуть контента а админы порешают заливать его в канал или нет, вот комманды:\n\n/text - после комманды вводишь чьё-то имя или ссылку вводишь или пишешь что то по предложению...\n/visualContent - и после комманды кидешь фото/видео/манги/гифки, чё хоч из визуального одним сообщением')
// });
// bot.command('text', (ctx) => {
//     ctx.reply('пиши 1 сообщение')
//     text = true
// });
// bot.command('visualContent', (ctx) => {
//     ctx.reply('отправь картинки/видео/гифки одним сообщением')
//     visualContent = true
// });

// let text = false
// let visualContent = false

// let timeout
// completePhoto = []
// bot.on('message', async (ctx) => {
//     if(text == true){
//         if(ctx.message.text){
//             if(ctx.message.text.length > 3){
//                 const message = `username: @${ctx.message.from.username}\nИмя - ${ctx.message.from.first_name}\nid - ${ctx.message.from.id}\nсообщение:\n\n${ctx.message.text}`
//                 axios.post(`https://api.telegram.org/${token}/sendMessage`, {
//                     chat_id: chatId,
//                     text: message,
//                 })
//                 ctx.reply('сообщение отправлено, жди')
//             }else ctx.reply('сообщение слишком короткое')
//         }else ctx.reply('не ломай бота, сказано отправить сообще - значит отправить сообщение, не нужно писать команды подрят')
//         text = false
//         visualContent = false
//     }
//     else if(visualContent == true){
//         console.log(ctx.message);
//         if(ctx.message.photo || ctx.message.video){
//             if(ctx.message.photo) completePhoto.push({type: 'photo', media: ctx.message.photo[ctx.message.photo.length - 1].file_id, caption: ctx.message.caption})
//             if(ctx.message.video) completePhoto.push({type: 'video', media: ctx.message.video.file_id, caption: ctx.message.caption})
//             const caption = `username: @${ctx.message.from.username}\nИмя - ${ctx.message.from.first_name}\nid - ${ctx.message.from.id}`
//             text = false
//             visualContent = false
//             clearTimeout(timeout)
//             timeout = setTimeout(()=>{
//                 axios.post(`https://api.telegram.org/${token}/sendMessage`, {
//                     chat_id: chatId,
//                     text: caption,
//                 })
//                 ctx.telegram.sendMediaGroup(chatId, completePhoto)
//                 ctx.reply('ожидай, контент уже летит админу в лицо')
//                 completePhoto = []
//             }, 2000)
//         }
//         else if(ctx.message.document){
//             console.log(ctx.message);
//             const caption = `username: @${ctx.message.from.username}\nИмя - ${ctx.message.from.first_name}\nid - ${ctx.message.from.id}`
//             ctx.reply('ожидай, гифка уже у админа')
//             ctx.telegram.sendAnimation(chatId, ctx.message.animation.file_id);
//             axios.post(`https://api.telegram.org/${token}/sendMessage`, {
//                 chat_id: chatId,
//                 text: caption,
//             })
//         }
//         else{
//             ctx.reply('не ломай бота')
//         }
//     }
//     else{
//         ctx.reply('для отправления сообещния предложения введи комманду /text или /visualContent подробно описывалось в /start')
//     }
// })


// bot.launch();
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));

// https://api.telegram.org/bot5698724932:AAHUad6ZgHAqG-SwGqQYougGsF8ca2PGIos/sendMessage?chat_id=933429659&text=asdfasdf отпраить сообщение
// https://api.telegram.org/bot5698724932:AAHUad6ZgHAqG-SwGqQYougGsF8ca2PGIos/getUpdates получить все сообщения