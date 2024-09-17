const Justification = require('./models/Justification');

async function registrarJustificativa(userId, justificativa, fileUrl = '') {
    const novaJustificativa = new Justification({
        user_id: userId,
        justification: justificativa,
        file_url: fileUrl
    });

    try {
        await novaJustificativa.save();
        console.log('Justificativa registrada com sucesso');
    } catch (err) {
        console.error('Erro ao registrar a justificativa:', err);
    }
}
