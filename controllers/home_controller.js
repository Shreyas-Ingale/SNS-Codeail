//export a home controller for respose to a request in Router
module.exports.home = function(req, res){
    return res.render('home', {
        title: "Home"
    });
}
