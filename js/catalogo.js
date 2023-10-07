//Este JS consume la API de cotizaciones del dólar y convierte el precio de cada artículo del catálogo.

//Obtención de la cotización
fetch('https://dolarapi.com/v1/dolares')
    .then(response=>{
        //En este primer bloque se obtiene la respuesta de la API y se devuelve para ser procesado en el segundo bloque .then
        if (response.ok){
            return response.json()
        }
    })
    .then(data=>{
        //La API devuelve un array de JSONs, uno por cada tipo de dólar.
        let cot = 0
        for (let cotizacion of data){
            console.log(cotizacion)
            if (cotizacion.casa == 'blue'){
                cot = cotizacion.venta
            }
        }

        //Obtengo los productos del catálogo para mostrar el importe en dólares
        let productos = document.querySelectorAll('.producto')
        for (prod of productos){
            let precio = parseFloat(prod.querySelector('p').textContent.replace('$','')) //El precio está con el signo $
            precio_dolares = (precio / cot).toPrecision(3)
            
            //Se crea el elemento para el precio en dólares
            p_precio_dolar = document.createElement('p')
            p_precio_dolar.textContent = 'U$S' + precio_dolares
            p_precio_dolar.style = 'color: #DD929C'

            prod.appendChild(p_precio_dolar)

            // console.log(precio_dolares.toPrecision(3))
        }
    })