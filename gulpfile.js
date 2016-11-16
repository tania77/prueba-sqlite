var gulp = require('gulp');
var shell = require('gulp-shell');
 
 
var paths = {
  
   scripts: [
     './scripts.js/**'
   ],
   
   
   html: [
   './gh-pages/index.html'
   ],
   
   book: [
   './txt/*.md'
   ],
   
   bookjson: [
   './book.json'
   ]
   
};

gulp.task('deploy',shell.task([
  'npm run deploy'
]));


gulp.task('build',shell.task([
  'npm run build'
]));


gulp.task('all',shell.task([
  './scripts/losh generate-gitbook && generate-wiki && deploy-gitbook && deploy-wiki'
]));


gulp.task('inst',shell.task([
  'gitbook install'
]));

gulp.task('watch', function(){
   gulp.watch(paths.book,['deploy']);
   gulp.watch(paths.bookjson,['inst']);
  
});
