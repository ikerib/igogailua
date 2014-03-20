/**
 * Created by ikerib on 20/03/14.
 */

var uploadHelper = require('./uploadHelper');

exports.igo = function(req, res){
    res.render('igo');
};

exports.doUpload = function(req,res){
    uploadHelper.doUpload(req,res);
};