
/*
 * GET home page.
 */
 //we render our index page and pass it an object with some meta data
 //our index router picks up our index.jade view and displays it
exports.index = function(req, res){
  res.render('index', { title: 'DACA Stats', subtitle: 'dashboard' });
};