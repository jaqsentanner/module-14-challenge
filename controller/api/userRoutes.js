const router = require('express').Router();
const { User } = require('../../model');

withAuth = require('../../utils/auth')

router.post('/signup', async (req,res) => {
    try {
        const userData = await User.create(req.body);

        req;session.save(() => {
            req.session.id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/signin', async (req, res) => {
    try {
        const userData = await User.findOne({ where:{ username: req.body.username }});

        if (!userData) {
            res.status(400).json({ message: 'incorrect username or password'});
            return;
        }

        const validatePassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'incorrect username or password'});
            return;
        }

        req.session.save(() => {
            req.session.id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You have signed in successfully' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/signout', (req,res) => {
    if (req.session.logeed_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.get('/posts', async (req,res) => {
    try {
        const postData = await User.findAll({});

        const posts = postData.map((project) => project.get({ plain:true }));

        res.render('main', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;