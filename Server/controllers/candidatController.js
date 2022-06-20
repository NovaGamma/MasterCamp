const Candidat = require('../models/candidatModel.js');
// POST a Candidat
exports.create = (req, res) => {
    // Create a Candidat
    const candidat = new Candidat({
        communeID: req.body.communeID,
        name: req.body.name,
        date: req.body.date
    });
    // Save a Candidat in the MongoDB
    candidat.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// DELETE a Candidat
exports.delete = (req, res) => {
    Candidat.findByIdAndRemove(req.body.candidatId)
    .then(candidat => {
        if(!candidat) {
            return res.status(404).send({
                message: "Candidat not found with id " +
                req.body.candidatId
            });
        }
        res.send({message: "Candidat deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Candidat not found with id " +
                req.body.candidatId
            });
        }
        return res.status(500).send({
            message: "Could not delete candidat with id " +
            req.body.candidatId
        });
    });
}

// DELETE all Candidats
exports.deleteAll = (req, res) => {
    Candidat.deleteMany()
    .then(res.send({message: "All candidats deleted successfully!"}))
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

// FIND a Candidat
exports.findOne = (req, res) => {
    Candidat.findById(req.body.candidatId)
    .then(candidat => {
        if(!candidat) {
            return res.status(404).send({
                message: "Candidat not found with id " +
                req.body.candidatId
            });
        }
        res.send(candidat);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Candidat not found with id " +
                req.body.candidatId
            });
        }
        return res.status(500).send({
            message: "Error retrieving Candidat with id " +
            req.body.candidatId
        });
    });
};

// find candidats by commune
exports.findByCommune = (req, res) => {
    Candidat.find({ communeID: req.body.communeID})
    .then(
    candidats => {
        res.send(candidats)
    })
    .catch(err => {
        res.status(500).send("Error -> " + err)
    });
}