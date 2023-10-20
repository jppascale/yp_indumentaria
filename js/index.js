(() => {


    // ---- Variables y funciones para el slider automatico.



    const sliders = [...document.querySelectorAll(".slider__body")];



    let position = 0;

    setInterval(() => {

        changePosition(1);

    }, 5000);

    function changePosition(change) {

        sliders[position].classList.remove("slider__body--show");
        position += change;
        if (position < 0) {
            position = sliders.length - 1;
        } else if (position >= sliders.length) {
            position = 0;
        }
        sliders[position].classList.add("slider__body--show")



    }

    //Variables y funciones para el show-room de productos recomendados.


    const elementos = document.querySelector(".carousel_productos");
    const productos = document.querySelectorAll(".productos");

    const flechaIzquierda = document.getElementById("flecha_izquierda");
    const flechaDerecha = document.getElementById("flecha_derecha");
    
    // agregando un listener para la flecha derecha.
    flechaDerecha.addEventListener("click", ()=>{
        tamaño = elementos.offsetWidth;
        elementos.scrollLeft += tamaño;

        const indicadorActivo = document.querySelector(".indicadores .activo");
        if(indicadorActivo.nextSibling){
            indicadorActivo.nextSibling.classList.add("activo");
            indicadorActivo.classList.remove("activo");
        }
        
    });

    // agregando un listener para la flecha izquierda.
    flechaIzquierda.addEventListener("click", ()=>{
        tamaño = elementos.offsetWidth;
        elementos.scrollLeft -= tamaño;

        const indicadorActivo = document.querySelector(".indicadores .activo");
        if(indicadorActivo.previousSibling){
            indicadorActivo.previousSibling.classList.add("activo");
            indicadorActivo.classList.remove("activo");
        }
        
    });

    // creando la paginacion.

    let numDePaginas = Math.ceil(productos.length / 5);
    for(let i = 0; i < numDePaginas; i++){
        let indicador = document.createElement("button");
        
        if(i === 0){

            indicador.classList.add("activo");
        
        }
        document.querySelector(".indicadores").appendChild(indicador);

        indicador.addEventListener("click", (e)=>{
            elementos.scrollLeft = i * elementos.offsetWidth;

            document.querySelector(".indicadores .activo").classList.remove("activo");

            e.target.classList.add("activo");
        });


    }


})();