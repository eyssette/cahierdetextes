// Source : https://github.com/evan361425/evan361425.github.io/blob/acba613d2071c34075c6f1a3bff4d781dea49b71/pagetoc.js
// Referrer: https://github.com/JorelAli/mdBook-pagetoc/blob/master/sidebar.js
// Populate sidebar on load
function pairwise(arr, func){
    for(var i=0; i < arr.length - 1; i++){
        func(arr[i], arr[i + 1])
    }
}

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
		pagetocLink.href = '#' + header.id;
		pagetocLink.setAttribute("data-referrer", header.id);
		pagetoc.appendChild(pagetocLink);
	});


	// https://codepen.io/malsu/pen/VwKzoPG
	// Add an event listener listening for scroll
	window.addEventListener(
		"scroll",
		function () {


			// Get current scroll position
			let scrollY = window.pageYOffset;


			pairwise(headers, function(current, next){
				console.log(current, next)
			})
			

			// Now we loop through headers to get height, top and ID values for each
			// headers.forEach(current => {
			//	const sectionTop = current.offsetTop-10;
			//	sectionId = current.getAttribute("id");

				/*
				- If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
				- To know which link needs an active class, we use sectionId variable we are getting while looping through headers as an selector
				*/
			/* 	if (
					scrollY > sectionTop &&
					scrollY <= sectionTop + sectionHeight
				) {
					document.querySelector("nav a[href*=" + sectionId + "]").classList.add("active");
				} else {
					document.querySelector("nav a[href*=" + sectionId + "]").classList.remove("active");
				}
			}); */

			
		});

});