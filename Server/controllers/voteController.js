
import {Vote} from "../models/voteModel.js"
import {Candidat} from "../models/candidatModel.js"
import {User} from "../models/userModel.js"

// UPDATE a User
var vote = (req, res) => {

    // Find user and update it
    User.findOne({id_:req.body.userID})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " +
                req.body.userId
            });
        }
        else if(user.hasVoted){
            return res.status(404).send({
                message:"User has already voted"
            })
        }
        else {
            // Create a Vote
            console.log(user._id);
            console.log(req.body);
            if(user.commune == req.body.communeID){
                Candidat.findOne({'_id':req.body.candidatID,'communeID':user.commune})
                .then(candidat => {
                if(!candidat){
                    return res.status(404).send({
                        message: "Candidat not found in commune"
                    });
                }
                console.log(candidat._id);
                const vote = new Vote({
                    "candidatID": candidat._id,
                    "communeID": candidat.communeID
                });
                // Save a Vote in the MongoDB
                user.hasVoted = true;
                //user.save()
                vote.save()
                .then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message
                    });
                });
                });
            }
            else{
                return res.status(404).send({
                    message: "Send communeID different from user communeID"
                });
            }
        }
    }).catch(err => {
        console.log(err);
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
var remove = (req, res) => {
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
var deleteAll = (req, res) => {
    Vote.deleteMany()
    .then(res.send({message: "All votes deleted successfully!"}))
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

// find votes by commune
var findByCommune = (req, res) => {
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
var findByCandidat = (req, res) => {
    Vote.find({ candidatID: req.body.candidatID})
    .then(
    votes => {
        res.send(votes)
    })
    .catch(err => {
        res.status(500).send("Error -> " + err)
    });
};

export {vote, remove, deleteAll, findByCommune, findByCandidat}