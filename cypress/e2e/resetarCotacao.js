import * as until from "./pedidoAutomatico.js";

export function reiniciarCompletamenteCotacao() {
    cy.get(".pedido-resumo-page > :nth-child(3)")
        .find("button")
        .then((buttonsArray) => {
            const count = buttonsArray.length;
            if (count == 6) {
                cy.log("NAO TEM O VER PEDIDO");
                let textButton = buttonsArray.get(-1).textContent;
                cy.log(textButton);
                if (textButton == "Pedido Manual") {
                    until.except();
                    until.reiniciarPedidoAlterarVencimento(true);
                } else {
                    cy.log("Cotacao ja esta para encerrar, OK");
                    return;
                }
            } else {
                cy.log("TEM O VER PEDIDO");
                until.acessarPedidoAutoGerado();
                until.reiniciarPedidoAlterarVencimento(false);
            }
        });
    cy.get("button").contains("Encerrar cotação").should("be.visible");
}
