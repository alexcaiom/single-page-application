var conteudo = {};

conteudo.init = function() {
	$("#lbl").slideDown(1000);
	alert("conteúdo 1");
};

$(document).ready(conteudo.init());