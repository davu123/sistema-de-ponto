function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString();
}

// exibir data e hora atual na página principal
document.getElementById('dateTime').innerText = getCurrentDateTime();
setInterval(() => {
    document.getElementById('dateTime').innerText = getCurrentDateTime();
}, 1000);

// função para registro de ponto
function registrarPonto(tipo) {
    const dataAtual = getCurrentDateTime();
    const registro = {
        tipo: tipo,
        dataHora: dataAtual,
        dataHoraCriacao: new Date().toISOString(),  // para verificar marcação no passado
        observacao: '',
    };

    if (!localStorage.getItem('pontos')) {
        localStorage.setItem('pontos', JSON.stringify([]));
    }

    let pontos = JSON.parse(localStorage.getItem('pontos'));

    // verifica se o registro é passado
    const dataRegistro = new Date(registro.dataHoraCriacao);
    const dataAtualRegistro = new Date();
    if (dataRegistro > dataAtualRegistro) {
        alert('Não é possível registrar um ponto no futuro.');
        return;
    }

    // armazenamento de registros
    pontos.push(registro);
    localStorage.setItem('pontos', JSON.stringify(pontos));
    alert('Ponto registrado com sucesso!');
}

// função para registrar justificativa de ausência
function registrarJustificativa() {
    const justificativa = document.getElementById('justificativaText').value;
    const file = document.getElementById('uploadFile').files[0];

    if (!justificativa || !file) {
        alert('Por favor, adicione uma justificativa e um arquivo.');
        return;
    }

    const registroJustificativa = {
        justificativa: justificativa,
        arquivo: file.name,
        dataHora: getCurrentDateTime(),
    };

    if (!localStorage.getItem('justificativas')) {
        localStorage.setItem('justificativas', JSON.stringify([]));
    }

    let justificativas = JSON.parse(localStorage.getItem('justificativas'));
    justificativas.push(registroJustificativa);
    localStorage.setItem('justificativas', JSON.stringify(justificativas));
    alert('Justificativa registrada com sucesso!');
}

// função para visualizar relatório de ponto
function visualizarRelatorio() {
    const pontos = JSON.parse(localStorage.getItem('pontos') || '[]');
    const justificativas = JSON.parse(localStorage.getItem('justificativas') || '[]');
    let relatorioContent = document.getElementById('relatorioContent');
    relatorioContent.innerHTML = '';

    if (pontos.length === 0 && justificativas.length === 0) {
        relatorioContent.innerHTML = '<p>Nenhum ponto registrado até o momento.</p>';
        return;
    }

    let html = '<h3>Pontos Registrados</h3>';
    pontos.forEach(ponto => {
        html += `<p>${ponto.tipo} - ${ponto.dataHora} ${
            new Date(ponto.dataHoraCriacao) < new Date() ? "(Marcado no passado)" : ""
        }</p>`;
    });

    if (justificativas.length > 0) {
        html += '<h3>Justificativas</h3>';
        justificativas.forEach(justificativa => {
            html += `<p>${justificativa.dataHora}: ${justificativa.justificativa} (Arquivo: ${justificativa.arquivo})</p>`;
        });
    }

    relatorioContent.innerHTML = html;
}
