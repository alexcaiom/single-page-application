var app = {
		/*
		 * Variaveis
		 */
		metodoGET  : 	"GET",
		metodoPOST : 	"POST",
		assincrono : 	true,
		sincrono   : 	false,
		paginaAtual: 	"",
		paginaDestino: 	"",
		tipoJSON   :	"application/json",
		tipoPagina :	"text/html",
		debugar: 		false,
		
		/**
		 * Metodos
		 */
		
		/**
		 * abre uma pagina
		 * @param url
		 */
		Ajax : function(url, metodo, assincrono, sucesso, erro, tipo) {
			$.ajax({
				url : url,
				method : metodo,
				async : assincrono,
//				dataType: "text/html",
				contentType : 'charset=UTF-8',
				success : sucesso,
				error : erro
			});
		},
		
		/**
		 * abre uma pagina
		 * @param url
		 */
		abrir : function(url) {
			app.paginaDestino = url;
			var fnSucesso = function(resultado) {
				$("#conteudo").html(resultado);
				scriptUtils.mudarScripts(app.paginaAtual, app.paginaDestino);
				app.paginaAtual = url;
			};
			var fnErro = function(resultado) {
				app.paginaDestino = "";
				$("#conteudo").html(resultado.responseText);
			};
			
			app.Ajax(url, app.metodoGET, app.assincrono, fnSucesso, fnErro);
		},
		
		getJSON : function(url, metodo, assincrono, fnSucesso, fnErro, data, crossDomain) {
			if (typeof crossDomain == undefined) {
				crossDomain = false;
			}
			$.ajax({
				url 		: url,
				method 		: metodo,
				async 		: assincrono,
//				dataType: "text/html",
//				accepts 	: 'application/json',
				contentType : 'charset=UTF-8',
				data 		: data,
				crossDomain : crossDomain
			})
			.done(fnSucesso)
			.fail(fnErro);
		}
};