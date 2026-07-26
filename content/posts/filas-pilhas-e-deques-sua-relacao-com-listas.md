---
title: "Filas, Pilhas e Deques: Entenda Suas Estruturas, Relação com Listas e Prática em Python"
date: 2026-07-26T13:25:00-03:00
description: "Descubra o que são Filas (FIFO), Pilhas (LIFO) e Deques (Fila de Duas Pontas), entenda como elas se relacionam com as Listas e veja implementações práticas em Python com código 100% em português."
categories: ["Estruturas de Dados", "Algoritmos"]
tags: ["Fila", "Pilha", "Deque", "Estruturas de Dados", "Python", "LIFO", "FIFO", "Iniciantes"]
draft: false
---

Se você já começou a estudar estruturas de dados, é muito provável que tenha se feito a seguinte pergunta em algum momento:

> *"Se a linguagem já me dá uma **Lista** pronta onde posso guardar o que eu quiser, por que raios eu preciso aprender **Filas**, **Pilhas** e **Deques**? Não é tudo a mesma coisa?"*

Essa é uma das dúvidas mais comuns entre desenvolvedores iniciantes e intermediários! À primeira vista, todas essas estruturas parecem apenas "coleções de coisas organizadas em sequência". 

No entanto, a grande diferença não está em **como** os dados são armazenados, mas sim nas **regras de acesso** — ou seja, como os dados entram e saem da sua coleção.

Neste artigo super completo e didático, vamos desmistificar o que são Filas e Pilhas, qual é a relação direta delas com as Listas, o que é o poderoso **Deque** (e por que ele é um subtipo/evolução tão interessante) e como implementar tudo isso em **Python com código 100% em Português do Brasil**.

---

## 1. A Relação Fundamental: Por Que Listas São as "Mães" Dessas Estruturas?

Antes de falarmos de FIFO ou LIFO, precisamos entender a hierarquia dos conceitos.

### O Que É Uma Lista?
Na Ciência da Computação, uma **Lista Linear** é uma coleção genérica e flexível de elementos dispostos em uma sequência. Em uma lista tradicional, você tem **liberdade total**:
* Pode inserir um elemento em qualquer posição (no começo, no meio ou no fim).
* Pode remover um elemento de qualquer posição.
* Pode acessar diretamente qualquer elemento pelo seu índice (ex: `minha_lista[3]`).

### O Que São Pilhas e Filhas?
Grandes autores da computação, como **Thomas H. Cormen** (*Algoritmos: Teoria e Prática*) e **Donald Knuth** (*The Art of Computer Programming*), definem Pilhas e Filas como **Tipos Abstratos de Dados (TADs)** baseados em listas, porém com **restrições comportamentais estritas**.

Ou seja:
> 💡 **Pilha e Fila nada mais são do que Listas com Regras de Acesso.** 

Em vez de permitir que você mexa em qualquer lugar da lista a qualquer momento, essas estruturas limitam propositalmente onde você pode adicionar ou remover elementos. E é justamente essa restrição que garante **segurança, previsibilidade e alta eficiência** para resolver problemas específicos da engenharia de software!

---

## 2. Pilha (Stack): O Conceito LIFO (Last In, First Out)

### A Metáfora do Mundo Real
Imagine uma **pilha de pratos limpos** em um restaurante ou uma **pilha de livros** sobre a sua mesa:

```text
       [ Livro C ]  <-- Topo (Último que entrou / Primeiro que sai)
       [ Livro B ]
       [ Livro A ]  <-- Base
```

* Quando você adiciona um novo livro, você o coloca **no topo**.
* Quando você precisa retirar um livro, você remove o que está **no topo**.
* Tentar puxar o livro da base sem tirar os de cima causaria um desastre!

Essa é a regra **LIFO (*Last In, First Out*)**: o **último** elemento a entrar é o **primeiro** elemento a sair.

### Operações Principais da Pilha
1. **Empilhar (*Push*)**: Adiciona um elemento no topo da pilha.
2. **Desempilhar (*Pop*)**: Remove e retorna o elemento do topo.
3. **Espiar Topo (*Peek/Top*)**: Olha qual elemento está no topo sem removê-lo.

### Onde Usamos Pilhas no Dia a Dia?
* **Histórico do Navegador**: O botão "Voltar" leva você para a última página visitada.
* **Ctrl + Z (Desfazer)**: Os editores de texto guardam suas últimas ações em uma pilha para desfazê-las na ordem inversa.
* **Pilha de Execução (Call Stack)**: Quando seu código chama a `funcao_A()`, que chama a `funcao_B()`, o computador usa uma pilha interna para saber para onde voltar quando cada função terminar.

