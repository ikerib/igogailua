var fs = require("fs");
var util = require('util');

var fileName;

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
                    error: 'Arazoa egon da fitxategia igotzerakoan.'
                }));
                return;
            }
            upload_complete(req, res);
        }
    );
}

function upload_complete(req,res) {
    res.send("Fitxategia zuzen igo da ..................");
}

exports.doUpload=doUpload;