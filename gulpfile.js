var gulp = require("gulp");
var ts = require("gulp-typescript");
var htmlmin = require('gulp-htmlmin');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var tsSettings = require('./tsconfig.json')

//Output directory
var output = './MCalc-compiled';         

//Directory for development              
var input = './MCalc-develop';    

//Compile js (typescript -> es6 -> babel -> minifed)
gulp.task("typescript", function () {       
    var tsProject = ts.createProject("./tsconfig.json");
    return gulp.src([`${input}/libs/**/*.ts`, `!${output}/**`], {base: input})
        .pipe(ts(tsProject))
        .pipe(uglify())                         //Comment out for debug
        .pipe(gulp.dest(output));
});

gulp.task('html', function() {                  
  return gulp.src([`${input}/**/*.html`, '!./node_modules/**', `!${output}/**`], {base: input})
    .pipe(htmlmin(
        {
            collapseWhitespace: true,
            minifyJS: true
        }
    ))  //Comment out for debug
    .pipe(gulp.dest(output))
});

//Compile sass to css
gulp.task('sass', function () {                 
  return gulp.src([`${input}/styles/**/*.scss`, `!${output}/**`], {base: input})
    .pipe(sass())
    .pipe(minifyCss())                          //Comment out for debug
    .pipe(gulp.dest(output));
});

//Copy non-compiled files to output directory
gulp.task('built', function () {                
    return gulp.src([`${input}/**/*.*`, `!${input}/package.json`, `!${input}/tsd.json`,`!${input}/{typings,typings/**}`,`!${input}/**/*.html`, `!${input}/styles/**/*.scss`, `!${input}/libs/**/*.ts`], {base: input})
     .pipe(gulp.dest(output))
});

//Copy non-compiled files to output directory and compile project
gulp.task('compile', ['built','typescript', 'html', 'sass']);

//Autocompile for live development
gulp.task('autocompile', function() {
    gulp.watch([`${input}/libs/**/*.ts`, `!${output}/**`], ['typescript']);
    gulp.watch([`${input}/styles/**/*.scss`, `!${output}/**`], ['sass']);
    gulp.watch([`${input}/**/*.html`, `!${input}/node_modules/**`, `!${output}/**`], ['html']);
});