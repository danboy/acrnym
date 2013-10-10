
/*
 * GET home page.
 */

module.exports = {
  index: function(req, res){
    console.log( req.user )
    res.render('index', { title: 'acrnym' });
  }
};
