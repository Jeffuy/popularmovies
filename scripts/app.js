let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click", ()=> {
	if(pagina < 1000) {
		pagina += 1
		cargarPeliculas()
	}
})

btnAnterior.addEventListener("click", ()=> {
	if(pagina > 1) {
		pagina -= 1
		cargarPeliculas()
	}
})

const cargarPeliculas = async() => {

	try {
	const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=3bbd336486522714cd55a4b9fbd9bb12&language=es-MX&page=${pagina}`);

	console.log(respuesta);

	if(respuesta.status === 200){
		const datos = await respuesta.json();

		let peliculas = "";

		datos.results.forEach(pelicula => {
			peliculas += `
			<div class="pelicula">
				<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"</img>
				<h3 class="titulo">${pelicula.title}</h3>
			</div>`
		});

		document.getElementById("contenedor").innerHTML = peliculas;



	} else if (respuesta.status === 401) {
		console.log("Error 401")
	} else if(respuesta.status === 404) {
		console.log("La película no existe")
	} else {
		console.log("Error imprevisto")
	}

	} catch(error) {
		console.log(error);
	}
}

cargarPeliculas()