var scriptUtils = {
		/**
		 * Carrega o Script da Pagina em Tela (se houver)
		 * e descarrega o antigo (se houver)
		 */
		mudarScripts : function(scriptAtual, scriptNovo) {
			debugger;
			scriptAtual = scriptAtual.replace(".html", ".js");
			scriptNovo  = "./js/" + scriptNovo.replace(".html", ".js");
			scriptUtils.retirarScript(scriptAtual);
			scriptUtils.addScript(scriptNovo);
		},
		
		retirarScript : function(scriptAtual) {
			$.each($("script[src]"), function(indice, script){
				var ehOScriptDaPaginaAtual = (script.src.indexOf(scriptAtual) > -1); 
			     if (!ehOScriptDaPaginaAtual){
			         script.remove();
			     }
			});
		},
		
		addScript : function(scriptNovo) {
			$("head").append(scriptUtils.getTagScript(scriptNovo));
		},
		
		getTagScript : function(script) {
			return "<script src=\""+script+"\" ></script>";
		}	
};