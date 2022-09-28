//funcion que oculta la tabla si no has buscado nada
function Secreto() {
	const searchText2 = document.getElementById("searchTerm").value.toLowerCase();
	if (searchText2 !== "") {
		//let parrafo = document.querySelector('p');
		//parrafo.textContent = "Se encontraron estas coincidencias a la busqueda de : "+searchText2 ;
		const tableReg = document.getElementById("datos");
		tableReg.style.display = "";
	} else {
		const tableReg = document.getElementById("datos");
		tableReg.style.display = "none";
	}
}
//funcion que quita los acentos
function getCleanedString(cadena) {
	// Definimos los caracteres que queremos eliminar
	var specialChars = "!@#$^&%*()+=-_[]/{}|:<>¿?,.";

	// Los eliminamos todos
	for (var i = 0; i < specialChars.length; i++) {
		cadena = cadena.replace(new RegExp("\\" + specialChars[i], "gi"), "");
	}
	// Quitamos acentos y "ñ". Fijate en que va sin comillas el primer parametro
	cadena = cadena.replace(/á/gi, "a");
	cadena = cadena.replace(/é/gi, "e");
	cadena = cadena.replace(/í/gi, "i");
	cadena = cadena.replace(/ó/gi, "o");
	cadena = cadena.replace(/ú/gi, "u");
	return cadena;
}
//funcion que realiza la busqueda en toda la tabla que se llame "datos"
function doSearch() {
	const tableReg = document.getElementById("datos");
	const searchText = getCleanedString(
		document.getElementById("searchTerm").value.toLowerCase()
	);
	let total = 0;
	// Recorremos todas las filas con contenido de la tabla
	for (let i = 1; i < tableReg.rows.length; i++) {
		// Si el td tiene la clase "noSearch" no se busca en su cntenido
		if (tableReg.rows[i].classList.contains("noSearch")) {
			continue;
		}
		let found = false;
		const cellsOfRow = tableReg.rows[i].getElementsByTagName("td");
		// Recorremos todas las celdas
		for (let j = 0; j < cellsOfRow.length && !found; j++) {
			const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
			// Buscamos el texto en el contenido de la celda
			if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
				found = true;
				total++;
			}
		}
		if (found) {
			tableReg.rows[i].style.display = "";
			busqueda = document.querySelector("section");
			busqueda.classList.add("hide");

		} else {
			// si no ha encontrado ninguna coincidencia, esconde la fila de la tabla
			tableReg.rows[i].style.display = "none";
		}
	}
	if (total == 0) {
		alert("No se encontro coincidencias");
	}
	// mostramos las coincidencias
	const lastTR = tableReg.rows[tableReg.rows.length - 1];
	lastTR.classList.remove("hide");
	let parrafo = document.querySelector("p");
	if (searchText == "") {
		parrafo.textContent = "Ingresa una palabra o codigo para buscar";
		//lastTR.classList.add("hide");
	} else if (total) {
		tableReg.classList.remove("hide");
		ENCONTRAR = "Se " + (total > 1 ? "encontraron " : "encontro ");
		COINCIDENCA = " coincidencia" + (total > 1 ? "s" : "");
		parrafo.textContent =
			ENCONTRAR + total + COINCIDENCA + " a la busqueda de " + searchText;
	} else {
		parrafo.textContent = "No se han encontrado coincidencias";
		tableReg.classList.add("hide");
		lastTR.classList.add("hide");
	}
}