# Tech Challenge - FIAP 2024

### Descrição

Este projeto é uma aplicação Node.js estruturada com TypeScript e seguindo os conceitos da Clean Architecture / Clean Code e aplicando as regras de SOLID. Utilizamos Express para criar a API, Sequelize como database connector e PostgreSQL como banco de dados relacional. O projeto está dockerizado, com suporte a Docker Compose para facilitar o processo de desenvolvimento e implantação.

### Tecnologias do Projeto

| Docker | PostgreSQL | Node.js  | Npm    | Kubernetes  |
|--------|------------|----------|--------|-------------|
| *      | *          | v16.15.0 | v8.5.5 | v1.30.2     |

### Membros do Projeto

| Nome             | RM        |
|------------------|-----------|
| Davi Corazza     | RM353340  |
| Francisco Wesley | RM353738  |
| Pedro Freitas    | RM353284  |
| Robson Anjos     | RM353341  |

#### `Link do Miro` - Documentação do sistema (DDD) com Event Storming, incluindo todos os passos/tipos de diagrama 
[Miro - Tech Challenge](https://miro.com/app/board/uXjVKWk2FRY=/?share_link_id=272701004394)


## Estrutura do Projeto

	src
	├── application
	│   ├── adapters
	│   ├── controllers
	│   ├── usecases
	│   └── utils
	├── domain
	│   └── entities
	├── infrastructure
	│   ├── config
	│   ├── external
	│   │   ├── database
	│   │   │   └── models
	│   │   └── index.ts
	│	└── routes
	├── interfaces
	│   └── gateways
	└── main.ts

### Mais Detalhes
- `src:` Diretório principal onde o código fonte da aplicação está localizado.
	- `application:` Contém a lógica de aplicação.
		- `adapters:` Contém implementações de conexões externas.
		- `controllers:` Camada de controle, gerenciando as requisições recebidas e direcionando para os casos de uso apropriados.
		- `usecases:` Implementação dos casos de uso e lógica de negócio.
		- `utils:` Utilitários e helpers genéricos para uso da aplicação.
	- `domain:` Contém as entidades e a lógica de domínio.
		- `entities:` Definições das entidades e modelos de domínio.
	- `infrastructure:` Configurações e integrações externas.
		- `config:` Arquivos de configuração da aplicação, incluindo express, fator de conexão, morgan, swagger e newman.
		- `external:` Integrações externas, como banco de dados.
			- `database:` Configurações de acesso ao banco de dados.
				- `models:`  Definições dos modelos de dados para o banco de dados.
		- `routes:` Definição das rotas da aplicação.
	- `interfaces:` Definições das interfaces para entrada e saída.
		- `gateways:` Interfaces para repositórios e gateways externos.
	- `main.ts:` Ponto de entrada da aplicação.

## Iniciando a aplicação

### Executando em Docker
- Clone o repositório:

		git clone https://github.com/davi-corazza/tech-challenge.git
		cd tech-challenge

- Construa e inicie os containers:

	*	Para Windows:

			docker-compose up --build

	*	Para Linux e macOS:

			docker compose up --build

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

### Executando em Kubernetes

#### Simular Ambiente Kubernetes

Para simular um ambiente Kubernetes, é necessário habilitar a função Kubernetes no Docker Desktop e instalar a ferramenta Kubectl.

#### Criar os Namespaces

```sh
kubectl apply -f kubernetes/PostgreSQL/postgresql-namespace.yaml
kubectl apply -f kubernetes/Application/tech-namespace.yaml
```

#### Criar os Recursos do Banco de Dados PostgreSQL

```sh
kubectl apply -f kubernetes/PostgreSQL
```

#### Criar os Recursos da Aplicação

```sh
kubectl apply -f kubernetes/Application
```

#### Abrir a Aplicação

```sh
kubectl port-forward service/tech-service 3000:3000 -n core
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## Documentação da API
A documentação da API, gerada com Swagger, estará disponível em http://localhost:3000/swagger/.

## Cluster Kubernetes
- O cluster Kubernetes foi configurado utilizando o Docker Desktop, por isso está com um node.
- Os recursos foram separados em namespaces para melhor organização. A comunicação entre os namespaces é feita através de serviços.
- O banco de dados PostgreSQL foi configurado em um namespace separado, com um serviço para comunicação com a aplicação.
- Para realizar o restore do banco de dados, foi criado um job sidecar-init que restaura o banco de dados com o dump dump.sql que está em um ConfigMap.

## Estrutura do Cluster Kubernetes

```
├── Application
│   ├── tech-configmap.yaml
│   ├── tech-deployment.yaml
│   ├── tech-hpa.yaml
│   ├── tech-namespace.yaml
│   ├── tech-role-binding.yaml
│   ├── tech-role.yaml
│   ├── tech-secret.yaml
│   ├── tech-service-account.yaml
│   └── tech-service.yaml
├── PostgreSQL
│   ├── postgresql-configmap.yaml
│   ├── postgresql-connection.yaml
│   ├── postgresql-deployment.yaml
│   ├── postgresql-hpa.yaml
│   ├── postgresql-namespace.yaml
│   ├── postgresql-pvc.yaml
│   ├── postgresql-role-binding.yaml
│   ├── postgresql-role.yaml
│   ├── postgresql-secret.yaml
│   ├── postgresql-service-account.yaml
│   └── postgresql-service.yaml
└── Test-k6s
    ├── index.js  -> Script de teste de carga
    └── tech-challenge-report.pdf -> Relatório do teste de carga
```

## Diagrama da Arquitetura

A imagem abaixo ilustra a arquitetura do cluster Kubernetes, com os namespaces e serviços configurados.

![Cluster Kubernetes](arquitetura/Kubernetes.jpg)


## Link do Video de Apresentação

O vídeo de apresentação do projeto está disponível no YouTube. Nele, apresentamos a aplicação, a arquitetura do cluster Kubernetes e os resultados do teste de carga.

[Video de Apresentação](https://www.youtube.com/watch?v=CQdSKTqmasw)

## Resultado do Teste de Carga com K6s

Realizamos um teste de carga utilizando K6s para avaliar o desempenho e a capacidade de nosso sistema. O relatório detalhado dos resultados pode ser acessado através do link abaixo:

[Veja o Relatório Completo do Teste de Carga](kubernetes/Test-k6s/tech-challenge-report.pdf)


