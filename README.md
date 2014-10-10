# [gulp](http://gulpjs.com)-varnish-bust

> Gulp task for busting Varnish cache after deploy



## Install

```sh
$ npm install --save gulp-varnish-bust
```


## Usage

```js
var gulp = require('gulp');
var bust = require('gulp-varnish-bust');

gulp.task('default', function () {
	return gulp.src('template.php')
		.pipe(gulp.dest('dist'))
		.pipe(bust());
});
```


## API

### options

#### options.host

Type: `string`  
Default: `localhost`

#### options.port

Type: `number`  
Default: `80`


## License

MIT © Vyacheslav Shebanov
