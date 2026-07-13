# Anota Aí, Dev! 📝

> Anotações de um desenvolvedor sobre tecnologia, programação, arquitetura e carreira. Este blog é o backup do meu cérebro.

Este é o repositório do blog **Anota Aí, Dev!**, construído utilizando o gerador de sites estáticos [Hugo](https://gohugo.io/).

---

## 🛠️ Tecnologias Utilizadas

- **[Hugo](https://gohugo.io/)** (SSG - Static Site Generator)
- **HTML5 & CSS3** (Layouts customizados, sem temas externos)
- **GitHub Actions** (Automação de deploy contínuo)
- **GitHub Pages** (Hospedagem do site)

---

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos

Para rodar o projeto em sua máquina local, você precisará ter o **Hugo** instalado. Recomendamos a versão **Hugo Extended** (versão `0.163.3` ou superior, compatível com os assets).

- **Windows** (via [Chocolatey](https://chocolatey.org/) ou [Scoop](https://scoop.sh/)):
  ```bash
  choco install hugo-extended
  # ou
  scoop install hugo-extended
  ```
- **macOS** (via [Homebrew](https://brew.sh/)):
  ```bash
  brew install hugo
  ```
- **Linux** (Debian/Ubuntu):
  ```bash
  sudo apt install hugo
  ```

### Passos para Execução

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/victorvieiradev/anotaaidev.git
   cd site
   ```

2. **Inicie o servidor de desenvolvimento do Hugo:**
   ```bash
   hugo server
   ```

3. **Acesse no seu navegador:**
   Abra o endereço [http://localhost:1313/](http://localhost:1313/) para visualizar o site localmente com suporte a *Live Reload* (as alterações são refletidas instantaneamente).

---

## 🤝 Como Colaborar

Contribuições são muito bem-vindas! Você pode ajudar tanto escrevendo **novos artigos (posts)** quanto realizando **correções de bugs** ou melhorias no layout/código.

### ✍️ 1. Criando Novos Artigos (Posts)

Se você quer compartilhar conhecimento e publicar um novo artigo no blog:

1. **Crie um novo arquivo de post:**
   Execute o seguinte comando no terminal (na raiz do projeto):
   ```bash
   hugo new posts/nome-do-seu-artigo.md
   ```
   Isso criará automaticamente um arquivo estruturado com o template padrão em `content/posts/nome-do-seu-artigo.md`.

2. **Edite o Front Matter (metadados do artigo):**
   Abra o arquivo gerado e configure o cabeçalho YAML/TOML. Exemplo:
   ```yaml
   ---
   title: "Título do Seu Artigo"
   date: 2026-07-13T19:00:00-03:00
   description: "Breve resumo sobre o que trata o artigo."
   categories: ["Tecnologia", "Programação"]
   tags: ["Exemplo", "Tutorial"]
   draft: true
   ---
   ```
   *Nota: Altere `draft: true` para `draft: false` quando o post estiver finalizado e pronto para ser publicado.*

3. **Escreva seu artigo:**
   Escreva o conteúdo em formato Markdown abaixo do cabeçalho. Você pode rodar `hugo server` para ver o preview do seu post em tempo real no navegador.

---

### 🐛 2. Correções de Bugs ou Melhorias no Layout/CSS

Se você encontrou algum bug visual, erro ou deseja sugerir melhorias na estrutura:

- **Estrutura de Diretórios:**
  - Os templates e estruturas HTML estão localizados no diretório `layouts/`.
  - O arquivo de estilos CSS customizado está em `assets/css/style.css`.
  - Imagens, scripts JS e outros arquivos estáticos ficam em `static/`.

- **Fluxo de Trabalho para Envio de Alterações:**
  1. Faça um **Fork** deste repositório.
  2. Crie uma branch para a sua alteração:
     ```bash
     git checkout -b feature/minha-melhoria
     # ou
     git checkout -b bugfix/corrigir-erro-visual
     ```
  3. Realize os ajustes desejados e valide localmente rodando `hugo server`.
  4. Faça o commit das suas alterações:
     ```bash
     git commit -m "feat: adiciona layout responsivo na página de tags"
     ```
  5. Envie a branch para o seu repositório fork:
     ```bash
     git push origin feature/minha-melhoria
     ```
  6. Abra um **Pull Request (PR)** detalhado descrevendo suas modificações para a branch `main` do repositório original.
