/*
baseUrl:  /address-book

CRUD:
    Create (insert)
        get:  /add
        post: /add (...)

    Update
        get:  /edit/:sid
        post: /edit/:sid (...)

    Delete
        post: /delete/:sid

    Read
        get: /:page/:category?
 */

const express = require('express');
const moment = require('moment-timezone');
const upload = require(__dirname+'/../upload');
const db = require(__dirname +'/../db_connect');
const router = express.Router();

router.use((req, res, next)=>{
    res.locals.title = '通訊錄';
    next();
});


router.get('/delete/:cID?', (req, res)=>{
    const sql = "DELETE FROM `students` WHERE cID=?";
    db.queryAsync(sql, [req.params.cID])
        .then(results=>{
            // res.redirect('/address-book');
            if(req.get('Referer')){
                // 如果有[從哪裡來]的資料
                res.redirect( req.get('Referer') );
            } else {
                res.redirect('/address-book');
            }

            /*
            res.json({
                success: true
            });

             */
        })
        .catch(ex=>{
            console.log('ex:', ex);
            res.json({
                success: false,
                info: '無法刪除資料'
            });
        })
});




router.get('/add',(req, res)=>{
    res.render('address-book/add');
});

// upload.none() 用來解析 multipart/form-data 格式的 middleware
router.post('/add', upload.none(), (req, res)=>{
    const output = {
        success: false,
        error: '',
    };

    if(req.body.cName.length<2){
        output.error = '姓名字元長度太短';
        return res.json(output);
    }

    const email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(!email_pattern.test(req.body.cEmail)){
        output.error = 'Email 格式錯誤';
        return res.json(output);
    }

    const sql = "INSERT INTO `students`(`cName`, `cEmail`, `cPhone`, `cBirthday`, `cAddr`) VALUES (?,?,?,?,?)";
    
    db.queryAsync(sql, [
        req.body.cName,
        req.body.cEmail,
        req.body.cPhone,
        req.body.cBirthday,
        req.body.cAddr
    ])
        .then(results=>{
            output.results = results;
            if(results.affectedRows===1){
                output.success = true;
            }
            res.json(output);
        })
        .catch(ex=>{
            console.log('ex:', ex);
        })

    //res.json(req.body);
});


router.get('/edit/:cID',(req, res)=>{
    const sql = "SELECT * FROM students WHERE cID=?";
    db.queryAsync(sql, [req.params.cID])
        .then(results=>{
            if(results.length){
                results[0].birthday = moment(results[0].birthday).format('YYYY-MM-DD');
                res.render('address-book/edit', results[0]);
            } else {
                res.redirect('/address-book');
            }
        })
        .catch(ex=>{
            console.log('ex:', ex);
        })
});


router.post('/edit', upload.none(), (req, res)=>{
    const output = {
        success: false,
        error: '',
    };
    // TODO: 應該檢查表單進來的資料
    if(req.body.cName.length<2){
        output.error = '姓名字元長度太短';
        return res.json(output);
    }

    const email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(!email_pattern.test(req.body.cEmail)){
        output.error = 'Email 格式錯誤';
        return res.json(output);
    }

    const data = {...req.body};  // 淺複製
    delete data.cID; // 移除 cID
   
    const sql = "UPDATE `students` SET ? WHERE cID=?";

    db.queryAsync(sql, [data, req.body.cID])
        .then(results=>{
            output.results = results;
            if(results.changedRows===1){
                output.success = true;
            } else {
                output.error = '資料沒有變更';
            }
            res.json(output);
        })
        .catch(ex=>{
            console.log('ex:', ex);
        })

    //res.json(req.body);
});






// router.get('/:page?',(req, res)=>{
const getDataByPage = (req, res)=>{
    const perPage = 3;
    let page = parseInt(req.params.page) || 1;
    const output = {
        totalRows: 0, // 總筆數
        perPage: perPage, // 每一頁最多幾筆
        totalPages: 0, //總頁數
        page: page, // 用戶要查看的頁數
        rows: 0, // 當頁的資料
    };


    const t_sql = "SELECT COUNT(1) num FROM students";
    db.queryAsync(t_sql)
        .then(results=>{
            output.totalRows = results[0].num;
            output.totalPages = Math.ceil(output.totalRows/perPage);
            if(output.page < 1) output.page=1;
            if(output.page > output.totalPages) output.page=output.totalPages;
            const sql = `SELECT * FROM students LIMIT ${(output.page-1)*output.perPage}, ${output.perPage}`;
            return db.queryAsync(sql);
        })
        .then(results=>{
            const fm = 'YYYY-MM-DD';
            for(let i of results){
                i.cBirthday = moment(i.cBirthday).format(fm);
            }
            output.rows = results;
            output.user = req.session.loginUser || {};
            res.render('address-book/list', output);
        })
        .catch(ex=>{

        });

};

router.get('/list/:page?', (req, res)=>{
    const perPage = 3;
    let page = parseInt(req.params.page) || 1;
    const output = {
        totalRows: 0, // 總筆數
        perPage: perPage, // 每一頁最多幾筆
        totalPages: 0, //總頁數
        page: page, // 用戶要查看的頁數
        rows: 0, // 當頁的資料
    };


    const t_sql = "SELECT COUNT(1) num FROM students";
    db.queryAsync(t_sql)
        .then(results=>{
            output.totalRows = results[0].num;
            output.totalPages = Math.ceil(output.totalRows/perPage);
            if(output.page < 1) output.page=1;
            if(output.page > output.totalPages) output.page=output.totalPages;
            const sql = `SELECT * FROM students LIMIT ${(output.page-1)*output.perPage}, ${output.perPage}`;
            return db.queryAsync(sql);
        })
        .then(results=>{
            const fm = 'YYYY-MM-DD';
            for(let i of results){
                i.cBirthday = moment(i.cBirthday).format(fm);
            }
            output.rows = results;
            output.user = req.session.loginUser || {};
            res.json(output);
        })
        .catch(ex=>{

        });
})


router.get('/:page?', getDataByPage);

module.exports = router;