# Cadastro do Carro

**RF** <br/>
Deve ser possivel cadastrar um novo carro. <br/>
Deve ser possivel cadastrar todos categorias . <br/>

**RN** <br/>
Não deve ser possivel cadastrar um carro com uma placa ja existente. <br/>
Não deve ser possivel  alterar a placa de  um carro já cadastrado . <br/>
O carro deve ser cadastrado  por padrão, com disponibilidade. <br/>
O usuário  responsável pelo cadastro deve ser um usuário administrador. <br/>


# Listagem de carro

**RF** <br/>
Deve ser possivel listar todos os carros disponíveis. <br/>
Deve ser possivel listar todos os carros disponíveis pelo nome da categoria. <br/>
Deve ser possivel listar todos os carros disponíveis pelo nome da marca. <br/>
Deve ser possivel listar todos os carros disponíveis pelo nome do carro. <br/>

**RN** <br/>
O usuário não precisa estar logado no sistema. <br/>

# Cadastro de especificações no carro

**RF** <br/>
Deve ser possivel cadastrar uma especificação para um carro. <br/>


**RN** <br/>
Não de ser possivel cadastrar uma especificação para um carro não  cadastrado. <br/>
Não de ser possivel cadastrar uma especificação já existente para o mesmo carro. <br/>
O usuário  responsável pelo cadastro deve ser um usuário administrador. <br/>

# Cadastro de imagens do carro

**RF** <br/>
Deve ser possivel cadastrar a imagem do carro. <br/>
Deve ser possivel listar todos os carros . <br/>

**RNF** <br/>
Utilizar o multer  para upload dos arquivos . <br/>

**RN**
O usuário deve poder cadastrar mais de uma imagem para  o mesmo carro. <br/>
O usuário  responsável pelo cadastro deve ser um usuário administrador. <br/>

# Aluguel de  carro

**RF** <br/>
Deve ser possivel cadastrar um aluguel.
Deve ser possivel listar todos os alugueis do usuario
 <br/>


**RN** <br/>
O aluguel deve ter duração mínima de 24 horas . <br/>
Não deve ser possivel cadatrar um novo aluguel caso  já exista um aberto  para o mesmo usuário . <br/>
Não deve ser possivel cadatrar um novo aluguel caso  já exista um aberto  para o mesmo carro . <br/>
