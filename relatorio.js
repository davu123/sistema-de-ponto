// Função para carregar e exibir o relatório de pontos
function carregarRelatorio() {
    const pontos = JSON.parse(localStorage.getItem('pontos') || '[]');
    const relatorioContent = document.getElementById('relatorioContent');
    relatorioContent.innerHTML = '';

    pontos.forEach((ponto, index) => {
        const isPassado = new Date(ponto.dataHoraCriacao) < new Date();
        const div = document.createElement('div');
        div.className = 'pontoRegistro';
        div.innerHTML = `
            <p>${ponto.tipo} - ${ponto.dataHora} ${isPassado ? "(Marcado no passado)" : ""} ${
            ponto.observacao ? "(Com Observação)" : ""
        }</p>
            <button onclick="editarRegistro(${index})">Editar</button>
            <button onclick="alert('Não é possível excluir este ponto.')">Excluir</button>
        `;
        relatorioContent.appendChild(div);
    });
}

// Função para editar um registro no localStorage
function editarRegistro(index) {
    const pontos = JSON.parse(localStorage.getItem('pontos'));
    const novoTipo = prompt("Edite o tipo de ponto:", pontos[index].tipo);
    const novaObservacao = prompt("Edite a observação:", pontos[index].observacao || "");
    if (novoTipo !== null) {
        pontos[index].tipo = novoTipo;
        pontos[index].observacao = novaObservacao;
        localStorage.setItem('pontos', JSON.stringify(pontos));
        carregarRelatorio();
    }
}

// Função para aplicar filtro por última semana ou último mês
function aplicarFiltro() {
    const filtro = document.getElementById('filter').value;
    const pontos = JSON.parse(localStorage.getItem('pontos') || '[]');
    const dataAtual = new Date();

    let pontosFiltrados;
    if (filtro === 'ultimaSemana') {
        const semanaPassada = new Date(dataAtual);
        semanaPassada.setDate(dataAtual.getDate() - 7);
        pontosFiltrados = pontos.filter(ponto => new Date(ponto.dataHoraCriacao) >= semanaPassada);
    } else if (filtro === 'ultimoMes') {
        const mesPassado = new Date(dataAtual);
        mesPassado.setMonth(dataAtual.getMonth() - 1);
        pontosFiltrados = pontos.filter(ponto => new Date(ponto.dataHoraCriacao) >= mesPassado);
    } else {
        pontosFiltrados = pontos;
    }

    exibirPontos(pontosFiltrados);
}

// Função auxiliar para exibir pontos filtrados
function exibirPontos(pontos) {
    const relatorioContent = document.getElementById('relatorioContent');
    relatorioContent.innerHTML = '';

    pontos.forEach((ponto, index) => {
        const isPassado = new Date(ponto.dataHoraCriacao) < new Date();
        const div = document.createElement('div');
        div.className = 'pontoRegistro';
        div.innerHTML = `
            <p>${ponto.tipo} - ${ponto.dataHora} ${isPassado ? "(Marcado no passado)" : ""} ${
            ponto.observacao ? "(Com Observação)" : ""
        }</p>
            <button onclick="editarRegistro(${index})">Editar</button>
            <button onclick="alert('Não é possível excluir este ponto.')">Excluir</button>
        `;
        relatorioContent.appendChild(div);
    });
}

carregarRelatorio();
