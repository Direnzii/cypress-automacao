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
