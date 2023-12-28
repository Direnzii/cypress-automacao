import * as untilAutoOrder from "../functions/funcPedidoAuto.js";
import * as util from "../functions/utils.js";
import * as utilModal from "../functions/validarModais.js";

describe("Realizar o processamento do pedido automático", () => {
    it('Deve processar utilizando "pedido automatico" e aguardar até o final do processamento, depois reiniciar o pedido e alterar o vencimenteo da cotação', () => {
        util.acessarProcessarPedido();
        utilModal.reiniciarPedidoAlterarVencimento(false); //fora do pedido = false
    });
    it("Deve validar a visibilidade de todos os elementos da tela do pedido automático", () => {
        util.acessarProcessarPedido();
        untilAutoOrder.validarBotoesPedidoAuto();
        utilModal.reiniciarPedidoAlterarVencimento(false);
    });
});

describe("Validação basica do filtro e da ordenação na tela do pedido automático", () => {
    it("Deve abrir o acordeon de analise do pedido e realizar ordenações", () => {
        util.acessarProcessarPedido();
        untilAutoOrder.abrirAcordeonPrimeiroPedido();
        untilAutoOrder.validarOrdenacaoPedidoAutomatico();
        utilModal.reiniciarPedidoAlterarVencimento(false);
    });
    it("Deve pegar o EAN, Código, Descrição e Fabricante, filtrar no input e validar o resultado do filtro", () => {
        util.acessarProcessarPedido();
        untilAutoOrder.abrirAcordeonPrimeiroPedido();
        untilAutoOrder.validacaoDoFiltroPedidoAuto();
        utilModal.reiniciarPedidoAlterarVencimento(false);
    });
});

describe("Validação da aba de produtos excluídos", () => {
    it("Deve excluir um produto específico, acessar a tela de produtos excluídos e validar se se trata do mesmo item e ao final, reiniciar o pedido", () => {
        util.acessarProcessarPedido();
        untilAutoOrder.abrirAcordeonPrimeiroPedido();
        untilAutoOrder.telaProdutosExcluidos();
        utilModal.reiniciarPedidoAlterarVencimento(false);
    });
    it('Deve excluir um item, realizar a validação da tela "produtos excluidos" e na sequência inserir novamente o item ao pedido e validar se consta no pedido novamente', () => {
        util.acessarProcessarPedido();
        untilAutoOrder.abrirAcordeonPrimeiroPedido();
        untilAutoOrder.telaProdutosExcluidos(true); // inserir = true
        utilModal.reiniciarPedidoAlterarVencimento(false);
    });
});
