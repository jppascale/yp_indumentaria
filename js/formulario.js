const formulario = document.querySelector('formulario')
const buttonMailto = document.querySelector('sendmail')

formulario.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
    event.preventDefault()
    const formulario = new FormData(this)
    buttonMailto.setAttribute('href', 'mailto:carina.p.garcia@gmail.com?subject=nombre ${formulario.get('nombre')} correo ${formulario.get('mail')}&body=${(formulario.get('mensaje')}')
    buttonMailto.click()

};