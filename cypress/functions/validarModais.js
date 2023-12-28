let contador;

function clicarNoBotaoTelaResumo(nomeNoBotao) {
    cy.get('[class="pedido-resumo-page"]')
        .find("button")
        .contains(nomeNoBotao)
        .should("be.visible")
        .click();
}

function modalIsVisible() {
    cy.get("#rc-modal-title").should("be.visible");
    cy.get("#rc-modal-descr").should("be.visible");
}

function checarTodosDadosModalLupa() {
    let listNomeColunasModal = [
        "",
        "",
        "Código / EAN",
        "Nome do Produto / Fabricante",
        "Cot.",
        "Resp.",
        "Emb.",
        "Desc.",
        "Vl. S/ ST",
        "Vl. C/ ST",
    ];
    let listDadosCabecalho = [
        "Fornecedor:",
        "Representante:",
        "Cliente:",
        "Faturamento mínimo:",
        "Validade da resposta:",
        "Prazo de pagamento:",
        "Prazo de entrega:",
        "Observação:",
        "Produto:",
    ];
    // verificar de modal é completamente visivel
    modalIsVisible();
    cy.get("#rc-modal-descr")
        .find('[class="MuiAccordion-region"]')
        .should("be.visible");
    cy.get("#rc-modal-descr")
        .find('[data-testid="conteudo-tabela-cell"]')
        .should("be.visible");
    cy.get("#rc-modal-descr")
        .find("span")
        .each((dadosModalSpan, indexSpan) => {
            if (!dadosModalSpan.text()) {
                cy.fail(
                    `Verificar textos dentro da modal, falhou em: span[${indexSpan}]`
                );
            }
        });
    cy.get("#rc-modal-descr")
        .find("span")
        .find("strong")
        .each((dadosModalStrong, indexStrong) => {
            if (!dadosModalStrong.text() == listDadosCabecalho[indexStrong]) {
                cy.fail(
                    `Verificar textos dentro da modal, falhou em: span[${indexSpan}]`
                );
            } else {
                cy.log(`texto validado: ${dadosModalStrong.text()}`);
            }
        });
    cy.get("#rc-modal-descr")
        .find("thead")
        .first()
        .find("td")
        .each((dadosColuna, indexDadosColuna) => {
            if (!dadosColuna.text() == listNomeColunasModal[indexDadosColuna]) {
                cy.fail(
                    `Verificar textos dentro da modal, falhou em: span[${indexDadosColuna}]`
                );
            } else {
                cy.log(`texto validado: ${dadosColuna.text()}`);
            }
        });
}

function checarOrdenacaoLupaApenasClique() {
    //checar a ordenação, aqui serao realizados cliques em todos os campos de ordenação
    cy.get("#rc-modal-descr")
        .find("thead")
        .first()
        .find("td")
        .each((colunaOrdenar) => {
            cy.get(colunaOrdenar).click().wait(200).click().wait(200).click();
        });
}

function checarFiltroDeProdutoPorItemLupa(
    textoParaPesquisar,
    tentativa,
    eq,
    paraComparar = null
) {
    cy.get(":nth-child(2) > input").type(textoParaPesquisar);
    cy.log("Esperando 2 segundos para checar retorno do filtro");
    cy.wait(2000);
    cy.get("div.MuiTableContainer-root:nth-child(3) > table:nth-child(1)")
        .find("span")
        .eq(eq)
        .invoke("text")
        .then((textoResposta) => {
            if (paraComparar == null) {
                if (textoParaPesquisar !== textoResposta) {
                    tentativa += 1;
                    if (tentativa <= 5) {
                        checarFiltroDeProdutoPorItemLupa(
                            textoParaPesquisar,
                            (tentativa = tentativa)
                        );
                    }
                    cy.fail("Filtro não retornou o que foi pesquisado");
                }
            } else {
                if (paraComparar == textoResposta) {
                    tentativa += 1;
                    if (tentativa <= 5) {
                        checarFiltroDeProdutoPorItemLupa(
                            textoParaPesquisar,
                            (tentativa = tentativa)
                        );
                    }
                    cy.fail("Filtro não retornou o que foi pesquisado");
                }
            }
        });
    cy.get(":nth-child(2) > input").clear();
}

