import React, { useState } from 'react';
import axios from 'axios';

function UserProfileForm({ initialValues, onSubmit }) {
    const [formData, setFormData] = useState(initialValues);
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataWithFile = new FormData();
            formDataWithFile.append('nome', formData.nome);
            formDataWithFile.append('idade', formData.idade);
            formDataWithFile.append('rua', formData.rua);
            formDataWithFile.append('bairro', formData.bairro);
            formDataWithFile.append('estado', formData.estado);
            formDataWithFile.append('biografia', formData.biografia);
            formDataWithFile.append('foto', file);

            const response = await axios.post('http://localhost:5000/perfil', formDataWithFile, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onSubmit({ ...formData, foto: response.data.imagePath });
        } catch (error) {
            console.error('Erro ao salvar perfil:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} />
            <label htmlFor="idade">Idade:</label>
            <input type="number" id="idade" name="idade" value={formData.idade} onChange={handleChange} />
            <label htmlFor="rua">Rua:</label>
            <input type="text" id="rua" name="rua" value={formData.rua} onChange={handleChange} />
            <label htmlFor="bairro">Bairro:</label>
            <input type="text" id="bairro" name="bairro" value={formData.bairro} onChange={handleChange} />
            <label htmlFor="estado">Estado:</label>
            <input type="text" id="estado" name="estado" value={formData.estado} onChange={handleChange} />
            <label htmlFor="biografia">Biografia:</label>
            <textarea id="biografia" name="biografia" value={formData.biografia} onChange={handleChange} />
            <label htmlFor="foto">Foto:</label>
            <input type="file" id="foto" name="foto" onChange={handleFileChange} />
            <button type="submit">Salvar</button>
        </form>
    );
}

export default UserProfileForm;
