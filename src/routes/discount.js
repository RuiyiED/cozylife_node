var express = require('express')
const db = require(__dirname+'/../db_connect');
const router = express.Router();



router.get('/',(req,res)=>{
    
    const sql = "SELECT * FROM coupon";
    db.query(sql,(error,results,fields)=>{
        if (error){
            console.log(error);
        }else{
            res.json(results);
        }
    });
});


// app.get('/Discount/:cid?/TOTAL',(req,res)=>{

//     let cid = req.params.cid;
//     console.log(cid);

//     const sql = "SELECT * FROM coupon_receive WHERE user_id = ${cid}";
//     db.query(sql,(error,results,fields)=>{
//         if (error){
//             console.log(error);
//         }else{
//             res.json(results);
//         }
//     });
// });




module.exports = router;
  