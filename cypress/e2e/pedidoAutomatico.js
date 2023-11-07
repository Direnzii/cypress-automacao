export function processarAguardarAuto() {
    cy.get(":nth-child(3) > :nth-child(5)").click(); //botao pedido automatico
    cy.get("#rc-modal-descr").find("button").eq(0).click(); //botao sim
    cy.get(":nth-child(6) > .backdrop-content > #rc-modal-descr")
        .contains("Seus pedidos estão sendo gerados. Por favor, aguarde.")
        .should("be.visible");
    cy.get('[class="MuiAccordion-region"]').should("be.visible");
    cy.wait(1000);
    cy.get('[class="MuiAccordion-region"]')
        .find("input")
        .eq(0)
        .type("Escrevendo qualquer coisa para carregar a pagina");
    cy.get('[class="content"]')
        .find("button")
        .contains("Limpar")
        .should("be.visible")
        .click();
    cy.wait(2000);
    cy.get('[class="content"]').should("be.visible");
}

export function reiniciarPedidoAlterarVencimento(foraDoPedido) {
    const dataAtual = new Date(); // trazer data atual do sistema
    const dia = dataAtual.getDate();
    if (foraDoPedido == false) {
        cy.get('[class="content"]')
            .find("button")
            .contains("Reiniciar Pedidos")
            .click();
        cy.get("#rc-modal-descr").find("button").contains("Sim").click();
    }
    cy.get(".pedido-resumo-page > :nth-child(3) > :nth-child(3)").click();
    cy.get(".alterar-vencimento-middle-date-picker").click();
    if (dia >= 10) {
        // usado para setar o dia com base no dia do systema
        cy.get(".react-datepicker__day--0" + dia).click(); // ex: quando for o dia 10 o index do dia na tooltip vai com um 0 a menos
    } else {
        cy.get(".react-datepicker__day--00" + dia)
            .eq(0)
            .click();
    }

    cy.get(".alterar-vencimento-middle-time-picker").click();
    cy.get(".react-datepicker").contains("23:30").click(); // usado para setar a hora na modal
    cy.get("button").contains("Confirmar").click();
}

export function acessarPedidoAutoGerado() {
    cy.get('[class="pedido-resumo-page"]')
        .find("button")
        .contains("Ver Pedidos")
        .click();
}

export function validarBotoesPedidoAuto() {
    cy.get(":nth-child(1) > :nth-child(1) > input").should("be.visible"); //input do filtro de produtos
    cy.get(":nth-child(1) > :nth-child(1) > input").should("be.visible"); //select de fornecedores
    cy.get(":nth-child(1) > :nth-child(1) > input").should("be.visible"); //acima abaixo para referencia e historico
    cy.get(":nth-child(1) > :nth-child(1) > input").should("be.visible"); //select referencia ou historico
    cy.get(":nth-child(1) > :nth-child(1) > input").should("be.visible"); //select % ou R$
    cy.get("#conflitoDeEmbalagem").should("be.visible"); //checkbox confito emb
    cy.get("#problemaDeMinimo").should("be.visible"); //checkbox minimo uni
    cy.get("#oportunidade").should("be.visible"); //oportunidade de desc
    cy.get("#problemaFaturamentoMinimo").should("be.visible"); //problema de minimo pedido
    cy.get('[class="content"]')
        .find("button")
        .contains("Ver Produtos Não Respondidos")
        .should("be.visible");
    cy.get('[class="content"]')
        .find("button")
        .contains("Limpar")
        .should("be.visible");
    cy.get('[class="content"]')
        .find("button")
        .contains("Filtrar")
        .should("be.visible");
    cy.get('[class="content"]')
        .find("button")
        .contains("Ver Produtos Excluidos")
        .should("be.visible");
    cy.get('[class="content"]')
        .find("button")
        .contains("Ver Respostas Por Produto")
        .should("be.visible");
    cy.get('[class="content"]')
        .find("button")
        .contains("Resolver Problemas De Embalagem")
        .should("be.visible");
    cy.get('[class="content"]')
        .find("label")
        .contains("Salvar")
        .should("be.visible"); //salvar
    cy.get('[class="content"]')
        .find("label")
        .contains("Total dos Pedidos:")
        .should("be.visible"); //total de pedidos
    cy.get("#todos").should("be.visible"); //checkbox Selecionar todos os produtos
    cy.get('[class="content"]')
        .find("button")
        .contains("Excluir Produtos")
        .should("be.visible");
    cy.get('[class="content"]')
        .find("button")
        .contains("Reiniciar Pedidos")
        .should("be.visible");
    cy.get('[class="content"]')
        .find("button")
        .contains("Confirmar Pedido")
        .should("be.visible");
}

export function abrirAcordeonPrimeiroPedido() {
    cy.wait(1000);
    cy.get(".estiloEspacamentoSituacao > :nth-child(1)")
        .eq(0)
        .should("be.visible")
        .click();
    cy.get('[class="MuiAccordion-region"]').should("be.visible");
    cy.wait(1000);
}

