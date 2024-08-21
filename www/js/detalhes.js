//RECUPERAR O ID DETALHE NO LOCALSTORAGE
var id = parseInt(localStorage.getItem('detalhe'));

//PEGAR OS PRODUTOS DO LOCALSTORAGE
var produtos = JSON.parse(localStorage.getItem('produtos'));

//VALIDAR SE O ID DO ITEM É IGUAL AO ID DO LOCALSTORAGE(SE BATER RETORNA TRUE)
var item = produtos.find(produto => produto.id === id);

if(item) {
    //ENCONTROU ALGUM PRODUTO
    console.log('Produto encontrado: ', item);
    $("#img-detail").attr('src', item.imagem);
    $("#name-detail").html(item.nome);
    $("#descricao-detail").html(item.descricao);
    $('#price-detail').html(item.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));
    $('#price-promo-detail').html(item.preco_promocional.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));
}else {
    console.log('Produto não encontrado');
}