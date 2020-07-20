const connection = require('../database/db_connection');
const { index } = require('./OngController');

module.exports = {
    async index(request, response){
        const id_ong = request.headers.authorization;

        const casos = await connection('casos')
                            .where('id_ong', id_ong)
                            .select('*');
                            
        return response.json(casos);
    }
}