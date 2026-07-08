---
title: "Arquitetura Limpa e Pragmática: Menos Teoria, Mais Código"
date: 2026-07-08T18:00:00-03:00
description: "Uma reflexão pragmática sobre quando aplicar arquitetura limpa e como evitar a complexidade acidental no início de um projeto."
categories: ["Desenvolvimento", "Arquitetura"]
tags: ["Clean Architecture", "Pragmatismo", "Go", "Design Patterns"]
draft: false
---

Durante os últimos anos, a **Clean Architecture** (ou Arquitetura Limpa) de Uncle Bob se tornou um dos tópicos mais discutidos na engenharia de software. O apelo é óbvio: desacoplamento total, facilidade de testes, independência de frameworks e banco de dados. 

No entanto, há um perigo silencioso: a **complexidade acidental**. Muitos desenvolvedores, ao tentar seguir o padrão ao pé da letra, acabam criando camadas e abstrações desnecessárias para sistemas simples que poderiam ser resolvidos de forma direta.

Neste artigo, vamos analisar quando realmente vale a pena aplicar esse padrão e como ser pragmático.

---

## O Problema das Abstrações Prematuras

No início de um projeto, o maior inimigo da produtividade não é o acoplamento, mas a incerteza do negócio. Criar interfaces para tudo, converter modelos de dados de uma camada para outra (como `Entities` -> `Domain Models` -> `DTOs`) e criar múltiplos repositórios pode tornar o desenvolvimento extremamente lento.

> "Não existem soluções de bala de prata. Existem apenas trocas. Abstração prematura é a raiz de muita dor de cabeça na manutenção de código."

Muitas vezes, começamos com regras simples e, no afã de seguir padrões, estruturamos a aplicação como se fôssemos o Netflix.

---

## Estrutura Clássica vs. Pragmática

Vamos comparar duas abordagens comuns na hora de projetar um microsserviço ou serviço web.

| Aspecto | Abordagem Dogmática (Purista) | Abordagem Pragmática |
| :--- | :--- | :--- |
| **Interface de Banco** | Interfaces customizadas desde o dia 1 | Uso direto de ORM ou driver até haver necessidade |
| **Mapeamento de Modelos** | Conversão manual entre Entidade, DTO e Banco | Reutilização de structs simples no início |
| **Injeção de Dependências** | Frameworks de DI pesados e complexos | Injeção manual direta no `main.go` |
| **Testabilidade** | Mocks de absolutamente todas as funções | Testes de integração reais com bancos temporários |

---

## Exemplo Prático em Go

Aqui está um exemplo simples de como estruturar um serviço que persiste dados, mantendo o pragmatismo e a separação de conceitos de forma simples.

```go
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
)

// User representa o nosso modelo de domínio
type User struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

// UserRepository define a abstração para armazenamento
type UserRepository interface {
	Save(ctx context.Context, u *User) error
}

// UserService contém a regra de negócio
type UserService struct {
	repo UserRepository
}

func (s *UserService) Register(ctx context.Context, u *User) error {
	if u.Email == "" {
		return fmt.Errorf("o e-mail é obrigatório")
	}
	return s.repo.Save(ctx, u)
}

// MemoryRepository é uma implementação pragmática para testes rápidos
type MemoryRepository struct {
	data map[string]*User
}

func (r *MemoryRepository) Save(ctx context.Context, u *User) error {
	r.data[u.ID] = u
	return nil
}

func main() {
	repo := &MemoryRepository{data: make(map[string]*User)}
	service := &UserService{repo: repo}

	http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Método não suportado", http.StatusMethodNotAllowed)
			return
		}

		var u User
		if err := json.NewDecoder(r.Body).Decode(&u); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		if err := service.Register(r.Context(), &u); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(u)
	})

	fmt.Println("Servidor rodando na porta 8080...")
	http.ListenAndServe(":8080", nil)
}
```

---

## Diretrizes de Ouro

Antes de criar mais uma pasta de `usecases` ou `adapters` no seu repositório, faça a si mesmo as seguintes perguntas:

1. **Eu vou mesmo trocar de banco de dados?** (99% das vezes, a resposta é não).
2. **Eu tenho múltiplos canais de entrada?** (Se você só expõe uma API REST HTTP, você realmente precisa de adaptadores desacoplados de transporte?).
3. **Isso está dificultando a leitura do código por outros desenvolvedores?**

A arquitetura limpa é excelente, mas o bom senso e o pragmatismo devem sempre vir primeiro.
Anote aí! 😉
