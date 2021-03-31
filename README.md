# Loja
Esse projeto é o frontend da nossa loja.

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

#### #Acessar loja
`http://localhost:4200/` + NOME DA SUA LOJA
