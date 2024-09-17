const Timesheet = require('./models/Timesheet');
const User = require('./models/User');

async function registrarPonto(userId, tipoPonto, location, remarks = '') {
    const novoPonto = new Timesheet({
        user_id: userId,
        type: tipoPonto,
        timestamp: new Date(),
        is_manual: false,  // Definir como true se for no passado
        location: location,
        remarks: remarks
    });

    try {
        await novoPonto.save();
        console.log('Ponto registrado com sucesso');
    } catch (err) {
        console.error('Erro ao registrar o ponto:', err);
    }
}
