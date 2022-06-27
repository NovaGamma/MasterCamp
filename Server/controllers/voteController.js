const Vote = require('../models/voteModel.js');

const User = require("../models/userModel");

// UPDATE a User
exports.vote = (req, res) => {

    // Find user and update it
    User.findOneAndUpdate({ _id: req.body.userID, hasVoted: false}, {
        hasVoted: true
    }) 
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " +
                req.body.userId
            });
        }
        else {
            // Create a Vote
            const vote = new Vote({
                candidatID: req.body.candidatID,
                communeID: req.body.communeID
            });
            // Save a Vote in the MongoDB
            vote.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
        }
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " +
                req.body.userId
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " +
            req.body.userId
        });
    });
};


// DELETE a Vote
exports.delete = (req, res) => {
    Vote.findByIdAndRemove(req.body.voteId)
    .then(vote => {
        if(!vote) {
            return res.status(404).send({
                message: "Vote not found with id " +
                req.body.voteId
            });
        }
        res.send({message: "Vote deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Vote not found with id " +
                req.body.voteId
            });
        }
        return res.status(500).send({
            message: "Could not delete vote with id " +
            req.body.voteId
        });
    });
}

// DELETE all Votes
exports.deleteAll = (req, res) => {
    Vote.deleteMany()
    .then(res.send({message: "All votes deleted successfully!"}))
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

// find votes by commune
exports.findByCommune = (req, res) => {
    Vote.find({ communeID: req.body.communeID})
    .then(
    votes => {
        res.send(votes)
    })
    .catch(err => {
        res.status(500).send("Error -> " + err)
    });
};

// find votes by candidat
exports.findByCandidat = (req, res) => {
    Vote.find({ candidatID: req.body.candidatID})
    .then(
    votes => {
        res.send(votes)
    })
    .catch(err => {
        res.status(500).send("Error -> " + err)
    });
};