### Código Prático em Python: Implementando uma Pilha

Em Python, a própria estrutura de `list` pode ser usada como uma pilha eficiente, pois as operações de adicionar ao fim (`append`) e remover do fim (`pop`) funcionam em tempo constante **\(O(1)\)**.

Vamos criar uma classe `Pilha` em Português para deixar o conceito explícito:

```python
class Pilha:
    """
    Estrutura de Dados do tipo Pilha (LIFO - Último a Entrar, Primeiro a Sair).
    """
    def __init__(self):
        self._itens = []

    def empilhar(self, item):
        """Adiciona um elemento no topo da pilha."""
        self._itens.append(item)
        print(f"-> Empilhado: {item}")

    def desempilhar(self):
        """Remove e retorna o elemento do topo da pilha."""
        if self.esta_vazia():
            raise IndexError("Erro: A pilha está vazia! Não é possível desempilhar.")
        item_removido = self._itens.pop()
        print(f"<- Desempilhado: {item_removido}")
        return item_removido

    def espiar_topo(self):
        """Retorna o elemento do topo sem removê-lo."""
        if self.esta_vazia():
            return None
        return self._itens[-1]

    def esta_vazia(self) -> bool:
        """Verifica se a pilha está vazia."""
        return len(self._itens) == 0

    def tamanho(self) -> int:
        """Retorna a quantidade de elementos na pilha."""
        return len(self._itens)


# --- Testando a Pilha ---
if __name__ == "__main__":
    print("=== TESTE DA PILHA ===")
    minha_pilha = Pilha()

    # Empilhando páginas do navegador
    minha_pilha.empilhar("google.com")
    minha_pilha.empilhar("github.com")
    minha_pilha.empilhar("anotaaidev.com")

    print(f"Topo atual: {minha_pilha.espiar_topo()}")  # anotaaidev.com

    # Clicando no botão 'Voltar' (desempilhando)
    minha_pilha.desempilhar()  # Remove anotaaidev.com
    minha_pilha.desempilhar()  # Remove github.com

    print(f"Topo atual após voltar: {minha_pilha.espiar_topo()}")  # google.com
```

---

## 3. Fila (Queue): O Conceito FIFO (First In, First Out)

### A Metáfora do Mundo Real
Imagine a **fila do caixa em um supermercado** ou a **fila do banco**:

```text
  Saída (Frente) <-- [ Cliente 1 ] [ Cliente 2 ] [ Cliente 3 ] <-- Entrada (Fim)
```

* O primeiro cliente a chegar na fila é o **primeiro a ser atendido**.
* Novos clientes sempre entram no **final da fila**.
* Ninguém gosta de quem fura a fila!

Essa é a regra **FIFO (*First In, First Out*)**: o **primeiro** elemento a entrar é o **primeiro** elemento a sair.

### Operações Principais da Fila
1. **Enfileirar (*Enqueue*)**: Adiciona um elemento no final da fila.
2. **Desenfileirar (*Dequeue*)**: Remove e retorna o elemento do início (frente) da fila.
3. **Espiar Frente (*Front/Peek*)**: Consulta quem é o próximo da fila sem removê-lo.

### Onde Usamos Filas no Dia a Dia?
* **Impressoras**: Se três pessoas mandam documentos para imprimir, eles são impressos na ordem em que chegaram.
* **Processamento de Tarefas (Background Jobs)**: Envio de e-mails de confirmação, processamento de pagamentos e filas de mensagens (ex: RabbitMQ, AWS SQS).
* **Streaming de Vídeo/Áudio**: O *buffer* guarda os dados que chegam da rede em uma fila para exibi-los na ordem correta.

### Alerta de Desempenho em Python! ⚠️
Se você tentar usar uma lista comum do Python como fila fazendo `lista.pop(0)` para remover o primeiro elemento, **isso terá um péssimo desempenho!** 

Por quê? Porque remover o índice 0 de uma lista baseada em array faz com que o Python precise deslocar **todos os outros elementos** uma posição para a esquerda na memória. Isso tem complexidade **\(O(n)\)**. Se a fila tiver 1.000.000 de itens, será extremamente lento!

Por isso, em Python, o jeito correto e otimizado de trabalhar com filas é utilizando o módulo nativo `collections.deque`, que realiza inserções e remoções nas pontas em tempo constante **\(O(1)\)**.

