const express = require('express');
const db = require(__dirname+'/../db_connect');
const router = express.Router();

//個別商品評論

router.get('/:prid',(req,res)=>{
    let prid = req.params.prid;
    // console.log(prid);
    const sql = `SELECT * FROM \`reviews\` WHERE productID=${prid} ORDER BY createdTime DESC`;
    db.query(sql,(error,results,fields)=>{
        if (error){
            console.log(error);
        }else{
            res.json(results);
        }
    });
});


router.post('/:prid',(req,res)=>{
    let prid = req.params.prid;
    const sql = `INSERT INTO \`reviews\` (productID, customerUsername, stars, reviewContent, createdTime) VALUES (?,?,?,?,NOW())`;
    console.log(req.body[0]);
    
    db.queryAsync(sql,[
        prid,
        req.body[0].username,
        req.body[0].stars,
        req.body[0].reviewcontent,
    ])
    
    
    .then(results=>{
        // res.json(output);
    })
    .catch(ex=>{
        console.log('ex:',ex);
    })
    res.json(req.body);
    
});


module.exports = router;