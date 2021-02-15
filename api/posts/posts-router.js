// implement your posts router here

const Posts = require('./posts-model');
const express = require('express');
const router = express.Router();


router.get('/posts', (req, res) =>{
    Posts.find()
    .then((posts) =>{
        res.status(200).json(posts);
    })
    .catch((error) =>{
        res.status(500).json({message: 'The posts information could not be retrieved'})
    });
});
router.get('/posts/:id', (req, res) =>{
    const id = req.params.id;
    Posts.findById(id)
    .then((user) =>{
        user ? res.status(200).json(user) : res.status(404).json({message: 'The post with the specified ID does not exist'});
    })
    .catch((err) =>{
        res.status(500).json({message: 'The post information could not be retrieved'});
    });
});


router.post('/posts', (req, res) =>{
    const newPost = req.body;
    
    if(!newPost.title || !newPost.contents){
        res.status(400).json({message: 'Please provide title and contents for the post'});
    } else{
        Posts.insert(newPost)
        .then((post) =>{
            res.status(201).json(post);
        })
        .catch((error) =>{
            res.status(500).json({message: 'There was an error while saving the post to the database'});
        });
    }
});


router.put('/posts/:id', (req, res) =>{
    const id = req.params.id;
    const changes = req.body;

        if(!changes.title || !changes.contents){
            res.status(400).json({message: 'Please provide title and contents for the post'});
        } else{
            Posts.update(id, changes)
            .then((post) =>{
                if(!post){
                    res.status(404).json({message: 'The post with the specified ID does not exist'});
                } else{
                    res.status(200).json({post});
                }  
            })
            .catch((error) =>{
                res.status(500).json({message: 'The post information could not be modified'});
            });
        }
});



router.delete('/posts/:id', (req,res) =>{
    const id = req.params.id;
    Posts.remove(id)
    .then((count) =>{
        if (count > 0){
            res.status(200).json({message: 'The Post has been deleted'});
        } else{
            res.status(404).json({message: 'The post with the specified ID does not exist'});
        }
    })
    .catch((error) =>{
        res.status(500).json({message: 'The post could not be removed'});
    });
});


router.get('/posts/:id/comments', (req,res) =>{
    const id = req.params.id;

    Posts.findPostComments(id)
    .then((comments) =>{
        comments ? res.status(200).json(comments) : 
        res.status(404).json({message: 'The post with the specified ID does not exist'})
        
    })
    .catch((error) =>{
        res.status(500).json({message: 'The comments information could not be retrieved'});
    });
});


module.exports = router;