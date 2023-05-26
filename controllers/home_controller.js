//export a home controller for respose to a request in Router
module.exports.home = function(req, res){
    console.log(req.cookies);
    res.cookie('crocodile_id', 20);
    return res.render('home', {
        title: "Home"
    });
}