### Código Prático em Python: Implementando uma Fila Eficiente

```python
from collections import deque

class Fila:
    """
    Estrutura de Dados do tipo Fila (FIFO - Primeiro a Entrar, Primeiro a Sair).
    Utiliza collections.deque internamente para garantir desempenho O(1).
    """
    def __init__(self):
        self._itens = deque()

    def enfileirar(self, item):
        """Adiciona um elemento no final da fila."""
        self._itens.append(item)
        print(f"-> Entrou na fila: {item}")

    def desenfileirar(self):
        """Remove e retorna o primeiro elemento da fila (frente)."""
        if self.esta_vazia():
            raise IndexError("Erro: A fila está vazia! Ninguém para atender.")
        item_removido = self._itens.popleft()  # O(1) rápido!
        print(f"<- Atendido/Removido da fila: {item_removido}")
        return item_removido

    def espiar_frente(self):
        """Retorna o primeiro elemento da fila sem removê-lo."""
        if self.esta_vazia():
            return None
        return self._itens[0]

    def esta_vazia(self) -> bool:
        """Verifica se a fila está vazia."""
        return len(self._itens) == 0

    def tamanho(self) -> int:
        """Retorna o número de pessoas/itens na fila."""
        return len(self._itens)


# --- Testando a Fila ---
if __name__ == "__main__":
    print("\n=== TESTE DA FILA ===")
    fila_banco = Fila()

    # Pessoas chegando ao banco
    fila_banco.enfileirar("Ana")
    fila_banco.enfileirar("Bruno")
    fila_banco.enfileirar("Carla")

    print(f"Próximo a ser atendido: {fila_banco.espiar_frente()}")  # Ana

    # Atendendo os clientes na ordem de chegada
    fila_banco.desenfileirar()  # Ana é atendida
    fila_banco.desenfileirar()  # Bruno é atendido

    print(f"Próximo a ser atendido agora: {fila_banco.espiar_frente()}")  # Carla
```

---

## 4. O Que São Deques? (Fila de Duas Pontas)

Agora que você já entendeu Pilhas (LIFO) e Filas (FIFO), vamos responder à pergunta de ouro: **O que é um Deque?**

### O Conceito
**Deque** é uma sigla para ***Double-Ended Queue*** (Fila de Duas Pontas). A pronúncia correta em inglês é *"deck"* (como um baralho de cartas).

Enquanto uma Fila tradicional só deixa entrar por trás e sair pela frente, e uma Pilha só deixa entrar e sair pelo topo:

> 💡 **Um Deque é uma estrutura híbrida e flexível que permite inserir e remover elementos TANTO no início (frente) QUANTO no fim (trás).**

```text
Entrada/Saída (Início) <== [ Elemento 1 ] [ Elemento 2 ] [ Elemento 3 ] ==> Entrada/Saída (Fim)
```

Por essa razão, o Deque pode ser visto como uma **generalização (ou subtipo mais versátil)** tanto da Fila quanto da Pilha:
* Se você só usar inserção no fim e remoção no início, o Deque se comporta exatamente como uma **Fila**.
* Se você só usar inserção no fim e remoção no fim, o Deque se comporta exatamente como uma **Pilha**.

### Operações do Deque
1. `adicionar_no_inicio`: Insere um elemento na frente.
2. `adicionar_no_fim`: Insere um elemento atrás.
3. `remover_do_inicio`: Remove o elemento da frente.
4. `remover_do_fim`: Remove o elemento de trás.
5. `espiar_inicio` / `espiar_fim`: Consulta os elementos das pontas.

### Onde Usamos Deques?
* **Verificação de Palíndromos**: Checar se uma palavra é igual de trás para frente comparando e removendo as letras da primeira e da última posição simultaneamente.
* **Algoritmos de Janela Deslizante (*Sliding Window*)**: Onde precisamos manter os últimos \(N\) elementos de um fluxo contínuo de dados.
* **Algoritmo de Busca em Largura (BFS) / Agendadores**: Onde certos processos prioritários precisam ser inseridos na frente da fila de execução.

### Código Prático em Python: Implementando e Usando um Deque

Vamos criar a classe `Deque` em Português e resolver um problema clássico: **verificar se uma palavra é um palíndromo** (como *"arara"*, *"radar"* ou *"ovo"*).

