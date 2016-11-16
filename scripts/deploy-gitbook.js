var url = require('../package.json').repository.url;

var ghpages = require('gh-pages');

ghpages.publish('./gh-pages', { 
    repo: url, 
    logger: function(m) {
        console.log(m); 
        
    } 
});
