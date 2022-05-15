const {query} = require('../../kits/async-db')
const cheerio = require('cheerio')
const request = require('superagent')
const mysql = require('mysql')

module.exports.posttool = function posttool() {
  return async function (ctx, next){

      const res = await request.post("http://localhost:3000/api/boourcrew")

      ctx.body = "ok"

      
  }
	
};

module.exports.pictool = function pictool() {
  return async function (ctx, next){

      var picurl = ctx.request.body.picurl

      var num = ctx.request.body.num

      var thumb = ctx.request.body.thumb

      var albumname = ctx.request.body.albumname

      // var now = mysql.raw('NOW()');

      var sql2 = 'insert into albumlist set ?'

      var result = await query(sql2,{create_time: new Date(), album_name: albumname, pic_num: num, album_thumb: thumb})

      console.log(result)

      var tmp = ''

      var sql3 = 'insert into piclist set ?'

      await query(sql3,{src: picurl + '0.jpg', aid: result.insertId, in_store: 0})

      for(var a = 1; a <= num; a++){
        var tmpa = ''
        if(a < 10){
          tmpa = '00' + a
        }
        if(a < 100 && a >= 10){
          tmpa = '0' + a
        }
        if(a < 1000 && a >= 100){
          tmpa = '' + a
        }
        tmp = picurl + tmpa + '.jpg'

        var sql = 'insert into piclist set ?'

        await query(sql,{src: tmp, aid: result.insertId, in_store: 0})

      }

      ctx.body = "ok"

      
  }
  
};

module.exports.spdpic = function spdpic() {
  return async function (ctx, next){

      //var picurl = ctx.request.body.picurl

      var num = ctx.request.body.num

      var thumb = ctx.request.body.thumb

      var albumname = ctx.request.body.albumname

      var piclist = ctx.request.body.piclist

      // var now = mysql.raw('NOW()');

      var sql2 = 'insert into albumlist set ?'

      var result = await query(sql2,{create_time: new Date(), album_name: albumname, pic_num: num, album_thumb: thumb})

      console.log(result)

      var tmp = ''

      var sql3 = 'insert into piclist set ?'

      for(var a = 0; a < num; a++){

        tmp = piclist[a]

        var sql = 'insert into piclist set ?'

        await query(sql,{src: tmp, aid: result.insertId, in_store: 0})

      }

      ctx.body = "ok"

      
  }
  
};

