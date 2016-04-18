var config = require('../config');
var util = function () {
	function zeroFill(data, minimumSize) {
		if (data) {
			data = data.toString();
			minimumSize = minimumSize || 2;
			while (data.length < minimumSize) {
				data = '0' + data.toString();
			}
		}
		return data;
	}

	var parsePosts = function (postData) {
		//console.log(postData._paging);
		var createLink = function (post) {
			if (post && post.date && post.slug) {
				var postDate = new Date(post.date);
				return "" +
					(config.basePath || '/').toString() +
					postDate.getFullYear().toString() + "/" +
						// add one to month because we are expecting months starting from 1 instead of 0 (javascript default)
					zeroFill(postDate.getMonth() + 1, 2).toString() + "/" +
					zeroFill(postDate.getDate(), 2).toString() + "/" +
					post.slug;
			}

		};
		if (postData && postData.length > 0) {
			for (var i = 0; i < postData.length; i++) {
				postData[i].link = createLink(postData[i]);
			}
		}
		return postData;
	};
	var buildTitle = function (segment) {
		return segment;
	};


	return {
		parsePosts: parsePosts,
		buildTitle: buildTitle
	}
};
module.exports = new util();