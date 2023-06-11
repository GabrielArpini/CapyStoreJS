
//barra de pesquisa input usuario
document.getElementById("buttonSearch").onclick = function(){
  var input = document.getElementById("userInput").value;
  var url ='http://127.0.0.1:3000/pesquisa.html' + "?" + "search=" + input;
  changeWindow(url);
}

function filterCategory(products,currentpage,maxpage,brandP,colorP,genderP){
  for (var i = currentpage; i <= maxpage; i++){
    for (var j = 0; j < 10; i++) {
      if (products[i].brandName == brandP){
      }
    }
  }
}

function changeWindow(url) {
  window.open(url);
}

//ver qual categoria o cara colocou
var buttonClickCategory = document.getElementById("buttonCategory");
buttonClickCategory.onclick = function(){
  var e = document.getElementById("brandsCategory");
  var textBrands = e.options[e.selectedIndex].text;

  var e2 = document.getElementById("colorCategory");
  var textColor = e2.options[e2.selectedIndex].text;

  var e3 = document.getElementById("genderCategory");
  var textGender = e3.options[e3.selectedIndex].text;
  var url = ""
  if (textBrands != "Select") {
   url = url + "?" + "brand=" + textBrands;  
  }
  if (textColor != "Select") {
    url = url + "?" + "color=" + textColor;

  }
  if (textGender != "Select") {
    url = url + "?" + "gender=" + textGender;
  }
  
  //coloca os parametros e da reload
  window.location.search = url;
  //substituto em potencial
  //window.location.replace(url);

  
}

//renderizacao e requests dos produtos

fetch('https://diwserver.vps.webdock.cloud/products/category/Accessories - Wallets')
.then(response => response.json())
.then(products => createCardsHandler(products.products));

//contador do botao vem pra ca, pra renderizar mais coisa
function fetchProductsByPage(pageNumber) {
  const url = `https://diwserver.vps.webdock.cloud/products/category/Accessories - Wallets?page=${pageNumber}`;
  fetch(url)
    .then(response => response.json())
    .then(products => createCardsHandler(products.products))
}

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


  var countClickButton = 2;
  document.getElementById('buttonLoadMore').onclick = function(){
    fetchProductsByPage(countClickButton);
    alert(countClickButton);
    countClickButton++
  };
}



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

function fetchCreateCards(categories){
  fetch('https://diwserver.vps.webdock.cloud/products/category/Accessories - Wallets')
  .then(response => response.json())
  .then(products => createCardsHandler(products.products,categories));
}

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

function renderCards() {
  var currentUrl = getCurrentURL();
  var hasQuery = hasQueryParams(currentUrl);
  
  //R de return, p n confundir
  var dictCategoriesR = createCategoryArray(hasQuery)

  fetchCreateCards(dictCategoriesR); 

    

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
  anchorImage.href = 'http://127.0.0.1:3000/detalhes.html' + "?" + "id=" + productID;
  divMakeCard.appendChild(anchorImage);
  image.src = products.image
  image.height = 200;
  image.width = 200;
  anchorImage.appendChild(image);
  cardBody.className = 'card-body';
  divMakeCard.appendChild(cardBody);

  //minha cabeca doi
  textoTitulo.className = 'card-text mb-0';
  textoTituloAnchor.href = 'http://127.0.0.1:3000/detalhes.html' + "?" + "id=" + productID;
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


function createCardsHandler(products,categories) {
      alert("chmado");
      products.forEach(products => {
        if(isEmpty(categories) === false) {
          if(products.gender == categories.gender){
            createCards(products);
          }
          if(products.baseColour == categories.color){
            createCards(products);
          }
          if(products.brandName == categories.brand){
            createCards(products);
          }
        }    
        else {
          createCards(products);
        }
      })
}
renderButtonMore()