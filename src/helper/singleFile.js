const multer = require("multer");
const util = require("util");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let params;
    if(req.params.type){
      params=req.params.type
    }
    else{
      params='user'
    }
    cb(null, "src/uploads/files/" + params);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + file.originalname.match(/\..*$/)[0]
    );
  },
});
const multi_upload = multer({
  storage,
  // 1MB
  fileFilter: (req, file, cb) => {
    //['.pdf', '.doc', '.docx', '.txt'];
    if (file.mimetype.startsWith('application/') || file.mimetype.startsWith('text/')) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only documents are allowed.'), false);
      }   
  },
}).single("file");

let uploadImage = util.promisify(multi_upload);
module.exports = uploadImage;
