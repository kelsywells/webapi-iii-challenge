const express = 'express';
const router = express.Router();
const userDb = require('./userDb');
const postDb = require ('../posts/postDb');

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params

    userDb.getById(id)
        .then (userId => {
            if(userId) {
                next();
                
            } else {
                res.status(400).json({
                    message: "invalid user id"
                })
            }
        })
        .catch (err => {
            console.log("error:", err)
        })
    
}


function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
