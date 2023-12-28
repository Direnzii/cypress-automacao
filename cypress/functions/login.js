import except from "./except";

let contador;

function visit(url) {
    cy.visit(url);
}

function adicionarIdCotacaoInput(idCotacao) {
    cy.get("#cod").clear();
    cy.get("#cod").type(idCotacao);
    cy.get("#cod")
        .invoke("val")
        .then((inputCotacao) => {
            cy.log(inputCotacao);
            if (idCotacao != inputCotacao) {
                cy.get("#cod").click();
                cy.get("#cod").type(idCotacao);
            }
        });
}

export function login(usuario, senha, url, amplify) {
    // quando a base for direto no amplify
    if (amplify === true) {
        contador = 1;
        while (true) {
            try {
                visit(url);
                cy.get(
                    "div.css-1lxwves:nth-child(1) > input:nth-child(2)"
                ).type(usuario);
                cy.get(
                    "div.MuiBox-root:nth-child(2) > input:nth-child(2)"
                ).type(senha);
                cy.get("button").contains("Ok").click();
            } catch {
                cy.wait(2000);
                cy.log("Tentativa de número: " + contador);
                contador += 1;
                if (contador == 11) {
                    // qtd maxima de 10 tentativas
                    cy.fail(
                        "Quantidade maxima de tentativas atingida para logar no amplify, considerado errado"
                    );
                }
            }
            return;
        }
    }
    // se nao for o amplify, o padrão é que seja o demo default

    visit(url);

    cy.get("#frmLogin\\:username").type(usuario);
    cy.get("#frmLogin\\:password").type(senha);
    cy.get("#frmLogin\\:loginButton").click();
}

export function login_incorreto(url) {
    visit(url);

    cy.get("#frmLogin\\:username").type("1212");
    cy.get("#frmLogin\\:password").type("1212");
    cy.get("#frmLogin\\:loginButton").click();
    cy.get(".mensagem_erro").contains("Usuário ou senha incorretos");
}

export function acessandoCliente(usuario) {
    cy.get("#mnTopo > .tab_label_true").should("be.visible");
    cy.get(":nth-child(1) > :nth-child(2) > input")
        .should("be.visible")
        .type(usuario);
    cy.get("#pesquisarUsuarios\\:btnPesquisar").click();
    cy.get("a:contains(Logar)")
        .invoke("attr", "onclick")
        .then((onclick) => {
            const updatedOnclick = onclick.replace(/_blank/g, "_self"); // aqui eu troco o atribudo _blank do onclick para _self, para abrir na mesma aba
            cy.get("a:contains(Logar)")
                .invoke("attr", "onclick", updatedOnclick)
                .click();
        });
    // cy.get('img[src="/CTFLLogan-webapp/images/icons/inicio_m.png"]').click()
}

export function acessandoCotacao(idCotacao, amplify) {
    if (amplify === true) {
        contador = 1;
        while (true) {
            try {
                cy.get('[href="/cotacao"]').click();
                cy.get("button")
                    .contains("CONSULTAR COTAÇÕES")
                    .should("be.visible")
                    .click();
                adicionarIdCotacaoInput(idCotacao);
                cy.get("button").contains("Buscar").click();
                except();
                cy.get('[class="MuiAccordion-region"]')
                    .find("thead")
                    .eq(1)
                    .find("a")
                    .click();
            } catch {
                cy.wait(2000);
                cy.log("Tentativa de número: " + contador);
                contador += 1;
                if (contador == 11) {
                    // qtd maxima de 10 tentativas
                    cy.fail(
                        "Quantidade maxima de tentativas atingida para acessar a cotação, considerado errado"
                    );
                }
            }
            return;
        }
    }
    cy.get("img")
        .filter('[src="/CTFLLogan-webapp/images/icons/cotacao_m.png"]')
        .should("be.visible");
    cy.get("img")
        .filter('[src="/CTFLLogan-webapp/images/icons/cotacao_m.png"]')
        .click();
    cy.get("input").contains("Consultar Cotações").should("be.visible").click();
    cy.get("td").eq(12).find("input").should("be.visible").type(idCotacao);
    cy.get('[class="botao3"]').should("be.visible").click();
    except();
    cy.get("[class=rich-table-cell]").eq(1).find("a").click();
}

export function iFrameRogan() {
    cy.wait(5000);
    cy.iframe("#roganJsGeral")
        .as("iframe")
        .find('[class="pedido-resumo-page"]')
        .find("button")
        .contains("Ver Pedidos")
        .click();
    cy.screenshot();
}
