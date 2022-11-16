

const form = document.getElementById('form');
const search = document.getElementById('search');
const logo = document.querySelector('.logo');


//obtener la data json server
const getData = async (url) =>{
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        return data;

    } catch(error) {
        console.log(error);
        return null;
    }
}


const renderCards =(arreglo, contenedor)=>{
    contenedor.innerHTML = '';
    arreglo.forEach(element => {
        const{id, name, ubicacion, area,habitaciones,baños, type, price, parcking_lot, propietario,img,description }= element;
        contenedor.innerHTML += `
        <section class="cardProperties">
        <div>
            <button class="house">house</button>
            <button class="forSale">for sale</button>

                    <button class="price">320.000.000</button>

            <div class="cartext">
                <div>
                    <img class="imgCards"
                        src="${img}" alt="">
                </div>
                <div>
                    <small class="beverly">Beverly Hills, CA</small>
                    <p >${name}</p>
                </div>
                <div class="textP">
                    <div>
                        <small class="beverly">${propietario}</small>
                    </div>
                    <div>
                        <small class="beverly">4 months ago</small>
                    </div>

                </div>
            </div>
            <div class="iconosProperties">
                <div>
                    <img class="icon" src="./style/images/3 Hot Deal/Area Icon.png" alt="">
                </div>
                <div>
                    <p>${area}</p>
                </div>
                <div>
                    <img class="icon" src="./style/images/3 Hot Deal/Garage Icon.png" alt="">
                </div>
                <div>
                    <p>2</p>
                </div>
                <div>
                    <img class="icon" src="./style/images/3 Hot Deal/Bathroom Icon.png" alt="">
                </div>
                <div>
                    <p>${baños}</p>
                </div>
                <div>
                    <img class="icon" src="./style/images/3 Hot Deal/Bedroom Icon.png" alt="">

                </div>
                <div>
                    <p>${habitaciones}</p>
                </div>
            </div>
        </div>
    </section>     
        
        `
    });
}

//funcion de filtrado
const filter = (arreglo, parametroDefiltrado) =>{
    const filtrar =arreglo.filter(item => item.type === parametroDefiltrado);
    return filtrar;
}
//extraer  categoria de la data
const extraerCategoria = (arreglo)=>{

const arregloTodasCategorias = arreglo.map(item => item.type);
const arregloCategorias = [...new Set (arregloTodasCategorias)];
return arregloCategorias;

 
}







//declaracion de variables globales y constantes
const URL ='http://localhost:3000/properties';



//escuchar eventos
document.addEventListener('DOMContentLoaded',async()=>{
   const containerCard = document.querySelector('.cardProperties');
    const products = await getData(URL);
    renderCards(products, containerCard);


    
logo.addEventListener('click', () => {
    getData(URL);
})

    const categorias = extraerCategoria(products);
     //escuchar evento de filtrado
     categorias.forEach(idBotones =>{
        //capturar btn de filtrado

        const bontonesFiltrados = document.getElementById(idBotones)
        bontonesFiltrados.addEventListener('click', ({target})=>{
           const filteredProducts =filter(products, target.id);
           renderCards(filteredProducts,containerCard);
        })
     })



})
    

 


