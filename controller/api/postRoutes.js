const router = require('express').Router();
const { Post, User } = require('../../model');



router.get('/posts', async (req,res) => {
    try {
        const postData = await Post.findAll({});

        const posts = postData.map((post) => post.get({ plain:true }));

        res.render('dash', { posts })
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router; 