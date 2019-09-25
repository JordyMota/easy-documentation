// É melhor setar linguagem para html ao editar textos longos
// o trexo replaceStringRightHere é usado para burlar formatação de palavras reservadas pelo plugin de heighlight de syntax
// Ao formatar um objeto aconselho o seguinte formato
// {<br>      chave: valor,<br>      chave: valor,<br>      chave: valor<br>}
// Ao formatar uma função aconselho o seguinte formato
// nomeDaFuncao( );


// Cada chave do objeto pagesContent é uma página
// Dentro dessa chave vem outro objeto que contem os campos:
// title [obrigatorio] - String - nome do campo que aparecera na lista de paginas
// content: [obrigatorio] - Array de Objetos - Contem um array com cada item da pagina de documentação
// Ainda no content, cada item desse array de items pagina pode ter os seguintes campos
// // title [Opcional] - String descreve o titulo do bloco
// // dataAnchor [Opcional] - String descreve o nome da ancora daquele bloco caso haja uma ancora
// // type - String descreve o tipo daquele bloco, para saber se é um bloco de codigo ou uma descrição ou uma imagem
// // / Caso o type não seja passado o bloco assume o tipo descrição, e caso nem o type
// // / nem o content sejam passados o  bloco assumira o tipo de titula da pagina por completo
// // content [Opcional] - String descreve o conteudo daquele bloco - varia de acordo com o type

const pagesContent = {
	"modal_controller": {
		"title": "Criando",
		"content": [
			{
				"title": "Criando sua documentação",
			},
			{
				"type": "descript",
				"title": "Como fazer",
				"content": `O primeiro passo é <strong><a data-anchor="#styling">personalizar</a></strong> a sua documentação.`
			},
			{
				"type": "descript",
				"title": "Personalizando",
				"dataAnchor": "styling",
				"content": `Esse passo é opcional então vocẽ pode ir direto para <strong><a data-anchor="#create_document">criação</a></strong> do seu documento`
			},
			{
				"type": "descript",
				"title": "pagesContent [Objeto]",
				"dataAnchor": "create_document",
				"content": `Método que gera o modal, deve ser executado ao criar um novo modal. Seus parametros são um objeto do tipo <strong><a data-anchor="#modal_option_param">ModalObject</a></strong> [OBRIGATÓRIO] e um <strong>callback</strong> [OPCIONAL] que é executado após a criação, é retornado o respectivo <strong>modalObject</strong> como parametro. É recomendado salvar ou em uma variavel ou um atributo da classe que está instaciado (depende do contexto), para facilitar o uso posteriormente. <strong>Retorno: ModalObject</strong>`
			},
			{
				"type": "code",
				"content": "const myModal = modalController.create(modalOptions, callback);"
			},
			{
				"type": "descript",
				"title": "modalOptions [objeto - ModalObject]",
				"dataAnchor": "modal_option_param",
				"content": `Objeto do tipo <strong>ModalObject</strong> que contem os dados que irão definir a aparencia , estrutura e comportamento do modal, é passado para o metodo <strong><a data-anchor="#create_method">create</a></strong> da <strong>modalController</strong>.<br/>`
			},
			{
				"type": "code",
				"content": `const modalOptions = {<br>      id: 'my-modal',   /* campo obrigatorio */<br>      title: 'My modal',   /* campo obrigatorio caso campo "custom" seja true */<br>      modalContent: 'Conteudo do meu modal',   /* campo obrigatorio, caso "custom" seja true deve conter todo conteudo do modal, caso contrario deve ser colocado apenas o que vier dentro do "modal-content" */<br>      replaceStringRightHereclass: 'my-class',   /* campo opcional, define uma classe customizada no modal */<br>      custom: false,   /* campo opcional, define se o conteudo do modal sera customizado, padrão = false */<br>      onDismiss: (ModalObject) => { },   /* campo opcional, ação que sera executada quando o modal for fechado, é retornado o respectivo modalObject como parametro */<br>      noAnimation: false,   /* campo opcional, define que o modal não tera transições caso true, padrão = false*/<br>      customAnimation: {   /* campo opcional, objeto com informações para definir transições customizadas */<br>            enter: ( ) => { }   /* campo opcional, função que ira realizar animação de entrada do modal, noAnimation precisa ser true para ser executado */<br>            exit: ( ) => { }   /* campo opcional, função que ira realizar animação de saida do modal, noAnimation precisa ser true para ser executado */<br>            newTime: 1000   /* campo opcional, dira o tempo da animação de entrada, padrão = 1000 */<br>            newExitTime: 900   /* campo opcional, dira o tempo da animação de saida, padrão = 900 */<br>      },<br>      headerHeightClass: 'adjust-header-default',   /* campo opcional, classe que ira ser colocada no "modal-content", para ajustes, o padrão é "adjust-header-default" para ajustar a altura do header */<br>      customHeader: '',   /* campo opcional, deve ser mandado caso queira um header customizado sem passar custom como true */<br>} ;`
			},
			{
				"type": "descript",
				"title": "present [método]",
				"dataAnchor": "present_method",
				"content": `Método que chama o modal, deve ser executado apresentar um modal ja criado. Seus parametros são um objeto do tipo <strong><a data-anchor="#modal_option_param">ModalObject</a></strong> [OPCIONAL] (Caso não seja passado ira abrur o ultimo modal criado), que pode ser obtido como retorno do método <strong><a data-anchor="#create_method">create</a></strong> e um <strong>callback</strong> [OPCIONAL] que é executado após o modal ser aberto, é retornado o respectivo <strong>modalObject</strong> como parametro.<strong> Retorno: void</strong>`
			},
			{
				"type": "code",
				"content": "modalController.present(myModal, callback);"
			},
			{
				"type": "descript",
				"title": "dismiss [método]",
				"dataAnchor": "dismiss_method",
				"content": `Método que fecha o modal, deve ser executado fechar um modal apresentado. Seus parametros são um objeto do tipo <strong><a data-anchor="#modal_option_param">ModalObject</a></strong> [OPCIONAL] (Caso não seja passado ira fechar o ultimo modal aberto), que pode ser obtido como retorno do método <strong><a data-anchor="#create_method">create</a></strong> e um <strong>callback</strong> [OPCIONAL] que é executado após o modal ser fechado, é retornado o respectivo <strong>modalObject</strong> como parametro.<strong> Retorno: void</strong>`
			},
			{
				"type": "code",
				"content": "modalController.dismiss(myModal, callback);"
			},
			{
				"type": "img",
				"title": "Teste de imagem",
				"content": "data:image/jpeg;base64,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"
			}
		],
		"active": true
	},
	"page_create": {
		"title": "Criando uma página",
		"content": [
			{
				"title": "Criando uma página",
			},
			{
				"type": "descript",
				"title": "Iniciando uma página",
				"content": "Criando uma nova pagina no moneypag"
			},
			{
				"type": "code",
				"title": "Inicio",
				"content": "class MyPage"
			}
		]
	}
}