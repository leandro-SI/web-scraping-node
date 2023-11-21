var timer = 10000;
var quantidadeAlerta = 10;

$(document).ready(function() {

    setInterval(function() {
        carregarTabela();
    }, timer);

    $('#checkAlert').change(function() {
        if (this.checked) {
            enviarAlerta();
        } 
      });

});

function carregarTabela() {
    $.ajax({
        url: 'http://localhost:3000/hunteds',
        method: 'GET',
        success: function(data) {

          $('.total').text(data.total);

          var tbody = $('.table-hunteds tbody');

          tbody.empty();

          $.each(data.data, function(index, hunted) {
            var row = $('<tr>');
            row.append('<td>' + hunted.nome + '</td>');
            row.append('<td>' + hunted.level + '</td>');
            row.append('<td>' + hunted.profissao + '</td>');
            tbody.append(row);
          });

          if ($('#checkAlert').prop('checked')) {
            enviarAlerta();
          }

        },
        error: function(error) {
          console.error('Error:', error);
        }
      });
}

function enviarAlerta() {

    let quantidade = $('.total').text();

    if (quantidade > quantidadeAlerta) {
        let texto = `Atenção!, ${quantidade} hunteds online.`;
        let ut = new SpeechSynthesisUtterance(texto);
    
        window.speechSynthesis.speak(ut);
    }

}