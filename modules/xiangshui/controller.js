const {query} = require('../../kits/async-db')
const mysql = require('mysql')
const capid1 = '1100116001'
const capid2 = '1100116002'
const capid3 = '1100116003'
const capid4 = '1100116004'

module.exports.capsule = function capsule() {
  return async function (ctx, next){

    var time = Date.parse(new Date())
    time = time - 1000 * 60 * 60
    var timestr = time.toString()
    timestr = timestr.substr(0,10)
    let sql = 'SELECT * FROM xiangshui where timestamp > ' + timestr + ' order by timestamp'
    let dataList = await query(sql)

    //var datastr = JSON.stringify(dataList)
    //dataList = JSON.parse(datastr)
    var cap1 = new Array()
    var cap2 = new Array()
    var cap3 = new Array()
    var cap4 = new Array()

    for(let i = 0;i<dataList.length;i++){
        //console.log(dataList[i]['capsule_id'])
        switch(dataList[i]['capsule_id']){
            case capid1:
                cap1.push(dataList[i])
                break;
            case capid2:
                cap2.push(dataList[i])
                break;
            case capid3:
                cap3.push(dataList[i])
                break;
            case capid4:
                cap4.push(dataList[i])
                break;
        }
    }

    //console.log(cap1)
    //console.log(cap2)
    //console.log(cap3)
    //console.log(cap4)
    var lasttime1 = 60
    var lasttime2 = 60
    var lasttime3 = 60
    var lasttime4 = 60

    for(let i=cap1.length-1;i>=0;i--){
        if(cap1[i]['status'] == 1){
            lasttime1 = i
            break
        }
    }
    for(let i=cap2.length-1;i>=0;i--){
        if(cap2[i]['status'] == 1){
            lasttime2 = i
            break
        }
    }
    for(let i=cap3.length-1;i>=0;i--){
        if(cap3[i]['status'] == 1){
            lasttime3 = i
            break
        }
    }
    for(let i=cap4.length-1;i>=0;i--){
        if(cap4[i]['status'] == 1){
            lasttime4 = i
            break
        }
    }

    console.log(cap1.length)
    console.log(lasttime1)
    console.log(cap2.length)
    console.log(lasttime2)
    console.log(cap3.length)
    console.log(lasttime3)
    console.log(cap4.length)
    console.log(lasttime4)

    send_data = {
        'cap1': {
            'status': cap1[cap1.length-1]['status'],
            'last': cap1.length - lasttime1,
            '45': 45 - cap1.length + lasttime1,
            '30': 30 - cap1.length + lasttime1
        },
        'cap2': {
            'status': cap2[cap2.length-1]['status'],
            'last': cap2.length - lasttime2,
            '45': 45 - cap2.length + lasttime2,
            '30': 30 - cap2.length + lasttime2
        },
        'cap3': {
            'status': cap3[cap3.length-1]['status'],
            'last': cap3.length - lasttime3,
            '45': 45 - cap3.length + lasttime3,
            '30': 30 - cap3.length + lasttime3
        },
        'cap4': {
            'status': cap4[cap4.length-1]['status'],
            'last': cap4.length - lasttime4,
            '45': 45 - cap4.length + lasttime4,
            '30': 30 - cap4.length + lasttime4
        }
    }

    ctx.body = send_data
  }

};  

