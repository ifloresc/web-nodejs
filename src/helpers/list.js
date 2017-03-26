function list(elementos, options) {
	if (!elementos) {
		return '';
	}

	var ans = '<ul>';

	elementos.forEach(function(elemento) {
		ans += '<li>' + options.fn(elemento) + '</li>';
	});

	ans += '</ul>';

	return ans;
}

module.expots = list;