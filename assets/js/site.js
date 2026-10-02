(function () {
	var body = document.body;
	var sidebar = document.getElementById('sidebar');
	var toggle = document.querySelector('.nav-toggle');
	if (!sidebar) return;

	var path = window.location.pathname.replace(/\/index\.html$/, '/');
	var section = 'home';
	if (/^\/research\//.test(path)) section = 'research';
	else if (/^\/comphoto\//.test(path)) section = 'comphoto';
	else if (/^\/publications\.html$/.test(path)) section = 'publications';
	else if (/^\/presentations\.html$/.test(path)) section = 'presentations';
	else if (/^\/awards\.html$/.test(path)) section = 'awards';

	var links = sidebar.querySelectorAll('a[data-nav]');
	for (var i = 0; i < links.length; i++) {
		if (links[i].getAttribute('data-nav') === section) {
			links[i].classList.add('is-active');
			links[i].setAttribute('aria-current', 'page');
		}
	}

	function setOpen(open) {
		body.classList.toggle('nav-open', open);
		if (toggle) toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
	}

	if (toggle) {
		toggle.addEventListener('click', function (e) {
			e.stopPropagation();
			setOpen(!body.classList.contains('nav-open'));
		});
	}

	sidebar.addEventListener('click', function (e) {
		if (e.target.closest('a')) setOpen(false);
	});

	document.addEventListener('click', function (e) {
		if (body.classList.contains('nav-open') && !sidebar.contains(e.target)) setOpen(false);
	});

	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') setOpen(false);
	});
})();
