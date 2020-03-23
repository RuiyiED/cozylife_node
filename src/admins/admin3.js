const express = require('express');
console.log('iamshinder:', express.iamshinder);
const router = express.Router();

// 自訂 middleware
router.use((req, res, next)=>{
    res.locals.memberData = {
        name: 'bill',
        age: 30,
    };
    next();
});

router.get('/:action?/:id?', (req, res)=>{
    res.json({
        params: req.params,
        url: req.url,
        baseUrl: req.baseUrl,
        locals: res.locals
    });
});

module.exports = router;