var timer = 10000

$(document).ready(function() {

    setInterval(function() {
        carregarTabela();
    }, timer);

});

function carregarTabela() {
    $.ajax({
        url: 'http://localhost:3000/hunteds',
        method: 'GET',
        success: function(data) {
          console.log('Data from the server:', data);

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

        },
        error: function(error) {
          console.error('Error:', error);
        }
      });
}