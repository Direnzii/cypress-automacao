import * as checkMan from "./checkBoxPedidoManual.js";
import except from "./except.js";

const botoesPedidoClick = [
    "Ver Produtos Não Respondidos",
    "Limpar",
    "Filtrar",
    "Ver Produtos Excluidos",
    "Ver Respostas Por Produto",
    "Resolver Problemas De Embalagem",
    "Excluir Produtos",
    "Reiniciar Pedidos",
    "Confirmar Pedido",
];

// Elementos utilizados para ordenação na página de pedido automático
const elementoOrdenacao = [
    ":nth-child(3) > :nth-child(3) > .MuiBox-root", //Equivalente
    ".css-1eakiop > :nth-child(1) > :nth-child(5) > .MuiBox-root", //Codigo
    ".css-1eakiop > :nth-child(2) > :nth-child(5) > .MuiBox-root", //EAN
    ".css-1eakiop > :nth-child(1) > :nth-child(6) > .MuiBox-root", //Nome do produto
    ".css-1eakiop > :nth-child(2) > :nth-child(6) > .MuiBox-root", //Fabricante
    ".css-1eakiop > :nth-child(2) > :nth-child(7) > .MuiBox-root", //Cotação
    ".css-1eakiop > :nth-child(2) > :nth-child(8) > .MuiBox-root", //Resposta
    ".css-1eakiop > :nth-child(2) > :nth-child(9) > .MuiBox-root", //Pedido
    ':nth-child(1) > [rowspan="3"] > .MuiBox-root', //Embalagem
    ".css-1eakiop > :nth-child(1) > :nth-child(9) > .MuiBox-root", //Valor referencia
    ".css-1eakiop > :nth-child(2) > :nth-child(11) > .MuiBox-root", //Historico
    ".css-1eakiop > :nth-child(1) > :nth-child(10) > .MuiBox-root", //Desconto comercial
    ".css-1eakiop > :nth-child(2) > :nth-child(12) > .MuiBox-root", //Negociacao
    ".css-1eakiop > :nth-child(1) > :nth-child(11) > .MuiBox-root", //Valor S ST
    ".css-1eakiop > :nth-child(2) > :nth-child(13) > .MuiBox-root", //Valor Liquido
    ".css-1eakiop > :nth-child(1) > :nth-child(12) > .MuiBox-root", //Valor C ST
    ".css-1eakiop > :nth-child(2) > :nth-child(14) > .MuiBox-root", //Valor Custo
];

const ordenacaoElementos = {};

export function processarAguardarAuto() {
    cy.get("button").contains("Pedido Automático").click(); //botao pedido automatico
    cy.get("#rc-modal-descr").find("button").eq(0).click(); //botao sim
    cy.get(":nth-child(6) > .backdrop-content > #rc-modal-descr")
        .contains("Seus pedidos estão sendo gerados. Por favor, aguarde.")
        .should("be.visible");
    cy.get('[class="MuiAccordion-region"]').should("be.visible");
    cy.wait(1000);
    cy.get('[class="MuiAccordion-region"]')
        .find("input")
        .first()
        .type("Escrevendo qualquer coisa para carregar a pagina");
    cy.get('[class="content"]')
        .find("button")
        .contains("Limpar")
        .should("be.visible")
        .click();
    cy.wait(2000);
    cy.get('[class="content"]').should("be.visible");
}

export function acessarPedidoAutoGerado() {
    cy.get('[class="pedido-resumo-page"]')
        .find("button")
        .contains("Ver Pedidos")
        .click();
}

