import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.svg';

export default function NovoCaso() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState(0);

    const idOng = localStorage.getItem('idOng');

    const history = useHistory();

    async function handleNovoCaso(e){
        e.preventDefault();

            const data = {
                titulo,
                descricao,
                valor
            };

        try{
            await api.post('casos', data, {
                headers: {
                    Authorization : idOng
                }
            });

            history.push('/perfil');
        } catch(err){
            alert("Erro ao adicionar caso");
        }
    };

    return (
        <div className="novo-caso-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Logo da ONG"/>

                    <h1>Cadastrar um novo caso</h1>
                    <p>Descreva o seu caso para encontrar alguém que possa ajudar!</p>

                    <Link to="/perfil"  className="back-link">
                        <FiArrowLeft size={16} color="#E02041"/>Cancelar
                    </Link>
                </section>

                <form onSubmit={handleNovoCaso}>
                    <input placeholder = "Título do caso" value={titulo} onChange={ e => setTitulo(e.target.value)}/>
                    <textarea  placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
                    <input placeholder="Valor R$" value={valor} onChange={e => setValor(e.target.value)} />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}