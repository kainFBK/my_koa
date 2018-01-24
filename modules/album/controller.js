const {query} = require('../../kits/async-db')

module.exports.getalbumlist = function getalbumlist() {
  return async function (ctx, next){

    let sql = 'SELECT id, date_format(create_time,"%Y-%m-%d %T") as time, album_name, pic_num, album_thumb FROM albumlist'
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



