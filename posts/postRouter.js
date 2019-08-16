const express = 'express';
const posts = './postDb';
const router = express.Router();

router.get('/', (req, res) => {
    posts.get()
        .then(post => {
            res.json(post);
        })
        .catch( err => {
            res.status(500).json({
                message: "Could not retrieve posts"
            })
        }
        )
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    posts.get(id)
        .then(post => {
            res.json(post)
        })
        .catch( err=> {
            res.status(500).json({
                message: "Could not retrieve post"
            })
        }
        )

});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    posts.remove(id)
        .then(deleted => {
            if (!deleted){
                res.status(404).json({
                    error: "This post does not exist"
                })
            }
            else{
                res.status(200).json({
                    message: "Post deleted"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "Could not delete"
            })
        })
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    posts.update(id)
    .then(updated => {
        res.json(updated)
        }
    )
    .catch(err => {
        res.json({
            message: "Could not update"
        })
    })


// custom middleware

function validatePostId(req, res, next) {
    const { id } = req.params

    postDb.getById(id)
        .then (postId => {
                next();
            })
        .catch (err => {
            console.log("error:", err)
            res.status(400).json({
                message: "invalid user id"
            })
        })
    
}

module.exports = router;