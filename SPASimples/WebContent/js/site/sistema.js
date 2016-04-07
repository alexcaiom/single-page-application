/**
 * 
 */

var sistema = {};

sistema.init = function() {
	sistema.listar();
	sistema.initEventos();
};

sistema.initEventos = function() {
	$("#nome").keyup(function(e) {
		if (e.keyCode == 13) {
			$("#btnCadastrar").click();
		}
	});
	$("#btnCadastrar").on('click', function() {
		var dadosDoFormularioEstaoValidos = sistema.validar();
		if (dadosDoFormularioEstaoValidos) {
			sistema.gravar();
		}
	});
	$("#btnPesquisar").on('click', function() {
		var textoPesquisa = $("#nomePesquisa").val();
		sistema.pesquisar(textoPesquisa);
	});
	$("#nomePesquisa").keyup(function() {
		var textoPesquisa = $("#nomePesquisa").val();
		sistema.pesquisar(textoPesquisa);
	});
};

sistema.gravar = function() {
	exibir($("#msgCarregando"));
	ocultar($("#lblSemResultados"));
	ocultar($("#tbl.dados"));
	var classe = $("#classe").val();
	var metodo = $("#metodo").val();
	var nome = $("#nome").val();
	$.ajax(
			{
				url : url,
				async : true,
				data : {
					classe : classe,
					metodo : metodo,
					nome : nome
				}
			}
		)
		.done(function(retorno){
			retorno = $.parseJSON(retorno);
			var consequencia = retorno.consequence;
			if(consequencia === "SUCCESSO") {
				var dado = retorno.dado;
				$("#tbl").append(sistema.getLinhaTabelaSistema(dado));
				sistema.atribuirEventosDeSelecaoAsLinhasDaTabela();
				ocultar($("#msgCarregando"));
				ocultar($("#lblSemResultados"));
				exibir($("#tbl.dados"));
				$("#nome").val('');
			} else if (consequencia == "ERRO") {
				if (retorno.localizedMessage != null) {
					$("#mensagem").html(retorno.localizedMessage);
					$("#mensagem").addClass("erro");
					$("#mensagem").show();
				}
			} else if (consequencia == "ATENCAO") {
				if (retorno.dado != null) {
					$("#mensagem").html(retorno.dado);
					$("#mensagem").addClass("aviso");
					$("#mensagem").show();
				}
			} 
			log(retorno);
		})
		.fail(function(retorno){
			retorno = $.parseJSON(retorno);
			log(retorno);
		});
};

sistema.excluir = function(id) {
	exibir($("#msgCarregando"));
	ocultar($("#lblSemResultados"));
	ocultar($("#tbl.dados"));
	var classe = "Sistema";
	var metodo = "excluir";
	var textoPesquisa = $("#nomePesquisa").val();
	$.ajax(
			{
				url : url,
				async : ajaxAsyncPadrao,
				data : {
					classe : classe,
					metodo : metodo,
					id   : id
				}
			}
	)
	.done(function(retorno){
		retorno = $.parseJSON(retorno);
		var consequencia = retorno.consequence;
		if(consequencia === "SUCCESSO") {
			var dado = retorno.dado;
			if (existe(dado)) {
				sistema.pesquisar(textoPesquisa);
			}
		} else if (consequencia == "ERRO") {
			if (retorno.localizedMessage != null) {
				$("#mensagem").html(retorno.localizedMessage);
				$("#mensagem").addClass("erro");
				$("#mensagem").show();
			}
		} else if (consequencia == "ATENCAO") {
			if (retorno.dado != null) {
				$("#mensagem").html(retorno.dado);
				$("#mensagem").addClass("aviso");
				$("#mensagem").show();
			}
		} 
		console.log(retorno);
	})
	.fail(function(retorno){
		retorno = $.parseJSON(retorno);
		console.log(retorno);
	});
};
sistema.validar = function() {
	var formValido = $("#nome").val() != '';
	return formValido;
};

sistema.validarPesquisa = function() {
	var pesquisaValido = $("#nomePesquisa").val() != '';
	return pesquisaValido;
};

sistema.preencherTabela = function(dado) {
	sistema.resetTabelaSistema();
	for (var i = 0; i < dado.length; i++) {
		$("#tbl").append(sistema.getLinhaTabelaSistema(dado[i]));
	}
	
	sistema.atribuirEventosDeSelecaoAsLinhasDaTabela();
	ocultar($("#msgCarregando"));
	var quantidadeDeRegistros = $("tr[data-id]").length;
	if (quantidadeDeRegistros == 0) {
		ocultar($("#tbl.dados"));
		exibir($("#lblSemResultados"));
	} else {
		exibir($("#tbl.dados"));
		ocultar($("#msgCarregando"));
	}
};

