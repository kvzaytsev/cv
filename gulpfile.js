const gulp = require('gulp');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');

const mixins = require('postcss-mixins');
const partialImport = require('postcss-partial-import');
const advancedVariables = require('postcss-advanced-variables');

const contentModel = {
    person: {
        name: 'Kirill Zaytsev',
        jobTitle: 'JavaScript Developer',
        email: 'kirill.v.zaytsev@gmail.com',
        phone: '+7 906 241 24 16'
    },
    overview: {
        items: [
            '4 years of software engineering work experience as a developer',
            'Development experience in JavaScript, Java',
            'Excellent analytical and communications skills'
        ]
    },
    skills: {
        languages: {
            title: 'Programming Languages and Platforms',
            items: [
                {
                    name: 'JavaScript',
                    exp: 3,
                    last: 'Currently'
                },
                {
                    name: 'Java',
                    exp: 2,
                    last: '2015'
                },
                {
                    name: 'PHP',
                    exp: 2,
                    last: '2014'
                },
                {
                    name: 'HTML5, CSS3, JSON, SVG, XML',
                    exp: 3,
                    last: 'Currently'
                }
            ]
        },
        frameworks: {
            title: 'Frameworks and Technologies',
            items: [
                {
                    name: 'React + Redux',
                    exp: 0.5,
                    last: 'Currently',
                    isProd: true
                },
                {
                    name: 'jQuery',
                    exp: 3,
                    last: 'Currently',
                    isProd: true
                },
                {
                    name: 'jQuery-UI',
                    exp: 1,
                    last: 'Currently',
                    isProd: true
                }
            ]
        }

    }
};

gulp.task('styles', () => gulp
    .src('postcss/index.css')
    .pipe(plumber())
    .pipe(postcss([
        partialImport(),
        advancedVariables(),
        mixins()
    ]))
    .pipe(gulp.dest('./'))
);

gulp.task('html', () => gulp
    .src('templates/index.ejs')
    .pipe(plumber())
    .pipe(ejs(contentModel))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'))
);


gulp.task('build', gulp.series('styles', 'html'));

gulp.watch('postcss/**/*.css', gulp.series('styles'));
gulp.watch('templates/**/*.ejs', gulp.series('html'));
