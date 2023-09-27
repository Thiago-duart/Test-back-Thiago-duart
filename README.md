🤦‍♂️🤦‍♂️

 <h1>testing-api</h1>

[Rotas sem autenticação](#one)

[Rotas com autenticação](#two)

[executar o projeto](#zero)

A API tem um total de 7 endpoints, sendo em volta principalmente da rota (user) - podendo cadastrar Registro de usuarios.

<sub>Observação: Este projeto foi criado apenas com o intuito de estudo. Portanto, informações sensíveis, como chaves de acesso ou links para o cluster, estão expostas no código e deveriam ser armazenadas em variáveis de ambiente ou configuradas em um serviço de configuração adequado.<sub/>

**repos**

url do Front-end: https://github.com/Thiago-duart/test-Front-Thiago-duart

url do back-end:https://github.com/Thiago-duart/Test-back-Thiago-duart

---

<br/>
<br/>
<br/>
<a name="executar o projeto" id="zero"></a>
✔📌**executar o projeto**

<br/>
Após Clonar os Projeto =>
<h4>O projeto utiliza um banco de dados MongoDB e, nesse caso, é necessário conectar o cluster do MongoDB ao projeto. Para fazer isso, siga as etapas abaixo:<h4/>

- Acesse o MongoDB Atlas: Faça login na sua conta do MongoDB Atlas ou crie uma nova conta se ainda não tiver uma.

- Crie um Cluster: Se você ainda não tiver um cluster, crie um novo na seção "Clusters". Siga as instruções fornecidas para configurar o cluster de acordo com suas necessidades.

- Obtenha a String de Conexão: Após criar o cluster, vá para a seção "Clusters" e clique no botão "Connect". Em seguida, selecione "Connect your application" e copie a string de conexão fornecida. Essa string de conexão será usada para conectar o seu projeto ao cluster do MongoDB.

- Cole a String de Conexão no Projeto: No código do seu projeto, cole a string de conexão do MongoDB onde é necessário.

  **"./app.module.ts"**
  ![Alt text](https://cdn.discordapp.com/attachments/649373577841344553/1156682963258458313/image.png?ex%253D6515dc74%2526is%253D65148af4%2526hm%253Dc20913b25fc6a37c770947ddec6f4bbf782d134c18dfed5afbae319a5904c957%2526)
  <br/>
  <br/>

  Clonar os repositórios para executar o projeto completo e, em seguida, utilize o comando a seguir:

## no Front

```bash
pnpm install
pnpm run start
```

<br/>

## no Back

```bash
pnpm install
pnpm run start:dev
```

---

<br/>
<br/>
<br/>
<a name="Rotas sem autenticação" id="one"></a>
 <h1>Rotas que não precisam de autenticação </h1>

### 📌Nessa aplicação o usuário pode fazer login na seguinte rota

**POST http://localhost:3000/auth/login**

<tr>

(**BODY**)

```ruby
	"content":{
	"email":"admin@admin.com",
	"password":"@Admin123"
}
```

### 🔑 ROTA DE LOGIN RETORNA UM TOKEN DE ACESSO

---

### 📌Nessa aplicação o usuário pode fazer o cadastro na seguinte rota

**POST http://localhost:3000/auth/register**

(**BODY**)

```ruby
{
	"name": "admin",
	"email":"admin@admin.com",
	"password":"@Admin123"
}
```

---

<br/>
<br/>
<a name="Rotas com autenticação" id="two"></a>
 <h1>Rotas que precisa de AUTENTIÇÃO </h1>
<br/>
<br/>

### 📌Criar um Registro de Usuario

**POST http://localhost:3000/user**

(**BODY**)

```ruby
{
	"data":{
		   "userId": "98232",
			"name": "teste100",
			"age":" 21",
			"githubUser": "Thiago-duart",
			"address": {
				"cep": "01001000",
				"state": "SP",
				"city": "São Paulo",
				"neighborhood": "Sé",
				"street": "adsfasdasdf",
				"number": "123123",
				"complement": "em frente"
			}
		}
}
```

<br/>

### 📌Buscar todos os Registros de Usuarios

**GET http://localhost:3000/user**

(**Formato da resposta**)

```ruby
{
	"data":[{
		"userId": "98232",
			"name": "teste100",
			"age":" 21",
			"githubUser": "Thiago-duart",
			"address": {
				"cep": "01001-000",
				"state": "SP",
				"city": "São Paulo",
				"neighborhood": "Sé",
				"street": "adsfasdasdf",
				"number": "123123",
				"complement": "em frente",
				"logradouro": "Praça da Sé",
				"ibge": "3550308",
				"gia": "1004",
				"ddd": "11",
				"siafi": "7107"}
            "githubData": {
				"login": "Thiago-duart",
				"id": 129175937,
				"avatar": "https://avatars.githubusercontent.com/u/129175937?v=4",
				"url": "https://api.github.com/users/Thiago-duart",
             "repos":[{
					    "id": 639436241,
						"owner": "Thiago-duart",
						"full_name": "Thiago-duart/demos_t18",
						"repo_url": "https://github.com/Thiago-duart/demos_t18"
							}]
   }]
}
```

<br/>

### 📌Buscar Um Resgistro de Usuarios pelo ID

**GET http://localhost:3000/user/:userId**

(**Formato da resposta**)

```ruby
{
	"data":{
		"userId": "98232",
			"name": "teste100",
			"age":" 21",
			"githubUser": "Thiago-duart",
			"address": {
				"cep": "01001-000",
				"state": "SP",
				"city": "São Paulo",
				"neighborhood": "Sé",
				"street": "adsfasdasdf",
				"number": "123123",
				"complement": "em frente",
				"logradouro": "Praça da Sé",
				"ibge": "3550308",
				"gia": "1004",
				"ddd": "11",
				"siafi": "7107"}
            "githubData": {
				"login": "Thiago-duart",
				"id": 129175937,
				"avatar": "https://avatars.githubusercontent.com/u/129175937?v=4",
				"url": "https://api.github.com/users/Thiago-duart",
             "repos":[{
					    "id": 639436241,
						"owner": "Thiago-duart",
						"full_name": "Thiago-duart/demos_t18",
						"repo_url": "https://github.com/Thiago-duart/demos_t18"
							}]
   }
}
```

<br/>

### 📌Editar um Registro de Usuario

**PATH http://localhost:3000/user/:userId**

(**BODY**)

```ruby
{
	"data":{
			"name": "Editado",
			"address": {
				"cep": "01001000",

			}
		}
}
```

<br/>

### 📌Deletar um Registro de Usuario

**DELETE http://localhost:3000/user/:userId**

(**Formato da resposta**)

```ruby
{
	{
	"message": "successfully deleted"
  }
}
```
