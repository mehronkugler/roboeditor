var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('js', function(){
    return gulp.src([
      "game/vocabularies.js",
      "game/generatestorycontent.js",
      "game/roboeditor.js"
    ])
    .pipe(concat('robobundle.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('dist'));
});
