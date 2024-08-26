$("#sendToWhatsApp").click(function() {
    
    // Junta todos os itens em uma string, separando-os por nova linha (\n)
    var mensagem = "Olá, estou vindo através do aplicativo";
    // Codifica a mensagem para a URL
    var mensagemCodificada = encodeURIComponent(mensagem);
    // URL do WhatsApp com o número de telefone e a mensagem
    var numeroWhatsApp = "5561995903663"; // Substitua pelo número desejado
    var whatsappUrl = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

    // Redireciona para o WhatsApp
    window.open(whatsappUrl, '_blank');

});

$("#sendToInstagram").click(function() {
    var perfilInstagram = 'nordeste_farma';
    var urlInstagram = `https://www.instagram.com/${perfilInstagram}`;
    window.open(urlInstagram, '_blank');
});