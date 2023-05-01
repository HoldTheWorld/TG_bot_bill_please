import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv'
dotenv.config()
const token = process.env.BOT_TOKEN
const bot = new Telegraf(token);
import { CalcPeople } from './calculateFoo.js'

bot.command('start', (ctx) => {
  ctx.reply(`
  Привет! Чтобы произвести расчет, просто отправь список участников и вложенные суммы, используя дефисы для разделения имени и суммы и запятые для начала ввода нового участника. О пробелах можешь не беспокоиться - бот умеет их удалять 😁 
  Примеры: 
  Саша - 100, Маша - 2000, Дима - 0, Ира - 0 
                 или 
  Саша - 100, Маша - 2000, Дима, Ира 
  Участников, сумма вкладов которых равна нулю , можно просто перечислить через запятую, не указывая ноль. 
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
