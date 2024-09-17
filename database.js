const mongoose = require('mongoose');

// Configurações do MongoDB
const mongoURI = 'mongodb://localhost:27017/controle_ponto'; // URL da conexão local
mongoose.connect(mongoURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const db = mongoose.connection;

// Verifica se há erros na conexão
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));

db.once('open', function() {
    console.log('Conectado ao MongoDB com sucesso!');
});

module.exports = db;
