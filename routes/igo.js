/**
 * Created by ikerib on 20/03/14.
 */

exports.igo = function (req, res) {
    res.render('igo');
};

exports.doUpload = function (req, res, next) {
    var fs = require('fs');
    for (var i = 0; i < req.files.uploadFile.length; i++) {

        // path tenporala
        var tmp_path = req.files.uploadFile[i].path;
        // path nora bidali nahi dugun
        var target_path = './public/images/' + req.files.uploadFile[i].name;
        // fitxategia mugitu
        fs.rename(tmp_path, target_path, function (err) {
            if (err) throw err;
            // ezabatu fitxategi tenporala
            fs.unlink(tmp_path, function () {
                if (err) throw err;
                res.send('Fitxategia: ' + target_path + ' karpetara igoa izan da.');
            });
        });
    }
    res.render('egina');
};