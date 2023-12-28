import except from "./except";

export function checkUncheckPedidoManual(check, qtd = 1) {
    cy.get('[class="table-pedido-manual-body--row resposta branco "]')
        .eq(0)
        .find("input")
        .eq(1)
        .clear();
    cy.get('[class="table-pedido-manual-body--row resposta branco "]')
        .eq(0)
        .find("input")
        .eq(1)
        .type(qtd);
    cy.wait(1000);
    let isCheckboxVisible;
    cy.get('[class="table-pedido-manual"]')
        .find("input")
        .filter('[type="checkbox"]')
        .eq(0)
        .invoke("prop", "checked")
        .then(() => {
            // checkCliente
            // pega o valor do checkbox_0 = check cliente
            cy.get('[class="table-pedido-manual"]')
                .find("input")
                .filter('[type="checkbox"]')
                .eq(2)
                .should(($seCheckRespostaIsVisible) => {
                    // verifica se o checkbox_2 esta visivel = check resposta
                    isCheckboxVisible =
                        $seCheckRespostaIsVisible.is(":visible");
                })
                .then(() => {
                    if (isCheckboxVisible == true) {
                        // se estiver visivel
                        cy.get('[class="table-pedido-manual"]')
                            .find("input")
                            .filter('[type="checkbox"]')
                            .eq(2)
                            .invoke("prop", "checked")
                            .then((checkResposta) => {
                                if (check && !checkResposta) {
                                    clicarNasChecks(false, false, true);
                                }
                            });
                    } else {
                        clicarNasChecks(false, true, false);
                        checkUncheckPedidoManual(check);
                    }
                });
        });
}

function clicarNasChecks(c1 = false, c2 = false, c3 = false) {
    except();

    if (c1) {
        cy.get('[class="table-pedido-manual"]')
            .find("input")
            .filter('[type="checkbox"]')
            .eq(0)
            .click();
    }
    if (c2) {
        cy.wait(1000);
        cy.get('[class="table-pedido-manual"]')
            .find("input")
            .filter('[type="checkbox"]')
            .eq(1)
            .click();
    }
    if (c3) {
        cy.wait(1000);
        cy.get('[class="table-pedido-manual"]')
            .find("input")
            .filter('[type="checkbox"]')
            .eq(2)
            .click();
    }
}
