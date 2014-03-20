var fs = require("fs");
var util = require('util');

var fileName;

/**
 *  do upload
 */
function doUpload(req, res) {
    fileName = req.files.uploadFile.name;
    req.setEncoding("binary");
    var filePath = "./public/images/";
    var fileStream = null;
    var serverPath = filePath + req.files.uploadFile.name;
    var is = fs.createReadStream(req.files.uploadFile.path)
    var os = fs.createWriteStream(serverPath);

    util.pump(is, os, function(error) {
            fs.unlinkSync(req.files.uploadFile.path);
            if(error) {
                res.send(JSON.stringify({
                    error: 'Error occurred in File Upload'
                }));
                return;
            }
            upload_complete(req, res);
        }
    );


}


function upload_complete(req,res) {
    console.log("Request complete for upload and calling the dot net service for Parsing...................................");
    res.send("FILE UPLOAD COMPLETED ..................");
}





exports.doUpload=doUpload;