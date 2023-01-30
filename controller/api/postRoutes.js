const router = require('express').Router();
const { Post } = require('../../model');

router.post('/post', async (req,res) => {
    try {
        const newPost = await Post.create(req.body)
        res.status(200).json(newPost)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const updatePost = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        res.status(200).json(updatePost)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/posts', async (req, res) => {
    try {
        const postData = await Post.findAll({});

        const posts = postData.map((post) => post.get({plain:true}));

        res.render('main', {posts});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/delete/:id', async (req,res) => {
    try {
        const deletePost = await Post.destroy(
            {
                where: {
                    id: req.params.id
                }
            }
        )
        res.status(200).json(deletePost)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router; 