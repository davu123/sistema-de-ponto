// Criar um novo banco de dados
use('controle_ponto');

// Criar a coleção de usuários e inserir um documento
db.users.insertOne({
    name: "João Silva",
    email: "joao.silva@example.com",
    role: "employee", 
    salary_per_hour: 50,
    created_at: new Date()
});

// Criar a coleção de registros de ponto e inserir um documento
db.timesheet.insertOne({
    user_id: ObjectId("6123abc456789"),  // Substituir pelo ID do usuário criado
    type: "entrada",
    timestamp: new Date(),
    is_manual: false,
    location: { latitude: -23.550520, longitude: -46.633308 },
    remarks: "Entrou no horário",
    created_at: new Date()
});

// Criar a coleção de justificativas e inserir um documento
db.justifications.insertOne({
    user_id: ObjectId("6123abc456789"),  // Substituir pelo ID do usuário criado
    justification: "Consulta médica",
    file_url: "/uploads/justification.pdf",
    created_at: new Date()
});

// Exibir todos os usuários
db.users.find({});

// Exibir todos os registros de ponto
db.timesheet.find({});

// Exibir todas as justificativas
db.justifications.find({});
