// Source : https://github.com/evan361425/evan361425.github.io/blob/acba613d2071c34075c6f1a3bff4d781dea49b71/pagetoc.js
// Referrer: https://github.com/JorelAli/mdBook-pagetoc/blob/master/sidebar.js
// Populate sidebar on load
window.addEventListener("load", function () {
	var pagetoc = document.getElementsByClassName("pagetoc")[0];
	var headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

	if (headers.length < 2) {
		return pagetoc.remove();
	}

	Array.prototype.forEach.call(headers, function (header) {
		var pagetocLink = document.createElement("a");
		var tagName = header.tagName.toLowerCase();
		// no need h1, h5~h6
		if (!["h1", "h2", "h3", "h4"].includes(tagName) || header.id == '') return;

		pagetocLink.appendChild(document.createTextNode(header.textContent));
		pagetocLink.classList.add(tagName);
		pagetocLink.href = '#'+header.id;
		pagetocLink.setAttribute("data-referrer", header.id);
		pagetoc.appendChild(pagetocLink);
	});

	// Active pagetoc element on scroll
	window.addEventListener(
		"scroll",
		function () {
			var pagetoc = document.getElementsByClassName("pagetoc")[0];
			var activeLink = pagetoc.getAttribute("data-active-link");

			// find use position and get activeEl
			var headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
			var lastHeader;
			for (var header of headers) {
				if (window.pageYOffset >= header.offsetTop) {
					lastHeader = header;
				} else {
					break;
				}
			}
			// if same, no need do anything
			if (activeLink == lastHeader.id) {
				return;
			}
			activeLink = lastHeader.id;
			pagetoc.setAttribute("data-active-link", activeLink);

			// Set pagetoc active element
			Array.prototype.forEach.call(pagetoc.children, function (pagetocLink) {
				if (activeLink == pagetocLink.getAttribute("data-referrer")) {
					pagetocLink.classList.add("active");
				} else {
					pagetocLink.classList.remove("active");
				}
			});
		},
		false
	);
});