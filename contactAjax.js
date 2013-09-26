/*!
 * contacto ajax
 * developed by (c) Moisés Cermeño
 * release date: julio 14, 2013
 * email: mo.frc08@gmail.com, FB: ferblacklion :D
 */
;(function ($) {
	$.fn.contactForm = function(objCustomSettings){
		// ================================ [ comprobar si hay algun formulario seleccionado ] ================================ //
		if (!this.length) {
			log('FormContact: El proceso fue omitido - ningún elemento seleccionado!');
			return this;
		}

		// ================================ [ parametros de configuracion ] ================================ //
		var objGlobalSettings=$.extend({
			lang: 'es', // idioma por default es español
			msgOk_es: 'Mensaje Enviado',
			msgOk_en: 'Message Sent',
			msgFail_es: 'No se pudo enviar',
			msgFail_en: 'Could Not Send',
			msgInputVacio_es: 'Dato incorrecto',
			msgInputVacio_en: 'Incorrect Data',
			msgNoNumber_es: '¡Introduce un numero válido!',
			msgNoNumber_en: '¡Enter a valid number!',
			msgNoMail_es: '¡Introduce un email válido!',
			msgNoMail_en: '¡Enter a valid email address!',
			bordeError: 'solid 2px red',
			colorMensajeEnviado: '#0080C0', // color fuente del mensaje enviado
			colorInputError: '#000000', // color fuente del input al introduccir algun dato
			fontSize: '18px', // tamaño de fuente del mensaje enviado
			colorFuenteError: '#ddd',
			urlAjax: 'formContact.php' // archivo php que recibe los datos por POST
		},objCustomSettings);

		return this.each(function() {
			var $this = $(this); // obj form
			$this.on('submit', function(evento) { // Al presionar el botón submit
				evento.preventDefault();
				var error = false;
				if ( $('#resultForm').length > 0 ) { $('#resultForm').html(''); } // eliminar el contenido del div de respuesta si ya fue utilizado el evento
				$this.find('input:text, textarea').each(function(){ // eliminar espacios
					$(this).val($.trim($(this).val()));
				});
				/**
				 * comprobación de los datos de los fields, que no
				 * intruduscan menor a tres
				 */
				$this.find('input:text, textarea').each(function(){
					if ( $(this).val().length < 3 ) {
						error = true;
						$(this).css({
							'outline': objGlobalSettings.bordeError,
							'color': objGlobalSettings.colorFuenteError
						});
						$(this).val( objGlobalSettings.lang === 'es' ? objGlobalSettings.msgInputVacio_es : objGlobalSettings.msgInputVacio_en );
						$(this).data('string','vacio');
					}
					/**
					 * validación de correos con la clase
					 * @class  mail
					 * input_mail
					 */
					if ( $(this).hasClass('input_mail') ) {
						var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
						if( !emailReg.test( $(this).val() ) ) {
							error = true;
							$(this).css({
								'outline': objGlobalSettings.bordeError,
								'color': objGlobalSettings.colorFuenteError
							});
							$(this).val( objGlobalSettings.lang === 'es' ? objGlobalSettings.msgNoMail_es : objGlobalSettings.msgNoMail_en );
							$(this).data('string','vacio');
						}
						/**
						 * validacion de numeros con la clase telefono
						 * @class telefono
						 *  input_telefono
						 */
					} else if( $(this).hasClass('input_telefono') ) {
						if ( isNaN($($(this)).val()) ) {
							error = true;
							$(this).css({
								'outline': objGlobalSettings.bordeError,
								'color': objGlobalSettings.colorFuenteError
							});
							$(this).val( objGlobalSettings.lang === 'es' ? objGlobalSettings.msgNoNumber_es : objGlobalSettings.msgNoNumber_en );
							$(this).data('string','vacio');
						}
					}
					/**
					 * al primer click colocar el estilo por default
					 * y eliminar el mensaje error (placeholder)
					 */
					if ( $(this).data('string') === 'vacio' ) {
						$(this).on('focus', function() {
							$(this).val(' ');
							$(this).css({
								'outline': 0,
								'color': objGlobalSettings.colorInputError
							});
							$(this).removeData('string');
						});
					}
					if ( $(this).data('string') ) { // si existe algun field con el atributo data string definimos error verdadero
						error = true;
					}
				});
				/**
				 * si no hay ningun error enviar datos por ajax y si javascript esta desactivado
				 * enviarlos al archivo php
				 */
				if (!error){
					var cadena = $this.serialize(); // cadena a enviar
					$.ajax({
						url: objGlobalSettings.urlAjax,
						type: 'POST',
						dataType: 'json',
						data: cadena,
						beforeSend: function() {
							var result = $('<div />',{
								id: 'resultForm',
								css : {
									width: '100%',
									height: '32px',
									margin: '5px 3px',
									textAlign: 'center',
									color: objGlobalSettings.colorMensajeEnviado,
									fontSize: objGlobalSettings.fontSize,
									fontWeight: 'bold'
								},
								html : '<img src="js/AjaxLoader.gif" width="32" height="32" alt="Loading" />'
							});
							/**
							 * verificamos si ya existe el div del resultado solo actualizamos
							 * de lo contrario lo creamos desde cero
							 */
							if ( $('#resultForm').length > 0 ) {
								$('#resultForm').html('<img src="js/AjaxLoader.gif" width="32" height="32" />');
							} else{
								$this.append(result);
							}
						},
						success: function(resp) {
							if (!resp.fail) { // ========== respuesta @array fail boleano ==========
								$('#resultForm').html( objGlobalSettings.lang === 'es' ? objGlobalSettings.msgOk_es : objGlobalSettings.msgOk_en );
								// resetear los fields del formulario
								$this[0].reset();
							} else {
								$('#resultForm').html( objGlobalSettings.lang === 'es' ? objGlobalSettings.msgFail_es : objGlobalSettings.msgFail_en );
							}
						},
						error: function(textStatus) {
							if( $('#resultForm').length > 0 ){
								$('#resultForm').html(textStatus);
							} else {
								$this.append(textStatus);
							}
						}
					});
				}
			});
		});
	};
})(jQuery);