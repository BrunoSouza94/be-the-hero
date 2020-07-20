exports.up = function(knex) {
    return knex.schema.createTable('casos', function(table){
        table.increments();

        table.string('titulo').notNullable();
        table.string('descricao').notNullable();
        table.string('valor').notNullable();
        
        table.string('id_ong').notNullable();

        table.foreign('id_ong').references('id_ong').inTable('ong');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('casos');
};
