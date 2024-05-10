const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'uploads')));

// Configuração do multer para upload de imagem
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = '/home/igor/MyProfile/MyProfile/myprofile/src/server/uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
            console.log('Diretório de uploads criado:', uploadDir);
        }
        cb(null, uploadDir);
        console.log('Caminho do diretório de upload:', uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});


const upload = multer({ storage: storage });

// Criação da pool de conexão com o banco de dados
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '36514548',
    database: 'myprofile',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Rota para salvar o perfil, incluindo a imagem
app.post('/perfil', upload.single('foto'), async (req, res) => {
    try {
        const { nome, idade, rua, bairro, estado, biografia } = req.body;

        // Verifica se o arquivo de imagem foi enviado no corpo da requisição
        if (!req.file) {
            throw new Error('Nenhuma imagem enviada');
        }

        // Salva apenas o caminho da imagem no banco de dados
        const imagePath = `/home/igor/MyProfile/MyProfile/myprofile/src/server/uploads/${req.file.filename}`; // Monta o caminho da imagem corretamente

        // Insere os dados, incluindo o caminho da imagem, no banco de dados
        const [result] = await pool.query('INSERT INTO perfil (nome, idade, rua, bairro, estado, biografia, foto) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nome, idade, rua, bairro, estado, biografia, imagePath]);
        
        console.log("oiii:", imagePath)

        res.json({ success: true, id: result.insertId, imagePath });
    } catch (error) {
        console.error('Erro ao inserir perfil:', error);
        res.status(500).json({ success: false, error: 'Erro ao inserir perfil' });
    }
});

// Inicia o servidor na porta 5000
app.listen(5000, () => {
    console.log('Servidor Node.js rodando na porta 5000');
});
