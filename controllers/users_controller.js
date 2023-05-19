module.exports.profile = function(req, res){
    return res.render('users', {
        title: "Profile"
    });
}

module.exports.posts = function(req, res){
    return res.render('users', {
        title: "Posts"
    });
}