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
    const { name, body } = req.body;

    userDb.get
        .then(user => {
            if(!name) {
               res.status(400).json({
                   message: "missing required name field"
               })
            }else {
                if(!body){
                res.status(400).json({
                    message: "missing user data"
                })
            }else {
                next();
            }
            }
            })

function validatePost(req, res, next) {
    const { text, body } = req.body;

    postDb.get
        .then(post =>{
            if(!body){
                res.status(400).json({
                    message: "missing post data"
                })
            } else {
                if (!text) {
                    res.status(400).json({
                        message: "missing required text field"
                    })
                }
                else {
                    next();
            } 
};

module.exports = router;
