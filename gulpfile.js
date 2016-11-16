//GULP

var gulp  = require('gulp');
var shell = require('gulp-shell');
 

gulp.task('build',shell.task([
  'npm run generate-gitbook'
]));

gulp.task('default', function(){
    gulp.watch(['txt/*.md', 'scripts/**',  'book.json'], ['build']); 
});

gulp.task('deploy-heroku',['build'],function(){
  var heroku = require ("gitbook-start-plugin-heroku-ericlucastania");
  heroku.deploy();
});//finish deploy-heroku