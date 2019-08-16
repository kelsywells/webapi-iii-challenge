const express = 'express';
const router = express.Router();
const userDb = require('./userDb');
const postDb = require ('../posts/postDb');
const users = require ('./userDb');
const posts = './postDb';


router.post('/', (req, res) => {
    const { name } = req.body;
    users.insert(name)
    .then(
        res.json(name)
    )
    .catch(err=> {
        res.status(500).json({
            message: "Could not create user at this time"
        })
        })
    })

router.post('/:id/posts', (req, res) => {
    const { text } = req.body;
    const { id } = req.params;
    const user_id = id;

    posts.insert({ user_id, text })
    .then( posts => 
        res.status(201).json(posts)
    )
    .catch(err => {
        res.status(500).json({
            message: "Could not add post at this time"
        })
    })
});

router.get('/', (req, res) => {
    users.get()
    .then(user => {
        res.json(user);
    })
    .catch( err => {
        res.status(500).json({
            message: "Could not find users"
        })
    }
    )
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    users.get(id)
        .then(user => {
            res.json(user)
        })
        .catch( err=> {
            res.status(500).json({
                message: "Could not find user"
            })
        }
        )
});

router.get('/:id/posts', (req, res) => {
    const { id } = req.params;
    posts.get(id)
        .then(user => {
            if (!user) {
                res.status(404)({
                    error: "Could not find user asssociated with this post"
                })
            } else{
                res.json(user)
            }
        }
        )
        .catch( err=> {
            res.status(500).json({
                message: "Could not retrieve this user's post"
            })
        }
        )

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    user.remove(id)
        .then(deleted => {
            if (!deleted){
                res.status(404).json({
                    error: "This user does not exist"
                })
            }
            else{
                res.status(200).json({
                    message: "User removed"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "Could not remove user at this time"
            })
        })
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    users.update(id)
    .then(updated => {
        res.json(updated)
        }
    )
    .catch(err => {
        res.json({
            message: "Could not update user at this time"
        })
    })
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
