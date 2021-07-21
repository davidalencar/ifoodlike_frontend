# IFood Like

Esse é meu primeiro projeto FrontEnd feito do começo ao fim que implementa vários recursos de um sistema de pedidos como IFood.
Nesse aplicativo eu consigo adicionar itens ao meu pedido, configurar itens com subitens e subitens de vários tipo como: opcionais, quantitativos, que mudam ou não valor do pedido, etc...
Foi bastante divertido entender os problemas que devem ser resolvidos aqui no frontend.

Eu também criei um projeto em [nodejs](https://github.com/davidalencar/ifoodlike_backend) apenas para suportar esse front.

## Teste online
Faça um pedido teste na hamburgueria que configurei para mostrar as funcionalidade da loja.

Clique em [http://bslista.com/hamburgueria](http://bslista.com/hamburgueria)



## Telas - Visão do cliente

#### Cardápio
Dividido por categoria e navegável através botões de atalhos que ficam fixos na tela.

<img src="https://user-images.githubusercontent.com/866821/126168605-b5913590-1f1e-4b3f-a5dd-f4fa916c17e1.jpg" width="360" height="720" >

#### Configuração dos itens no carrinho
Na mesma tela controlo vários tipos de componentes que correspondem ao comportamento de cada subitem do produto.

<img src="https://user-images.githubusercontent.com/866821/126168610-05081711-c440-45b9-9bd8-0903b442e0ec.jpg" width="360" height="720" >

#### Fechamento do pedido
Aqui além de sumarizar o pedido também implemento várias validações configurada dinamicamente.

<img src="https://user-images.githubusercontent.com/866821/126168619-6c06a28a-d175-4d2f-a631-da2ced8fe25b.jpg" width="360" height="720" >


## Telas - Visão do administrador
Também crieo uma área de controle da loja com várias funcionaldiade para administrar pedidos, clientes e produtos.

#### Configuração da loja
Aqui você pode editar a aparência, dados de contato, organização do menu, validação de preços, etc. Tudo organizado na mesma área para faciliar aa utilização.

<img src="https://user-images.githubusercontent.com/866821/126171167-d529ba1e-a833-4065-a6b8-819c4397900a.jpg" width="360" height="720" >

#### Controle de produtos
O controle de produtos também está organizado por categorias e permite recursos como: Mostrar ou esconder um produto no cardápio, duplicar o produto para reutilização, trocar de categoria, etc...

<img src="https://user-images.githubusercontent.com/866821/126171172-1bf68867-e9ca-4b31-b35c-14a8c9d3c1c5.jpg" width="360" height="720" >

#### Configuração de subitens
Um produto pode ter subitens dos tipos livre ou múltipla escolha, como por exemplo: Um combo de burger com uma bebida teria um subitem do tipo múltipla escolha com várias opções de bebida, já itens como temperos e condimentos podem ser do tipo livre por serem opcionais.

Cada subitem também suporta suas próprias validações e variáveis de preço, como por exemplo: Um subitem pode indicar o tamanho de um produto e um tamanho maior soma um valor ao preço base do item.

<img src="https://user-images.githubusercontent.com/866821/126171175-7767d57c-e526-47f1-a22b-cbe519b0f241.jpg" width="360" height="720" >

#### Pedidos
A tela de pedidos mostra por padrão aquelas que ainda não foram atendidos e tem a opção de verificar o histórico daqueles que já foram entregues. 
Além de uma visão organizada e simples dos pedidos o usuário ainda pode selecionar vários pedidos de acordo com a categoria de cliente.
Cada pedido conta com um botão de atalho para chamar aquele cliente direto no whatsapp com uma mensagem pré-definida.

<img src="https://user-images.githubusercontent.com/866821/126171183-266c3409-d76e-4aaf-85cd-dc1c7eda9da3.jpg" width="360" height="720" >

#### Clientes
Uma lista de todos os clientes que fizeram pedidos na sua loja com opções para categorização e contato direto no whatsapp.

<img src="https://user-images.githubusercontent.com/866821/126171188-f3a6932f-61f9-4d40-a759-48ea317109ae.jpg" width="360" height="720" >




## Construído com:
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
Acesso a home `http://localhost:4200/` novamente e faça o login com o e-mail informado e a senha *{SENHA}*.

Você terá acesso ao painel de controle da loja

#### #Controle de plano do usr
O sistema tem um controle rudimentar de plano e para ter acessa a todas as funcionalidades é preciso alterar o plano do usr para *_'pro'_*

Encontre o registro no banco de dados e atribua a propriedade *_'plan'_* com o valor *_'pro'_*

#### #Acessar loja
`http://localhost:4200/` + NOME DA SUA LOJA