sistema.listar = function() {
	exibir($("#msgCarregando"));
	ocultar($("#tbl.dados"));
	var classe = "Sistema";
	var metodo = "listar";

	var data = {
		classe : classe,
		metodo : metodo
	};
	
	var fnSucesso = function(retorno){
		debugger;
		retorno = $.parseJSON(retorno);
		var consequencia = retorno.consequence;
		if(consequencia === "SUCCESSO") {
			var dado = retorno.dado;
			if (dado != null) {
				sistema.preencherTabela(dado);
			}
		} else if (consequencia == "ERRO") {
			if (retorno.localizedMessage != null) {
				$("#mensagem").html(retorno.localizedMessage);
				$("#mensagem").addClass("erro");
				$("#mensagem").show();
			}
		} else if (consequencia == "ATENCAO") {
			if (retorno.dado != null) {
				$("#mensagem").html(retorno.dado);
				$("#mensagem").addClass("aviso");
				$("#mensagem").show();
			}
		} 
		console.log(retorno);
	};
	
	var fnErro = function(retorno){
		debugger;
		retorno = $.parseJSON(retorno);
		console.log(retorno);
	};
	
	app.getJSON(url, app.metodoGET, app.assincrono, fnSucesso, fnErro, data);
};

sistema.pesquisar = function(textoPesquisa) {
	exibir($("#msgCarregando"));
	ocultar($("#tbl.dados"));
	var classe = "Sistema";
	var metodo = "pesquisarPorNomeComo";
	$.ajax(
			{
				url : url,
				async : ajaxAsyncPadrao,
				data : {
					classe : classe,
					metodo : metodo,
					nome   : textoPesquisa
				}
			}
	)
	.done(function(retorno){
		retorno = $.parseJSON(retorno);
		var consequencia = retorno.consequence;
		if(consequencia === "SUCCESSO") {
			var dado = retorno.dado;
			if (existe(dado)) {
				sistema.preencherTabela(dado);
			}
		} else if (consequencia == "ERRO") {
			if (retorno.localizedMessage != null) {
				$("#mensagem").html(retorno.localizedMessage);
				$("#mensagem").addClass("erro");
				$("#mensagem").show();
			}
		} else if (consequencia == "ATENCAO") {
			if (retorno.dado != null) {
				$("#mensagem").html(retorno.dado);
				$("#mensagem").addClass("aviso");
				$("#mensagem").show();
			}
		} 
		console.log(retorno);
	})
	.fail(function(retorno){
		retorno = $.parseJSON(retorno);
		console.log(retorno);
	});
};

sistema.getLinhaTabelaSistema = function(dado) {
	var linha = "";
	
	linha = "<tr data-id="+dado.id+">";
	linha += 	"<td>";
	linha += 		dado.id;
	linha += 	"</td>";
	linha += 	"<td>";
	linha += 		dado.nome;
	linha += 	"</td>";
	linha += 	"<td>";
	linha += 		"<img src='../img/excluir.gif' id='excluir' data-id='"+dado.id+"' title='excluir' />";
	linha += 	"</td>";
	linha += "</tr>";
	
	return linha;
};

sistema.atribuirEventosDeSelecaoAsLinhasDaTabela = function() {
	$("tr[data-id]").on('click', function() {
		var id = $(this).data('id');
		sistema.selecionarSistema(id);
	});
	
	$("img[data-id]").on('click', function() {
		debugger;
		var id = $(this).attr('data-id');
		if (confirm("Deseja mesmo excluir?")) {
			sistema.excluir(id);
		}
	});
};

sistema.selecionarSistema = function(id) {
	var classe = "Sistema";
	var metodo = "pesquisar";

	$.ajax(
			{
				url : url,
				async : ajaxAsyncPadrao,
				data : {
					classe : classe,
					metodo : metodo,
					id : id
				}
			}
		)
		.done(function(retorno){
			retorno = $.parseJSON(retorno);
			var consequencia = retorno.consequence;
			if(consequencia === "SUCCESSO") {
				var sistema = retorno.dado;
				if (sistema != null) {
					$("#id").val(sistema.id);
					$("#nome").val(sistema.nome);
				}
			} else if (consequencia == "ERRO") {
				if (retorno.localizedMessage != null) {
					$("#mensagem").html(retorno.localizedMessage);
					$("#mensagem").addClass("erro");
					$("#mensagem").show();
				}
			} else if (consequencia == "ATENCAO") {
				if (retorno.dado != null) {
					$("#mensagem").html(retorno.dado);
					$("#mensagem").addClass("aviso");
					$("#mensagem").show();
				}
			} 
			console.log(retorno);
		})
		.fail(function(retorno){
			retorno = $.parseJSON(retorno);
			console.log(retorno);
		});
};

sistema.resetTabelaSistema = function() {
	$("#tbl").html('');
	var tabelaInicial = "";
	
	tabelaInicial += "<thead>";
	tabelaInicial += 	"<tr>";
	tabelaInicial += 		"<td>";
	tabelaInicial += 			"Id";
	tabelaInicial += 		"</td>";
	tabelaInicial += 		"<td>";
	tabelaInicial += 			"Nome";
	tabelaInicial += 		"</td>";
	tabelaInicial += 		"<td>";
	tabelaInicial += 			"";
	tabelaInicial += 		"</td>";
	tabelaInicial += 	"</tr>";
	tabelaInicial += "</thead>";
	
	$("#tbl").html(tabelaInicial);
};

//$(document).ready (function() {
	sistema.init();
//});