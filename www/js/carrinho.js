var localCarrinho = localStorage.getItem('carrinho');
console.log(localCarrinho);
if(localCarrinho) {
    var carrinho = JSON.parse(localCarrinho);
    if(carrinho.length > 0) {
        renderizarCarrinho()
        calcularTotal();

    }else {
        //MOSTRAR CARRINHO VAZIO
        carrinhoVazio();
    }
} else {
    //MOSTRAR CARRINHO VAZIO
    carrinhoVazio();
}

function renderizarCarrinho() {
    $("#listaCarrinho").empty();
    $.each(carrinho, function(index, itemCarrinho) {
        var itemDiv = `
        <!--ITEM DO CARRINHO-->
          <div class="item-carrinho" data-index="${index}">
            <div class="area-img">
              <img src="${itemCarrinho.item.imagem}" />
            </div>
            <div class="area-details">
              <div class="sup">
                <span class="name-prod">${itemCarrinho.item.nome}</span>
                <a data-index="${index}" class="delete-item" href="#">
                  <i class="mdi mdi-close"></i>
                </a>
              </div>
              <div class="middle">
                <span>${itemCarrinho.item.principal_característica}</span>
              </div>
              <div class="preco-quantidade">
                <span>${itemCarrinho.item.preco_promocional.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
                <div class="count">
                  <a class="minus" data-index="${index}" href="#">-</a>
                  <input readonly class="qtd-item" type="text" value="${itemCarrinho.quantidade}" />
                  <a class="plus" data-index="${index}" href="#">+</a>
                </div>
              </div>
            </div>
          </div>
        `;

        $("#listaCarrinho").append(itemDiv);
    });

    $(".delete-item").on('click', function(){
        var index = $(this).data('index');
        console.log('O indice é: ', index);
        app.dialog.confirm('Tem certeza que deseja remover o item?','Remover', function(){
        carrinho.splice(index, 1);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        app.views.main.router.refreshPage();
        });
      });

      $(".minus").on('click', function(){
        var index = $(this).data('index');
        
        if(carrinho[index].quantidade > 1){
            carrinho[index].quantidade--;
            carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            app.views.main.router.refreshPage();

        } else {
            var itemName = carrinho[index].item.nome;
            app.dialog.confirm(`Gostaria de remover <strong>${itemName}</strong>?` , 'REMOVER', function(){
                carrinho.splice(index, 1);
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                renderizarCarrinho()
                calcularTotal();
            });
        }
        
      });

      $(".plus").on('click', function(){
        var index = $(this).data('index');
        carrinho[index].quantidade++;
        carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        renderizarCarrinho()
        calcularTotal();
      });

      $("#sendWhatsApp").click(function() {
        var listaDeCompra = [];
        
        // Supondo que itemCarrinho seja uma coleção de elementos, você pode fazer isso:
        carrinho.forEach(function(item) {
            listaDeCompra.push(`${item.item.nome}, Preço: ${item.item.preco_promocional.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`);

        });

        // Junta todos os itens em uma string, separando-os por nova linha (\n)
        var mensagem = "Olá, estou vindo através do aplicativo e gostaria de comprar os seguintes itens:\n\n" + listaDeCompra.join('\n');
        // Codifica a mensagem para a URL
        var mensagemCodificada = encodeURIComponent(mensagem);
        // URL do WhatsApp com o número de telefone e a mensagem
        var numeroWhatsApp = "5561995903663"; // Substitua pelo número desejado
        var whatsappUrl = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

        // Redireciona para o WhatsApp
        window.open(whatsappUrl, '_blank');

    });


}

function calcularTotal() {
    var totalCarrinho = 0;
    $.each(carrinho, function(index, itemCarrinho) {
        totalCarrinho += itemCarrinho.total_item;
    });
    $("#subtotal").html(totalCarrinho.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));
}

function carrinhoVazio() {
    console.log("Carrinho está vazio");
    $('#listaCarrinho').empty();
    $("#toolbarTotais").addClass('display-none');
    $("#toolbarCheckout").addClass('display-none');

    $("#listaCarrinho").html(`
        <div class="text-align-center">
        <img width="300" src="img/empty.gif" alt="Imagem">
        <br><span class="color-gray">Nada por enquanto...</span>
        </div>
        `);

}

$("#esvaziar").on('click', function() {
    app.dialog.confirm('Tem certeza que quer esvaziar o carrinho?', 'ESVAZIAR O CARRINHO', function() {
        localStorage.removeItem('carrinho');
        app.views.main.router.refreshPage();
    });
})

