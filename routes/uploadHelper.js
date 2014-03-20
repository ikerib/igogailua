var fs = require("fs");
var util = require('util');

var fileName;

function doUpload(req, res) {

    for (index = 0; index < req.files.uploadFile.length; ++index) {


        fileName = req.files.uploadFile[index].name;
        req.setEncoding("binary");
        var filePath = "./public/images/";
        var fileStream = null;
        var serverPath = filePath + req.files.uploadFile[index].name;
        var is = fs.createReadStream(req.files.uploadFile[index].path)
        var os = fs.createWriteStream(serverPath);

        util.pump(is, os, function(error) {
                fs.unlinkSync(req.files.uploadFile[index].path);
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
}

function burutuigoera(ori, des) {

}


function upload_complete(req,res) {
    res.send("Fitxategia zuzen igo da ..................");
}

exports.doUpload=doUpload;