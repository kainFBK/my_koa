const {query} = require('../../kits/async-db')

module.exports.getpronlist = function getpronlist() {
  return async function (ctx, next){

    let mode = null;
    if(ctx.request.query.mode == 'down')
        mode = '<'
    else
        mode = '>'
    let sqlid =  ctx.request.query.id ? ctx.request.query.id : '0'
    console.log(sqlid)
    let sql = 'select * from pronart where id ' + mode + ' ' + sqlid + ' order by id desc limit 25'
    let dataList = await query(sql)
    console.log(dataList)
    // for(var a = 0; a < dataList.length; a++){
    //   var tmp = dataList[a].create_time.split(/[T.]/);
    //   dataList[a].create_time = tmp[0]+" "+tmp[1];
    // }
    ctx.body = dataList
  }
	
};

module.exports.getpiclist = function getpiclist() {
  return async function (ctx, next){

    let sql = 'SELECT id,src FROM piclist where aid='+ctx.request.body.aid
    let dataList = await query(sql)
    console.log(dataList)
    ctx.body = dataList
  }
  
};



