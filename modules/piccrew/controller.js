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
      const res = new Object();

      var siteurl = ctx.request.body.url;
      if(siteurl.indexOf('giantessbooru.com') >= 0){
        console.log(siteurl);
        res = await request.get(siteurl)
        .set('Cookie','__cfduid=d1acef27a3a7db8c502211ad8f6ba069c1516345827; __utmz=45162674.1516345827.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); agreed=true; gtsb_language=zh; __utma=45162674.1238922163.1516345827.1516353744.1516590228.5; __utmc=45162674; __utmt=1; __utmb=45162674.2.10.1516590228');
      }else{
        res = await request.get(siteurl);
      }
        console.log(res);

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

                if($(this).parent('a')){
                  tmpdata.url = $(this).parent('a').attr('href');
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

var downloadpic = function(url, dir, filename){
  request.head(url, function(err, res, body){
    request(url).pipe(fs.createWriteStream(dir + "/" + filename));
  })
}


module.exports.getboour = function getboour() {
  return async function (ctx, next){

    var resimglist = new Array();

    var urllist = ctx.request.body.urllist;

    var sitename = ctx.request.body.sitename;

    for(var a = 0; a < urllist.length; a++){
      var tmpurl = urllist[a].url;

      const res = await request.get(ctx.request.body.url);

      let $ = cheerio.load(res.text, {
          decodeEntities: true
        });

      var picname = $('#main_image').attr('src').split('/').pop();

      var img = sitename + $('#main_image').attr('src');

      downloadpic(img, '/root/workspace/pic', picname);

    }

    ctx.body = "complete";

  }
  
};