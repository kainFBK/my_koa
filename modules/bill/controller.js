//var mysql = require('mysql-co');
//var co = require('co');
const {query} = require('../../kits/async-db')

module.exports.postbill = function postbill() {
  return async function (ctx, next){

      let date = ctx.request.body.date;
      let category = ctx.request.body.category.toString("utf8");
      let detial = ctx.request.body.detial;
      let value = ctx.request.body.value;
      console.log(date+category+detial+value);
      var sql = 'update indexinfo set daycom = daycom + ' + value + ' where userid = 1';
      var sql2 = 'insert into bill set ?';
      await query(sql);
      await query(sql2,{date:date, category:category, value:value});
      ctx.body = {res:"success"};
  }
	
};



