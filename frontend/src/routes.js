import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Registro from './pages/Registros';
import Perfil from './pages/Perfil';
import NovoCaso from './pages/NovoCaso';

export default function() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ Login } />
                <Route path="/cadastro" component={ Registro } />
                <Route path="/perfil" component={ Perfil } />
                <Route path="/casos/novo" component={ NovoCaso } />
            </Switch>
        </BrowserRouter>
    );
}