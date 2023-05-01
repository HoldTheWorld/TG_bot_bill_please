import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv'
dotenv.config()
const token = process.env.BOT_TOKEN
const bot = new Telegraf(token);
import { CalcPeople } from './calculateFoo.js'

bot.command('start', (ctx) => {
  ctx.reply(`
  Привет! Чтобы произвести расчет, отправь список участников и вложенные ими суммы в формате: Имя - сумма, Имя2 - сумма. 
  Участников, сумма вкладов которых равна нулю , можно просто перечислить через запятую, не указывая ноль. Не используй лишние символы и слова при вводе. 
  
  ❌ Ира1000,Даня - 4000 (имя и сумма не разделены дефисом) 
  ❌ Ира - 100 рублей, Даня-5000 рублей (слово «рублей» - лишнее)
  ❌ Ира - 1000 Даня - 5000 (отсутствует запятая между участниками)
  ❌Ира - 1000, Даня, Артем, Саша(Мало того, что вложилась только Ира, так еще и точку в конце ставить было не нужно) 
  ✅ Ира-1000,Даня - 5000
  ✅Ира - 1000,Даня-5000,Артем,Саша
  `)
})
bot.on('text', async (ctx) => {
  let people = []
  console.log(ctx.message.text.replaceAll(' ', ''));
  let message = ctx.message.text.replaceAll(' ', '')
  if (message.length) {
    console.log(message.split(','));
    message.split(',').map(el => {
      people.push({
        name: el.split('-')[0],
        sum: !isNaN(Number(el.split('-')[1]))  ? Number(el.split('-')[1]) : 0
      })
      
    })
    console.log(people);
  } else {
    ctx.reply('Введите сообщение в нужном формате!')
  }
  let result = CalcPeople(people)
  console.log(result);
  ctx.reply(result)

});

bot.launch();
