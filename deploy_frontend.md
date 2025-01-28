[AmazonS3__BADGE]: https://img.shields.io/badge/Amazon%20S3-FF9900?style=for-the-badge&logo=amazons3&logoColor=white
[AWS__BADGE]: https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white
[VITE__BADGE]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[REACT__BADGE]: https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black

<div align="center">

<h1  style="font-weight: bold;"><img src="./GreenSphere-web/src/assets/images/logo.svg" alt="main section" width="30px" > Green Sphere Store<br> Frontend Deployment no Amazon S3</h1>

![AWS][AWS__BADGE]
![Amazon S3][AmazonS3__BADGE]
![REACT][REACT__BADGE]
![VITE][VITE__BADGE]

<a href="#about">Sobre</a> •
<a href="#config">Configurações Iniciais</a> •
<a href="#S3">Criação do bucket S3</a> •
<a href="#colab">Autor</a> •
<a href="#resources">Links Úteis</a>

</div>

<h2 id="about">📌 Sobre</h2>

Este documento tem como objetivo orientar na criação de um bucket S3 na Amazon AWS para hospedar o frontend em React do projeto Green Sphere Store.

<h2 id= "config">⚙️ Configurações iniciais</h2>

Antes de criar o S3:

1. **Alterar a BASE_URL para comunicação com a instância de API**

```javascript
const api = axios.create({
  baseURL: 'http://IP-da-API:3000',
  timeout: 5000,
});
```

2. **Preparar o Frontend para Deploy**

   O Amazon S3 suporta apenas sites estáticos. Por isso, é necessário realizar o build do projeto React e fazer o upload do diretório <kbd>dist</kbd> no bucket S3.
   No terminal, no diretório do frontend, execute:

```bash
npm run build
```

> [!WARNING]
> Certifique-se de que o script de build está configurado corretamente no <kbd>package.json</kbd>:

```json
  "scripts": {
    "build": "tsc -b && vite build",
    "deploy": "aws s3 sync dist/ s3://frontend-d3 --acl public-read --profile Miyata"
  }
```

<h2 id="S3">🧺 Criação do bucket S3</h2>

1.  Selecione o serviço

  <div align="center">

![alt text](./md/images/image-20.png)

  </div>

2.  Siga os passos com atenção:

<div align="center">

![alt text](./md/images/image-21.png)
![alt text](./md/images/image-23.png)

</div>

> [!IMPORTANT]
> Remova o bloqueio a acesso público

<div align="center">

![alt text](./md/images/image-24.png)
![alt text](./md/images/image-25.png)

Clique no bucket criado

![alt text](./md/images/image-26.png)

Após o build, faça upload do diretório <kbd>dist</kbd> no bucket criado.

![alt text](./md/images/image-22.png)

No console do bucket, habilite a hospedagem de sites estáticos e configure a página inicial e a de erro:

![alt text](./md/images/image-27.png)
![alt text](./md/images/image-28.png)

Habilite a opção e configure da seguinte forma:

![alt text](./md/images/image-29.png)

Vá na aba de permissões e adicione uma política para permitir acesso público ao bucket:

![alt text](./md/images/image-30.png)
![alt text](./md/images/image-31.png)
![alt text](./md/images/image-32.png)

</div>

> [!IMPORTANT]
> Certifique-se de sua política estar assim ao final:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowPublicAccess",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::nome-do-seu-bucket/*"
    }
  ]
}
```

> [!IMPORTANT]
> Agora selecione todos os seus arquivos e torne-os públicos:

<div align="center">

![alt text](./md/images/image-34.png)

Após concluir a configuração, acesse o endpoint público do bucket, disponível na aba de propriedades.

![alt text](./md/images/image-35.png)

![alt text](./md/images/image-36.png)

</div>

> [!NOTE]
> Parabéns por chegar até aqui! Você concluiu com sucesso o deploy da aplicação. 🎉

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
3. - [x] [**Deploy do Frontend**](./deploy_frontend.md)
   - - [x] Atualizar a URL da API no frontend para o IP da instância da API "http://<IP-da-instância-API>:3000"
   - - [x] Criar Bucket para hospedagem de sites estáticos no S3 com permissão de acesso público
   - - [x] Fazer o upload dos arquivos do build para o bucket do S3.
4. - [x] Realizar testes
   - - [x] **Banco de Dados:** Verificação das tabelas e dados inseridos manualmente.
   - - [x] **API:** Testes de requisições no Insomnia ou Postman confirmando comunicação com o banco.
   - - [x] **Frontend:** Requisições bem-sucedidas ao backend hospedado na instância da API.

</details>

<br>

> [!NOTE]
> Se encontrar um erro de "Acesso Negado", revise as configurações de bloqueio público e permissões no S3.

> [!TIP]
> Ainda tem dúvidas? Confira o vídeo "Deploy React no S3 da AWS" na seção de links úteis para obter mais detalhes.

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
