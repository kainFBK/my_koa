const {query} = require('../../kits/async-db')
const mysql = require('mysql')
const fs = require('fs')
const path = require("path")
const request = require('request')
const crypto = require('crypto')

const hash = crypto.createHash('md5')

const dl_path = '/root/nvshens'
const save_path = '/root/myfastify/uploads/'

function mkdirsSync(dirname, mode){
    console.log(dirname);
    if(fs.existsSync(dirname)){
        return true;
    }else{
        if(mkdirsSync(path.dirname(dirname), mode)){
            fs.mkdirSync(dirname, mode);
            return true;
        }
    }
}

function savePics(done_list, path, album_id){
    for (var i = done_list.length - 1; i >= 0; i--) {
        const md5 = crypto.createHash('md5').update(done_list[i]).digest("hex")
        fs.rename(path + done_list[i].split('/').pop(), save_path + md5 + '.jpg', function(err){
            if(err){
                throw err;
            }
        })
        const sql = 'insert into `nvshens` set ?'
        query(sql,{album_id: album_id, number: i, url: 'http://45.32.13.18/' + md5 + '.jpg'})
    }
}

module.exports.downloadtaotu = function downloadtaotu() {
  return async function (ctx, next){

      const href = ctx.request.body.href
      console.log(href)

      request({
            url: 'http://111.229.217.89:8000/nvshens/',
            method: 'GET',
            qs: {
                href: href
            }
        },function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let picsrc = JSON.parse(body)['picsrc'];
                let picnum = JSON.parse(body)['picnum'];
                let piclist = [picsrc+'/0.jpg']
                let exec_num = 0
                // let tag = url.split('/').pop()
                for (let i = picnum - 1; i >= 1; i--) {
                    if (i < 1000 && i >= 100) {
                        piclist.push(picsrc+'/'+i+'.jpg')
                    } else if (i < 100 && i >= 10) {
                        piclist.push(picsrc+'/0'+i+'.jpg')
                    } else if (i < 10 && i >= 0) {
                        piclist.push(picsrc+'/00'+i+'.jpg')
                    }
                }
                console.log(piclist)
                let done_list = []
                let dlnum = 0
                let taotu_path = dl_path + picsrc.split('gallery')[1] + '/'
                mkdirsSync(taotu_path)
                function reqfun() {
                    const newpic = piclist.pop()
                    if (newpic) {
                        dlnum++
                        picpath = dl_path + newpic.split('gallery')[1]
                        request(newpic).pipe(fs.createWriteStream(picpath).on('close', function (){
                            console.log(newpic)
                            done_list.push(newpic)
                            dlnum--
                            reqfun()
                        }))
                    } else if (dlnum === 0){
                        savePics(done_list, taotu_path, href)
                    }      
                }
                reqfun()
                reqfun()
                reqfun()   
            }else{
                console.log(response.statusCode);
            }
        })

      ctx.body = "ok"
      
  }
  
};


module.exports.candownload = function candownload() {
  return async function (ctx, next){
    const href = ctx.query.href
    const sql = `select * from nvshens where album_id = '` + href + `'`
    const dataList = await query(sql)
    let result = true
    if (dataList.length > 0) {
        result = false
    }
    ctx.body = {'download': result}
  }
}


module.exports.getalbumlist = function getalbumlist() {
  return async function (ctx, next){
    const sql = `select distinct album_id from nvshens`
    const dataList = await query(sql)
    let result = []
    dataList.forEach((item, index, arr) => {
        result.push(item.album_id)
    })
    ctx.body = result
  }
}
