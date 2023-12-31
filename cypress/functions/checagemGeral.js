import { acessarModalRespostaFornecedorLupa } from "./validarModais.js";

function verificarCheckBox(checkIndex, indexResposta) {
    cy.wait(1000); // repensar essa validação
    cy.get('[data-testid="bloco-resposta-representante"]')
        .eq(indexResposta)
        .find('[data-testid="checkbox-resumo"]')
        .eq(checkIndex)
        .invoke("prop", "checked")
        .then((i) => {
            if (i == true) {
                cy.get('[data-testid="bloco-resposta-representante"]')
                    .eq(indexResposta)
                    .find('[data-testid="checkbox-resumo"]')
                    .eq(checkIndex)
                    .uncheck();
                cy.wait(700);
                cy.get('[data-testid="bloco-resposta-representante"]')
                    .eq(indexResposta)
                    .find('[data-testid="checkbox-resumo"]')
                    .eq(checkIndex)
                    .check();
            } else {
                cy.get('[data-testid="bloco-resposta-representante"]')
                    .eq(indexResposta)
                    .find('[data-testid="checkbox-resumo"]')
                    .eq(checkIndex)
                    .check();
            }
        });
}

function compararSinalizadores(a, b) {
    if (a.length !== b.length) {
        cy.fail("Sinalizadores não batem");
    }
    const sortedA = a.slice().sort();
    const sortedB = b.slice().sort();
    const elements = [a, b];
    cy.log("listas de sinalizadores ex in: ", elements);
    for (let i = 0; i < sortedA.length; i++) {
        if (sortedA[i] !== sortedB[i]) {
            cy.fail("Sinalizadores não batem");
        }
    }
}

function inicioValidacoesBlocoRepresentante() {
    cy.get('[data-testid="DoubleArrowIcon"]').then((count) => {
        // pegar a quantidade de "Visualizar respostar por filial"
        cy.wrap(count).its("length").as("quantidadeBlocoRespostaPorFilial");
    });
    cy.get("@quantidadeBlocoRespostaPorFilial").then(
        (quantidadeBlocoRespostaPorFilial) => {
            verificarTableDeRespostas(quantidadeBlocoRespostaPorFilial);
        }
    );
}

export function verificarTableDeRespostas(quantidade, sinalizador = "") {
    let listaSinExterno = [];
    let listaSinInterno = [];
    cy.log(`Quantidade de elementos: ${quantidade}`);
    const lista = new Array(quantidade).fill(0); // Por bloco resposta representante
    lista.forEach((_i, indexResposta) => {
        cy.get('[data-testid="DoubleArrowIcon"]').eq(indexResposta).click(); // abre o acordeon da resposta
        cy.get('[data-testid="bloco-resposta-representante"]')
            .eq(indexResposta)
            .find("[data-testid^=sinalizadores-bloco-]")
            .then((data) => {
                const sinalizadoresList = new Array(data.length).fill(0); // Se tiver algun sinalizador Sucess vai entrar acessar a lupa e fazer as validações
                sinalizadoresList.forEach((_i, index) => {
                    cy.get(data[index])
                        .invoke("attr", "data-testid")
                        .then((sinalizador_then) => {
                            sinalizador = sinalizador_then.split("-")[2];
                            listaSinExterno.push(sinalizador); // array checado e registrando corretamenteo todos os dados
                            if (sinalizador == "success") {
                                // abaixo, ja dentro do bloco representante eu valido as checkbox, se sao visiveis e se funcionam
                                cy.get(
                                    '[data-testid="bloco-resposta-representante"]'
                                )
                                    .eq(indexResposta)
                                    .find('[data-testid="checkbox-resumo"]')
                                    .then((checks) => {
                                        const checkList = new Array(
                                            checks.length
                                        ).fill(0); // Por checkbox
                                        checkList.forEach((_i, index) => {
                                            verificarCheckBox(
                                                index,
                                                indexResposta
                                            );
                                        });
                                    });
                                // abaixo, função para abrir modal e realizar validações
                                acessarModalRespostaFornecedorLupa(
                                    indexResposta
                                );
                            }
                        });
                });
            });
        cy.get('[data-testid="bloco-resposta-representante"]')
            .eq(indexResposta)
            .find("[data-testid^=conteudo-tabela-codigoMotivo-]")
            .then((motivos) => {
                const motivoList = new Array(motivos.length).fill(0); // Por codigo motivo dentro do bloco
                motivoList.forEach((_i, index) => {
                    cy.get(motivos[index])
                        .invoke("attr", "data-testid")
                        .then((motivo) => {
                            const guia = [
                                {
                                    id: "information",
                                    mensagem: "Aguardando Resposta",
                                },
                                {
                                    id: "integration",
                                    mensagem: "Usuário e/ou senha inválido.",
                                },
                                {
                                    id: "estoque",
                                    mensagem: "Não possui os itens em estoque",
                                },
                                {
                                    id: "success",
                                    mensagem: "Respondida",
                                },
                                {
                                    id: "warning",
                                    mensagem: "Resposta Vencida",
                                },
                                {
                                    id: "warning",
                                    mensagem: "Resposta Atrasada",
                                },
                                {
                                    id: "error",
                                    mensagem: null,
                                },
                            ];
                            motivo = motivo.split("-")[3];
                            const motivoId = guia.find(
                                (item) => item.mensagem == motivo
                            );
                            if (!motivoId) {
                                listaSinInterno.push("error");
                            } else {
                                listaSinInterno.push(motivoId.id);
                            }
                        });
                });
            });
    });
    compararSinalizadores(listaSinInterno, listaSinExterno);
}