function checarQuantidadeDeItensLupa(quantidadeCerta) {
    cy.get("#rc-modal-descr")
        .find('[data-testid="conteudo-tabela-row"]')
        .then((linhasAtuais) => {
            let linhaAgora = linhasAtuais.length;
            if (linhaAgora != quantidadeCerta) {
                cy.wait(250);
                cy.log(
                    "quantidade diferente: linha agora=",
                    linhaAgora + " x linaCerta: ",
                    quantidadeCerta
                );
                cy.log("contador: ", contador);
                checarQuantidadeDeItensLupa(quantidadeCerta);
                contador += 1;
                if (contador == 50) {
                    cy.fail(
                        "Não esta retoranando a quantidade certa de itens na moral de resposta"
                    );
                }
            } else {
                cy.log("Tempinho pós verificação");
                cy.wait(1000);
            }
        });
}

function checarFiltroDeProdutoModalLupa() {
    let indiceAleatorio;
    let quantidadeItens;
    checarOrdenacaoLupaApenasClique();
    cy.get("#rc-modal-descr")
        .find('[data-testid="conteudo-tabela-row"]')
        .then((linhaProdutoModal) => {
            indiceAleatorio = Math.floor(
                Math.random() * linhaProdutoModal.length
            );
            quantidadeItens = linhaProdutoModal.length;
        });

    cy.get("#rc-modal-descr")
        .find('[data-testid="conteudo-tabela-row"]')
        .then((linhaProdutoModal) => {
            cy.get(linhaProdutoModal[indiceAleatorio])
                .find('[data-testid="conteudo-tabela-cell"]')
                .eq(2)
                .find("span")
                .eq(0)
                .invoke("text")
                .then((codigo) => {
                    checarFiltroDeProdutoPorItemLupa(codigo, 0, 1);
                }); // codigo
            contador = 0;
            checarQuantidadeDeItensLupa(quantidadeItens);
        });

    cy.get("#rc-modal-descr")
        .find('[data-testid="conteudo-tabela-row"]')
        .then((linhaProdutoModal) => {
            cy.get(linhaProdutoModal[indiceAleatorio])
                .find('[data-testid="conteudo-tabela-cell"]')
                .eq(2)
                .find("span")
                .eq(1)
                .invoke("text")
                .then((ean) => {
                    checarFiltroDeProdutoPorItemLupa(ean, 0, 0);
                }); // ean
            contador = 0;
            checarQuantidadeDeItensLupa(quantidadeItens);
        });

    cy.get("#rc-modal-descr")
        .find('[data-testid="conteudo-tabela-row"]')
        .then((linhaProdutoModal) => {
            cy.get(linhaProdutoModal[indiceAleatorio])
                .find('[data-testid="conteudo-tabela-cell"]')
                .eq(3)
                .find("span")
                .eq(0)
                .invoke("text")
                .then((descricao) => {
                    checarFiltroDeProdutoPorItemLupa(descricao, 0, 2);
                }); // nome do produto
            contador = 0;
            checarQuantidadeDeItensLupa(quantidadeItens);
        });
    cy.get("#rc-modal-descr")
        .find('[data-testid="conteudo-tabela-row"]')
        .then((linhaProdutoModal) => {
            cy.get(linhaProdutoModal[indiceAleatorio])
                .find('[data-testid="conteudo-tabela-cell"]')
                .eq(3)
                .find("span")
                .eq(1)
                .invoke("text")
                .then((fabricante) => {
                    let stringFabricante = fabricante.split(" ", 1);
                    let fabricanteNome = stringFabricante[0];
                    checarFiltroDeProdutoPorItemLupa(
                        fabricanteNome,
                        0,
                        3,
                        fabricanteNome
                    );
                }); // fabricante
            contador = 0;
            checarQuantidadeDeItensLupa(quantidadeItens);
        });
}

