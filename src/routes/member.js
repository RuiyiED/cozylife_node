const express = require('express');
const router = express.Router();

router.get('/login', (req, res)=>{

    res.render('member/login');
});

router.post('/login', (req, res)=>{
    const users = {
        'shinder': {
           nickname: '小明',
           pw: '23456'
        },
        'hello': {
            nickname: '是在哈囉',
            pw: '123456'
        },
    };
    const output = {
        success: false,
        error: '帳號或密碼錯誤',
        body: req.body
    };

    if(req.body.account && users[req.body.account] ){
        // 帳號是對的
        if(req.body.password===users[req.body.account].pw){
            // 密碼也是對的
            req.session.loginUser = {
                account: req.body.account,
                nickname: users[req.body.account].nickname
            };
            output.success = true;
            delete output.error;
        }
    }

    res.json(output);
});


router.get('/logout', (req, res) => {
    delete req.session.loginUser;
    res.redirect('/');
})


module.exports = router;