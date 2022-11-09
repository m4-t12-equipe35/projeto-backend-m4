# **TechQuiz**

Este é o backend da aplicação TechQuiz - Uma plataforma em formato de quiz com a tecnologia de sua escolha para auxiliar os desenvolvedores.

## \***\*Endpoints\*\***

A API tem um total de 14 endpoints, sendo em volta principalmente do usuário (dev) - podendo cadastrar seu perfil, tecnologias nas quais quer ser testado, ranking e avaliação do nível de conhecimento dele:

O url base da API é [https://techquiz-api.herokuapp.com](https://techquiz-api.herokuapp.com/)

### **Endpoints que não precisam de autenticação**

Não é necessário passar um token para realizar uma requisição bem sucedida nos seguintes endpoints:

### **Criação de usuário**

    POST /users - FORMATO DA RESPOSTA - STATUS 201

    	{
    		"name" : "Kenzinho ",
    		"email" : "[kenzinho@gmail.com](mailto:kenzinho@gmail.com)",
    		"stack" : "full Stack ",
    		"password" : "1234",
    		"isAdm" : true,
    	}

A rota deve retornar todas as informaçoes do dev menos a senha. Caso dê tudo certo, a resposta será assim:

    {
    	"name": "Kenzinho ",
    	"email": "kenzinho@gmail.com",
    	"stack": "full Stack ",
    	"isAdm": true,
    	"isActive": true,
    	"id": "6bcf0d57-abb0-403e-9df2-648289cbd3f6",
    	"score": 0
    }

1. O campo - "stack": deve receber 3 modalidades de dev:

   a- Front End

   b- Back End

   c- Full Stack

2. O campo - "isAdm" deve receber um valor booleano ( ¨True” ou ¨False¨), sinalizando se o dev tem permissões de administrador.

### **Listando Techs**

Nessa aplicação o usuário sem fazer login ou se cadastrar pode ver as techs já cadastradas na plataforma. Na API podemos acessar a lista dessa forma: Aqui conseguimos ver as tecnologias.

    GET /techs - FORMATO DA RESPOSTA - STATUS 200`

    	[
    		{
    			"id": "d92ab0ba-1810-4ef3-abfc-0f902409256a",
    			"name": "TypeScript",
    			"stack": "Fullstack"
    		},
    		{
    			"id": "7b56f0fd-c6d5-4ac8-b7bf-78b77ebe2372",
    			"name": "Css",
    			"stack": "Front end"
    		},
    		{
    			"id": "c35d415f-8989-4c2d-8f8f-74c9059304f1",
    			"name": "HTML",
    			"stack": "Front end"
    		}
    	]

## **Rotas que necessitam de autorização**

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Após o usuário estar logado, ele deve conseguir acessar as informações sem problemas.

### Listar **usuários**

    `GET /users/ - FORMATO DA RESPOSTA - STATUS 200`

    	[{
    		"id": "e44047aa-bc25-4c25-9aa1-bac577732a30",
    		"name": "Kenzinho",
    		"email": "kenzinho@mail.com",
    		"stack": "Frontend",
    		"isAdm": true,
    		"isActive": false,
    		"score": 0
    	},
    	{
    		"id": "3ceac046-a018-4619-bab4-9be3c2938fec",
    		"name": "Kenzie ",
    		"email": "Kenzie@gmail.com",
    		"stack": "front end",
    		"isAdm": true,
    		"isActive": true,
    		"score": 0
    	},
    	{
    		"id": "b300bae4-965d-4991-bb7c-aef37edb7c35",
    		"name": "Kenziey ",
    		"email": "kenziey@gmail.com",
    		"stack": "full Stack",
    		"isAdm": true,
    		"isActive": true,
    		"score": 0
    	}]

### Listar **um usuário**

    ` GET /users/:id - FORMATO DA RESPOSTA - STATUS 200`

    	{
    		"id": "404dce96-78ec-443b-99c0-06cd0fd49b86",
    		"name": "Matheus",
    		"email": "matheus@mail.com",
    		"stack": "Backend",
    		"isAdm": true,
    		"isActive": true,
    		"score": 0
    	}

### Atualizar **usuário**

    ` PATCH /users/:id - FORMATO DA RESPOSTA - STATUS 200`

    	{
    		"id": "3ceac046-a018-4619-bab4-9be3c2938fec",
    		"name": "Kenzieiey",
    		"email": "kenzieiey@gmail.com",
    		"stack": "back end",
    		"isAdm": true,
    		"isActive": true,
    		"score": 0
    	}

O usuário deve conseguir atualizar os campos "name", "email", "stack" e "password". Não é possível atualizar os campos "isAdm" e "isActive".

### Deletar **usuários**

    ` DELETE /users/:id - FORMATO DA RESPOSTA - STATUS 204`

    	No body returned to response

Um soft delete é feito na rota de deletar usuário, alterando a propriedade "isActive" de true para false.

### Login

    `POST /login - FORMATO DA RESPOSTA - STATUS 200`

    	{
    		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6dHJ1ZSwiaWF0IjoxNjY3NTg5NzkzLCJleHAiOjE2Njc2NzYxOTMsInN1YiI6IjljNDZkNjBmLWMxZTUtNGE3Yy05MzAxLTc1ODFhMTgxZjU5YyJ9.LpckI_9FWvkxJ4jrx4yR2IWVnkrXLstZN5QEaQiXCIo"
    	}

A rota de Login deve apenas retornar o Token do usuário.

### Criar tecnologia

    `POST /techs - FORMATO DA RESPOSTA - STATUS 200`

    	{
    		"name": "HTML",
    		"stack": "Front end"
    	}

Caso dê tudo certo, a resposta será assim:

    {
    	"name": "HTML",
    	"stack": "Front end",
    	"id": "c35d415f-8989-4c2d-8f8f-74c9059304f1"
    }

### Deletar tecnologia

    `DELETE /techs/:id - FORMATO DA RESPOSTA - STATUS 204`

    	No body returned to response

### Criar pergunta

    `POST /questions - FORMATO DA RESPOSTA - STATUS 200`

    	{
    		"question": "O que é TypeScript?",
    		"level": "iniciante",
    		"techId": "d92ab0ba-1810-4ef3-abfc-0f902409256a",
    		"answers": [
    					{
    						"answer": "É uma ferramenta para React.",
    						"isCorrect": false
    					},
    					{
    						"answer": "É uma linguagem de programação de Back-End.",
    						"isCorrect": false
    					},
    					{
    						"answer": "É uma linguagem de programação de Front-End.",
    						"isCorrect": false
    					},
    					{
    						"answer": "É um superset para potencializar o JS e pode ser utilizado tanto para Back-End como Front-End.",
    						"isCorrect": true
    					}
    		]
    	}

Deve ser passado um objeto com as quatro possíveis respostas da questão. Caso dê tudo certo, a resposta será assim:

    	{
    		"id": "9b419235-1800-4556-91bd-a4e622d63fdb",
    		"question": "O que é TypeScript?",
    		"level": "iniciante",
    		"tech": {
    		"id": "d92ab0ba-1810-4ef3-abfc-0f902409256a",
    		"name": "TypeScript",
    		"stack": "Fullstack"
    	},
    		"answers": [
    				{
    					"id": "686c8c1e-3964-4e90-96e5-38f14bde0f2f",
    					"answer": "É uma ferramenta para React.",
    					"isCorrect": false
    				},
    				{
    					"id": "d0348693-7a35-4d62-a6e0-d76827ebbad1",
    					"answer": "É uma linguagem de programação de Back-End.",
    					"isCorrect": false
    				},
    				{
    					"id": "d8126d67-5169-4b9e-ab2b-5f7a0cbfedf3",
    					"answer": "É uma linguagem de programação de Front-End.",
    					"isCorrect": false
    				},
    				{
    					"id": "eab62ed5-316d-4077-8cff-cc5530f06884",
    					"answer": "É um superset para potencializar o JS e pode ser utilizado tanto para Back-End como Front-End.",
    					"isCorrect": true
    				}
    		]
    	}

### Listar **perguntas**

    `GET /questions - FORMATO DA RESPOSTA - STATUS 200`

    	[{
    		"id": "9b419235-1800-4556-91bd-a4e622d63fdb",
    		"question": "O que é TypeScript?",
    		"level": "iniciante",
    		"tech": {
    			"id": "d92ab0ba-1810-4ef3-abfc-0f902409256a",
    			"name": "TypeScript",
    			"stack": "Fullstack"
    		},
    		"answers": [
    			{
    				"id": "686c8c1e-3964-4e90-96e5-38f14bde0f2f",
    				"answer": "É uma ferramenta para React.",
    				"isCorrect": false
    			},
    			{
    				"id": "d0348693-7a35-4d62-a6e0-d76827ebbad1",
    				"answer": "É uma linguagem de programação de Back-End.",
    				"isCorrect": false
    			},
    			{
    				"id": "d8126d67-5169-4b9e-ab2b-5f7a0cbfedf3",
    				"answer": "É uma linguagem de programação de Front-End.",
    				"isCorrect": false
    			},
    			{
    				"id": "eab62ed5-316d-4077-8cff-cc5530f06884",
    				"answer": "É um superset para potencializar o JS e pode ser utilizado tanto para Back-End como Front-End.",
    				"isCorrect": true
    			}
    		]
    	},
    	{
    		"id": "8e43f4ef-dd84-4741-85b3-ed2805e3825c",
    		"question": "Dentre as alternativas abaixo, qual apresenta pseudo-elementos CSS corretamente?",
    		"level": "avançado",
    		"tech": {
    			"id": "7b56f0fd-c6d5-4ac8-b7bf-78b77ebe2372",
    			"name": "Css",
    			"stack": "Front end"
    		},
    		"answers": [
    			{
    				"id": "57aed71e-5edf-4e72-bf2c-39fb192b93e3",
    				"answer": "::selector, ::first-line, ::first-paragraph",
    				"isCorrect": false
    			},
    			{
    				"id": "bd736dee-6143-488a-9419-7cf6661f8164",
    				"answer": "::placeholder, ::first-line, ::while",
    				"isCorrect": false
    			},
    			{
    				"id": "d6f3240c-f6a5-4227-9894-c4831791321d",
    				"answer": "::after, ::before, ::while",
    				"isCorrect": false
    			},
    			{
    				"id": "6d80482b-b5f4-4b98-a006-e80d63e32c45",
    				"answer": "::first-letter, ::placeholder, ::selection;",
    				"isCorrect": true
    			}
    		]
    	},
    	{
    		"id": "bc88e52c-ae5f-408d-9e7f-e0c51c8ba3c6",
    		"question": "Supondo que eu quero estilizar um h2 e um h3 ao mesmo tempo, qual seria a maneira correta de fazer isso",
    		"level": "intermediário",
    		"tech": {
    			"id": "7b56f0fd-c6d5-4ac8-b7bf-78b77ebe2372",
    			"name": "Css",
    			"stack": "Front end"
    		},
    		"answers": [
    			{
    				"id": "b41c2062-e609-4ce4-8e03-3bb6762a5c73",
    				"answer": "h2 > h3 {...}",
    				"isCorrect": false
    			},
    			{
    				"id": "10737348-87cf-4091-9ff5-bcba6971f5af",
    				"answer": "h2, h3 {...}",
    				"isCorrect": true
    			},
    			{
    				"id": "773c0556-92d7-43b8-a8af-241fceb9bc77",
    				"answer": "h2 and h3 {...}",
    				"isCorrect": false
    			},
    			{
    				"id": "fb0709c6-3a10-41c9-a1a3-8b11d10b9b2e",
    				"answer": "h2 + h3 {...}",
    				"isCorrect": false
    			}
    		]
    	}]

### Listar uma pergunta

    `GET /questions/:id - FORMATO DA RESPOSTA - STATUS 200`

    	{
    		"id": "2bedb5fe-1856-492e-bb62-88aecefdce61",
    		"question": "Qual sintaxe de tag HTML está correta?",
    		"level": "iniciante",
    		"tech": {
    		"id": "d92ab0ba-1810-4ef3-abfc-0f902409256a",
    		"name": "TypeScript",
    		"stack": "Fullstack"
    	},
    	"answers": [
    		{
    			"id": "8275af18-79f5-4f64-b56a-ff8ac6f9183c",
    			"answer": "<p> Sou um Parágrafo </p>",
    			"isCorrect": true
    		},
    		{
    			"id": "95cacb41-9208-466f-9a4b-6768a8bc90c8",
    			"answer": "<img src “” alt “” >",
    			"isCorrect": false
    		},
    		{
    			"id": "0c6f9316-ac8d-474e-9c5c-084379deadf5",
    			"answer": "<li> <ul>",
    			"isCorrect": false
    		},
    		{
    			"id": "a360a623-3b3a-4210-bd3b-481d92a75230",
    			"answer": "<h2> Sou um subtítulo <h3>",
    			"isCorrect": false
    		}
    	]
    }

### Atualizar pergunta

    `PATCH /questions/:id - FORMATO DA RESPOSTA - STATUS 200`

    	{
    		"id": "26cae0b9-9c26-44df-9fea-e5eca61a1000",
    		"question": "Qual a propriedade de espaçamento de uma flexbox que faz todos os elementos estarem espaçados igualmente entre si e entre as bordas?",
    		"level": "intermediário",
    		"answers": [
    				{
    						"id": "43e86fa8-df57-42ed-ac6c-deed43c24692",
    						"answer": "space-around",
    						"isCorrect": false
    				},
    				{
    						"id": "aa22a9f9-03fe-4489-887d-e2b84af16227",
    						"answer": "space-between",
    						"isCorrect": false
    				},
    				{
    						"id": "5503c813-383f-417b-a523-128ccc3c0f80",
    						"answer": "space-evenly",
    						"isCorrect": true
    				},
    				{
    						"id": "7b6f33e2-abeb-406c-8622-c8506efba3b0",
    						"answer": "space-equally",
    						"isCorrect": false
    				}
    		]
    	}

O usuário deve conseguir atualizar os campos "question" e "level".

### Deletar pergunta

    `DELETE /questions/:id- FORMATO DA RESPOSTA - STATUS 204`

    	No body returned to response

Feito pela equipe TechQuiz 🚀
