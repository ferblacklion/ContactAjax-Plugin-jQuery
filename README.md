ContactAjax-Plugin-jQuery
=========================

Plugin sencillo que envia todos los campos de un formulario utilizando Ajax a cualquier archivo PHP por medio de POST y desde alli manipularlo a nuestro gusto.

lang: 'es', // idioma por default es español

Uso
========================================

default
$(target).contactForm();

Option
$(target).contactForm({
			urlAjax: '../formContact.php',
			msgNoNumber_es: 'Número no valido',
			msgNoMail_es: 'Correo no valido',
			bordeError: 'solid 1px #7D6E62'
});


Enviar formularios
