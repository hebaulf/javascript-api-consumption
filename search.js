function show_results(){
    document.querySelector("#results").style.display = "grid"
}

function hide_results(){
    document.querySelector("#results").style.display = "none"
}
  

let my_timer; 
function search(){
    console.log("searching...")
    document.querySelector("#results").innerHTML = "";
    
    // clearTimeout
    clearTimeout(my_timer);
    my_timer = setTimeout( async () => {
        const search = document.querySelector("#search_for").value;
        
        // Connect to the API
        const conn = await fetch(`https://coderspage.com/iceland/search-items?search=${search}`)
        const data = await conn.json();
        
        // Get the items
        data.forEach( item => {
            let div_item = /*html*/`
                <div id="ID_${item.item_id}" class="result">
                    ${item.item_name} - ${item.item_id} - <span onclick="delete_item('${item.item_id}')">🗑️</span>
                </div>
            `;
            document.querySelector("#results").insertAdjacentHTML("afterbegin", div_item)
        })
    }, 500 )

}

// ###################### //
async function delete_item(item_id) {
    
    const item_to_delete = document.querySelector("#ID").value;
    // This removes the element from the DOM but it still exists in the database
    document.querySelector(`#ID_${item_id}`).remove();
    console.log(`Deleting item with id: ${item_id}`);
    // Make sure that the element is also deleted from the database via the API
    // Connect to the API - DELETE
    // Send the ID as part of the URL

    const conn = await fetch("https://coderspage.com/iceland/delete-item/{item_id}", {
        method : "DELETE",
        headers: {
            'Access-Control-Allow-Origin':'*'
        } 
    })

    console.log('Item deleted from server')
}

async function patch_item(){
    const conn = await fetch(`https://coderspage.com/iceland/item/2482`, {
      // mode: 'cors',
      method : "PATCH",
      headers: {
        'Access-Control-Allow-Origin':'*'
      }    
    })
    console.log("PUT HERE")
}
  
patch_item();