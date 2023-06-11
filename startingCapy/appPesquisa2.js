
document.getElementById("buttonSearch").onclick = function(){
  var input = document.getElementById("userInput").value;
  var url ='http://127.0.0.1:3000/pesquisa.html' + "?" + "search=" + input;
  alert(url);
  changeWindow(url);
}

function searchBar() {
  var input = document.getElementById("userInput").value;
  var url ='http://127.0.0.1:3000/pesquisa.html' + "?" + "search=" + input;

}

function changeWindow(url) {
  window.open(url);
}




//pra pega o id da url
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}


//renderizacao e requests dos produtos
fetch('https://diwserver.vps.webdock.cloud/products/search?query='+getQueryVariable("search"))
.then(response => response.json())
.then(products => renderCards(products));


function renderCards(products) {
  for (var i = 0; i < Object.keys(products).length; i++) {
    var productID = products[i].id;
    var productImage = products[i].image;
    var productTitle = products[i].title;
    var productRate = products[i].rating.rate; 
    var productCount = products[i].rating.count;
    var productPrice = products[i].price;
    
    
    const divCardGroup = document.createElement('div');
    const divMakeCard =  document.createElement('div');
    const anchorImage = document.createElement('a');
    const image = document.createElement('img')
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
    anchorImage.href = '#';
    divMakeCard.appendChild(anchorImage);
    image.src = productImage
    image.height = 200;
    image.width = 200;
    anchorImage.appendChild(image);
    cardBody.className = 'card-body';
    divMakeCard.appendChild(cardBody);


    textoTitulo.className = 'card-text mb-0';
    textoTituloAnchor.href = 'http://127.0.0.1:3000/detalhes.html' + "?" + "id=" + productID;
    textoTituloAnchor.innerHTML = productTitle;
    textoTitulo.appendChild(textoTituloAnchor);
    textoRating.className = 'card-text';

    textoRating.innerHTML = `Avaliacoes: ${productRate} (${productCount})`;

    textoPrice.className = 'card-text';
    textoPrice.innerHTML = `R$ ${productPrice}`;

    cardBody.appendChild(textoTitulo);
    cardBody.appendChild(textoRating);
    cardBody.appendChild(textoPrice);

    divCardGroup.appendChild(divMakeCard);
    firstrowProducts.appendChild(divCardGroup);
  }
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


  var countClickButton = 0;
  document.getElementById('buttonLoadMore').onclick = function(){

    fetchProductsByPage(countClickButton);
    countClickButton++
  };
}

  renderButtonMore()
