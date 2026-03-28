const paicarrinhoopen = document.querySelector('.paicarrinho');
const carrinhoopen = document.querySelector('.carrinhoopen');

//funcao atraves de um evento de click no id click do html
function abrircarrinho() {
    Upcarrinho();
    paicarrinhoopen.style.display = "flex";
    carrinhoopen.style.display = "block";

}

//adicionar uma funcao atraves de um evento de click pela classe ou id 
document.querySelector('.paicarrinho').addEventListener('click', function (event) {
    if (event.target === paicarrinhoopen) {
        carrinhoopen.style.display = "none";
        paicarrinhoopen.style.display = "none";
    }
})

function fecharcard() {
    carrinhoopen.style.display = "none";
    paicarrinhoopen.style.display = "none";

}

let lista = []

const addBotao = document.getElementById("addBotao");
const RemoverPedidoBotao = document.getElementById("RemoverPedidoBotao");
const FinalizarPedidoBotao = document.getElementById("FinalizarPedidoBotao");
const AddEndereçoInput = document.getElementById("AddEndereçoInput");
const DivProdutosNocard = document.getElementById("DivProdutosNocard");
const Quantidade = document.getElementById("Quantidade");
const QuantidadeVerCarrinho = document.getElementById("QuantidadeVerCarrinho");
const CampoVazio = document.getElementById("CampoVazio");
const menu = document.getElementById("menu");
const totalcard = document.getElementById("totalcard");


menu.addEventListener("click", function (event) {
    let BotaoAddItem = event.target.closest("#addBotao")
    if (BotaoAddItem) {
        const nome = BotaoAddItem.getAttribute("data-name");
        const preco = parseFloat(BotaoAddItem.getAttribute("data-preco"));
        // console.log(nome);
        // console.log(preco);
        Additemcarrinho(nome, preco);
    }

})
function Additemcarrinho(nome, preco) {
    const ReverLista = lista.find(item => item.nome === nome)

    if (ReverLista) {
        ReverLista.quantity += 1;
    } else {
        lista.push({
            nome,
            preco,
            quantity: 1,


        })

    }
    Upcarrinho();
}
function Upcarrinho() {
    DivProdutosNocard.innerHTML = "";
    let total = 0;

    lista.forEach(item => {
        const ItemDentroDoCart = document.createElement("div");
        ItemDentroDoCart.classList.add("produtocarrinho")
        ItemDentroDoCart.innerHTML = `
    
        <div>
           <h4>${item.nome}</h4>
           <p>Quantidade: ${item.quantity}</p>
           <p>R$ ${item.preco.toFixed(2)}</P>
       </div>
       <div">
          <button class="RemoverItemcard" data-nome="${item.nome}">Remover</button>
       </div>
    
`
        total += item.preco * item.quantity;
        DivProdutosNocard.appendChild(ItemDentroDoCart);
    })
    totalcard.textContent = total.toLocaleString("pt-br", { style: "currency", currency: "BRL" });

    QuantidadeVerCarrinho.innerHTML = lista.length;


}

DivProdutosNocard.addEventListener("click", function (event) {
    if (event.target.classList.contains("RemoverItemcard")) {
        const nome = event.target.getAttribute("data-nome")
        RemoverIt(nome);

    }
})

function RemoverIt(nome) {
    const index = lista.findIndex(item => item.nome === nome);

    if (index !== -1) {
        const item = lista[index];

        if (item.quantity > 1) {
            item.quantity -= 1;
            Upcarrinho();
            return;
        }
        lista.splice(index, 1);
        Upcarrinho();
    }

}
AddEndereçoInput.addEventListener('input', function (event) {
    let inputValue = event.target.value;
    if (inputValue !== "") {
        CampoVazio.style.display = "none";
    }
})
FinalizarPedidoBotao.addEventListener("click", function () {
    const isopen = aberto();
    if (!isopen) {
        // alert("FECHADO NO MOMENTO!!!")
        // return;

        Toastify({
            text: "Estamos Fechados no Momento",
            duration: 3000,


            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#ef4444",
            },
        }).showToast();

        return;
    }
    if (lista.length === 0) return;
    if (AddEndereçoInput.value === "") {
        CampoVazio.style.display = "flex";
        return;
    }

    const carditens = lista.map((item) => {
        return (
            `${item.nome} Quantidade: (${item.quantity}) preço: R$${item.preco} |`
        )
    }
    ).join("")

    const mensagem = encodeURIComponent(carditens)
    const phone = "5585988800053";
    window.open(`https://wa.me/${phone}?text=${mensagem} Endereço: ${AddEndereçoInput.value}`, "_blank")

    lista = [];
    Upcarrinho();
})

function aberto() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 23;//true}
}

const abertoFechado = document.getElementById("abertoufechado")
const isopen = aberto();
if (isopen) {
    //     // abertoufechado.style.background.remove = "red";
    abertoufechado.style.background = "green";
} else {
    // abertoufechado.style.background.remove = "green";
    abertoufechado.style.background = "red";
}