import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Perfil(){
    const ongNome = localStorage.getItem('ongNome');
    const idOng = localStorage.getItem('idOng');

    const [casos, setCasos] = useState([]);

    const history = useHistory();

    useEffect(() => {
        api.get('/perfil', {
            headers:{
                Authorization: idOng,
            }
        }).then(response => {
            setCasos(response.data);
        })
    }, [idOng]);

    async function handleDeleteCaso(id){
        try{
            await api.delete(`casos/${id}`, {
                headers:{
                    Authorization: idOng,
                }
            });

            setCasos(casos.filter(caso => caso.id !== id));
        } catch(err){
            alert("Erro ao deletar caso");
        }

    };

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }
    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="Be the Hero"/>
                <span>Bem vinda, { ongNome }!</span>

                <Link to="/casos/novo" className="button">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {casos.map(caso => (
                    <li key={caso.id}>
                    <strong>CASO:</strong>
                    <p>{ caso.titulo }</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{ caso.descricao }</p>

                    <strong>Valor</strong>
                    <p>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(caso.valor)  }</p>

                    <button type="button" onClick={() => handleDeleteCaso(caso.id)}>
                        <FiTrash2 size={20} color="#a8a8b3" /> 
                    </button>
                </li>
                ))}
            </ul>
        </div>
    )
}