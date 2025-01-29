[AWS__BADGE]: https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white
[DOCKER__BADGE]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Postgres__BADGE]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[GitHub__BADGE]: https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white

<div align="center">

<h1  style="font-weight: bold;"><img src="./GreenSphere-web/src/assets/images/logo.svg" alt="main section" width="30px" > Green Sphere Store<br>Backend Deployment no Amazon EC2</h1>

![AWS][AWS__BADGE]
![Postgres][Postgres__BADGE]
![DOCKER][DOCKER__BADGE]
![GitHub_][GitHub__BADGE]

<a href="#about">Sobre</a> •
<a href="#config">Configurações Iniciais</a> •
<a href="#docker">Instalação do Docker e Docker Compose</a> •
<a href="#git">Conexão com repositório no GitHub</a> •
<a href="#db">Configuração do Banco de Dados (PostgreSQL) - GitHub + docker-compose</a> •
<a href="#api">Configuração da API (nodejs) - GitHub + docker-compose</a> •
<a href="#pop">Popular banco de dados</a> •
<a href="#next">Próximos Passos</a> •
<a href="#colab">Autor</a> •
<a href="#resources">Links Úteis</a>

</div>

<div>

<h2 id="about">📌 Sobre</h2>

Este documento tem como objetivo orientar no deploy da api e do banco de dados em sua respectivas instâncias EC2 do projeto Green Sphere Store.

<h2 id="config">⚙️ Configurações iniciais</h2>

**_Deseja configurar a instância do banco de dados? Siga:_**

- <a href="#docker">Instalação do Docker e Docker Compose</a>
- <a href="#git">Conexão com repositório no GitHub</a>
- <a href="#db">Configuração do Banco de Dados (PostgreSQL) - GitHub + docker-compose</a>

**_Deseja configurar a instância da API? Siga:_**

- <a href="#docker">Instalação do Docker e Docker Compose</a>
- <a href="#git">Conexão com repositório no GitHub</a>
- <a href="#api">Configuração da API (nodejs) - GitHub + docker-compose</a>

**Pré-requisitos:**

- Tenha certeza de que, nas instâncias EC2 com o sistema Ubuntu, [Banco de Dados](./banco-instancia.md) e [API](./api-instancia.md), a confguração do security group seja:
  - Banco de Dados: Abrir a porta 5432 para a instância da API;
  - API: Abrir a porta 3000 para teste externos e comunicação com o frontend.
- Tenha previamente testado sua conexão ambas via SSH usando o comando:

  ```bash
  ssh -i sua-chave-pública ubuntu@<IP-da-instância>
  ```

> [!WARNING]
> Caso não tenha feito essas etapas, recomendo que volte e siga as instruções.

</div>

<h2 id="docker">🛢️ Instalação do Docker e Docker Compose</h2>

- **Instalação do Docker e Docker Compose**

  - Atualizar pacotes:

  ```bash
  sudo apt-get update
  ```

- Instalar os pacotes necessários para a comunicação segura com repositórios (certificados, <kbd>curl</kbd> e suporte para GPG).

  ```bash
  sudo apt-get install ca-certificates curl gnupg
  ```

- Criar o diretório /etc/apt/keyrings com permissões específicas (somente leitura para outros usuários).

  ```bash
  sudo install -m 0755 -d /etc/apt/keyrings
  ```

- Baixar a chave GPG oficial do Docker e a converter para o formato binário necessário (docker.gpg).

  ```bash
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  ```

- Garantir que todos os usuários podem ler a chave (necessário para que o APT reconheça o repositório como confiável).

  ```bash
  sudo chmod a+r /etc/apt/keyrings/docker.gpg
  ```

- Adicionar o repositório do Docker

  ```bash
  echo \
   "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
   "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  sudo apt-get update
  ```

- Instalar Docker

  ```bash
  sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  ```

- **Verifique a instalação:**

  ```bash
  sudo docker run hello-world
  ```

- O grupo docker existe mas não tem usuários, se quiser rodar sem precisar do <kbd>sudo</kbd>, execute os comandos:

  ```bash
  sudo groupadd docker
  ```

  ```bash
  sudo usermod -aG docker $USER
  ```

  ```bash
  newgrp docker
  ```

