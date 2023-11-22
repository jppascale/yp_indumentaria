let head_html = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YP Indumentaria</title>
    <link rel="shortcut icon" href="./img/Logo-150.png" type="image/x-icon">
    <link rel="stylesheet" href="./css/estilos.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Questrial&family=Qwitcher+Grypen&family=Ysabeau+Office:wght@100&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
`

let header_html = `
    <img src="./img/Logo-150.png" alt="Logo YP Indumentaria">
    <p id="cartel-luminoso">Girls Place</p>

    <nav class="menu">
        <a href="./index.html">Inicio</a>
        <a href="./Nosotras.html">Nosotras</a>
        <a href="./catalogo.html">Catálogo</a>
    </nav>
`

let footer_html = `
    <div class="footer__container">
        
    <div class="footer__left">
        <div class="redes">
            <ul>
                <li>
                    <a href="https://www.facebook.com/106322865122413/posts/177981204623245/?locale=ms_MY"
                        target="_blank"><img src="./img/svg-icons/facebook.svg" alt="facebook"></a>
                </li>
                <li>
                    <a href="https://www.instagram.com/yp_indumentaria/" target="_blank"><img
                            src="./img/svg-icons/instagram.svg" alt="instagram"></a>
                </li>
                <li>
                    <a href="http://wa.me/5493487207730" target="_blank"><img src="./img/svg-icons/whatsapp.svg"
                            alt="whatsapp"></a>
                </li>
            </ul>
        </div>
    </div>
    <div class="footer__right">

        <a class="links_footer" href="./Contacto.html">Contacto <img src="./img/contact_icon.png" alt="Ícono contacto"></a>
        <a class="links_footer" href="./preguntas.html">Preguntas frecuentes <img src="./img/help_icon.png"
                alt="Ícono preguntas frecuentes"></a>
        <a class="links_footer" href="">Legales <img src="./img/legal_icon.png" alt="Ícono legales"></a>
    </div>
    </div>
`

let head = document.querySelector('head')
head.innerHTML = head_html

let header = document.querySelector('.header')
header.innerHTML = header_html

let footer = document.querySelector('.footer')
footer.innerHTML = footer_html