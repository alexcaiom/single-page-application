var app = {
		/*
		 * Variaveis
		 */
		metodoGET  : "GET",
		metodoPOST : "POST",
		assincrono : true,
		sincrono   : false,
		
		/**
		 * Métodos
		 */
		
		/**
		 * abre uma página
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
		 * abre uma página
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