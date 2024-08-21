fetch('js/backend.json')
  .then(response => response.json())
  .then(data=> {
    //SALVAR OS DADOS DO BACKEND LOCALMENTE
    //UTILIZAR O LOCALSTORAGE
    localStorage.setItem('produtos', JSON.stringify(data))
    console.log('Dados dos produtos salvos no localStorage');

    setTimeout(() => {
        //ESVAZIAR A AREA DE PRODUTOS
        $('#produtos').empty();

        //PASSAR POR CADA PRODUTO E INSERIR NA PÁGINA
        data.forEach(produto => {
            var produtoHTML = `
            <div class="item-card">
                <a data-id="${produto.id}" href="#" class="item">
                    <div class="img-container">
                        <img src="${produto.imagem}" alt="Imagem do Produto">
                    </div>
                        <div class="nome-rating">
                            <span class="color-gray">${produto.nome}</span>
                        </div>
                            <div class="price">R$ ${produto.preco_promocional.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                            </div>
            </div>
        `;
        $("#produtos").append(produtoHTML);
        });

    $(".item").on('click', function(){
        var id = $(this).attr('data-id');
        localStorage.setItem('detalhe', id);
        app.views.main.router.navigate('/detalhes/');
    });
    }, 1000);
  })

  .catch(error => console.error('Erro ao obter os dados: ' +error))

  //VER QUANTOS ITENS TEM DENTRO DO CARRINHO
  setTimeout(() => {
    var carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  //ALIMENTAR O CONTADOR DA SACOLA
  $('.btn-cart').attr('data-count', carrinho.lenght);
  }, 300);