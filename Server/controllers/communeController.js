import {Commune} from "../models/communeModel.js"
// POST a Commune
var create = (req, res) => {
    // Create a Commune
    const commune = new Commune({ name: req.body.name });
    // Save a Commune in the MongoDB
    commune.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// FETCH all Communes
var findAll = (req, res) => {
    Commune.find()
    .then(communes => {
        res.send(communes);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// FIND a Commune
var findOne = (req, res) => {
    Commune.findById(req.body.communeId)
    .then(commune => {
        if(!commune) {
            return res.status(500).send({
                message: "Commune not found with id " +
                req.body.communeId
            });
        }
        res.send(commune);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(500).send({
                message: "Commune not found with id " +
                req.body.communeId
            });
        }
        return res.status(500).send({
            message: "Error retrieving Commune with id " +
            req.body.communeId
        });
    });
};
// DELETE a Commune
var remove = (req, res) => {
    Commune.findByIdAndRemove(req.body.communeId)
    .then(commune => {
        if(!commune) {
            return res.status(500).send({
                message: "Commune not found with id " +
                req.body.communeId
            });
        }
        res.send({message: "Commune deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(500).send({
                message: "Commune not found with id " +
                req.body.communeId
            });
        }
        return res.status(500).send({
            message: "Could not delete commune with id " +
            req.body.communeId
        });
    });
}

// DELETE all Communes
var deleteAll = (req, res) => {
    Commune.deleteMany()
    .then(res.send({message: "All communes deleted successfully!"}))
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

export {create, findAll, findOne, remove, deleteAll}