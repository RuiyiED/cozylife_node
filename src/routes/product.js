const express = require('express');
const moment = require('moment-timezone');
const db = require(__dirname + '/../db_connect');
const router = express.Router();

//品牌無分類無(全部)
router.get('/0/0/:page?', (req, res)=>{
  const perPage = 9;
  let page = parseInt(req.params.page) || 1 ;
  let cid = req.params.cid;
  let pid = req.params.pid;

  //console.log(pid);
  //console.log(cid);
  console.log(page);

  const output = {
      totalRows:0,    //總筆數
      perPage:perPage,//每一頁最多幾筆
      totalPages:0,   //總頁數
      page: page,     //用戶要查看的頁數4
      rows:0,         //當頁的資料    
  };

  const sql111 = "SELECT COUNT(1) num FROM product2";//取得資料表
    db.query(sql111, (error, results)=>{
    //總筆數 = 取第一筆
    output.totalRows = results[0].num;
    //拿到總頁數
    output.totalPages = Math.ceil(output.totalRows/perPage);
    if(output.page < 1) output.page = 1;
    if(output.page > output.totalPages) output.page=output.totalPages;
    const sql04 =`SELECT * FROM \`product2\` LIMIT ${(output.page-1)*output.perPage}, ${output.perPage}`;
    db.query(sql04, (error,results)=>{
        
    output.rows = results;
    //用json秀
    console.log(output.rows[0].categoryID);
                     
    res.json(output);
    });   
  });
  
})

//品牌有分類無
router.get('/:pid?/0/:page?', (req, res)=>{
    const perPage = 9;
    let page = parseInt(req.params.page) || 1 ;
    let cid = req.params.cid;
    let pid = req.params.pid;

    console.log(pid);
    //console.log(cid);
    console.log(page);

    const output = {
        totalRows:0,//總筆數
        perPage:perPage,//每一頁最多幾筆
        totalPages:0,//總頁數
        page: page,//用戶要查看的頁數4
        rows:0,//當頁的資料    
    };
    const sql011 = "SELECT COUNT(1) num FROM product2";//取得資料表
        db.query(sql011, (error, results)=>{
        //總筆數 = 取第一筆
        output.totalRows = results[0].num;
        //拿到總頁數
        output.totalPages = Math.ceil(output.totalRows/perPage);
        if(output.page <1) output.page=1;
        if(output.page >output.totalPages) output.page=output.totalPages;
        //const sql =`SELECT * FROM \`product2\` LIMIT ${(output.page-1)*output.perPage}, ${output.perPage}`;
        const sql02 =`SELECT * FROM \`product2\` WHERE companyID = ${pid} LIMIT ${(output.page-1)*output.perPage}, ${output.perPage}`;
        
        db.query(sql02, (error,results)=>{
        
          output.rows = results;
          //用json秀
          //console.log(output.rows[0].companyID);
                     
          res.json(output);
        });   
    });
})

//品牌無分類有
router.get('/0/:cid?/:page?', (req, res)=>{
  const perPage = 9;
  let page = parseInt(req.params.page) || 1 ;
  let cid = req.params.cid;
  let pid = req.params.pid;

  //console.log(pid);
  console.log(cid);
  console.log(page);

  const output = {
      totalRows:0,//總筆數
      perPage:perPage,//每一頁最多幾筆
      totalPages:0,//總頁數
      page: page,//用戶要查看的頁數4
      rows:0,//當頁的資料    
  };
  const sql101 = "SELECT COUNT(1) num FROM product2";//取得資料表
      db.query(sql101, (error, results)=>{
      //總筆數 = 取第一筆
      output.totalRows = results[0].num;
      //拿到總頁數
      output.totalPages = Math.ceil(output.totalRows/perPage);
      if(output.page <1) output.page=1;
      if(output.page >output.totalPages) output.page=output.totalPages;
      const sql03 =`SELECT * FROM \`product2\` WHERE categoryID = ${cid} LIMIT ${(output.page-1)*output.perPage}, ${output.perPage}`;
        
        db.query(sql03, (error,results)=>{
        
        output.rows = results;
        //用json秀
        //console.log(output.rows[0].categoryID);
                     
        res.json(output);
      });   
  });
})

//品牌有分類有
router.get('/:pid?/:cid?/:page?', (req, res)=>{
  const perPage = 9;
  let page = parseInt(req.params.page) || 1 ;
  let cid = req.params.cid;
  let pid = req.params.pid;

  console.log(pid);
  console.log(cid);
  console.log(page);

  const output = {
      totalRows:0,//總筆數
      perPage:perPage,//每一頁最多幾筆
      totalPages:0,//總頁數
      page: page,//用戶要查看的頁數4
      rows:0,//當頁的資料    
  };
  const sql001 = "SELECT COUNT(1) num FROM product2";//取得資料表
    db.query(sql001, (error, results)=>{
    //總筆數 = 取第一筆
    output.totalRows = results[0].num;
    //拿到總頁數
    output.totalPages = Math.ceil(output.totalRows/perPage);
    if(output.page <1) output.page=1;
    if(output.page >output.totalPages) output.page=output.totalPages;
    //const sql01 =`SELECT * FROM \`product2\` LIMIT ${(output.page-1)*output.perPage}, ${output.perPage}`;
    const sql01 =`SELECT * FROM \`product2\` WHERE companyID = ${pid} AND categoryID = ${cid} LIMIT ${(output.page-1)*output.perPage}, ${output.perPage}`;

    db.query(sql01, (error,results)=>{
        
        output.rows = results;
        //用json秀
        //console.log(output.rows[0].categoryID);
                     
        res.json(output);
    });   
  });
})




module.exports = router;