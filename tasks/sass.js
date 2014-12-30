'use strict';
var path = require('path');
var assign = require('object-assign');
var sass = require('node-sass');

module.exports = function (grunt) {
	grunt.registerMultiTask('sass', 'Compile Sass to CSS', function () {
		this.files.forEach(function (el) {
			var options = this.options({
				precision: 10
			});

			var src = el.src[0];

			if (!src || path.basename(src)[0] === '_') {
				return;
			}

			var result = sass.renderSync(assign({}, options, {
				file: src
			}));

			grunt.file.write(el.dest, result.css);
			grunt.verbose.writeln('File ' + el.dest.cyan + ' created.');

			if (options.sourceMap) {
				var pth = options.sourceMap === true ? (el.dest + '.map') : path.relative(process.cwd(), result.map);
				grunt.log.writeln('File ' + pth.cyan + ' created.');
			}
		}, this);
	});
};