export function validarOrdenacaoPedidoAutomatico() {
    cy.get(":nth-child(3) > :nth-child(3) > .MuiBox-root")
        .should("be.visible")
        .click(); //Equivalente
    cy.wait(500);
    cy.get(".css-1eakiop > :nth-child(1) > :nth-child(5) > .MuiBox-root")
        .should("be.visible")
        .click(); //Codigo
    cy.wait(500);
    cy.get(".css-1eakiop > :nth-child(2) > :nth-child(5) > .MuiBox-root")
        .should("be.visible")
        .click(); //EAN
    cy.wait(500);
    cy.get(".css-1eakiop > :nth-child(1) > :nth-child(6) > .MuiBox-root")
        .should("be.visible")
        .click(); //Nome do produto
    cy.wait(500);
    cy.get(".css-1eakiop > :nth-child(2) > :nth-child(6) > .MuiBox-root")
        .should("be.visible")
        .click(); //Fabricante
    cy.wait(500);
    cy.get(".css-1eakiop > :nth-child(2) > :nth-child(7) > .MuiBox-root")
        .should("be.visible")
        .click(); //Cotação
    cy.wait(500);
    cy.get(".css-1eakiop > :nth-child(2) > :nth-child(8) > .MuiBox-root")
        .should("be.visible")
        .click(); //Resposta
    cy.wait(500);
    cy.get(".css-1eakiop > :nth-child(2) > :nth-child(9) > .MuiBox-root")
        .should("be.visible")
        .click(); //Pedido
    cy.wait(500);
    cy.get(':nth-child(1) > [rowspan="3"] > .MuiBox-root')
        .should("be.visible")
        .click(); //Embalagem
    cy.wait(500);
    cy.get(".css-1eakiop > :nth-child(1) > :nth-child(9) > .MuiBox-root")
        .should("be.visible")
        .click(); //Valor referencia
    cy.wait(500);
    cy.get(".css-1eakiop > :nth-child(2) > :nth-child(11) > .MuiBox-root")
        .should("be.visible")
        .click(); //Historico
    cy.wait(500);
    cy.get(".css-1eakiop > :nth-child(1) > :nth-child(10) > .MuiBox-root")
        .should("be.visible")
        .click(); //Desconto comercial
    cy.wait(500);
    cy.get(".css-1eakiop > :nth-child(2) > :nth-child(12) > .MuiBox-root")
        .should("be.visible")
        .click(); //Negociação
    cy.wait(500);
    cy.get(".css-1eakiop > :nth-child(1) > :nth-child(11) > .MuiBox-root")
        .should("be.visible")
        .click(); //valor S ST
    cy.wait(500);
    cy.get(".css-1eakiop > :nth-child(2) > :nth-child(13) > .MuiBox-root")
        .should("be.visible")
        .click(); //valor liquido
    cy.wait(500);
    cy.get(".css-1eakiop > :nth-child(1) > :nth-child(12) > .MuiBox-root")
        .should("be.visible")
        .click(); //valor C ST
    cy.wait(500);
    cy.get(".css-1eakiop > :nth-child(2) > :nth-child(14) > .MuiBox-root")
        .should("be.visible")
        .click(); //valor custo
    cy.wait(500);
    cy.get(":nth-child(1) > :nth-child(9) > .MuiBox-root > input").should(
        "be.visible"
    ); //validação do primeiro input de quantidade pedida
}

function checarFiltroDeProdutoPedidoAuto(textoParaPesquisar, eq, excluido) {
    if (excluido == true) {
        cy.get('[class="MuiAccordion-region"]')
            .eq(0)
            .find("input")
            .eq(0)
            .type(textoParaPesquisar);
        cy.get('[class="content"]')
            .find("button")
            .contains("Filtrar")
            .should("be.visible")
            .click();
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
        cy.get(".estiloEspacamentoSituacao > :nth-child(1)").should(
            "be.visible"
        );
        cy.wait(1000);
        cy.get('[class="MuiAccordion-region"]')
            .eq(0)
            .find("input")
            .eq(0)
            .type(textoParaPesquisar);
        cy.get('[class="content"]')
            .find("button")
            .contains("Filtrar")
            .should("be.visible")
            .click();
        cy.wait(1000);
        abrirAcordeonPrimeiroPedido();
        cy.get('[class="MuiAccordion-region"]')
            .eq(3)
            .find("span")
            .eq(eq)
            .invoke("text")
            .then((respostaFiltro) => {
                if (textoParaPesquisar == respostaFiltro) {
                    cy.get('[class="MuiAccordion-region"]')
                        .eq(0)
                        .find("input")
                        .eq(0)
                        .clear();
                    cy.log("Checaguem do filtro realizada com sucesso, OK");
                    return;
                } else {
                    cy.fail("Filtro não corresponde ao pesquisado");
                }
            });
    }
}

