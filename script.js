/* =========================================================
   PORTFÓLIO PESSOAL — SCRIPT PRINCIPAL
   JavaScript puro (sem jQuery, React ou qualquer biblioteca).
   Responsável por: tema claro/escuro, menu responsivo,
   validação do formulário de contato, simulação de envio
   e animação de entrada dos elementos.
   ========================================================= */

/* "use strict" evita erros silenciosos, como usar uma
   variável que nunca foi declarada. */
"use strict";


/* ---------------------------------------------------------
   1. TEMA CLARO / ESCURO
   A escolha do usuário é gravada em localStorage para que o
   site abra no mesmo tema na próxima visita.
   --------------------------------------------------------- */
var CHAVE_TEMA = "portfolio-tema";

function aplicarTema(tema) {
    document.documentElement.setAttribute("data-tema", tema);

    var botao = document.getElementById("btnTema");
    if (botao) {
        // O rótulo mostra para qual tema o clique vai levar.
        botao.textContent = tema === "escuro" ? "Tema claro" : "Tema escuro";
        botao.setAttribute("aria-label", "Alternar para tema " + (tema === "escuro" ? "claro" : "escuro"));
    }
}

function iniciarTema() {
    var salvo = null;

    // O localStorage pode estar bloqueado (navegação privada, por exemplo),
    // então a leitura fica protegida por try/catch.
    try {
        salvo = localStorage.getItem(CHAVE_TEMA);
    } catch (erro) {
        salvo = null;
    }

    // Sem preferência salva, o site respeita a configuração do sistema.
    if (!salvo) {
        var sistemaEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
        salvo = sistemaEscuro ? "escuro" : "claro";
    }

    aplicarTema(salvo);

    var botao = document.getElementById("btnTema");
    if (botao) {
        botao.addEventListener("click", function () {
            var atual = document.documentElement.getAttribute("data-tema");
            var novo = atual === "escuro" ? "claro" : "escuro";

            aplicarTema(novo);

            try {
                localStorage.setItem(CHAVE_TEMA, novo);
            } catch (erro) {
                // Se não for possível gravar, o tema vale apenas nesta visita.
            }
        });
    }
}


/* ---------------------------------------------------------
   2. MENU RESPONSIVO
   Em telas pequenas o menu fica oculto e é aberto pelo botão
   sanduíche. O atributo aria-expanded mantém a informação
   acessível para leitores de tela.
   --------------------------------------------------------- */
function iniciarMenu() {
    var botao = document.getElementById("btnMenu");
    var nav = document.getElementById("navPrincipal");

    if (!botao || !nav) {
        return;
    }

    botao.addEventListener("click", function () {
        var aberto = botao.getAttribute("aria-expanded") === "true";

        botao.setAttribute("aria-expanded", String(!aberto));
        nav.setAttribute("data-aberto", String(!aberto));
    });

    // A tecla Esc fecha o menu, comportamento esperado em qualquer site.
    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape") {
            botao.setAttribute("aria-expanded", "false");
            nav.setAttribute("data-aberto", "false");
        }
    });
}


/* ---------------------------------------------------------
   3. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
   Confere se os três campos foram preenchidos e se o e-mail
   tem formato válido antes de simular o envio.
   --------------------------------------------------------- */

/* Expressão regular do e-mail: exige texto antes do @,
   um domínio, um ponto e uma extensão com 2 letras ou mais.
   Não aceita espaços em nenhuma das partes. */
var PADRAO_EMAIL = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

function marcarErro(campo, mensagem) {
    var grupo = campo.closest(".campo");

    grupo.classList.add("campo--erro");
    grupo.querySelector(".campo__erro").textContent = mensagem;

    // aria-invalid comunica o erro a quem usa leitor de tela.
    campo.setAttribute("aria-invalid", "true");
}

function limparErro(campo) {
    var grupo = campo.closest(".campo");

    grupo.classList.remove("campo--erro");
    campo.removeAttribute("aria-invalid");
}

