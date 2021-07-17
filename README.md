# IFood Like

Esse é meu primeiro projeto FrontEnd feito do começo ao fim que implementa vários recursos de um sistema de pedidos como IFood.
Nesse aplicativo eu consigo adicionar itens ao meu pedido, configurar itens com subitens e subitens de vários tipo como: opcionais, quantitativos, que mudam ou não valor do pedido, etc...
Foi bastante divertido entender os problemas que devem ser resolvidos aqui no frontend.

Eu também criei um projeto em [nodejs](https://github.com/davidalencar/ifoodlike_backend) apenas para suportar esse front.

## Construído com:
- [express](https://github.com/expressjs/express)
- [Angular CLI](https://github.com/angular/angular-cli) version 10.0.3.



## Primeiros passos

#### #Instale o client do Angular

Execute o seguinte comando:
```
sudo npm install -g @angular/cli
```

#### #Execute o BackEnd no seu ambiente

É preciso configurar e executar o projeto [loja_api](https://github.com/elly-group/loja_api).

Use o comando:
```
make dev
```

#### #Execute o FrondEnd no seu ambiente

Usando o comano:
```
make dev
```

A home do projeto estará disponível em `http://localhost:4200/`

## Usando o aplicativo

#### #Dica
 - Navegue no modo privado: O sistema tem um controle de cockies bem ruim que atrapalha muito os testes.

#### #Criar uma loja

Na home `http://localhost:4200/` clique em *Novo por aqui? Crie sua lista* e preencha o formulário com e-mail, nome da loja e telefone. O app deve mostrar uma msg informando que sua loja está sendo criada.

#### #Acessar configuração da loja
Acesso a home `http://localhost:4200/` novamente e faça o login com o e-mail informado e a senha *_gIUK31HNOyO3_*.

Você terá acesso ao painel de controle da loja

#### #Controle de plano do usr
O sistema tem um controle rudimentar de plano e para ter acessa a todas as funcionalidades é preciso alterar o plano do usr para *_'pro'_*

Encontre o registro no banco de dados e atribua a propriedade *_'plan'_* com o valor *_'pro'_*

#### #Acessar loja
`http://localhost:4200/` + NOME DA SUA LOJA

