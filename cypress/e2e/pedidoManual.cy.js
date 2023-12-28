import * as util from "../functions/utils.js";
import * as untilAutoOrder from "../functions/funcPedidoAuto.js";
import * as utilModal from "../functions/validarModais.js";

describe("Testar exclusão por meio do pedido manual", () => {
    it("Deve excluir o item pelo pedido manual e validar na aba dos excluidos se o mesmo esta la, depois inserir no pedido e validar novamente", () => {
        util.acessarProcessarPedido();
        untilAutoOrder.validarBotoesPedidoAuto();
        untilAutoOrder.abrirAcordeonPrimeiroPedido();
        untilAutoOrder.telaProdutosExcluidos(false, true); // inserir = false, excluir pelo pedido manual = true
        utilModal.reiniciarPedidoAlterarVencimento(false);
    });
});
