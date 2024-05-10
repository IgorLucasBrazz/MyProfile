import React, { useState } from 'react';
import UserProfileForm from '../UserProfileForm';
import UserInfo from '../InfoProfile';

function UserProfile() {
    const [userData, setUserData] = useState({
        nome: 'João',
        idade: 25,
        rua: 'Rua A',
        bairro: 'Bairro B',
        estado: 'Estado C',
        biografia: 'Lorem ipsum dolor sit amet.',
        foto: null // Inicialmente, não há imagem
    });
    const [editMode, setEditMode] = useState(false);

    const handleFormSubmit = (formData) => {
        setUserData(formData); // Atualize o estado userData com os dados do formulário
        setEditMode(false);
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    return (
        <div className="container">
            <h1>Meu Perfil</h1>
            {!editMode ? (
                <>
                    <UserInfo data={userData} />
                    <button onClick={toggleEditMode}>Editar Perfil</button>
                </>
            ) : (
                <>
                    <UserProfileForm initialValues={userData} onSubmit={handleFormSubmit} />
                    <button onClick={toggleEditMode}>Cancelar Edição</button>
                </>
            )}
            {userData.foto && (
                <div>
                    <h2>Imagem de Perfil</h2>
                    <img src={`http://localhost:5000${userData.foto}`} alt="Imagem de Perfil" />
                </div>
            )}
        </div>
    );
}

export default UserProfile;
