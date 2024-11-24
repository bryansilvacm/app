//usamos o prompt para fazer uma caixinha de pergunta para o usuario responder
const { select } = require('@inquirer/prompts') //informa o node que vamos usar o modulo inquirer, fazendo a requisição do prompts do modulo inquirer

const start = async () =>{ //colocamos o async para poder usar o await depois

    while(true){
        const opcao = await select({
            message:"Menu >",
            choices:[
                {
                    name:"Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }

            ]
        }) // await faz com o programa espere o usuário selecionar a opção
        switch(opcao){
            case "cadastrar":
                console.log("vamos cadastrar")
                break
            case "listar":
                console.log("vamos listar")
                break
            case "sair":
                return        
        }
    }
}

start()

