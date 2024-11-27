//usamos o prompt para fazer uma caixinha de pergunta para o usuario responder
const { select, input, checkbox } = require('@inquirer/prompts') //informa o node que vamos usar o modulo inquirer, fazendo a requisição do prompts do modulo inquirer
const fs = require ('fs').promises

let mensagem = "Bem vindo ao app!";

// array com todas as metas
let metas

const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados) 
       }
    catch(erro) {
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}


//função para cadastrar a meta
const cadastrarMeta = async () => {
    //solicita a meta
    const meta = await input({message: "Digite a meta:"})
    
    //verifica se o usuário digitou, caso não, apresenta o erro
    if (meta.length == 0 ){
        mensagem = "Atenção a meta não pode ser vazia!";
        return 
    //com o metodo push, pega a meta que o usuario digitou e insere no array metas, define o checked como false    
    }
        metas.push(
            {value:meta, checked:false}
        )  
        mensagem = "Meta Cadastrada com sucesso"  
}

//função para listar as metas
//usa o async e o await
const listarMetas = async () =>{
    //usa o metodo checkbox da biblioteca inquirer para selecionar as metas para conclui-lás 
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o enter para finalizar essa etapa",
        choices: [...metas], // os 3 pontinhos servem para jogar os intens do array metas dentro de choices, assim não modificamos o array de metas diretamente 
        instructions: false, //retira as instruções automáticas em inglês
    })
    
    //marca todas as metas como false para fazer a função de desmarcar (não entendi muito bem mas tá funcionando rsrs)
    metas.forEach((m) => {
        m.checked = false
    })        
    
    //verifica se o usuário selecionou ou não alguma meta
    if (respostas.length == 0){
        mensagem = "Nenhuma meta selecionada";
        return
    } 
    
    // pega todas as resposta e o metodo forEach itera cada resposta sobre todas as metas 
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => { //o find() verifica todas as metas e compara a meta com a resposta (que selecionamos no checkbox), se for igual marca como true
            return m.value == resposta
        })
        meta.checked= true 
    });
    //conclui as metas que selecionamos
    mensagem = "Meta(s) marcarda(s) como concluidas";

}

const metasRealizadas = async () => {
    const realizadas = metas.filter(( meta )=>{
        return meta.checked 
    })
    if (realizadas.length == 0){
        mensagem = "Não existem metas realizadas! :("
        return
    }
    await select({
        message: "Metas Realizadas: ",
        choices: [...realizadas] // 3 pontinhos chama-se spreed operator
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return !meta.checked
    })
    if (abertas.length == 0){
        mensagem = "Não existem metas abertas! :)";
        return
    }
    await select ({
        message: "Metas Abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMeta = async () => {
    const metasDesmarcadas = metas.map((meta) =>{
        return {value: meta.value, checked: false}
    })

    const itensaDeletar = await checkbox ({
        message: "Selecione a(s) meta(s) para deletar (use as setas para navegar, o espaço para selecionar e o enter para finalizar",
        choices: [...metasDesmarcadas],
        instructions: false
    })
    if (itensaDeletar.length == 0){
        mensagem = "Nenhum item para deletar!";
        return
    }

    itensaDeletar.forEach((item)=>{
        metas= metas.filter((meta)=>{
            return meta.value != item
        })
    })
    
    mensagem = "Meta(s) Deletada(s) com sucesso!";
}

const mostrarMensagem = () => {
    
    console.clear();
    
    if (mensagem != ""){
        console.log(mensagem)
        console.log("---------------");
        mensagem = "";
    }
}

const start = async () =>{ //colocamos o async para poder usar o await depois
    await carregarMetas()

    while(true){
        mostrarMensagem()
        await salvarMetas()

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
                    name:"Metas Realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas Abertas",
                    value: "abertas"
                },
                {
                    name:"Deletar Meta",
                    value: "deletar"
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
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMeta()
                break
            case "sair":
                console.log("Até a próxima!")
                return        
        }
    }
}

start()