export function validarBotoesPedidoAuto() {
    cy.get('input[name="produto"]').should("be.visible"); //input do filtro de produtos
    cy.get('select[name="fornecedor"]').should("be.visible"); //select de fornecedores
    cy.get('select[name="status"]').should("be.visible"); //acima abaixo para referencia e historico
    cy.get('select[name="valorDeRefencia"]').should("be.visible"); //select referencia ou historico
    cy.get('select[name="valorDeRefencia"]').next().should("be.visible"); //Valor 0.00 da porcentagem
    cy.get('select[name="filtroPorcentagem"]').should("be.visible"); //select % ou R$
    cy.get("#conflitoDeEmbalagem").should("be.visible"); //checkbox confito emb
    cy.get("#problemaDeMinimo").should("be.visible"); //checkbox minimo uni
    cy.get("#oportunidade").should("be.visible"); //oportunidade de desc
    cy.get("#problemaFaturamentoMinimo").should("be.visible"); //problema de minimo pedido
    botoesPedidoClick.forEach((c) => {
        cy.get('[class="content"]')
            .find("button")
            .contains(c)
            .should("be.visible");
    });
    cy.get('[class="content"]')
        .find("label")
        .contains("Salvar")
        .should("be.visible"); //salvar
    cy.get('[class="content"]')
        .find("label")
        .contains("Total dos Pedidos:")
        .should("be.visible"); //total de pedidos
    cy.get("#todos").should("be.visible"); //checkbox Selecionar todos os produtos
}

export function abrirAcordeonPrimeiroPedido() {
    cy.wait(1000);
    cy.get('[class="MuiAccordion-region"]')
        .eq(2)
        .find('[data-testid="DoubleArrowIcon"]')
        .should("be.visible")
        .click();
    cy.get('[data-testid="conteudo-tabela-row"]').should("be.visible");
    cy.get('[data-testid="conteudo-tabela-cell"]').should("be.visible");
    cy.wait(1000);
}

export function validarOrdenacaoPedidoAutomatico() {
    elementoOrdenacao.forEach((e) => {
        cy.get(e).should("be.visible").click();
        cy.wait(500);
    });
    cy.get(":nth-child(1) > :nth-child(9) > .MuiBox-root > input").should(
        "be.visible"
    ); //validação do primeiro input de quantidade pedida
}

function checarFiltroDeProdutoPedidoAuto(textoParaPesquisar, excluido) {
    cy.get('[class="MuiAccordion-region"]').eq(0).find("input").eq(0).clear();
    cy.get('[class="MuiAccordion-region"]')
        .first()
        .find("input")
        .first()
        .type(textoParaPesquisar); // escrever o texto no input do filtro
    cy.get('[class="content"]')
        .find("button")
        .contains("Filtrar")
        .should("be.visible")
        .click(); // clicar em filtrar
    if (excluido == true) {
        cy.wait(1000);
        cy.get("span").contains("Nenhum dado encontrado.").should("be.visible");
        cy.get('[class="content"]')
            .find("button")
            .contains("Limpar")
            .should("be.visible")
            .click();
        cy.wait(1000);
        cy.log("Produto realmente não esta mais no pedido, OK");
    } else {
        cy.wait(1000);
        abrirAcordeonPrimeiroPedido();
        cy.get('[data-testid="conteudo-tabela-row"]')
            .eq(0)
            .contains(textoParaPesquisar)
            .should("be.visible"); // verificar se o retorno do filtro esta correto
    }
}

function validarSeFiltroFunciona(objeto) {
    const listObjeto = new Array(objeto.length).fill(0);
    listObjeto.forEach((_i, index) => {
        let textoObjeto = objeto[index].textContent;
        checarFiltroDeProdutoPedidoAuto(textoObjeto);
    });
}

export function validacaoDoFiltroPedidoAuto() {
    cy.get('[data-testid="conteudo-tabela-row"]').should("be.visible");
    cy.wait(500);
    cy.get('[data-testid="conteudo-tabela-cell"]')
        .eq(4)
        .find("span")
        .then((codigoEan) => {
            validarSeFiltroFunciona(codigoEan);
        });
    cy.get('[data-testid="conteudo-tabela-cell"]')
        .eq(5)
        .find("span")
        .then((descricaoFabricante) => {
            validarSeFiltroFunciona(descricaoFabricante);
        });
}

