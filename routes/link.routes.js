const {Router} = require('express');
const Link = require('../models/Link');
const router = Router();
const config = require('config');
const auth = require('../middleware/auth.middleware');
const shortId = require('shortid');

router.post('/generate', auth, async (req, res) => {
    try {
        console.log()
        console.log("Enters to the correct endpoint");
        const baseUrl = config.get("baseUrl");
        const {from} = req.body;
        console.log(req.body);

        const code = shortId.generate();

       const existing = await Link.findOne({from});


       if(existing) {
           res.json({link: existing})
       }
       const to = baseUrl + '/t' + code;
        console.log(req)
        const link = new Link({
           code, to, owner: req.user.userId
       });

       await link.save();

       res.status(201).json({link});



    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId});

        res.json(links);

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
});

router.get('/:id', async (req, res) => {
    try {
        const links = await Link.findById(req.params.id);
        res.json(links);

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})
module.exports = router