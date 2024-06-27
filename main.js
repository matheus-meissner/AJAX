
$(document).ready(function () {
    $('#cep').mask('00000-000');
    $('#btn-buscar-cep').click(function () {
        const cep = $('#cep').val();
        const endpoint = `https://viacep.com.br/ws/${cep}/json`;
        const botao = $(this);
        $(this).find('#lupa').addClass('d-none');
        $(this).find('#loading').removeClass('d-none');

        fetch(endpoint)
        .then(function(resposta){
            return resposta.json();
        })
        .then(function(json){
            const logradouro = json.logradouro;
            const bairro = json.bairro;
            const cidade = json.localidade;
            const estado = json.uf;
            const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;
            $('#endereco').val(endereco);
        })
        .catch(function(erro) {
            alert('Ocorreu um erro ao buscar o endereço, tente novamente mais tarde.');
        })
        .finally(function() {
            setTimeout(function(){
                $(botao).find('#lupa').removeClass('d-none');
                $(botao).find('#loading').addClass('d-none');
            }, 1000);
        })
    })

    $('#formulario-pedido').submit(function(evento){
        evento.preventDefault();
        if ($('#nome').val().length == 0) {
            throw new Error('Digite o nome');
        }
    })
})