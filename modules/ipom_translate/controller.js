//var mysql = require('mysql-co');
//var co = require('co');
const {query} = require('../../kits/async-db')
const cheerio = require('cheerio')
//const https = require('https')
const request = require('superagent')

module.exports.showpic = function showpic() {
  return async function (ctx, next){

      var resimglist = new Array();
      

      //send get req
      // const options = {
      //   hostname: 'encrypted.google.com',
      //   port: 443,
      //   path: '/',
      //   method: 'GET'
      // };

      // const req = https.request(options, (res) => {
      //   console.log('statusCode:', res.statusCode);
      //   console.log('headers:', res.headers);

      //   res.on('data', (d) => {
      //     process.stdout.write(d);
      //   });
      // });

      // req.on('error', (e) => {
      //   console.error(e);
      // });
      // req.end();
      // https.get('https://www.nvshens.com/g/24701/',(res) => {
        // var html='';
        // res.on('data',(data) => {          
        //   html+=data;
        //   $ = cheerio.load(html);
        //   var imgarray = $('img');
        //   if(imgarray && imgarray.length > 0){
        //     var id = 0;
        //     imgarray.each(function(i, elem){
        //       if($(this).attr('src')){
        //         var tmpdata = {
        //         id:id,
        //         src:$(this).attr('src')
        //       }
        //       id++;
        //       //console.log(tmpdata);
        //       resimglist.push(tmpdata);
        //       }         
        //     });
        //     console.log(resimglist);
        //   }


      //   });

      //   // req.on('end',function(){
      //   //   //console.info(html);
      //   // });


      // }).on('error',(e) => {
      //   console.error(e);
      // });

      const res = await request.post('https://translation.googleapis.com/language/translate/v2?key=AIzaSyDYIK_UyPl4mpcdsb3m5M1pLcZYRbiERm0').send({'q':sourcetext,'target':"en"});

        let $ = cheerio.load(res.text, {
          decodeEntities: true
        });

        var imgarray = $('img');

          if(imgarray && imgarray.length > 0){
            var id = 0;

            imgarray.each(function(i, elem){
              if($(this).attr('src')){

                var tmpdata = {
                  id:id,
                  src:$(this).attr('src')
                }

                id++;
                console.log($(this));
                resimglist.push(tmpdata);

              } 

            });

            console.log(resimglist);
          }

     

      ctx.body = resimglist;


      // var sql = 'update indexinfo set daycom = daycom + ' + value + ' where userid = 1';
      // var sql2 = 'insert into bill set ?';
      // await query(sql);
      // await query(sql2,{date:date, category:category, value:value});
      
  }
	
};



