const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/manage.html', (req, res) => {
    res.sendFile(__dirname + '/public/manage.html');
});

app.post('/api/config', (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.json({ success: false, message: 'Token é necessário' });
    }
    fs.writeFileSync('config.json', JSON.stringify({ token }));
    res.json({ success: true, message: 'Configuração atualizada com sucesso!' });
});

app.post('/api/prefix', (req, res) => {
    const { prefix } = req.body;
    if (!prefix) {
        return res.json({ success: false, message: 'Prefixo é necessário' });
    }
    let config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
    config.prefix = prefix;
    fs.writeFileSync('config.json', JSON.stringify(config));
    res.json({ success: true, message: 'Prefixo atualizado com sucesso!' });
});

app.post('/api/send-money', (req, res) => {
    const { sendId } = req.body;
    if (!sendId) {
        return res.json({ success: false, message: 'ID é necessário' });
    }
    let config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
    config.sendId = sendId;
    fs.writeFileSync('config.json', JSON.stringify(config));
    res.json({ success: true, message: 'ID para enviar dinheiro atualizado com sucesso!' });
});

app.post('/api/withdraw-money', (req, res) => {
    const { withdrawId } = req.body;
    if (!withdrawId) {
        return res.json({ success: false, message: 'ID é necessário' });
    }
    let config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
    config.withdrawId = withdrawId;
    fs.writeFileSync('config.json', JSON.stringify(config));
    res.json({ success: true, message: 'ID para retirar dinheiro atualizado com sucesso!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
