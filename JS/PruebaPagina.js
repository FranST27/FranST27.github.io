
const btnCart = document.querySelector('.container-cart-icon')
const containerCartProduct = document.querySelector('.container-cart-products')


btnCart.addEventListener('click', () => {
    containerCartProduct.classList.toggle('hidden-cart')
})

/*=============================*/


const cartInfo = document.querySelector('.cart.product')
const rowProduct = document.querySelector('.row-product')

//lista de todos los contenedores de productos
const productList = document.querySelector('.container-items')

//variable de arreglos de productos

let allProducts = []


const valorTotal = document.querySelector('.total-pagar')
const contadorProd = document.querySelector('#contador-producto')

//////////////////// agregar y guardar productos ////////////////////////////////
productList.addEventListener('click', e => {

    if(e.target.classList.contains('btn-add-cart')){
        const product = e.target.parentElement
        
        const infoProduct = {
            quantity :1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        };

        //recorremos para ver si el prod ingresado ya existe
        const igual = allProducts.some(product => product.title === infoProduct.title)
        
        // si existe sumamos 1  a la cant. solamente
        if (igual) {
            const product= allProducts.map(product =>{
                if(product.title === infoProduct.title){
                    product.quantity++;
                    return product
                } else {
                    return product
                }
            })
        
        allProducts = [...product];

        } else {
            allProducts = [... allProducts,infoProduct] //array dinamico, va aumtentando mientras mas se vayan agregando
        }

        showHtml();
    }
});
//////////////////////////////////////////////////////////////////
//       icono close   ///////////
rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('.titulo-producto-carrito').textContent;

		allProducts = allProducts.filter(
			producto => producto.title !== title
            
		);

		showHtml();
	}
});


// Para HTML ///////////////////////////////////////////////////// 
const showHtml = () => {

rowProduct.innerHTML='';

let total = 0;
let totalProducts = 0;


allProducts.forEach(product => {
    const containerProduct = document.createElement('div')
    containerProduct.classList.add('cart-product')


containerProduct.innerHTML = ` 
    <div class="info-cart-product">
        <span class="cantidad-producto-carrito">${product.quantity}</span>
        <span class="titulo-producto-carrito">${product.title}</span>
        <span class="precio-producto-carrito">${product.price}</span>
    </div>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="icon-close"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
`;
    rowProduct.append(containerProduct);
    
    // dato en string a int:
    total = total + parseInt( product.price.slice(1) * product.quantity);
    totalProducts = totalProducts + product.quantity;
});

    valorTotal.innerText = `$${total}`;
    contadorProd.innerText = totalProducts;


};//////////////////////////////////////////////////////
