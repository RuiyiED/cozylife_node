const express = require('express');
const db = require(__dirname +'/../db_connect');
const router = express.Router();


//商品細節資料

router.get('/:pid',(req,res)=>{
    let pid = req.params.pid;
    // console.log(pid);
    const sql = `SELECT * FROM \`product2\` WHERE productID=${pid}`;
    db.query(sql,(error,results,fields)=>{
        if (error){
            console.log(error);
        }else{
            res.json(results);
        }
    });
});


module.exports = router;