- Teste:

  ```bash
  docker run hello-world
  ```

  ```bash
  docker -v
  ```

  ```bash
  docker compose version
  ```

  Deverá esse tipo de resposta:

  ```makefile
   ubuntu@ip-10-0-3-242:~$ docker -v
   Docker version 27.5.1, build 9f9e405
   ubuntu@ip-10-0-3-242:~$ docker compose version
   Docker Compose version v2.32.4
  ```

  Caso encontre dificuldades para chegar nesse resultado assista esse vídeo [**_AWS FÁCIL: Deploy de aplicação NodeJs + PostgreSQL no EC2_**](https://www.youtube.com/watch?v=iyiANe9Eszs&t=1483s)<br>
  Ou, se quiser tentar de outra forma, siga esse vídeo [**_Como fazer um deploy na Aws de uma aplicação no Docker? | Thi Code_**](https://www.youtube.com/watch?v=bVzjKJL2b2M&t=792s) e [**_documentação_**](https://busy-sunspot-00c.notion.site/Settings-for-EC2-db344aed5235413d9e0f71e6d457ba90)

<div>

  <h2 id='next-docker'>🏃🏻‍♀️ Próximos Passos</h2>

1. <a href="#git">Conexão com repositório no GitHub na instância da Banco de Dados</a>
2. <a href="#db">Configuração do Banco de Dados (PostgreSQL) - GitHub + docker-compose</a>
3. [Criar instância da API](./api-instancia.md)
4. <a href="#docker">Instalação do Docker e Docker Compose na instância da API</a>
5. <a href="#git">Conexão com repositório no GitHub na instância da API</a>
6. <a href="#api">Configuração da API (nodejs) - GitHub + docker-compose</a>
7. <a href="#pop">(Opcional para testes) Popular banco de dados</a>
8. [Deploy do Frontend](./deploy_frontend.md)

</div>

<h2 id='git'>🛢️ Conexão com repositório no GitHub</h2>

**- Conectando o GitHub com a instância**

- No terminal da instância gere uma chave SSH e copie-a, executando os seguintes

  ```bash
  ssh-keygen -t rsa
  ```

  Exponha os dados da chave com:

  ```bash
  cat ~/.ssh/id_rsa.pub
  ```

  Deverá esse tipo de resposta:

  ```makefile
  ubuntu@ip-da-instância:~$ cat ~/.ssh/id_rsa.pub
  ssh-rsa chave-dados-da-chave= ubuntu@ip-da-instância
  ```

  Selecione os dados, copie, logue em sua conta do GitHub e siga os passos:

  1. Clique na sua foto e acesse as Settings

  2. Em SSH and GPG keys, gere uma nova chave:

   <div align="center">

  ![alt text](./md/images/imagegitsettings.png)

  ![alt text](./md/images/image-ssh.png)

  ![alt text](./md/images/image-new-ssh.png)

  ![alt text](./md/images/image-ssh-conf.png)

  </div>

  Com isso sua conta está conectada com a instância.

**- Clonando repositório**

1. Vá até o repositório, clique em <kbd><> Code</kbd>, SSH e copie o comando para clonar o repositório.

<div align="center">

![alt text](./md/images/image-clone.png)

</div>

2. No terminal do Ubunto, execute o seguinte:

   ```bash
   git clone git@github.com:g-Miyata/D03_AWS_FULLSTACK_NOV24.git
   ```

3. Verique se deu certo:

   ```bash
   ls
   ```

   Deverá ter essa resposta:

   ```makefile
   ubuntu@ip-da-instância:~$ ls
   D03_AWS_FULLSTACK_NOV24
   ```

  <h2>🏃🏻‍♀️ Próximos passos</h2>

1.  <a href="#db">Configuração do Banco de Dados (PostgreSQL) - GitHub + docker-compose</a>
2.  [Criar instância da API](./api-instancia.md)
3.  <a href="#docker">Instalação do Docker e Docker Compose na instância da API</a>
4.  <a href="#git">Conexão com repositório no GitHub na instância da API</a>
5.  <a href="#api">Configuração da API (nodejs) - GitHub + docker-compose</a>
6.  <a href="#pop">(Opcional para testes) Popular banco de dados</a>
7.  [Deploy do Frontend](./deploy_frontend.md)

<h2 id='db'>🛢️ Configuração do Banco de Dados (PostgreSQL) com GitHub + docker-compose</h2>

**- Inicializar o container do Banco de Dados através do docker-compose**

1. Acesse a em que se encontra o arquivo docker-compose:

   ```bash
   cd D03_AWS_FULLSTACK_NOV24/GreenSphere-api/
   ```

   Verifique se o arquivo <kbd>docker-compose.yml</kbd> está no diretório:

   ```bash
   ls
   ```

   Deverá ter essa resposta:

   ```makefile
   ubuntu@ip-10-0-0-234:~/D03_AWS_FULLSTACK_NOV24/GreenSphere-api$ ls
   Dockerfile  dist  docker-compose.yml  node_modules  package-lock.json  package.json  prisma  src  tsconfig.json
   ```

2. Suba o container do banco de dados:

   ```bash
   cd D03_AWS_FULLSTACK_NOV24/GreenSphere-api/
   ```

   ```bash
   docker compose up -d postgres
   ```

   Verifique se o container subiu e está ativo:

   ```bash
   docker ps
   ```

   Deverá ter essa resposta:

   ```makefile
   ubuntu@ip-10-0-0-234:~/D03_AWS_FULLSTACK_NOV24/GreenSphere-api$ docker ps
   CONTAINER ID   IMAGE             COMMAND                  CREATED         STATUS         PORTS                                       NAMES
   fff11f1b839b   postgres:latest   "docker-entrypoint.s…"   8 seconds ago   Up 7 seconds   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp   postgres_db
   ```

Com isso você tem a confirmação do seu container deu certo. Próximo passo é [criar a instância da API](./api-instancia.md) para realizar a comunicação entre ambos.

  <h2>🏃🏻‍♀️ Próximos passos</h2>

1.  [Criar instância da API](./api-instancia.md)
2.  <a href="#docker">Instalação do Docker e Docker Compose</a>
3.  <a href="#git">Conexão com repositório no GitHub</a>
4.  <a href="#api">Configuração da API (nodejs) - GitHub + docker-compose</a>
5.  <a href="#pop">(Opcional para testes) Popular banco de dados</a>
6.  [Deploy do Frontend](./deploy_frontend.md)

<details>
<summary>✅ Todo-List</summary>

1. - [x] [**Criação e Configuração da Instância EC2 do banco de dados na AWS**](./banco-instancia.md)
   - - [x] Configurar security group para abrir a porta 5432 para a instância da API.
   - - [x] Adicionar configurar, no diretório da API, um service:postgres no <kbd>docker-compose.yml</kbd> para criar container do postgres
   - - [x] Subir instância no EC2 com o sistema operacional Ubuntu
   - - [x] [**Instalar o Docker e Docker Compose na instância**](./deploy_backend.md)
   - - [x] Baixar resposiório do GitHub
   - - [x] Realizar o docker-compose up do container do PostgreSQL
2. - [ ] [**Criação e Configuração da Instância EC2 da API em nodejs na AWS**](./api-instancia.md)
   - - [ ] Configurar security group para abrir a porta 3000 para teste externo e comunicação com o frontend
   - - [ ] Mudar o IP de comunicação com o banco de dados para **_<IP da instância>:5432_**
   - - [ ] Adicionar configurar, no diretório da API, um <kbd>Dockerfile</kbd> um service:api no <kbd>docker-compose.yml</kbd> para criar container da API
   - - [ ] Subir instância no EC2 com o sistema operacional Ubuntu
   - - [ ] [**Instalar o Docker e Docker Compose na instância**](./deploy_backend.md)
   - - [ ] Baixar resposiório do GitHub
   - - [ ] Realizar o docker-compose up do container da API
3. - [ ] [**Deploy do Frontend**](./deploy_frontend.md)
   - - [ ] Atualizar a URL da API no frontend para o IP da instância da API "http://<IP-da-instância-API>:3000"
   - - [ ] Criar Bucket para hospedagem de sites estáticos no S3 com permissão de acesso público
   - - [ ] Fazer o upload dos arquivos do build para o bucket do S3.
4. - [ ] Realizar testes
   - - [ ] **Banco de Dados:** Verificação das tabelas e dados inseridos manualmente.
   - - [ ] **API:** Testes de requisições no Insomnia ou Postman confirmando comunicação com o banco.
   - - [ ] **Frontend:** Requisições bem-sucedidas ao backend hospedado na instância da API.

</details>

<h2 id="api">🖧 Configuração da API (nodejs) - GitHub + docker-compose</h2>

1. Acesse o diretório:

   ```bash
   cd D03_AWS_FULLSTACK_NOV24/GreenSphere-api/
   ```

2. Configure o arquivo .env com suas credenciais:

   ```bash
   nano .env
   ```

   Digite:

   ```javascript
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD= sua-senha
    POSTGRES_DB= nome-db
    DATABASE_URL=postgresql://postgres:sua-senha@<IP-da-instância-DB>:5432/nome-db
   ```

3. Suba o container da API

   ```bash
   docker compose up -d api
   ```

   Verifique se o container subiu e está ativo:

   ```bash
   docker ps
   ```

   Deverá ter essa resposta:

   ```makefile
   ubuntu@ip-10-0-11-87:~/D03_AWS_FULLSTACK_NOV24/GreenSphere-api$ sudo docker ps
   CONTAINER ID   IMAGE                 COMMAND                  CREATED          STATUS          PORTS                                       NAMES
   a6efa5610347   greensphere-api-api   "docker-entrypoint.s…"   15 seconds ago   Up 13 seconds   0.0.0.0:3000->3000/tcp, :::3000->3000/tcp   green_api
   ```

  <h2>🏃🏻‍♀️ Próximos passos</h2>

1.  <a href="#pop">Popular banco de dados</a>
2.  [Deploy do Frontend](./deploy_frontend.md)

<details>
<summary>✅ Todo-List</summary>

1. - [x] [**Criação e Configuração da Instância EC2 do banco de dados na AWS**](./banco-instancia.md)
   - - [x] Configurar security group para abrir a porta 5432 para a instância da API.
   - - [x] Adicionar configurar, no diretório da API, um service:postgres no <kbd>docker-compose.yml</kbd> para criar container do postgres
   - - [x] Subir instância no EC2 com o sistema operacional Ubuntu
   - - [x] [**Instalar o Docker e Docker Compose na instância**](./deploy_backend.md)
   - - [x] Baixar resposiório do GitHub
   - - [x] Realizar o docker-compose up do container do PostgreSQL
2. - [x] [**Criação e Configuração da Instância EC2 da API em nodejs na AWS**](./api-instancia.md)
   - - [x] Configurar security group para abrir a porta 3000 para teste externo e comunicação com o frontend
   - - [x] Mudar o IP de comunicação com o banco de dados para **_<IP da instância>:5432_**
   - - [x] Adicionar configurar, no diretório da API, um <kbd>Dockerfile</kbd> um service:api no <kbd>docker-compose.yml</kbd> para criar container da API
   - - [x] Subir instância no EC2 com o sistema operacional Ubuntu
   - - [x] [**Instalar o Docker e Docker Compose na instância**](./deploy_backend.md)
   - - [x] Baixar resposiório do GitHub
   - - [x] Realizar o docker-compose up do container da API
3. - [ ] [**Deploy do Frontend**](./deploy_frontend.md)
   - - [ ] Atualizar a URL da API no frontend para o IP da instância da API "http://<IP-da-instância-API>:3000"
   - - [ ] Criar Bucket para hospedagem de sites estáticos no S3 com permissão de acesso público
   - - [ ] Fazer o upload dos arquivos do build para o bucket do S3.
4. - [ ] Realizar testes
   - - [ ] **Banco de Dados:** Verificação das tabelas e dados inseridos manualmente.
   - - [ ] **API:** Testes de requisições no Insomnia ou Postman confirmando comunicação com o banco.
   - - [ ] **Frontend:** Requisições bem-sucedidas ao backend hospedado na instância da API.

</details>

<h2 id="pop">Popular banco de dados com dados fitícios para testes</h2>

**- Populando o Banco de Dados**

1. Vá no terminal do banco de dados e execute:

   ```
   docker exec -it postgres_db psql -U postgres -d desafio3
   ```

   ```
   \dt
   ```

   Deverá ter essa resposta:

   ```makefile
   TABELA
   ```

   ```sql
   INSERT INTO "Type" ("id", "typeName")
   VALUES
   (1, 'cactus'),
   (2, 'succulent'),
   (3, 'air-purifying'),
   (4, 'tropical'),
   (5, 'flowering '),
   (6, 'tree'),
   (7, 'trailing'),
   (8, 'herb'),
   (9, 'fern'),
   (10, 'orchid'),
   (11, 'palm'),
   (12, 'grass-like'),
   (13, 'edible');
   SELECT * FROM "Type";
   ```

   ```sql
   INSERT INTO "Type" ("id", "typeName")
   VALUES
   (1, 'Echinocereus Cactus', 'A Majestic Addition', 'indoor', 1, 139.99, true, 20, 'Species: Echinocereus spp.', 'Ladyfinger cactus (Echinocereus pentalophus)', 'https://http2.mlstatic.com/D_NQ_NP_833120-MLB75616703076_042024-O.webp');
   SELECT * FROM "Type";
   ```

2. Faça teste com o Isominia ou Postman

<div align="center">

GET na rota http://IP-da-sua-API:3000/types

![alt text](./md/images/image-insominia.png)

</div>

Com isso tem-se a validação de que a rota está funcionando.

<h2 id="next">🏃🏻‍♀️ Próximos passos</h2>

1.  [Deploy do Frontend](./deploy_frontend.md)

<details>
<summary>✅ Todo-List</summary>

1. - [x] [**Criação e Configuração da Instância EC2 do banco de dados na AWS**](./banco-instancia.md)
   - - [x] Configurar security group para abrir a porta 5432 para a instância da API.
   - - [x] Adicionar configurar, no diretório da API, um service:postgres no <kbd>docker-compose.yml</kbd> para criar container do postgres
   - - [x] Subir instância no EC2 com o sistema operacional Ubuntu
   - - [x] [**Instalar o Docker e Docker Compose na instância**](./deploy_backend.md)
   - - [x] Baixar resposiório do GitHub
   - - [x] Realizar o docker-compose up do container do PostgreSQL
2. - [x] [**Criação e Configuração da Instância EC2 da API em nodejs na AWS**](./api-instancia.md)
   - - [x] Configurar security group para abrir a porta 3000 para teste externo e comunicação com o frontend
   - - [x] Mudar o IP de comunicação com o banco de dados para **_<IP da instância>:5432_**
   - - [x] Adicionar configurar, no diretório da API, um <kbd>Dockerfile</kbd> um service:api no <kbd>docker-compose.yml</kbd> para criar container da API
   - - [x] Subir instância no EC2 com o sistema operacional Ubuntu
   - - [x] [**Instalar o Docker e Docker Compose na instância**](./deploy_backend.md)
   - - [x] Baixar resposiório do GitHub
   - - [x] Realizar o docker-compose up do container da API
3. - [ ] [**Deploy do Frontend**](./deploy_frontend.md)
   - - [ ] Atualizar a URL da API no frontend para o IP da instância da API "http://<IP-da-instância-API>:3000"
   - - [ ] Criar Bucket para hospedagem de sites estáticos no S3 com permissão de acesso público
   - - [ ] Fazer o upload dos arquivos do build para o bucket do S3.
4. - [ ] Realizar testes
   - - [x] **Banco de Dados:** Verificação das tabelas e dados inseridos manualmente.
   - - [x] **API:** Testes de requisições no Insomnia ou Postman confirmando comunicação com o banco.
   - - [ ] **Frontend:** Requisições bem-sucedidas ao backend hospedado na instância da API.

</details>

<h2 id="colab">🖌 Autor</h2>

<table align="center">
  <tr style="display: flex; justify-content: space-around;" >
    <td align="center">
      <img src="./GreenSphere-web/src/assets/images/Miyata.jpg" width="200px;" height="200px;" alt="Guilherme Miyata Profile Picture"/><br>
      <b>Guilherme Miyata</b><br>
      <a href="https://github.com/g-Miyata">
        <img src="./GreenSphere-web/src/assets/images/github.png" width="20px;" alt="GitHub Icon"/>
      </a>
      <a href="https://www.linkedin.com/in/guilherme-miyata-612a71219/">
        <img src="./GreenSphere-web/src/assets/images/linkedin.png" width="20px;" alt="LinkedIn Icon"/>
      </a>
    </td>
  </tr>
</table>

<h2 id="resources">📄 Links úteis</h2>

- [🎥 Deploy React no S3 da AWS](https://www.youtube.com/watch?v=vosy6rEeOiw)
- [🛢️ Backend Deploy](./deploy_backend.md)
- [🛢️ Instância API](./api-instancia.md)
- [🛢️ Instância DB](./banco-instancia.md)
- [⚛ Frontend Deploy](./deploy_frontend.md)
