const express = require('express');
const moment = require('moment-timezone');
const db = require(__dirname + '/../db_connect');
const router = express.Router();


router.get('/', (req, res)=>{   //myserver後面的路由 http://localhost:7777/myserver
                                //req是要求物件、res是回應的物件
  const sql = "SELECT * FROM customer";
  db.query(sql, (error, results, fields)=>{
      if(error){
          console.log(error);
      } else {
          res.json(results);
      }
  });
});

module.exports = router;