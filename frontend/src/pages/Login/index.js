import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import './styles.css';
import logo from '../../assets/logo.svg';
import heroes from '../../assets/heroes.png';
import api from '../../services/api';

export default function Login(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('/sessions', { id });
            
            localStorage.setItem('idOng', id);
            localStorage.setItem('ongNome', response.data.nome)

            history.push('/perfil');
        } catch(err){
            alert("Falha no login!");
        }
    }
    return (
        <div className="login-container">
        <section className="form">
            <img src={ logo } alt="Logo da ONG" className="logo"/>

            <form onSubmit={handleLogin}>
                <h1>Digite suas credenciais</h1>

                <input type="text" placeholder="Digite seu usuário" value={ id } onChange={e => setId(e.target.value)}/>
                <button type="submit" className="button"><p>Entrar</p></button>
                <Link to="/cadastro"  className="back-link">
                    <FiLogIn size={16} color="#E02041"/>Não tenho cadastro
                </Link>
            </form>
        </section>

        <img src={ heroes } alt="desenho de pessoas abraçadas observando o horizonte" className="logo"/>
        </div>
        
    );
}