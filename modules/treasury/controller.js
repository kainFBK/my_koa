//var mysql = require('mysql-co');
//var co = require('co');
const {query} = require('../../kits/async-db')

module.exports.gettreasurytotal = function gettreasurytotal() {
  return async function (ctx, next){

      let sql = 'SELECT * FROM indexinfo'
      let dataList = await query(sql)
      var today = new Date();
      var now = today.getDate();
      var month = today.getMonth();
      var monarr = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
      var daycom = (dataList[0].monthlycom - dataList[0].usedcom)/(monarr[month]-now+1) - dataList[0].daycom;
      dataList[0].daycom = daycom.toFixed(1);
      console.log(dataList);
      ctx.body = dataList;

  }
	
};



