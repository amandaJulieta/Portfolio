// Search

// Get parameter from URL
function getParameter(name) {

	const params = new URLSearchParams(window.location.search);
	return params.get(name);

}

// Search inside JSON file
async function search(query){

	if(!query) return;

	const response = await fetch("search-data.json");
	const data = await response.json();

	const pages = data.pages;

	const results = document.getElementById("results");

	results.innerHTML = "";

	query = query.toLowerCase();

	const found = pages.filter(p =>
		(p.title + p.keywords).toLowerCase().includes(query)
	);

	if (found.length === 0) {

		results.innerHTML = "<p>No se encontraron resultados</p>";
		return;

	}

	found.forEach(p => {

		const item = document.createElement("a");

		item.href = p.url;
		item.className = "list-group-item list-group-item-action";

		item.innerHTML = `
			<strong>${p.title}</strong>
			<br>
			<small>${p.url}</small>
		`;

		results.appendChild(item);

	});

}

// Initialize Search Engine
function initSearch(){

	const input = document.getElementById("searchInput");

	const q = getParameter("q");

	if(q){

		input.value = q;
		search(q);

	}

	input.addEventListener("input", function(){

		search(this.value);

	});

}