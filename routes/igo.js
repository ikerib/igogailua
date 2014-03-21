/**
 * Created by ikerib on 20/03/14.
 * Inspired on : https://github.com/commadelimited/JSDownloader/blob/master/routes/download.js
 */
var fs = require('fs');
var archiver = require('archiver');

exports.igo = function (req, res) {
    res.render('igo');
};

exports.doUpload = function (req, res, next) {

    var fs = require('fs');



    // path tenporala
    var tmp_path = req.files.file.path;
    // path nora bidali nahi dugun
    var target_path = './public/uploads/tmp/' + req.files.file.name;
    // fitxategia mugitu
    fs.rename(tmp_path, target_path, function (err) {
        if (err) throw err;
        // ezabatu fitxategi tenporala
        fs.unlink(tmp_path, function () {
            if (err) throw err;
            //res.send('Fitxategia: ' + target_path + ' karpetara igoa izan da.');

            writeZip('./public/uploads/tmp/',"froga", function(res){
                if ( res === "OK") {
                    console.log("OK");
                    res.render('egina');
                } else {
                    console.log("KAKA!");
                }

            });

        });
    });




};


writeZip = function(dir,name) {

    var zipName = "./public/uploads/zip/" + name + ".cbz",
        fileArray = getDirectoryList(dir),
        output = fs.createWriteStream(zipName),
        archive = archiver('zip');

    archive.pipe(output);

    fileArray.forEach(function(item){
        var file = item.path + item.name;
        archive.append(fs.createReadStream(file), { name: item.name });
    });

    archive.finalize(function(err, written) {
        if (err) {
            throw err;
        }
        // do cleanup
        cleanUp(dir);
    });

    return "OK";

};

getDirectoryList = function(dir){
    var fileArray = [],
        files = fs.readdirSync(dir);
    files.forEach(function(file){
        var obj = {name: file, path: dir};
        fileArray.push(obj);
    });
    return fileArray;
};