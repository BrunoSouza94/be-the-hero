const connection = require('../database/db_connection');
const crypto = require('crypto');


module.exports = {
    async create(request, response){
        const {nome, email, telefone, cidade, uf} = request.body;
        
        const id_ong = crypto.randomBytes(6).toString('HEX');

        await connection('ong').insert({
            id_ong,
            nome,
            email,
            telefone,
            cidade,
            uf
        });

        return response.json({ id_ong });
    },

    async index(request, response){
        const ongs = await connection('ong').select('*');

        return response.json(ongs);
    }
}