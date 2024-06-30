$(document).ready(function() {
  adicionarCarregamento();
    setInterval(function() {
        adicionarCarregamento();
        carregarTabela();
    }, Configs.timer);

    $('#checkAlert').change(function() {
        if (this.checked) {
            enviarAlerta();
        } 
      });

});

function carregarTabela() {
  
  adicionarCarregamento();

  let premium = 0;

  if ($('#checkPremium').prop('checked')) {
    premium = 1;
  }

  $.ajax({
      url: `http://localhost:3000/hunteds?premium=${premium}`,
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

        removerCarregamento();
        
      },
      error: function(error) {
        console.error('Error:', error);
      }
    });

}

async function enviarAlerta() {

    let quantidade = $('.total').text();

    if (validarQuantidade(quantidade)) {

        let texto = `Atenção!, ${quantidade} hunteds online.`;

        let ut = new SpeechSynthesisUtterance(texto);

        var vozDoGoogle = window.speechSynthesis.getVoices().find(voice => voice.name === 'Google português do Brasil');

        ut.voice = vozDoGoogle;
    
        window.speechSynthesis.speak(ut);
    }

}

function enviarWhatsapp() {

}

function validarQuantidade(quantidade) {

    if (quantidade > Configs.quantidadeAlerta) {
      return true;
    }
      return false;      
}

function removerCarregamento() {
  $('.c-carregando').addClass('hidden');
}

function adicionarCarregamento() {
  $('.c-carregando').removeClass('hidden');
}