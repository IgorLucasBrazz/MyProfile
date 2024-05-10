import React from 'react';

function UserInfo({ data }) {
    console.log("caminho", data.foto);
    return (
        <div className="user-info">
            <h2>Dados do Formulário</h2>
            <img src={`http://localhost:5000${data.foto}`} alt="Imagem de Perfil" />
            <p>Nome: {data.nome}</p>
            <p>Idade: {data.idade}</p>
            <p>Rua: {data.rua}</p>
            <p>Bairro: {data.bairro}</p>
            <p>Estado: {data.estado}</p>
            <p>Biografia: {data.biografia}</p>
        </div>
    );
}

export default UserInfo;
