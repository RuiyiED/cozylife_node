const express = require('express');
// const moment = require('moment-timezone');
const upload = require(__dirname+'/../upload');
const db = require(__dirname +'/../db_connect');
const router = express.Router();

// ------------------------------

router.get('/:clid', (req, res)=>{
    let clid = req.params.clid;
    console.log(clid);
    
    const sql = `SELECT * FROM clorder WHERE customerid=${clid}`;
        db.query(sql, (error, results, fields)=>{
            if(error){
                console.log(error);
            } else {
                res.json(results);
            }
        });
    

});



module.exports = router;