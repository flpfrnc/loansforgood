# Loans For Good - Challenge Django Consultant
## _Teste Técnico para Consultor Django DigitalSys_

#### Inicialização do projeto:

É necessário ter docker instalado para iniciar este projeto:
https://docs.docker.com/engine/install/

```bash
# realize o clone do repositório
git clone https://github.com/flpfrnc/loansforgood.git
```
```bash
# acesse a pasta do projeto
cd loansforgood
```

#### IMPORTANTE: 
##### Algumas variáveis de ambiente são necessárias para que o projeto funcione e deverão ser criadas nas seguintes pastas
`fullstack_afiliados/frontend/.env`

```.env
 
VITE_AXIOS_BASE_URL=http://127.0.0.1:8000/api/
```

`fullstack_afiliados/backend/api/.env`
```.env
SECRET_KEY='django-insecure-(il=1!4n0s2f5r^9zewc13^9$)uo71m^%!7h$3s)od6$o4qua%'
DEBUG=True
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=loansforgood

DJANGO_SUPERUSER_USERNAME=admin
DJANGO_SUPERUSER_EMAIL=admin@email.com
DJANGO_SUPERUSER_PASSWORD=admin
```


```bash
# monte as imagens do projeto
docker-compose build
```
```bash
# inicie o container
docker-compose up
```



#### Observações:
Será criado um usuário admin com as seguintes credenciais: 
> login: `admin`  senha: `admin`

- O painel de administrador, onde os campos da proposta poderão ser selecionados poderá ser acessado através do seguinte endereço: http://localhost:8000/admin
- Para realizar a escolha dos campos, a seguinte estrutura foi adotada:

##### Os campos disponíveis para registro:
`["Nome", "Documento", "Data de Nascimento", "Valor", "Telefone", "Email", "Nome da Mãe", "Ocupação"]`

##### Os respectivos tipos dos campos registrados que definirão o tipo de input:
`["text", "number", "date", "email"]`

##### Opções de obrigatoriedade e visibilidade dos campos deverão ser marcadas:
- [ ] is_required
- [x] is_visible

#### O formulário de administrador descrito tem a seguinte estrutura:
![image](https://github.com/flpfrnc/loansforgood/assets/13010905/ff5e2011-13b2-4fa6-9c7f-8500d1b56fe9)

#### Após toda a configuração, a proposta é enviada através do frontend, passando pela api de processamento e caso aprovada, é listada nas 'Loan Proposals' do módulo de admin para que seja realizada a avaliação.
![image](https://github.com/flpfrnc/loansforgood/assets/13010905/4648c470-3012-45b3-84a0-52a9a9698c11)

### Stack Utilizada
- Django
- Django Celery
- Django Rest Framework
- React + Vite
