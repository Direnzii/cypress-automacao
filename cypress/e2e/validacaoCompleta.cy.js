import * as untilLogin from "./login.js";
import * as untilCheck from "./checagemGeral.js";
import * as untilAutoOrder from "./pedidoAutomatico.js";
import * as untilTelaInicial from "./resetarCotacao.js";
import * as untilconfirm from "./checagemRevisaoEnvio.js";
import "cypress-iframe";

const COTACAO = Cypress.env("COTACAO");
const USUARIO_DEMO = Cypress.env("USUARIO_DEMO");
const SENHA_DEMO = Cypress.env("SENHA_DEMO");
const CLIENTE_USUARIO = Cypress.env("CLIENTE_USUARIO");
const CLIENTE_SENHA = Cypress.env("CLIENTE_SENHA");
const URL_AMPLIFY = Cypress.env("URL_AMPLIFY");
const URL_DEMO = Cypress.env("URL_DEMO");
let amplify = true;

// describe("Login incorreto no sistema", () => {
//     it("Deve validar caso o login esteja incorreto", () => {
//         untilLogin.login_incorreto(URL_DEMO);
//     });
// });

// describe("Logando no sistema", () => {
//     it("Deve logar como adm", () => {
//         untilLogin.login(USUARIO_DEMO, SENHA_DEMO, URL_DEMO);
//     });
// });

// describe("Logando no cliente", () => {
//     it("Deve logar no cliente e acessar a tela principal", () => {
//         untilAutoOrder.except(); // estava retornando um erro da aplicação porem que nao afeta o teste
//         untilLogin.login(USUARIO_DEMO, SENHA_DEMO, URL_DEMO);
//         untilLogin.acessandoCliente(CLIENTE_USUARIO);
//     });
// });

// describe("Acessando cotação pela aba cotações", () => {
//     it("Deve abrir a aba cotações e clicar na cotação com o ID selecionado", () => {
//         untilLogin.login(USUARIO_DEMO, SENHA_DEMO, URL_DEMO);
//         untilLogin.acessandoCliente(CLIENTE_USUARIO);
//         untilLogin.acessandoCotacao(COTACAO);
//         // untilLogin.iFrameRogan()
//     });
// });

function first() {
    untilLogin.login(CLIENTE_USUARIO, CLIENTE_SENHA, URL_AMPLIFY, amplify);
    untilLogin.acessandoCotacao(COTACAO, amplify);
    untilTelaInicial.reiniciarCompletamenteCotacao();
    untilCheck.checagemGeralDeBotoesTelaInicial();
}

describe("Tela inicial de resposta da cotação", () => {
    it("Deve checar a visibilidade dos componentes principais, botões de ação cima e baixo, filtros por categorias", () => {
        first();
    });
    it("Deve acessar as modais de resposta OK e checar os componentes, tal como paginação, ordenação, filtro, sinalizadores interno e externo", () => {
        first();
        untilCheck.modalRespostaFornecedor();
    });
});

describe("Encerrar cotação e validação geral da tela", () => {
    it("Deve encerrar a cotação, depois realizar a checagem dos elementos categorias e acordeon de filiais", () => {
        first();
        untilCheck.checagemGeralDeBotoesTelaInicial(true); //encerrar = true
        untilTelaInicial.reiniciarCompletamenteCotacao();
    });
});

function acessarProcessarPedido() {
    untilLogin.login(CLIENTE_USUARIO, CLIENTE_SENHA, URL_AMPLIFY, amplify);
    untilLogin.acessandoCotacao(COTACAO, amplify);
    untilTelaInicial.reiniciarCompletamenteCotacao();
    untilCheck.encerrarCot();
    untilAutoOrder.processarAguardarAuto();
}

describe("Realizar o processamento do pedido automático", () => {
    it('Deve processar utilizando "pedido automatico" e aguardar até o final do processamento, depois reiniciar o pedido e alterar o vencimenteo da cotação', () => {
        acessarProcessarPedido();
        untilAutoOrder.reiniciarPedidoAlterarVencimento(false); //fora do pedido = false
    });
    it("Deve validar a visibilidade de todos os elementos da tela do pedido automático", () => {
        acessarProcessarPedido();
        untilAutoOrder.validarBotoesPedidoAuto();
        untilAutoOrder.reiniciarPedidoAlterarVencimento(false);
    });
});

describe("Validação basica do filtro e da ordenação na tela do pedido automático", () => {
    it("Deve abrir o acordeon de analise do pedido e realizar ordenações", () => {
        acessarProcessarPedido();
        untilAutoOrder.validarBotoesPedidoAuto();
        untilAutoOrder.abrirAcordeonPrimeiroPedido();
        untilAutoOrder.validarOrdenacaoPedidoAutomatico();
        untilAutoOrder.reiniciarPedidoAlterarVencimento(false);
    });
    it("Deve pegar o EAN, Código, Descrição e Fabricante, filtrar no input e validar o resultado do filtro", () => {
        acessarProcessarPedido();
        untilAutoOrder.validarBotoesPedidoAuto();
        untilAutoOrder.abrirAcordeonPrimeiroPedido();
        untilAutoOrder.validarOrdenacaoPedidoAutomatico();
        untilAutoOrder.validacaoDoFiltroPedidoAuto();
        untilAutoOrder.reiniciarPedidoAlterarVencimento(false);
    });
});

describe("Validação da aba de produtos excluídos", () => {
    it.only("Deve excluir um produto específico, acessar a tela de produtos excluídos e validar se se trata do mesmo item e ao final, reiniciar o pedido", () => {
        acessarProcessarPedido();
        untilAutoOrder.validarBotoesPedidoAuto();
        untilAutoOrder.abrirAcordeonPrimeiroPedido();
        untilAutoOrder.telaProdutosExcluidos();
        untilAutoOrder.reiniciarPedidoAlterarVencimento(false);
    });
    it('Deve excluir um item, realizar a validação da tela "produtos excluidos" e na sequência inserir novamente o item ao pedido e validar se consta no pedido novamente', () => {
        acessarProcessarPedido();
        untilAutoOrder.validarBotoesPedidoAuto();
        untilAutoOrder.abrirAcordeonPrimeiroPedido();
        untilAutoOrder.telaProdutosExcluidos(true); // inserir = true
        untilAutoOrder.reiniciarPedidoAlterarVencimento(false);
    });
    it("Deve excluir o item pelo pedido manual e validar na aba dos excluidos se o mesmo esta la, depois inserir no pedido e validar novamente", () => {
        acessarProcessarPedido();
        untilAutoOrder.validarBotoesPedidoAuto();
        untilAutoOrder.abrirAcordeonPrimeiroPedido();
        untilAutoOrder.telaProdutosExcluidos(false, true); // inserir = false, excluir pelo pedido manual = true
        untilAutoOrder.reiniciarPedidoAlterarVencimento(false);
    });
    it("Deve excluir o item pelo pedido manual e validar na aba dos excluidos se o mesmo esta la, depois inserir no pedido e validar novamente", () => {
        acessarProcessarPedido();
        untilconfirm.confirmarPedido();
        untilconfirm.checagemGeralDeBotoes();
        untilAutoOrder.reiniciarPedidoAlterarVencimento(false);
    });
    // describe("", () => {
    //     it.only("", () => {
    //         untilLogin.login(
    //             CLIENTE_USUARIO,
    //             CLIENTE_SENHA,
    //             URL_AMPLIFY,
    //             amplify
    //         );
    //         untilLogin.acessandoCotacao(COTACAO, amplify);
    //         untilCheck.modalRespostaFornecedor();
    //     });
    // });
});
