# [gulp](http://gulpjs.com)-varnish-bust

> Gulp task for busting Varnish cache after deploy



## Install

```sh
$ npm install --save gulp-varnish-bust
```


## Usage

At first you need to properly configure Varnish to be able to ban cache. Below is only parts of the config you should add for banning. Config is specific for 4.\* versions and does not work for 3.\* versions.
More details [here](https://www.varnish-software.com/static/book/Cache_invalidation.html).

```vcl
acl banners {
    "127.0.0.1";
    "localhost";
}
sub vcl_recv {
	if (req.method == "BAN") {
		if(!client.ip ~ banners) {
			return (synth(405, "This IP is not allowed to send BAN requests."));
		}
		ban("obj.http.x-url ~ " + req.http.x-ban-url);
       		return (synth(201, "Banned successfully! " + req.http.x-ban-url));
       	}
}

sub vcl_backend_response {
        set beresp.http.x-url = bereq.url;
}
```

Now, just add gulp-varnish-bust to the end of your chain.

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