function abrirTelaProdutosExcluidos() {
    cy.get("button").contains("Ver Produtos Excluidos").click();
    cy.get("button").contains("Ver Pedidos").should("be.visible");
    cy.wait(2000);
}

function validarProdutoExcluido(ean) {
    cy.get('[class="field"]').contains(ean).should("be.visible");
    cy.get(".descricao > :nth-child(2)").should("be.visible");
    cy.wait(2000);
}

function interceptRequest(url, status) {
    cy.intercept(
        {
            method: "GET",
            url: url, // * para corresponder a qualquer valor
        },
        (req) => {
            req.reply((res) => {
                expect(res.statusCode).to.equal(status);
            });
        }
    ).as("totalRequest");
    cy.wait("@totalRequest").its("response.statusCode").should("eq", status);
}

function checarSeProdutoEstaNoPedido(ean, excluido) {
    cy.get(".content").find("button").contains("Inserir no Pedido").click();
    if (excluido == true) {
        checarFiltroDeProdutoPedidoAuto(ean, excluido);
        return;
    }
    checarFiltroDeProdutoPedidoAuto(ean);
}

function checagemDeAlertasPadraPedidoAuto() {
    cy.get(".MuiButtonBase-root").contains("Excluir Produtos").click();
    cy.get("#alert")
        .contains("ATENÇÃO! Nenhum produto foi selecionado.")
        .should("be.visible");
    cy.get("#alert").find("svg").click();
    cy.wait(500);
    cy.get("button").contains("Ver Produtos Excluidos").click();
    cy.get("#alert")
        .contains(
            'Não existem produtos excluídos. Para excluir um produto, selecione o produto e clique em "Excluir".'
        )
        .should("be.visible");
    cy.get("#alert").find("svg").click();
    cy.wait(500);
}

export function telaProdutosExcluidos(inserir, excluidoPeloPedidoManual) {
    // Nessa função eu excluo o primeiro item do pedido e depois verifico se ele foi realmente excluído
    let excluido = true;
    let uncheck = false;
    let check = true;
    checagemDeAlertasPadraPedidoAuto();
    cy.get('[data-testid="conteudo-tabela-cell"]')
        .eq(4)
        .find("span")
        .then((codigoEan) => {
            let ean = codigoEan[1].textContent;
            validarSeFiltroFunciona(codigoEan); // checa o item dentro do pedido
            cy.get(".MuiTable-root")
                .find("tr")
                .eq(3)
                .find("input")
                .eq(0)
                .click();
            cy.wait(1000);
            if (excluidoPeloPedidoManual == true) {
                cy.get(".content")
                    .find("button")
                    .contains("Ver Respostas Por Produto")
                    .click(); // aqui entro no pedido manual para excluir o item
                interceptRequest(
                    "https://auth.apicotefacil.com:8881/pedidomanual/total/*",
                    200
                );
                cy.get(".icon-button").should("be.visible");
                validarProdutoExcluido(ean);
                checkMan.checkUncheckPedidoManual(uncheck, 0);
                checarSeProdutoEstaNoPedido(ean, excluido);
                cy.get("button").contains("Ver Produtos Excluidos").click();
                validarProdutoExcluido(ean);
                checkMan.checkUncheckPedidoManual(check);
                checarSeProdutoEstaNoPedido(ean);
                return;
            } else {
                cy.get(".MuiButtonBase-root")
                    .contains("Excluir Produtos")
                    .trigger("click");
                checarFiltroDeProdutoPedidoAuto(ean, excluido);
            }
            abrirTelaProdutosExcluidos();
            validarProdutoExcluido(ean);
            if (inserir == true) {
                checkMan.checkUncheckPedidoManual(check);
                except();
                checarSeProdutoEstaNoPedido(ean);
            }
        });
}