function verificarAcordeonCliente(quantidade) {
    const lista = new Array(quantidade).fill(0);
    lista.forEach((_i, index) => {
        cy.get('[data-testid="acordeon-cliente"]').eq(index).click();
        cy.wait(500);
        cy.get('[data-testid="interior-acordeon-cliente"]')

            .eq(index)
            .find("span")
            .then((elements) => {
                for (let i = 0; i < elements.length; i++) {
                    cy.log(elements[i].textContent.split(":")[1]);
                    if (!elements[i].textContent.split(":")[1]) {
                        // checar se tem algo vazio no acordeon
                        cy.fail(
                            "Existe algum elemento dentro do acordeon da filial sem nada, elemento index: " +
                                i
                        );
                    }
                }
            });
        cy.get('[data-testid="acordeon-cliente"]').eq(index).click();
    });
}

function elementosEscritosAcordeonCliente() {
    cy.get('[data-testid="acordeon-cliente"]').then((count) => {
        // pegar a quantidade de "Visualizar respostar por filial"
        cy.wrap(count).its("length").as("quantidadeElementos");
    });
    cy.get("@quantidadeElementos").then((quantidade) => {
        verificarAcordeonCliente(quantidade);
    });
}

function checagemDeRespostasCategoria(elemento, index) {
    function scrollRight(i) {
        if (i >= 3) {
            // se o elemento estiver na posição 3 ou a cima, eu scrollo para a direita
            cy.get('[data-rbd-droppable-id="droppable"]')
                .scrollTo("right", { ensureScrollable: true })
                .wait(500);
        }
    }
    scrollRight(index);
    let id = "#" + elemento;
    cy.get(id).then(($els) => {
        const win = $els[0].ownerDocument.defaultView;
        const before = win.getComputedStyle($els[0], "before");
        var contentValue = before.getPropertyValue("content"); // pegar o valor do pseudoElemento
        cy.get(id).click();
        cy.log("elemento: ", elemento);
        cy.log("contentValue: ", contentValue);
        if (contentValue === `"0"`) {
            scrollRight(index);
            cy.get('[class="pedido-resumo-page"]')
                .find("div")
                .contains("Categoria selecionada não encontrada!")
                .should("be.visible");
            cy.get(id).should("be.visible").click();
        } else {
            cy.get("[data-testid^=sinalizadores-bloco-]")
                .eq(0)
                .then((check_sinalizador) => {
                    cy.get(check_sinalizador)
                        .eq(0)
                        .invoke("attr", "data-testid")
                        .then((check_sinalizador_then) => {
                            let sinalizador =
                                check_sinalizador_then.split("-")[2];
                            if (sinalizador != elemento) {
                                cy.fail(
                                    "Sinalizador exibido ao filtrar é diferente do que foi clicado"
                                );
                            }
                        });
                });
            scrollRight(index);
            cy.get(id).should("be.visible").click();
        }
    });
}

function checagemDeCategoriaBotoes() {
    cy.get('[data-rbd-droppable-id="droppable"]')
        .find("label")
        .then((categorias) => {
            const listaCategorias = new Array(categorias.length).fill(0);
            listaCategorias.forEach((_i, index) => {
                cy.get('[data-rbd-droppable-id="droppable"]')
                    .find("label")
                    .eq(index)
                    .invoke("attr", "id")
                    .then((id) => {
                        cy.log("id: ", id);
                        cy.log("i: ", index);
                        checagemDeRespostasCategoria(id, index);
                    });
            });
        });
    cy.log("Checagem dos botões de categorias da tela OK");
}

export function encerrarCot() {
    cy.get("button").contains("Encerrar cotação").should("be.visible").click(); //encerrar cotação
    cy.get("button").contains("Exportar Produtos").should("be.visible"); //exportar produtos
    cy.get("button").contains("Cancelar Cotação").should("be.visible"); //cancelar cotacao
    cy.get("button").contains("Alterar Vencimento").should("be.visible"); //alterar vencimento
    cy.get("button")
        .contains("Ver Produtos Não Respondidos")
        .should("be.visible"); //ver produtos nao respondidos
    cy.get("button").contains("Pedido Automático").should("be.visible"); //pedido automatico
    cy.get("button").contains("Pedido Manual").should("be.visible"); //pedido manual
}

export function checagemElementosTelaResumo(encerrar = null, count = 0) {
    cy.get('[class="pedido-resumo-page"]')
        .invoke("text")
        .then((content) => {
            cy.log(content);
            if (content == "" || !content) {
                cy.wait(1000);
                if (count < 5) {
                    count += 1;
                    checagemElementosTelaResumo(amplify, count);
                } else {
                    cy.fail("Não carregou o conteudo da pagina");
                }
            }
        });
    if (encerrar != null && encerrar == true) {
        encerrarCot();
    } else {
        cy.get("button").contains("Exportar Produtos").should("be.visible"); //exportar produtos
        cy.get("button").contains("Verificar respostas").should("be.visible"); //verificar respostas
        cy.get("button").contains("Cancelar Cotação").should("be.visible"); //cancelar cotacao
        cy.get("button").contains("Alterar Vencimento").should("be.visible"); //alterar vencimento
        cy.get("button")
            .contains("Ver Produtos Não Respondidos")
            .should("be.visible"); //ver produtos nao respondidos
        cy.get("button").contains("Encerrar cotação").should("be.visible"); //encerrar cotação
    }
    checagemDeCategoriaBotoes();
    elementosEscritosAcordeonCliente();
    return;
}

export function blocoRespostaFornecedor() {
    inicioValidacoesBlocoRepresentante();
}