function validarCampo(campo) {
    var valor = campo.value.trim();

    if (valor === "") {
        marcarErro(campo, "Preencha este campo antes de enviar.");
        return false;
    }

    if (campo.id === "nome" && valor.length < 3) {
        marcarErro(campo, "Informe o nome completo, com ao menos 3 letras.");
        return false;
    }

    if (campo.id === "email" && !PADRAO_EMAIL.test(valor)) {
        marcarErro(campo, "Use um formato válido, como nome@dominio.com.");
        return false;
    }

    if (campo.id === "mensagem" && valor.length < 10) {
        marcarErro(campo, "Escreva uma mensagem com pelo menos 10 caracteres.");
        return false;
    }

    limparErro(campo);
    return true;
}

function iniciarFormulario() {
    var formulario = document.getElementById("formContato");

    // As demais páginas não têm formulário, então a função encerra aqui.
    if (!formulario) {
        return;
    }

    var campos = [
        document.getElementById("nome"),
        document.getElementById("email"),
        document.getElementById("mensagem")
    ];

    // O erro some assim que o usuário começa a corrigir o campo.
    campos.forEach(function (campo) {
        campo.addEventListener("input", function () {
            if (campo.closest(".campo").classList.contains("campo--erro")) {
                validarCampo(campo);
            }
        });
    });

    formulario.addEventListener("submit", function (evento) {
        // Impede o recarregamento da página: o envio é simulado.
        evento.preventDefault();

        var valido = true;
        var primeiroErro = null;

        campos.forEach(function (campo) {
            if (!validarCampo(campo)) {
                valido = false;

                if (primeiroErro === null) {
                    primeiroErro = campo;
                }
            }
        });

        if (!valido) {
            // Leva o usuário direto ao primeiro campo com problema.
            primeiroErro.focus();
            return;
        }

        // Validação aprovada: limpa os campos e confirma o envio.
        formulario.reset();
        abrirModal();
    });
}


/* ---------------------------------------------------------
   4. JANELA MODAL DE CONFIRMAÇÃO
   Substitui o alert() padrão do navegador por uma caixa
   integrada ao visual do site.
   --------------------------------------------------------- */
function abrirModal() {
    var modal = document.getElementById("modalSucesso");
    if (!modal) {
        return;
    }

    modal.setAttribute("data-aberto", "true");

    var fechar = document.getElementById("btnFecharModal");
    if (fechar) {
        fechar.focus();
    }
}

function fecharModal() {
    var modal = document.getElementById("modalSucesso");
    if (modal) {
        modal.setAttribute("data-aberto", "false");
    }
}

function iniciarModal() {
    var modal = document.getElementById("modalSucesso");
    if (!modal) {
        return;
    }

    var botao = document.getElementById("btnFecharModal");
    if (botao) {
        botao.addEventListener("click", fecharModal);
    }

    // Clicar fora da caixa também fecha.
    modal.addEventListener("click", function (evento) {
        if (evento.target === modal) {
            fecharModal();
        }
    });

    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape") {
            fecharModal();
        }
    });
}


/* ---------------------------------------------------------
   5. ANIMAÇÃO DE ENTRADA
   O IntersectionObserver avisa quando o elemento entra na
   área visível, e só então a classe de exibição é aplicada.
   --------------------------------------------------------- */
function iniciarRevelacao() {
    var alvos = document.querySelectorAll(".revelar");

    if (alvos.length === 0) {
        return;
    }

    // Navegadores antigos sem suporte recebem tudo já visível.
    if (!("IntersectionObserver" in window)) {
        alvos.forEach(function (alvo) {
            alvo.classList.add("visivel");
        });
        return;
    }

    var observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visivel");

                // Uma vez exibido, o elemento sai da observação.
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.15 });

    alvos.forEach(function (alvo) {
        observador.observe(alvo);
    });
}


/* ---------------------------------------------------------
   6. ANO AUTOMÁTICO NO RODAPÉ
   Evita ter que atualizar o ano manualmente todo mês de janeiro.
   --------------------------------------------------------- */
function iniciarAno() {
    var alvo = document.getElementById("anoAtual");

    if (alvo) {
        alvo.textContent = new Date().getFullYear();
    }
}


/* ---------------------------------------------------------
   7. PARTIDA
   Espera o HTML estar montado para procurar os elementos.
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
    iniciarTema();
    iniciarMenu();
    iniciarFormulario();
    iniciarModal();
    iniciarRevelacao();
    iniciarAno();
});
