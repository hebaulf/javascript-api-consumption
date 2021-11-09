
let page = 1;

async function get_items() {
    // Connect to the API
    // const conn = await fetch('https://ecuaguia.com/iceland/api-get-items?page=' + page);
    const conn = await fetch(`https://ecuaguia.com/iceland/api-get-items?page=${page}`);
    
    // Get the data from the API
    const response = await conn.json();
    console.log(response);

    // const item =  { "id" : 10, "name" : "Fluff" }
    response.forEach( item => {
        let price = item.price;
        let vat = 24.5 / 100;
        let final_price = price + (price * vat);

        let div_item = /*html*/`
            <div class="item">
                <div class="item__info"> 
                    <div class="">${item.id}</div>
                    <div>${item.name}</div>
                    <div>${(final_price).toFixed(2)} ISK</div>
                </div>
                <div class="item__img">
                    <img height="150" width="200" src="https://ecuaguia.com/iceland/images/${item.image}" alt="" />
                </div>
            
            </div>
        `;
        
        document.querySelector('#items').insertAdjacentHTML('beforeend', div_item);
    });

    page ++;
}

get_items();