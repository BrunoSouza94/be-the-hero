const connection = require('../database/db_connection');

module.exports = {
    async create(request, response){
        const { id } = request.body;

        const ong = await connection('ong')
                          .where('id_ong', id)
                          .select('nome')
                          .first();

        if(!ong){
            return response.status(400).json({ error: "Nenhuma ONG foi encontrada com o ID informado"})
        }

        return response.json(ong);
    }
}