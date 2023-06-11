
//barra de pesquisa input usuario
document.getElementById("buttonSearch").onclick = function(){

  var input = document.getElementById("userInput").value;
  var url ='/pesquisa.html' + "?" + "search=" + input;
  changeWindow(url);
}

function changeWindow(url) {
  window.open(url);
}
//nao faz oque fala
//na verdade so passa as paginas como parametro pra outra funcao
function fetchPagesNumber() {
  fetch('https://diwserver.vps.webdock.cloud/products/category/Accessories - Wallets')
    .then(response => response.json())
    .then(products => getPagesNumber(products.current_page,products.total_pages))
}
//loop pra carregar todos os produtos de uma vez
function getPagesNumber(currentPage,totalPages){
  var page = currentPage;
  var pageTotal = totalPages;
  for (var i = currentPage; i <= totalPages; i++){
      fetchProductsByPage(i);
  }
}
//ver qual categoria o cara colocou e passa pra url
var buttonClickCategory = document.getElementById("buttonCategory");
buttonClickCategory.onclick = function(){
//sim, estava sem ideia para os nomes das variaveis
  var e = document.getElementById("brandsCategory");
  var textBrands = e.options[e.selectedIndex].text;

  var e2 = document.getElementById("colorCategory");
  var textColor = e2.options[e2.selectedIndex].text;

  var e3 = document.getElementById("genderCategory");
  var textGender = e3.options[e3.selectedIndex].text;
  var url = ""
  if (textBrands != "Brand") {
   url = url + "?" + "brand=" + textBrands;  
  }
  if (textColor != "Color") {
    url = url + "?" + "color=" + textColor;
  }
  if (textGender != "Gender") {
    url = url + "?" + "gender=" + textGender;
  }
  
  //coloca os parametros e da reload
  window.location.search = url;
  //substituto em potencial
  //window.location.replace(url);

  
}

//renderizacao e requests dos produtos
//tipo o botao de ligar do carro
fetchPagesNumber();

//as funcoes de pagina la em cima trazem a variavel i, que representa a pagina, como parametro pra essa
//parece uma pessima ideia
//mas funciona
function fetchProductsByPage(pageNumber) {

  const url = `https://diwserver.vps.webdock.cloud/products/category/Accessories - Wallets?page=${pageNumber}`;
  fetch(url)
    .then(response => response.json())
    .then(products => createCardsHandler(products.products))
}


//pega o valor de algo que for pra url
//exemplo:
//?search=nike
//vc coloca "'search'" como parametro pra funcao
//e ela retorna nike
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

//nao faz nada
//talvez precise depois, tomara que nao
function renderButtonMore() {
  const divContainer = document.createElement('div');
  const buttonRow = document.createElement('div');
  const buttonCol = document.createElement('div');
  const buttonClickable = document.createElement('button')
  buttonClickable.setAttribute('id','buttonLoadMore');
  buttonClickable.innerText = 'Load More';

  divContainer.className = 'container text-center mt-3 mb-3';
  buttonRow.className = 'row';
  buttonCol.className = 'col-8';
  buttonClickable.className = 'btn btn-primary text-center';

  divContainer.appendChild(buttonRow);
  buttonRow.appendChild(buttonCol);
  buttonCol.appendChild(buttonClickable);

  //nao faz nada mas se tirar quebra tudo
  htmlButtonRow.appendChild(divContainer);
}

// nao sei se afeta algo do site
// nao vou tirar pra ver
let categoryArray = ['Wildcraft', 'Fastrack', 'Lino Perros', 'Baggit', 'Fossil', 'BULCHEE', 'Spice Art', 'AMERICAN TOURISTER', 'Hidekraft', 'Nyk', 'ToniQ'];
let colorArray = ['Black','Red','Brown','Pink','Blue','Purple','White','Green','Gold','Grey','Beige']

//pegar a url p depois dar um check se tem parametros
function getCurrentURL () {
  return window.location.href
}
//autoexplicativo
function hasQueryParams(url) {
  return url.includes('?');
}


//na verdade cria um dicionario que associa a categoria com o que ela tem
//exemplo:
// color : black;
// unico jeito que pensei p dps saber oque e oq
function createCategoryArray(hasQuery) {
  if (hasQuery == true){
    var brandQuery = getQueryVariable("brand");
    var colorQuery = getQueryVariable("color");
    var genderQuery = getQueryVariable("gender")
  }
  var dictCategories = {};


  if (brandQuery != false) {
    dictCategories["brand"] = brandQuery;
  }
  if (colorQuery != false){
    dictCategories["color"] = colorQuery; 
  }
  if (genderQuery != false){
    dictCategories["gender"] = genderQuery;
  }
  return dictCategories;
}

//se tiver alguma coisa na url ele cria o dicionario de categoria com as coisas que tem
// se nao tiver cria uma categoria vazia 
function getCategory() {
  var currentUrl = getCurrentURL();
  var hasQuery = hasQueryParams(currentUrl);
  
  //R de return, p n confundir
  if (hasQuery === true) {
      var dictCategoriesR = createCategoryArray(hasQuery)
      return (dictCategoriesR)
  }
  else {
      dictCategoriesR = {}
      return dictCategoriesR;
  }

}
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

  //minha cabeca doi
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
  categoryArray.push(products.brandName); 
}


//check se o objeto de categorias tem algo
function isEmpty(obj) {
  for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return false;
  }
  return true;
}


//pega as informacoes de categoria e cria os cards de acordo com elas
//nao faco ideia de como funcionou, so Deus sabe
function createCardsHandler(products) {
var categories = getCategory();
var brandNameUndecoded = categories.brand;

products.forEach(product => {
  var shouldCreateCard = true;

  if (!isEmpty(categories)) {
    if (categories.gender && product.gender !== categories.gender) {
      shouldCreateCard = false;
    }

    if (categories.brand && decodeURI(categories.brand) !== product.brandName) {
      shouldCreateCard = false;
    }

    if (categories.color && product.baseColour !== categories.color) {
      shouldCreateCard = false;
    }
  }

  if (shouldCreateCard) {
    createCards(product);
  }
});
}
