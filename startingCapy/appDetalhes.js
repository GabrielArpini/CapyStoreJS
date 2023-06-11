document.getElementById("buttonSearch").onclick = function() {
  var input = document.getElementById("userInput").value;
  var url = 'https://capystore2.gabrielsarpini.repl.co/pesquisa.html' + "?" + "search=" + input;
  changeWindow(url);
}

function searchBar() {
  var input = document.getElementById("userInput").value;
  var url = 'https://capystore2.gabrielsarpini.repl.co/pesquisa.html' + "?" + "search=" + input;

}

function changeWindow(url) {
  window.open(url);
}





//pra pega o id da url
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}





fetch('https://diwserver.vps.webdock.cloud/products/' + getQueryVariable("id"))
  .then(response => response.json())
  .then(products => renderDetails(products));

//criar card de detalhes com informacao da api
function renderDetails(product) {
  //contMarginTop o pai de todos
  const divBigRow = document.createElement('div');
  divBigRow.className = 'row';
  const divSmallCol1 = document.createElement('div');
  divSmallCol1.className = 'col-xl col-lg';
  const image = document.createElement('img');
  image.src = product.image;
  image.height = 600;
  image.width = 600;



  divBigRow.appendChild(divSmallCol1);
  divSmallCol1.appendChild(image);


  const divBigCol = document.createElement('div');
  divBigCol.className = 'col-xl col-lg text-start';
  const divSmallRowA = document.createElement('div');
  divSmallRowA.className = 'row mt-4';
  const textoTitulo = document.createElement('h3');
  textoTitulo.innerHTML = product.title;

  divBigRow.appendChild(divBigCol);

  divBigCol.appendChild(divSmallRowA);
  divSmallRowA.appendChild(textoTitulo);


  const divSmallRowB = document.createElement('div');
  divSmallRowB.className = 'row mt-2';
  const textoAvaliacoes = document.createElement('h5');
  textoAvaliacoes.innerHTML = `Avaliacoes: ${product.rating.rate} (${product.rating.count})`;

  divBigCol.appendChild(divSmallRowB);
  divSmallRowB.appendChild(textoAvaliacoes);

  const divSmallRowC = document.createElement('div');
  divSmallRowC.className = 'row mt-2';
  const textoDescricao = document.createElement('h5');
  textoDescricao.innerHTML = "Descricao: " + product.description;

  divBigCol.appendChild(divSmallRowC);
  divSmallRowC.appendChild(textoDescricao);

  const divSmallRowD = document.createElement('div');
  divSmallRowD.className = 'row mt-2';
  const textoPreco = document.createElement('h3');
  textoPreco.innerHTML = 'R$ ' + product.price;

  divBigCol.appendChild(divSmallRowD);
  divSmallRowD.appendChild(textoPreco);


  const divSmallRowE = document.createElement('div');
  divSmallRowE.className = 'row mb-4 mt-2';
  const buttonCart = document.createElement('button');
  buttonCart.setAttribute('id', 'buttonAddCart');
  buttonCart.innerText = 'Add to cart';
  divBigCol.appendChild(divSmallRowE)
  divSmallRowE.appendChild(buttonCart);

  contMarginTop.appendChild(divBigRow);



}
