 const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create contact
exports.create = (req, res) => {
	if(!req.body) {
		return res.status(400).send({
			message: "Contact field cannot be empty!"
		});
	}

			Contacts.create(req.body)
				.then(data => {
					res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
    
};

// Get all contacts
exports.findAll = (req, res) => {
    Contacts.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get one contact by id
exports.findOne = (req, res) => {
	const id = req.params.id;
    Contacts.findByPk(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Contact not found`
                });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Some error occurred`
            });
        });
	
  
};

// Update one contact by id
exports.update = (req, res) => {
    const id = req.params.id;
    Contacts.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Contact was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update contact.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Some error occurred}`
            });
        });
};

// Delete one contact by id
exports.delete = (req, res) => {
	const id = req.params.id;
    Contacts.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Contact was deleted successfully."
                });
            } else {
                res.send({
                    message: `Cannot delete contact.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Some error occurred`
            });
        });
    
};
