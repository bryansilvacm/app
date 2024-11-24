//usamos o prompt para fazer uma caixinha de pergunta para o usuario responder
const { select, input } = require('@inquirer/prompts') //informa o node que vamos usar o modulo inquirer, fazendo a requisição do prompts do modulo inquirer
let meta = {
    value:"Tomar 1L de água por dia",
    checked: false,
}

let metas = [meta]

const cadastrarMeta = async () => {
    const meta = await input({message: "Digite a meta:"})
    if ( meta.length == 0 ){
        console.log("Atenção a meta não pode ser vazia!")
        return 
    } else{
        metas.push(
            {value:meta, checked:false}
        )
    }
    
}
const listarMetas = async () =>{
    tamanho = metas.length
    let count = 0
    while (count < tamanho){
        console.log(metas[count])
        count++
    }

}

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
                    name:"Listar Metas",
                    value: "listar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }

            ]
        }) // await faz com o programa espere o usuário selecionar a opção
        switch(opcao){
            case "cadastrar":
               await cadastrarMeta()
                break
            case "listar":
                await listarMetas()
                break
            case "sair":
                return        
        }
    }
}

start()

