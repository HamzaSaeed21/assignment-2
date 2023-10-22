const db = require("../models");
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create phone
exports.create = (req, res) => {
	if (!req.body) {
        return res.status(400).send({
            message: "Phone field cannot be empty!"
        });
	} else {		
		Phones.create(req.body)
			.then(data => {
				res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });	
    }
};

// Get all phones
exports.findAll = (req, res) => {
    Phones.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get one phone by id
exports.findOne = (req, res) => {
	const id = req.params.id;
    Phones.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find phone`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Some error occurred.`
            });
        });
  
};

// Update one phone by id
exports.update = (req, res) => {
    const id = req.params.id;
    Phones.update(req.body, {
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Phone was updated successfully."
            });
        } else {
            res.status(404).send({
                message: `Cannot update phone`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Some error occurred`
        });
    });
};

// Delete one phone by id
exports.delete = (req, res) => {
	const id = req.params.id;
    Phones.destroy({
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Phone was deleted successfully."
            });
        } else {
            res.status(404).send({
                message: `Cannot delete phone`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Some error occurred`
        });
    });
    
};