```python
from collections import deque

class Deque:
    """
    Estrutura de Dados do tipo Deque (Fila de Duas Pontas).
    Permite inserção e remoção eficiente em ambas as extremidades O(1).
    """
    def __init__(self):
        self._itens = deque()

    def adicionar_no_inicio(self, item):
        """Insere um item na frente do Deque."""
        self._itens.appendleft(item)

    def adicionar_no_fim(self, item):
        """Insere um item no final do Deque."""
        self._itens.append(item)

    def remover_do_inicio(self):
        """Remove e retorna o item da frente do Deque."""
        if self.esta_vazio():
            raise IndexError("Erro: O Deque está vazio!")
        return self._itens.popleft()

    def remover_do_fim(self):
        """Remove e retorna o item do final do Deque."""
        if self.esta_vazio():
            raise IndexError("Erro: O Deque está vazio!")
        return self._itens.pop()

    def espiar_inicio(self):
        return self._itens[0] if not self.esta_vazio() else None

    def espiar_fim(self):
        return self._itens[-1] if not self.esta_vazio() else None

    def esta_vazio(self) -> bool:
        return len(self._itens) == 0

    def tamanho(self) -> int:
        return len(self._itens)


# --- Aplicação Prática: Verificador de Palíndromo ---
def eh_palindromo(palavra: str) -> bool:
    """
    Verifica se uma palavra é um palíndromo usando um Deque.
    Exemplo: 'arara', 'socorrammesubiremonibusemmarrocos'
    """
    meu_deque = Deque()

    # Insere todos os caracteres limpos no Deque
    palavra_limpa = palavra.lower().replace(" ", "")
    for letra in palavra_limpa:
        meu_deque.adicionar_no_fim(letra)

    # Compara a primeira e a última letra até restar 0 ou 1 letra
    while meu_deque.tamanho() > 1:
        primeira_letra = meu_deque.remover_do_inicio()
        ultima_letra = meu_deque.remover_do_fim()

        if primeira_letra != ultima_letra:
            return False  # Letras diferentes, não é palíndromo!

    return True


if __name__ == "__main__":
    print("\n=== TESTE DO DEQUE (PALÍNDROMOS) ===")
    testes = ["arara", "python", "radar", "Anota Ai Dev", "socorram me subir em onibus em marrocos"]

    for texto in testes:
        resultado = eh_palindromo(texto)
        status = "é um palíndromo! ✅" if resultado else "NÃO é um palíndromo. ❌"
        print(f"A palavra/frase '{texto}' {status}")
```

---

## 5. Resumo Comparativo & Complexidade (Big-O)

Para fixar de vez e ter este guia sempre em mãos na hora das entrevistas técnicas ou provas, confira a tabela comparativa:

| Estrutura | Regra de Acesso | Onde Inserir? | Onde Remover? | Complexidade nas Pontas | Quando Escolher? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Lista** | Acesso livre | Qualquer índice | Qualquer índice | Início/Meio: \(O(n)\)<br>Fim: \(O(1)\) | Quando você precisa acessar itens por posição arbitrária. |
| **Pilha** | **LIFO** | Topo (Fim) | Topo (Fim) | \(O(1)\) | Quando a ordem inversa importa (Undo, navegação, chamadas). |
| **Fila** | **FIFO** | Fim | Início | \(O(1)\) *(usando deque)* | Computação em ordem de chegada (Jobs, tarefas, buffer). |
| **Deque** | **Flexível** | Início ou Fim | Início ou Fim | \(O(1)\) | Quando você precisa manipular ambas as pontas com alta performance. |

---

## Conclusão: Escolha a Ferramenta Certa para o Problema Certo!

Agora você já sabe: **Listas, Pilhas, Filas e Deques não são concorrentes, são aliadas!**

* A **Lista** te dá liberdade total, mas essa liberdade pode gerar bagunça se o seu problema exigir uma regra estrita.
* A **Pilha** garante a disciplina do "último a entrar, primeiro a sair".
* A **Fila** garante a disciplina da "ordem de chegada".
* O **Deque** junta o melhor dos dois mundos quando você precisa de agilidade nas duas extremidades.

No seu dia a dia de desenvolvimento em Python, lembre-se sempre da dica de ouro: **para implementar Filas e Deques eficientes, prefira o `collections.deque` nativo!**

Ficou com alguma dúvida ou quer ver mais exemplos de algoritmos com estruturas de dados? Deixe um comentário e compartilhe este post com aquele amigo dev que vive se confundindo com o `pop(0)`! 🚀
