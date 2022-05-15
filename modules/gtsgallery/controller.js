const {query} = require('../../kits/async-db')

module.exports.getgtsrandomlist = function getgtsrandomlist() {
  return async function (ctx, next){

    // let mode = null;
    // if(ctx.request.query.mode == 'down')
    //     mode = '<'
    // else
    //     mode = '>'
    // let sqlid =  ctx.request.query.id ? ctx.request.query.id : '0'
    // console.log(sqlid)
       // let sql = `select * from gtsgallery where alubmid = -1 order by rand() limit 25`
       // let dataList = await query(sql)
       // console.log(dataList)
    // for(var a = 0; a < dataList.length; a++){
    //   var tmp = dataList[a].create_time.split(/[T.]/);
    //   dataList[a].create_time = tmp[0]+" "+tmp[1];
    // }
    //const probability_table = [1,1,1,1,1,2,2,3,4,5]
    //let rand_up_table = []
    //for(var a=0; a<probability_table.length; a++){
    //    for(var b=0; b<probability_table[a]; b++){
    //        rand_up_table.push(a)
    //    }
    //}
    const sql = `select id from gtsgallery`
    const enable_ids_json = await query(sql)
    enable_ids = enable_ids_json.map((ele, index) => {
        return ele.id
    })
    let max_num = Math.max(...enable_ids)
    let page_num = Math.ceil(max_num/1000)
    let table_max = Math.ceil(page_num/2)
    let sub_num = max_num - (page_num - 1) * 1000
    let real_max = Math.ceil(table_max * sub_num / 1000)
    let probability_table = []
    probability_table.push(real_max)
    while(probability_table.length < page_num){
        if(table_max > 1){
            table_max -= 1
        }
        probability_table.unshift(table_max)
    }
    let rand_up_table = []
    for(var a=0; a<probability_table.length; a++){
        for(var b=0; b<probability_table[a]; b++){
            rand_up_table.push(a)
        }
    }
    let query_ids = []
    let query_num = 0
    while(query_num < 20){
        let rand_down = Math.floor(Math.random()*1000)
        let rand_up = rand_up_table[Math.floor((Math.random()*rand_up_table.length))]
        let rand_id = rand_down + 1000 * rand_up
        console.log(rand_id)
        if(enable_ids.includes(rand_id)){
            query_ids.push(rand_id)
            query_num++
        }
    }
    const sql2 = `select * from gtsgallery where id in (?)`
    let dataList = await query(sql2, [query_ids])
    dataList.sort(function(){
        return Math.random()-0.5;
    });
    ctx.body = dataList
  }
	
};

module.exports.gtslisttest = function gtslisttest(){
  return async function(ctx, next){
    let sql = `select * from gtsgallery where type = 'comic' limit 25`
    let dataList = await query(sql)
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

module.exports.deletePicFromId = function deletePicFromId() {
  return async function (ctx, next){
    console.log(ctx.request.body.id)
    let sql = 'DELETE FROM gtsgallery where id='+ctx.request.body.id
    let dataList = await query(sql)
    console.log(dataList)
    ctx.body = dataList
  }
  
};

module.exports.likePicFromId = function likePicFromId() {
  return async function (ctx, next){
    const name = ctx.request.body.name
    const url = ctx.request.body.url
    const author = ctx.request.body.author
    const alubmid = ctx.request.body.alubmid
    const type = ctx.request.body.type
    let sql = `INSERT INTO gtsgallery (name, url, author, alubmid, type) VALUES ('${name}', '${url}', '${author}', '${alubmid}', '${type}')`
    let dataList = await query(sql)
    console.log(dataList)
    ctx.body = dataList
  }

};

