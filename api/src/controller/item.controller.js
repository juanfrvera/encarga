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