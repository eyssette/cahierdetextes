// Source : https://github.com/evan361425/evan361425.github.io/blob/acba613d2071c34075c6f1a3bff4d781dea49b71/pagetoc.js
// Referrer: https://github.com/JorelAli/mdBook-pagetoc/blob/master/sidebar.js
// Populate sidebar on load

window.addEventListener("load", function () {
	var pagetoc = document.getElementsByClassName("pagetoc")[0];
	var headers = document.querySelectorAll("h1, h2, h3, h4");
	if (headers.length < 2) {
		return pagetoc.remove();
	}
	Array.prototype.forEach.call(headers, function (header) {
		var pagetocLink = document.createElement("a");
		var tagName = header.tagName.toLowerCase();
		if (header.id == '') return;
		pagetocLink.appendChild(document.createTextNode(header.textContent));
		pagetocLink.classList.add(tagName);
		pagetocLink.href = '#' + header.id;
		pagetocLink.setAttribute("data-referrer", header.id);
		pagetoc.appendChild(pagetocLink);
	});
	// https://codepen.io/malsu/pen/VwKzoPG
	window.addEventListener(
		"scroll",
		function () {
			let scrollY = window.pageYOffset;
			var hit = false;
			for (var i = 0; i < headers.length - 1; i++) {
				const sectionTop = headers[i].offsetTop - 10;
				var sectionBottom;
				if (i < headers.length - 2) {
					sectionBottom = headers[i + 1].offsetTop - 10;
				} else {
					sectionBottom = document.body.scrollHeight;
				}
				sectionId = headers[i].id;
				if (sectionId != '') {
					if (
						scrollY > sectionTop &&
						scrollY <= sectionBottom && 
						hit == false
					) {
						document.querySelector("a[href*=" + sectionId + "]").classList.add("active");
						hit = true;
					} else {
						document.querySelector("a[href*=" + sectionId + "]").classList.remove("active");
					}
				}
			}
			hit = false
		});

});