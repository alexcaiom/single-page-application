var main = {
	/**
	 * IDs
	 */	
	cabecalho : "header",
	menu : "div#menu",
	rodape : "footer",
		
	/**
	 * Metodos
	 */
	init : function() {
		main.carregarHeader();
		main.carregarMenu();
		main.carregarRodape();
	},
	carregarHeader : function() {
		var url = 'template/cabecalho.html';
		var sucesso = function(resultado) {
			$(main.cabecalho).html(resultado);
		  };
		var erro = function(resultado) {
			  $(main.cabecalho).html(resultado.responseText);
		  };
		app.Ajax(url, app.metodoGET, app.assincrono, sucesso, erro);
	},
	carregarMenu : function() {
		var url = 'template/menu.html';
		var sucesso = function(resultado) {
			$(main.menu).html(resultado);
		};
		var erro = function(resultado) {
			$(main.menu).html(resultado.responseText);
		};
		app.Ajax(url, app.metodoGET, app.assincrono, sucesso, erro);
	},
	carregarRodape : function() {
		var url = 'template/rodape.html';
		var sucesso = function(resultado) {
			$(main.rodape).html(resultado);
		};
		var erro = function(resultado) {
			$(main.rodape).html(resultado.responseText);
		};
		app.Ajax(url, app.metodoGET, app.assincrono, sucesso, erro);
	}
};

$(document).ready(function() {
	main.init();
});