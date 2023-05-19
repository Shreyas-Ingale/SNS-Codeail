//export a home controller for respose to a request in Router
module.exports.home = function(req, res){
    return res.end('<h1>Express is Running for Codeial !</h1>');
}

module.exports.profile = function(req, res){
    return res.end('<h1>This is Profiles Page !</h1>');
}