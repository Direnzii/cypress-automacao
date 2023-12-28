import * as untilCheck from "../functions/checagemGeral.js";
import * as untilTelaInicial from "../functions/resetarCotacao.js";
import * as util from "../functions/utils.js";
import * as modal from "../functions/validarModais.js";

describe("Tela inicial de resposta da cotação", () => {
    it("Deve checar a visibilidade dos componentes principais, botões de ação cima e baixo, filtros por categorias dados de dentro dos acordeons do cliente", () => {
        util.first();
        untilCheck.checagemElementosTelaResumo();
    });
    it("Deve abrir as modais cancelar cotacao, alterar vencimento, geração do pedido automatico, geração do pedido manual", () => {
        util.first();
        modal.funcoesBotaoModal.cancelarCotacao();
        modal.funcoesBotaoModal.alterarVencimento();
        untilCheck.encerrarCot();
        modal.funcoesBotaoModal.pedidoAutoAndManual();
    });
    it("Deve acessar as modais de resposta OK e checar os componentes, tal como paginação, ordenação, filtro, sinalizadores interno e externo", () => {
        util.first();
        untilCheck.blocoRespostaFornecedor();
    });
});

describe("Encerrar cotação e validação geral da tela", () => {
    it("Deve encerrar a cotação, depois realizar a checagem dos elementos categorias e acordeon de filiais", () => {
        util.first();
        untilCheck.checagemElementosTelaResumo(true); //encerrar = true
        untilTelaInicial.reiniciarCompletamenteCotacao();
    });
});
