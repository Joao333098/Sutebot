const { Client, Intents } = require('discord.js');
const axios = require('axios');
const fs = require('fs');

let config;
try {
    config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
} catch (error) {
    console.error('Erro ao carregar configuração:', error);
    config = {};
}

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const token = config.token;

client.once('ready', () => {
    console.log('Bot está online!');
});

client.on('messageCreate', async message => {
    if (!config.prefix) return;

    if (message.content.startsWith(`${config.prefix}cotacao`)) {
        const args = message.content.split(' ');
        if (args.length < 2) {
            message.reply('Por favor, forneça uma moeda. Exemplo: !cotacao USD');
            return;
        }
        const moeda = args[1].toUpperCase();
        try {
            const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${moeda}`);
            const rate = response.data.rates['BRL'];
            message.reply(`A cotação atual do ${moeda} é R$ ${rate}`);
        } catch (error) {
            message.reply('Não foi possível obter a cotação no momento.');
        }
    }
    // Outras funções de envio e retirada de dinheiro podem ser adicionadas aqui
});

client.login(token);