export function validacaoDoFiltroPedidoAuto() {
    let eq = 5;
    cy.get('[class="MuiAccordion-region"]').should("be.visible");
    cy.wait(500);
    cy.get('[class="MuiAccordion-region"]')
        .eq(3)
        .find("span")
        .eq(eq)
        .invoke("text")
        .then((codigo) => {
            checarFiltroDeProdutoPedidoAuto(codigo, eq);
        });
    cy.get('[class="MuiAccordion-region"]')
        .eq(3)
        .find("span")
        .eq(eq + 1)
        .invoke("text")
        .then((ean) => {
            checarFiltroDeProdutoPedidoAuto(ean, eq + 1);
        });
    cy.get('[class="MuiAccordion-region"]')
        .eq(3)
        .find("span")
        .eq(eq + 2)
        .invoke("text")
        .then((descricao) => {
            checarFiltroDeProdutoPedidoAuto(descricao, eq + 2);
        });
    cy.get('[class="MuiAccordion-region"]')
        .eq(3)
        .find("span")
        .eq(eq + 3)
        .invoke("text")
        .then((fabricante) => {
            checarFiltroDeProdutoPedidoAuto(fabricante, eq + 3);
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

function checarItens() {
    except();
    cy.get('[class="table-pedido-manual"]')
        .find("input")
        .filter('[type="checkbox"]')
        .eq(0)
        .click();
    cy.get('[class="table-pedido-manual"]')
        .find("input")
        .filter('[type="checkbox"]')
        .eq(2)
        .click();
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

function verificarCheckBox(checar) {
    let isChecked0;
    let isChecked2;
    let isCheckboxVisible;
    cy.get('[class="table-pedido-manual"]')
        .find("input")
        .filter('[type="checkbox"]')
        .eq(0)
        .invoke("prop", "checked")
        .then((value) => {
            // pega o valor do checkbox_0
            isChecked0 = value;
            cy.get('[class="table-pedido-manual"]')
                .find("input")
                .filter('[type="checkbox"]')
                .eq(2)
                .should(($checkbox) => {
                    // verifica se o checkbox_2 esta visivel
                    isCheckboxVisible = $checkbox.is(":visible");
                })
                .then(() => {
                    if (isCheckboxVisible == true) {
                        // se estiver visivel
                        cy.get('[class="table-pedido-manual"]')
                            .find("input")
                            .filter('[type="checkbox"]')
                            .eq(2)
                            .invoke("prop", "checked")
                            .then((value2) => {
                                // pega o valor do checkbox_2
                                isChecked2 = value2;
                                if (
                                    isChecked0 == false &&
                                    isChecked2 == false
                                ) {
                                    if (checar == true) {
                                        checarItens(); // marcar
                                    }
                                }
                                if (isChecked0 == true && isChecked2 == true) {
                                    if (checar == false) {
                                        checarItens(); // desmarcar
                                    }
                                } else {
                                    cy.fail(
                                        "Checkbox estranha, falhando o teste!!"
                                    );
                                }
                            });
                    } else {
                        if (checar == true) {
                            checarItens();
                        }
                    }
                });
        });
}

function checarSeProdutoEstaNoPedido(ean, excluido) {
    cy.get(".content").find("button").contains("Inserir no Pedido").click();
    if (excluido == true) {
        checarFiltroDeProdutoPedidoAuto(ean, 3, excluido);
    } else {
        checarFiltroDeProdutoPedidoAuto(ean, 3);
    }
}

export function except() {
    cy.on("uncaught:exception", (err, runnable) => {
        //criar funcao para except
        return false;
    }); // Existe um erro > Unexpected end of JSON input que não se trata de nada visual, são apenas erros que constam no console mas que o cy acusa, aqui eu excluo o erro
}

export function telaProdutosExcluidos(Inserir, excluidoPeloPedidoManual) {
    // Nessa função eu excluo o primeiro item do pedido e depois verifico se ele foi realmente excluído
    let excluido = true;
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
    cy.get('[class="MuiAccordion-region"]')
        .eq(3)
        .find("span")
        .eq(5)
        .invoke("text")
        .then((ean) => {
            cy.log(ean); //irá checar se o retorno do filtro com o primeiro ean que o pedido contem retornou corretamente
            cy.get(".MuiTable-root")
                .find("tr")
                .eq(3)
                .find("input")
                .eq(0)
                .click(); // checa o item dentro do acordeon
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
                let uncheck = false;
                let check = true;
                cy.get(".icon-button").should("be.visible");
                validarProdutoExcluido(ean);
                verificarCheckBox(uncheck);
                checarSeProdutoEstaNoPedido(ean, excluido);
                cy.get("button").contains("Ver Produtos Excluidos").click();
                validarProdutoExcluido(ean);
                verificarCheckBox(check);
                checarSeProdutoEstaNoPedido(ean);
                return;
            } else {
                cy.get(".MuiButtonBase-root")
                    .contains("Excluir Produtos")
                    .trigger("click");
                checarFiltroDeProdutoPedidoAuto(ean, 3, excluido);
            }

            abrirTelaProdutosExcluidos();
            validarProdutoExcluido(ean);
            if (Inserir == true) {
                checarItens();
                except();
                checarSeProdutoEstaNoPedido(ean);
            }
        });
}
