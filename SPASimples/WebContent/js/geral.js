var app = {
		/*
		 * Variaveis
		 */
		metodoGET  : "GET",
		metodoPOST : "POST",
		assincrono : true,
		sincrono   : false,
		
		/**
		 * M�todos
		 */
		
		/**
		 * abre uma p�gina
		 * @param url
		 */
		Ajax : function(url, metodo, assincrono, sucesso, erro) {
			$.ajax({
				url : url,
				method : metodo,
				async : assincrono,
				dataType: "text/html",
				contentType : 'charset=UTF-8',
				success : sucesso,
				error : erro
			});
		},
		
		/**
		 * abre uma p�gina
		 * @param url
		 */
		abrir : function(url) {
			var sucesso = function(resultado) {
				$("#conteudo").html(resultado);
			};
			var erro = function(resultado) {
				  $("#conteudo").html(resultado.responseText);
			  };
			app.Ajax(url, app.metodoGET, app.assincrono, sucesso, erro);
		}
};