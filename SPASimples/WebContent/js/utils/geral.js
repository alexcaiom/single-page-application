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
		
		/**
		 * Metodos
		 */
		
		/**
		 * abre uma pagina
		 * @param url
		 */
		Ajax : function(url, metodo, assincrono, sucesso, erro) {
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
			};
			var fnErro = function(resultado) {
				app.paginaDestino = "";
				$("#conteudo").html(resultado.responseText);
			};
			
			app.Ajax(url, app.metodoGET, app.assincrono, fnSucesso, fnErro);
		},
};