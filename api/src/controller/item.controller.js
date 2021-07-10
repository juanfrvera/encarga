const db = require("../config/database");

exports.create = async (req, res) => {
    const { titulo, precio, descripcion } = req.body;
    const { rows } = await db.query(
        "INSERT INTO item (titulo, precio, descripcion) VALUES ($1, $2, $3)",
        [titulo, precio, descripcion]
    );

    res.status(201).send({
        message: "Item added successfully!",
        body: {
            item: { titulo, precio, descripcion }
        },
    });
};

exports.getAll = async (req, res) => {
    // El último creado aparecerá primero en la lista
    const response = await db.query('SELECT * FROM item ORDER BY id DESC');
    res.status(200).send(response.rows);
}

exports.getById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM item WHERE id = $1', [id]);
    res.status(200).send(response.rows);
}