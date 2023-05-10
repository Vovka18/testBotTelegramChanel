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


// {
//   "name": "testhosttgbot",
//   "version": "1.0.0",
//   "description": "",
//   "main": "index.js",
//   "scripts": {
//     "dev": "index.js"
//   },
//   "keywords": [],
//   "author": "",
//   "license": "ISC",
//   "dependencies": {
//     "telegraf": "^4.12.2"
//   }
// }