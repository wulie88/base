
Util = function () {
}

// 格式化两位
Util.f2 = function (n) {
	n = n + ''
	if (n.length == 0) {
		n = '00'
	} else if (n.length == 1) {
		n = '0' + n
	}

	return n
}

/*
 * 解析
 * var data = Util.parseQuery(location.search)
 */
Util.parseQuery = function (queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        var k = decodeURIComponent(pair[0]), v = decodeURIComponent(pair[1] || '');
        if (k.length)
        	query[k] = v;
    }
    return query;
}

module.exports = Util