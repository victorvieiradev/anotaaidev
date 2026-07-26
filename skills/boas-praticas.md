# 🛠️ Skill: Boas Práticas de Desenvolvimento e Engenharia de Software

Este documento contém as diretrizes técnicas detalhadas de Clean Code, Princípios SOLID, Orientação a Objetos, Nomenclatura e Comentários que devem ser seguidas ao alterar ou criar código neste repositório.

---

## 🧼 1. Princípios de Clean Code

### 1.1. Nomeação Clara e Expressiva
- **Intenção Revelada**: Nomes de variáveis, funções e métodos devem revelar sua intenção sem necessidade de adivinhação.
  - ❌ `d`, `temp`, `data`, `processInfo()`
  - ✅ `elapsedTimeInDays`, `userAuthenticationToken`, `calculateMonthlyRevenue()`
- **Substantivos para Classes/Estruturas**: Ex: `ArticleRepository`, `UserAuthenticator`.
- **Verbos para Funções/Métodos**: Ex: `publishArticle()`, `validateEmail()`, `formatDate()`.
- **Sem Siglas Obscuras ou Abreviações**: Prefira nomes completos e legíveis.

### 1.2. Funções Pequenas e Focadas
- **Tamanho Reduzido**: Métodos e funções devem ser curtos (idealmente menos de 20 linhas de código).
- **Fazer Apenas Uma Coisa (Do One Thing)**: A função deve realizar apenas uma tarefa e executá-la bem.
- **Um Nível de Abstração por Função**: Não misture lógica de alto nível com detalhes de baixo nível (ex: regras de negócio com manipulação direta de strings ou I/O no mesmo bloco).
- **Poucos Argumentos**: O número ideal de argumentos para uma função é 0, 1 ou 2. Evite 3 ou mais (se necessário, encapsule os parâmetros em um objeto/struct de configuração).

### 1.3. Comentários Com Contexto Real ("O Porquê", Não "O Quê")
- **Evite Comentários Redundantes**: O código legível expressa o *que* está fazendo. Não comente o óbvio.
  - ❌ `// incrementa o contador i`
  - ❌ `// retorna o usuário`
- **Comente o Motivo/Decisão (Contexto)**: Use comentários para explicar **por que** determinada abordagem não trivial foi adotada, limitações de API externa, rotas de suporte a legado ou trade-offs de performance.
  - ✅ `// Necessário sanitizar o HTML diretamente aqui devido à flag unsafe do Goldmark para evitar XSS em shortcodes antigos.`

---

## 🧩 2. Orientação a Objetos & Princípios S.O.L.I.D.

Sempre que escrever ou refatorar código (seja JS, Go, Python, HTML/CSS ou templates Hugo), aplique os princípios SOLID:

### **S — Single Responsibility Principle (SRP)**
- Cada classe, módulo ou arquivo deve ter **uma única razão para mudar**.
- Separe lógica de negócio, manipulação de dados e renderização visual.

### **O — Open/Closed Principle (OCP)**
- Entidades de software devem estar **abertas para extensão, mas fechadas para modificação**.
- Utilize polimorfismo, interfaces ou padrões de estratégia para adicionar novos comportamentos sem alterar o código existente.

### **L — Liskov Substitution Principle (LSP)**
- Subtipos devem ser substituíveis por seus tipos base sem alterar a corretude do programa.

### **I — Interface Segregation Principle (ISP)**
- Prefira várias interfaces/contratos específicos em vez de uma interface genérica e sobrecarregada.

### **D — Dependency Inversion Principle (DIP)**
- Dependa de **abstrações**, não de implementações concretas. Injete dependências em meandros de código em vez de instanciá-las internamente.

---

## 🔄 3. Guia de Modificação e Refatoração

1. **Inspecione Antes de Modificar**: Leia os arquivos relacionados antes de propor alterações.
2. **Preserve a Integridade de APIs Existentes**: Não quebre rotas ou assinaturas de funções sem necessidade.
3. **Sem Patches Superficiais**: Não esconda erros com rotinas silenciosas de `try/catch` vazios nem retorne dados genéricos falsos. Trate a causa raiz.
4. **Mudanças Mínimas e Focadas**: Faça apenas as alterações solicitadas ou necessárias.
