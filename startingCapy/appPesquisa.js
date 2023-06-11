
document.getElementById("buttonSearch").onclick = function(){
  var input = document.getElementById("userInput").value;
  var url ='/pesquisa.html' + "?" + "search=" + input;

  changeWindow(url);
}

function searchBar() {
  var input = document.getElementById("userInput").value;
  var url ='/pesquisa.html' + "?" + "search=" + input;

}

function changeWindow(url) {
  window.open(url);
}




//pra pega o id da url
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("?");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
function fetchPagesNumber() {
  fetch('https://diwserver.vps.webdock.cloud/products/category/Accessories - Wallets')
    .then(response => response.json())
    .then(products => getPagesNumber(products.current_page,products.total_pages))
}

function getPagesNumber(currentPage,totalPages){
  var page = currentPage;
  var pageTotal = totalPages;
  for (var i = currentPage; i <= totalPages; i++){
      fetchProductsByPage(i);
  }
}
function fetchProductsByPage(pageNumber) {
  const url = `https://diwserver.vps.webdock.cloud/products/category/Accessories - Wallets?page=${pageNumber}`;
  fetch(url)
    .then(response => response.json())
    .then(products => createCardsHandler(products.products))
}

fetchPagesNumber();
function createCards(products) {
  var productID = products.id;
  const divCardGroup = document.createElement('div');
  const divMakeCard =  document.createElement('div');
  const anchorImage = document.createElement('a');
  const image = document.createElement('img');
  const cardBody = document.createElement('div');
  const textoTitulo = document.createElement('p');
  const textoTituloAnchor = document.createElement('a');
  const textoRating = document.createElement('p'); //user ranting e counting
  const textoPrice = document.createElement('p');

  textoTituloAnchor.setAttribute('id',productID);
  anchorImage.setAttribute('id',productID);

  divCardGroup.className = 'col-xl col-md col-sm';
  divMakeCard.className = 'card mt-4';
  divMakeCard.setAttribute('id','card');
  anchorImage.href = '/detalhes.html' + "?" + "id=" + productID;
  divMakeCard.appendChild(anchorImage);
  image.src = products.image
  image.height = 200;
  image.width = 200;
  anchorImage.appendChild(image);
  cardBody.className = 'card-body';
  divMakeCard.appendChild(cardBody);
  textoTitulo.className = 'card-text mb-0';
  textoTituloAnchor.href = '/detalhes.html' + "?" + "id=" + productID;
  textoTituloAnchor.innerHTML = products.title;
  textoTitulo.appendChild(textoTituloAnchor);
  textoRating.className = 'card-text';

  textoRating.innerHTML = `Avaliacoes: ${products.rating.rate} (${products.rating.count})`;

  textoPrice.className = 'card-text';
  textoPrice.innerHTML = `R$ ${products.price}`;

  cardBody.appendChild(textoTitulo);
  cardBody.appendChild(textoRating);
  cardBody.appendChild(textoPrice);

  divCardGroup.appendChild(divMakeCard);
  firstrowProducts.appendChild(divCardGroup);

  
}

//faz a primeira letra ser maiuscula e o resto minusculo
//caso contrario n retornaria nada
//input e mt sensivel
function makeFirstCharCapital(input) {
  var firstChar = input.slice(0,1);
  var upperCaseFirstChar = firstChar.toUpperCase();
  var restOfInput = input.slice(1,input.length);
  restOfInput = restOfInput.toLowerCase();
  var capitalizedInput = upperCaseFirstChar + restOfInput;
  return capitalizedInput;
}

function createCardsHandler(products) {
      //R de return, p n confundir
      var searchInput = getQueryVariable("search");
      var capitalizedInput = makeFirstCharCapital(searchInput);
      var decodedCapitalizedInput = decodeURI(capitalizedInput);
      products.forEach(products => {
          var productText = products.title;
          if (productText.includes(decodedCapitalizedInput) === true) {
              createCards(products);
          }
      })
}

//function fetchProductsByPage(pageNumber) {
//  const url = `https://diwserver.vps.webdock.cloud/products/category/Accessories - Wallets?page=${pageNumber}`;
//  fetch(url)
//    .then(response => response.json())
//    .then(products => renderCards(products))
//}








function renderButtonMore() {
  const divContainer = document.createElement('div');
  const buttonRow = document.createElement('div');
  const buttonCol = document.createElement('div');
  const buttonClickable = document.createElement('button')
  buttonClickable.setAttribute('id','buttonLoadMore');
  buttonClickable.innerText = 'Load More';

  divContainer.className = 'container text-center mt-3 mb-3';
  buttonRow.className = 'row';
  buttonCol.className = 'col';
  buttonClickable.className = 'btn btn-primary text-center';

  divContainer.appendChild(buttonRow);
  buttonRow.appendChild(buttonCol);
  buttonCol.appendChild(buttonClickable);
  htmlButtonRow.appendChild(divContainer);


}

