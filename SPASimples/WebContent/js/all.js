/**
 * 
 */

var all = {};
var JQuery = 'http://code.jquery.com/jquery-2.1.4.min.js';
var JQueryUi = 'http://code.jquery.com/ui/1.11.4/jquery-ui.js';
var host = 'http://www.alexcaiom.com.br';
var url = host + '/api-autenticacao/acoes';
var tagHead = document.getElementsByTagName('head')[0].innerHTML;
var ajaxAsyncPadrao = true;

function existe(o) {
	return o != null;
};

var naoExiste = function(o) {
	return !existe(o) || (typeof o === 'undefined');
};

var jaTemScript = function(fonte) {
	var tagHead = document.getElementsByTagName('head')[0];
	var tagsScript = tagHead.getElementsByTagName("script");
	
	for (var indice = 0; indice < tagsScript.length; indice++) {
		var tem = tagsScript[indice].src.indexOf(fonte) >= 0;
		if (tem) {
			return true;
		}
	}
	return false;
};

var importacaoJQuery = function(){
	if (!jaTemScript(JQuery)) {
		var tagScript = document.createElement('script');
		tagScript.setAttribute('src', JQuery);
		document.head.appendChild(tagScript);
	}
};
//importacaoJQuery();

var importacaoJQueryUi = function(){
	if (!jaTemScript(JQueryUi)) {
		var tagScript = document.createElement('script');
		tagScript.setAttribute('src', JQueryUi);
		document.head.appendChild(tagScript);
	}
};

/*all.scripts = [
    {
    	src : JQuery,
    	load : function() {
    		importacaoJQueryUi();
    	}
	},
	{
		src : JQueryUi,
		load : function() {
			
		}
	},
	
];
*/

var init = function(executar) {
	if (existe(executar) && typeof executar === 'function') {
		executar();
	}
//    all.formatarLinks();
};

function initMenu() {
	$( "#menu" ).menu();
    $( "#menu" ).removeClass("oculto");
}
//init(importacaoJQueryUi());


/*all.CONSEQUENCIAS = {
		SEM_ACESSO : 				'SEM_ACESSO',
		DESLOGADO_COM_SUCESSO : 	'DESLOGADO_COM_SUCESSO',
		ERRO : 						'ERRO',
		SUCCESSO : 					'SUCCESSO',
		MUITOS_ERROS : 				'MUITOS_ERROS',
		ATENCAO : 					'ATENCAO',
		TENTE_NOVAMENTE : 			'TENTE_NOVAMENTE',
		PARE_DE_TENTAR_NOVAMENTE =  'PARE_DE_TENTAR_NOVAMENTE'
};*/


all.formatarLinks = function() {
	$("a").on('click', function() {
		var url = $(this).attr('destino');  
		
		$.ajax({
			url : url,
			async : false
		})
		.done(function(retorno) {
			all.trocarConteudo(retorno);
		})
		.fail(function() {
			console.log(retorno);
		});
	});
};

all.trocarConteudo = function(conteudo) {
	$("#conteudo").html('');
	$("#conteudo").html(conteudo);
};

getValorValido = function(valor) {
	if (naoExiste(valor)) {
		return '';
	}
	return valor;
};

function log(texto) {
	console.log(texto);
};

function exibir(o) {
	if (existe(o)) {
		o.removeClass("oculto");
	}
};

function ocultar(o) {
	if (existe(o)) {
		o.addClass("oculto");
	}
};