export function acessarModalRespostaFornecedorLupa(indexResposta) {
    cy.get('[data-testid="bloco-resposta-representante"]')
        .eq(indexResposta)
        .find('[data-testid="lupa-detalhes"]')
        .then((lupa) => {
            if (lupa.length == 1) {
                lupa.click();
            } else {
                lupa.click();
            }
            checarTodosDadosModalLupa();
            checarFiltroDeProdutoModalLupa();
        });
    cy.get(".backdrop-content--header-close").click();
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
        cy.get(".react-datepicker__day--0" + dia).each((diaButton) => {
            // console.log(diaButton, i);
            cy.get(diaButton)
                .invoke("attr", "aria-disabled")
                .then((diaButtonisNotClicavel) => {
                    cy.log(diaButtonisNotClicavel);
                    if (diaButtonisNotClicavel == "false") {
                        cy.get(diaButton).click(); // verificação para quando tem mais de um dia igual
                    }
                });
        }); // ex: quando for o dia 10 o index do dia na tooltip vai com um 0 a menos
    } else {
        cy.get(".react-datepicker__day--00" + dia)
            .first()
            .click();
    }

    cy.get(".alterar-vencimento-middle-time-picker").click();
    cy.get(".react-datepicker").contains("23:30").click(); // usado para setar a hora na modal
    cy.get("button").contains("Confirmar").click();
}

export const funcoesBotaoModal = {
    alterarVencimento: function alterarVencimento() {
        clicarNoBotaoTelaResumo("Alterar Vencimento");
        modalIsVisible();
        cy.get("#rc-modal-title").contains("Alterar Vencimento");
        cy.get("#rc-modal-descr").contains("Data e hora de vencimento");
        cy.get("#rc-modal-descr").find("button").contains("Confirmar");
        cy.get("#rc-modal-descr").find("button").contains("Cancelar").click();
    },
    cancelarCotacao: function cancelarCotacao() {
        clicarNoBotaoTelaResumo("Cancelar Cotação");
        modalIsVisible();
        cy.get("#rc-modal-title").contains("Aviso");
        cy.get("#rc-modal-descr").contains(
            "Ao cancelar uma cotação, todas as informações serão perdidas e não será possível acessá-la novamente ou enviar pedidos."
        );
        cy.get("#rc-modal-descr").contains(
            "Deseja realmente cancelar esta cotação?"
        );
        cy.get("#rc-modal-descr").contains("Motivo do cancelamento:");
        cy.get("#rc-modal-descr").find("img"); // ver se existe uma imagem na modal
        cy.get("#rc-modal-descr").find("textarea"); // validar input
        cy.get("#rc-modal-descr")
            .find("textarea")
            .type("Qualquer coisa só para ver se esta escrevendo normal");
        cy.get("#rc-modal-descr").contains("Não").click();
    },
    pedidoAutoAndManual: function pedidoAutomaticoManual() {
        clicarNoBotaoTelaResumo("Pedido Automático");
        modalIsVisible();
        cy.get("#rc-modal-title").contains("Pedido");
        cy.get("#rc-modal-descr").contains(
            "Deseja realmente iniciar o pedido?"
        );
        cy.get("#rc-modal-descr").contains("Não").click();
        cy.get(".pedido-resumo-page > :nth-child(3)")
            .find("button")
            .contains("Pedido Manual")
            .should("be.visible")
            .click();
        modalIsVisible();
        cy.get("#rc-modal-title").contains("Pedido");
        cy.get("#rc-modal-descr").contains(
            "Deseja realmente iniciar o pedido?"
        );
        cy.get("#rc-modal-descr").contains("Não").click();
    },
};
