//var mysql = require('mysql-co');
//var co = require('co');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      // Mimetype stores the file type, set extensions according to filetype
      switch (file.mimetype) {
        case 'image/jpeg':
          ext = '.jpeg';
          break;
        case 'image/png':
          ext = '.png';
          break;
        case 'image/gif':
          ext = '.gif';
          break;
      }

      cb(null, file.originalname.slice(0, 4) + Date.now() + ext);
    }
});
const upload = multer({storage: storage});
const {query} = require('../../kits/async-db')

module.exports.uploadpic = function uploadpic() {
  return async function (ctx, next){

    upload.single('file');
    console.log('Received file' + ctx.request.body.file.originalname);
    ctx.body = {res:ctx.request.body.file.path};

  }
	
};



