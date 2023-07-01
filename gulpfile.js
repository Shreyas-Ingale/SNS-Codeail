const gulp = require('gulp'); //import gulp to handle tasks like sasstocss conversion,etc
const sass = require('gulp-sass')(require('sass'));// sassto css
const cleanCSS = require('gulp-clean-css');// make css file size small by concatenating it in 1 line
const rev = require('gulp-rev');//rename files so that they replace the ones stored in cache and not get ignored
const uglify = require('gulp-uglify-es').default; // use to minify js files
const imagemin = require('gulp-imagemin'); // use to minify images
const del = require('del'); // use to delete files and directories

gulp.task('css', (done) => {
    console.log('Minifying CSS');
    gulp.src('./assets/scss/**/*.scss') // all scss files 
        .pipe(sass())//convert to css
        .pipe(cleanCSS())//minify it
        .pipe(gulp.dest('./assets.css'));//dest for css
    console.log('Minified CSS');
    gulp.src('./assets/**/*.css') //all css files
        .pipe(rev())// rename them to make them cache proof
        .pipe(gulp.dest('./public/assets')) // dest for renamed files
        // create a { og_name: rev_name } file called manifest like package.json so that whenever 
        // ejs files access og_name it will return rev_name
        .pipe(rev.manifest({
            cwd: 'public', // current working directory
            merge: true //is one exists merge it with this
        }))
        .pipe(gulp.dest('./public/assets')); // dest for manifest
    done();
});

gulp.task('js', function (done) {
    console.log('minifying js...');
    gulp.src('./assets/**/*.js') // all js files
        .pipe(uglify()) // minify
        .pipe(rev()) // rev it
        .pipe(gulp.dest('./public/assets')) // dest for js
        .pipe(rev.manifest({ // rev manifest
            cwd: 'public',
            merge: true// merge with css
        }))
        .pipe(gulp.dest('./public/assets')); // dest for new manifest
    done()
});

gulp.task('images', function (done) {
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)') // all types of imgs
        .pipe(imagemin()) // minify
        .pipe(rev()) //rev them
        .pipe(gulp.dest('./public/assets')) //dest for imgs
        .pipe(rev.manifest({ // rev manifest
            cwd: 'public',
            merge: true //merge with css,js one
        }))
        .pipe(gulp.dest('./public/assets'));
    done();
});

// empty the public/assets directory
gulp.task('clean:assets', function (done) {
    del.sync(['./public/assets'], { force:true });
    done();
});

// one single task to do all the abpove tasks in one cli command "gulp build"
gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function (done) {
    console.log('Building assets');
    done();
});