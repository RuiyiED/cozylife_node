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


router.get('/:page?',(req, res)=>{
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
            res.render('address-book/list', output);
        })
        .catch(ex=>{

        });



    // const t_sql = "SELECT COUNT(1) num FROM students";
    // db.query(t_sql, (error, results)=>{
    //     output.totalRows = results[0].num;
    //     output.totalPages = Math.ceil(output.totalRows/perPage);
    //     if(output.page < 1) output.page=1;
    //     if(output.page > output.totalPages) output.page=output.totalPages;

    //     const sql = `SELECT * FROM students LIMIT ${(output.page-1)*output.perPage}, ${output.perPage}`;

    //     db.query(sql, (error, results)=>{
    //         output.rows = results;
    //         res.json(output);
    //     });
    // });

});

module.exports = router;