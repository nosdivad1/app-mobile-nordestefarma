//RECUPERAR O ID DETALHE NO LOCALSTORAGE
var id = parseInt(localStorage.getItem('detalhe'));

//PEGAR OS PRODUTOS DO LOCALSTORAGE
var produtos = JSON.parse(localStorage.getItem('produtos'));

//VALIDAR SE O ID DO ITEM É IGUAL AO ID DO LOCALSTORAGE(SE BATER RETORNA TRUE)
var item = produtos.find(produto => produto.id === id);

if(item) {
    
    $('#img-detail').attr('src', item.imagem);
    $('#name-detail').html(item.nome);
    $('#descricao-detail').html(item.descricao);
    $('#price-detail').html(item.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));
    $('#price-promo-detail').html(item.preco_promocional.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));


}else {
    console.log('Produto não encontrado');
}

var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function adicionarAoCarrinho(item, quantidade) {
    var itemNoCarrinho = carrinho.find(c => c.item.id === item.id)
    if(itemNoCarrinho) {
        itemNoCarrinho.quantidade += quantidade;
        itemNoCarrinho.total_item = itemNoCarrinho.quantidade * item.preco_promocional;
    } else {
        carrinho.push({
            item: item,
            quantidade: quantidade,
            total_item: quantidade * item.preco_promocional
        })
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

$(".add-cart").on('click', function(){
    adicionarAoCarrinho(item, 1);
    var toastCenter = app.toast.create({
        text: `${item.nome} adicionado ao carrinho`,
        position: 'center',
        closeTimeout: 2000,
});
    toastCenter.open();
});