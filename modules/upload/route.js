//var uploadct = require('./controller');
var multer = require('koa-multer')
const {query} = require('../../kits/async-db')

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/root/workspace/react/build/pic')
    },
    filename: function(req, file, cb) {
        var pictype = file.mimetype;
        switch (pictype){
            
            case 'image/jpeg' :
                pictype = '.jpg';
                break;
            
            case 'image/png' :
                pictype  = '.png';
                break;
            
            case 'image/gif' :
                pictype = '.gif';
                break;
            
        }
        cb(null, file.fieldname + Date.now() + pictype)
    }
})

var upload = multer({ storage: storage})

module.exports = function(app, route) {

	console.log("upload");

    route.post('/api/uploadpic',upload.single('file'),async(ctx ,next) =>{
    	var filenm = ctx.req.file.filename;
    	// var pictype = ctx.req.file.mimetype;
    	var picpath = "http://47.94.196.19:8002/pic/";
    	// switch (pictype){
    		
    	// 	case 'image/jpeg' :
    	// 		pictype = '.jpg';
    	// 		break;
    		
    	// 	case 'image/png' :
    	// 		pictype  = '.png';
    	// 		break;
    		
    	// 	case 'image/gif' :
    	// 		pictype = '.gif';
    	// 		break;
    		
    	// }

    	console.log(ctx.req.body);
        //var jsonbody = JSON.stringify(ctx.req.body);
        //console.log(typeof(jsonbody));
        //var jsonsp = jsonbody.split(//)
        //var bodysp = jsonbody.split("\'");
        //var category = bodysp[1].split(";");
        var category = ctx.req.body.tags_category.split(";");
        var pl = ctx.req.body.tags_pl.split(";");
        console.log(category)

        let sql = 'insert into souvenir set ?';
        await query(sql,{name: ctx.req.body.svnr_name, picpath: picpath + filenm, num:ctx.req.body.svnr_num, category: ctx.req.body.tags_category, pl: ctx.req.body.tags_pl});
        let sql2 = 'select LAST_INSERT_ID() as liid'
        let idresult = await query(sql2);
        console.log(idresult);
        let id = idresult[0].liid;
        console.log(id);

        //var txt_category = '';
        //var txt_pl = '';
        for(var len = 0;len < category.length-1;len++){
            // var txt_cur_category = JSON.stringify(category[len])
            // txt_category = txt_category + txt_cur_category + ';';
            // var sp_category = txt_cur_category.split("\"");
            // var cur_category = sp_category[1];
            console.log("sql3");
            let sql3 = 'select * from `svnr_category` where `category_name` = ?';
            let result = await query(sql3,[category[len]]);
            if(result.length == 0 ){
                console.log("sql4");
                let sql4 = 'insert into `svnr_category` set ?'
                await query(sql4,{category_name: category[len], svnr_id: id, extra: 'sb'});
            }
            else{
                console.log("sql5");
                let tmp_id = result[0].svnr_id + ',' + id;
                let sql5 = 'update `svnr_category` set `svnr_id` = ?';
                await query(sql5,[tmp_id])
            }

        }

        for(var len = 0;len < pl.length -1;len++){
            // var txt_cur_pl = JSON.stringify(pl[len])
            // txt_pl = txt_pl + txt_cur_pl + ';';
            // var sp_pl = txt_cur_pl.split("\"");
            // var cur_pl = sp_pl[1];
            let sql3 = 'select * from `svnr_purchaselocation` where `pl_name` = ?';
            let result = await query(sql3,[pl[len]]);
            if(result.length == 0 ){
                let sql4 = 'insert into `svnr_purchaselocation` set ?'
                await query(sql4,{pl_name: pl[len], svnr_id: id, extra: 'sb'});
            }
            else{
                let tmp_id = result[0].svnr_id + ',' + id;
                let sql5 = 'update `svnr_purchaselocation` set `svnr_id` = ?';
                await query(sql5,[tmp_id])
            }
        }

        // let sql6 = 'update souvenir set category = ' + txt_category + ', pl = ' + txt_pl;
        // await query(sql6);


    	ctx.body = {
    		path: picpath + filenm,
    		res:'sb'
    	}
    });

    route.get('/api/getcategorylist',async(ctx ,next) =>{
        let sql = 'select * from svnr_category';
        let result = await query(sql);
        var finaldata = [];
        //var suglist = [];
        for(var b = 0;b < result.length;b++){
            var idlist = result[b].svnr_id.split(",");
            //suglist.push(result[b].category_name);
            var ctresultlist = [];
            for(var a = 0;a < idlist.length;a++){
                let sql2 = 'select * from souvenir where id = ?';
                let result2 = await query(sql2,[idlist[a]]);
                var data = {
                    id: result2[0].id,
                    name: result2[0].name,
                    picpath: result2[0].picpath,
                    num: result2[0].num,
                    category: result2[0].category,
                    pl: result2[0].pl
                }
                ctresultlist.push(data);
            }
            finaldata.push({id:b+1 , ct_name: result[b].category_name, data: ctresultlist});
        }
        // let sql3 = 'select * from svnr_purchaselocation';
        // let result3 = await query(sql3);
        // for(var b = 0;b < result3.length;b++){
        //     suglist.push(result3[b].pl_name);
        // }
        //finaldata[0].suglist = suglist;

        ctx.body = finaldata;
    });

    route.get('/api/getsuggestionlist',async(ctx ,next) =>{
        let sql = 'select * from svnr_category';
        let result = await query(sql);
        var suglist = [];
        for(var b = 0;b < result.length;b++){
            suglist.push(result[b].category_name);
        }
        let sql3 = 'select * from svnr_purchaselocation';
        let result3 = await query(sql3);
        for(var b = 0;b < result3.length;b++){
            suglist.push(result3[b].pl_name);
        }
        ctx.body = suglist;
    });

    app.use(route.routes(), route.allowedMethods());
};