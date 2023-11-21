const OrdenarHunteds = (a, b) => {
    const profissaoA = a.profissao.toUpperCase();
    const profissaoB = b.profissao.toUpperCase();
  
    if (profissaoA < profissaoB) {
      return -1;
    } else if (profissaoA > profissaoB) {
      return 1;
    } else {
      return 0;
    }
}

module.exports = {
    OrdenarHunteds
}