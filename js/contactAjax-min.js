/*!
 * contacto ajax
 * developed by (c) Moisés Cermeño
 * release date: julio 14, 2013
 * email: mo.frc08@gmail.com, FB: ferblacklion
 */
(function(a){a.fn.contactForm=function(c){if(!this.length){log("FormContact: El proceso fue omitido - ningún elemento seleccionado!");return this}var b=a.extend({lang:"es",msgOk_es:"Mensaje Enviado",msgOk_en:"Message Sent",msgFail_es:"No se pudo enviar",msgFail_en:"Could Not Send",msgInputVacio_es:"Dato incorrecto",msgInputVacio_en:"Incorrect Data",msgNoNumber_es:"¡Introduce un numero válido!",msgNoNumber_en:"¡Enter a valid number!",msgNoMail_es:"¡Introduce un email válido!",msgNoMail_en:"¡Enter a valid email address!",bordeError:"solid 2px red",colorMensajeEnviado:"#0080C0",colorInputError:"#000000",fontSize:"18px",urlAjax:"formContact.php"},c);return this.each(function(){var d=a(this);d.on("submit",function(g){g.preventDefault();var f=false;if(a("#resultForm").length>0){a("#resultForm").html("")}d.find("input:text, textarea").each(function(){a(this).val(a.trim(a(this).val()))});d.find("input:text, textarea").each(function(){if(a(this).val().length<3){f=true;a(this).css({outline:b.bordeError,color:"#ddd"});a(this).val(b.lang==="es"?b.msgInputVacio_es:b.msgInputVacio_en);a(this).data("string","vacio")}if(a(this).hasClass("input_mail")){var h=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;if(!h.test(a(this).val())){f=true;a(this).css({outline:b.bordeError,color:"#ddd"});a(this).val(b.lang==="es"?b.msgNoMail_es:b.msgNoMail_en);a(this).data("string","vacio")}}else{if(a(this).hasClass("input_telefono")){if(isNaN(a(a(this)).val())){f=true;a(this).css({outline:b.bordeError,color:"#ddd"});a(this).val(b.lang==="es"?b.msgNoNumber_es:b.msgNoNumber_en);a(this).data("string","vacio")}}}if(a(this).data("string")==="vacio"){a(this).on("focus",function(){a(this).val(" ");a(this).css({outline:0,color:b.colorInputError});a(this).removeData("string")})}if(a(this).data("string")){f=true}});if(!f){var e=d.serialize();a.ajax({url:b.urlAjax,type:"POST",dataType:"json",data:e,beforeSend:function(){var h=a("<div />",{id:"resultForm",css:{width:"100%",height:"32px",margin:"5px 3px",textAlign:"center",color:b.colorMensajeEnviado,fontSize:b.fontSize,fontWeight:"bold"},html:'<img src="js/AjaxLoader.gif" width="32" height="32" alt="Loading" />'});if(a("#resultForm").length>0){a("#resultForm").html('<img src="js/AjaxLoader.gif" width="32" height="32" />')}else{d.append(h)}},success:function(h){if(!h.fail){a("#resultForm").html(b.lang==="es"?b.msgOk_es:b.msgOk_en);d[0].reset()}else{a("#resultForm").html(b.lang==="es"?b.msgFail_es:b.msgFail_en)}},error:function(h){if(a("#resultForm").length>0){a("#resultForm").html(h)}else{d.append(h)}}})}})})}})(jQuery);