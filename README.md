# Portfólio pessoal

Site de currículo online desenvolvido para a Atividade Prática de Fundamentos
da Programação Web (UNINTER).

Construído em HTML5, CSS3 e JavaScript puros, **sem nenhum framework ou
biblioteca** — sem Bootstrap, Tailwind, jQuery, React ou similares.

## Estrutura de arquivos

```
/
├── index.html        Sobre mim (página inicial)
├── formacao.html     Formação acadêmica, cursos e idiomas
├── portfolio.html    Projetos realizados
├── contato.html      Formulário de contato
├── css/
│   └── estilo.css    Folha de estilo única
└── js/
    └── script.js     Interações e validação
```

## Recursos implementados

| Recurso | Onde |
|---|---|
| Menu fixo com 4 links, presente em todas as páginas | Todas |
| Indicação da página atual via `aria-current` | Todas |
| Menu responsivo com botão sanduíche | Todas |
| Alternância de tema claro/escuro com preferência salva | Todas |
| Validação de campos obrigatórios | `contato.html` |
| Validação de formato de e-mail por expressão regular | `contato.html` |
| Simulação de envio com limpeza dos campos | `contato.html` |
| Modal de confirmação "Mensagem enviada com sucesso!" | `contato.html` |
| Animação de entrada com IntersectionObserver | Todas |
| Ano do rodapé atualizado automaticamente | Todas |

## Publicação no GitHub Pages

1. Crie um repositório **público** cujo nome contenha seu nome
   (exemplo: `portfolio-joaosilva`).
2. Envie todos os arquivos para a branch `main`, mantendo o `index.html`
   na raiz do repositório.
3. No repositório, vá em **Settings → Pages**.
4. Em *Source*, selecione **Deploy from a branch**; escolha `main` e a
   pasta `/ (root)`. Salve.
5. Aguarde alguns minutos. O endereço publicado será
   `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

## Antes de publicar: campos que ainda faltam

O site já está preenchido com os dados de Matheus Yamashita Curti.
Restam apenas quatro informações, todas marcadas entre colchetes:

| Campo | Onde | O que colocar |
|---|---|---|
| `[SEU-EMAIL@DOMINIO.COM]` | `contato.html` (2x) | E-mail que você quer divulgar |
| `[ANO DE INÍCIO]` | `formacao.html` | Ano em que começou o ADS |
| `[SEU CURSO TÉCNICO OU ENSINO MÉDIO]` e `[ANO]` | `formacao.html` | Formação anterior, com instituição e período |
| `[SEU NÍVEL: ...]` | `formacao.html` | Seu nível de inglês |

No Visual Studio Code, use Ctrl+Shift+F para localizar cada um.
Se a formação anterior não fizer sentido no currículo, apague o bloco
`<article class="linha-tempo__item">` correspondente por inteiro.

## Confidencialidade

Na página de portfólio, os clientes industriais estão descritos por setor
("automotivo", "bens de consumo") em vez de nomeados. Confirme o que pode
ser divulgado antes de trocar por nomes de empresas.
