//usamos o prompt para fazer uma caixinha de pergunta para o usuario responder
const { select, input, checkbox } = require('@inquirer/prompts') //informa o node que vamos usar o modulo inquirer, fazendo a requisição do prompts do modulo inquirer

//cria um objeto modelo para cada meta, contendo o nome (value) e o status (checked)
let meta = {
    value:"Tomar 1L de água por dia",
    checked: false,
}

// array com todas as metas
let metas = [meta]

//função para cadastrar a meta
const cadastrarMeta = async () => {
    //solicita a meta
    const meta = await input({message: "Digite a meta:"})
    
    //verifica se o usuário digitou, caso não, apresenta o erro
    if (meta.length == 0 ){
        console.log("Atenção a meta não pode ser vazia!")
        return 
    //com o metodo push, pega a meta que o usuario digitou e insere no array metas, define o checked como false    
    } else{
        metas.push(
            {value:meta, ckecked:false}
        )    
}}

//função para listar as metas
//usa o async e o await
const listarMetas = async () =>{
    //usa o metodo checkbox da biblioteca inquirer para selecionar as metas para conclui-lás 
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o enter para finalizar essa etapa",
        choices: [...metas], // os 3 pontinhos servem para jogar os intens do array metas dentro de choices, assim não modificamos o array de metas diretamente 
        instructions: false, //retira as instruções automáticas em inglês
    })
    //verifica se o usuário selecionou ou não alguma meta
    if (respostas.length == 0){
        console.log("Nenhuma meta selecionada")
        return
    } 
    //marca todas as metas como false para fazer a função de desmarcar (não entendi muito bem mas tá funcionando rsrs)
    metas.forEach((m) => {
        m.checked = false
    })        
    // pega todas as resposta e o metodo forEach itera cada resposta sobre todas as metas 
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => { //o find() verifica todas as metas e compara a meta com a resposta (que selecionamos no checkbox), se for igual marca como true
            return m.value == resposta
        })
        meta.checked= true 
    });
    //conclui as metas que selecionamos
    console.log("Meta(s) marcarda(s) como concluidas")

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

