import * as untilCheck from "../functions/checagemGeral.js";
import * as untilTelaInicial from "../functions/resetarCotacao.js";
import * as untilAutoOrder from "./funcPedidoAuto.js";
import {
    COTACAO,
    CLIENTE_USUARIO,
    CLIENTE_SENHA,
    URL_AMPLIFY,
} from "../functions/envVariaveis.js";
import * as untilLogin from "../functions/login.js";

let AMPLIFY = true;

export function acessarProcessarPedido() {
    untilLogin.login(CLIENTE_USUARIO, CLIENTE_SENHA, URL_AMPLIFY, AMPLIFY);
    untilLogin.acessandoCotacao(COTACAO, AMPLIFY);
    untilTelaInicial.reiniciarCompletamenteCotacao();
    untilCheck.encerrarCot();
    untilAutoOrder.processarAguardarAuto();
}

export function first() {
    untilLogin.login(CLIENTE_USUARIO, CLIENTE_SENHA, URL_AMPLIFY, AMPLIFY);
    untilLogin.acessandoCotacao(COTACAO, AMPLIFY);
    untilTelaInicial.reiniciarCompletamenteCotacao();
}

export function confirmarPedido() {
    cy.get(".content").find("button").contains("Confirmar Pedido").click();
}
