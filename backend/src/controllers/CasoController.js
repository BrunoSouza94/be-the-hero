const connection = require('../database/db_connection');

module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;

        const count = await connection('casos')
            .count()
            .first();

        const casos = await connection('casos')
            .limit(5)
            .offset( (page - 1) * 5 )
            .join('ong', 'ong.id_ong', '=', 'casos.id_ong')
            .select('casos.*', 'ong.nome', 'ong.email', 'ong.telefone', 'ong.cidade', 'ong.uf')
            .orderBy('casos.id_ong');

        response.header('X-Total-Count', count[''])    

        return response.json(casos);
    },

    async create(request, response) {
        const { titulo, descricao, valor } = request.body;
        const id_ong = request.headers.authorization;

        const id = await connection('casos').insert({
            titulo,
            descricao,
            valor,
            id_ong,
        });

        return response.json({ id })
    },

    async delete(request, response){
        const { id } = request.params;
        const id_ong = request.headers.authorization;

        const caso = await connection('casos')
                               .where('id', id)
                               .select('id_ong')
                               .first();
                               
        if(caso.id_ong !== id_ong ){
            return response.status(401).json({ error: 'Operação não permitida'});
        }
        
        await connection('casos').where('id', id).delete();

        return response.status(204).send();
    }

    
};