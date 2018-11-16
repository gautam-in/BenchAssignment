 import {displayItem} from '../js/view'
 
// export function corodom(id){
//     const getUrl = 'http://localhost:3000/AddItems/'+id;
//     fetch(getUrl)
//     .then(resp => resp.json())
//     .then((data) => {
//         let maincoro = document.getElementById('addmodal');
//         let html = `<div class="mod Lmodal">
//         <h6>Product Name</h6>
//         <p class="priceDisplay"></p>
//         <div>
//             <div class="padd">
//         <select>
//               <option value="" selected disabled hidden>Size</option>
//               <option value="XS">XS</option>
//               <option value="S">S</option>
//               <option value="L">L</option>
//               <option value="XL">XL</option>
//           </select>
//           <select>
//                   <option value="" selected disabled hidden>Qty</option>
//                   <option value="1">1</option>
//                   <option value="2">2</option>
//                   <option value="3">3</option>
//                   <option value="4">4</option>
//               </select>
//           </div>
//           <button id="size" class="modalEdit btn btn-outline-secondary" type="button">Add to bag</button>
//               </div>

//   </div>`
//   let corone = createHTMLElement(html);
//   maincoro.appendChild(corone);
//   html=`<div class="mod Rmodal">
//   <img src="${data.image}">
// </div>`
// let cortwo = createHTMLElement(html);
// maincoro.appendChild(cortwo);

//     });
// }
   
 export function jsonfetch(){

    const getUrl = 'http://localhost:3000/Items';
    fetch(getUrl)
      .then(resp => resp.json())
      .then((data) => {
        document.getElementById('tabs').innerHTML=`<tr class="rows">
        <th class="itpadd">${data.length} Items</th>
        <th></th>
        <th>size</th> 
        <th>qty</th>
        <th>price</th>
      </tr>`;
        data.map((dat) => {
           displayItem(dat);
         });
        // for (let j = 0; j < data.length; j += 1) {
        //   displayItem(data[j]);
        // }
      });
  }
export function putsizeqty(id,qty,size){
    const getUrl = 'http://localhost:3000/Items/'+id;
    fetch(getUrl)
    .then(resp => resp.json())
    .then((data) => {
        let editedObject = Object.assign({},data,{
            "quantity" : qty,
            "size" : size
        });
        const putData = {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, same-origin, *omit
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(editedObject), // body data type must match "Content-Type" header
        };
        fetch(getUrl,putData)
        .then(() => {
            jsonfetch();
            totalfetch();
        })
    })
}
export function delrow(id){
    const getUrl = 'http://localhost:3000/Items/'+id;
        const deleteData = {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, same-origin, *omit
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
        };
        fetch(getUrl,deleteData)
        .then(() => {
            jsonfetch();
        })
    
}
export function codevalid(i){
    
    const getUrl = 'http://localhost:3000/promocode?code='+i;
    return new Promise((resolve,reject) => {
        fetch(getUrl)
        .then(resp => resp.json())
        .then((data) => {
            if(data.length==0){
                resolve(0);
            }
            else{
                console.log(data);
                resolve(data[0].discount);
            }
        })
    })
}
export function totalfetch(){
    const getUrl = 'http://localhost:3000/Items';
    fetch(getUrl)
      .then(resp => resp.json())
      .then((data) => {
        let total = 0;
        data.map((dat) => {
            
            total=total+parseInt(dat.price)*dat.quantity;
           console.log(total);
         });
         const rs = document.getElementById('rside');
        let html = `<div class="row">
        <div class="col-md-6">
                <p>Enter promotion code or gift card</p>
            </div>
            <div class="col-md-6">
                <input class="inputl" type="text" label="label">
                <button type="button">Apply</button>
            </div>
    </div>`;
  let varia=0;
  const rsd = createHTMLElement(html);
  html = createHTMLElement(`<div id="subTotal"></div>`);
  
  let App = rsd.lastElementChild.lastElementChild;
  App.onclick = () =>{
       let inp=rsd.lastElementChild.firstElementChild.value;
       codevalid(inp)
        .then((varia) => {
            displayPromo(varia,total);
        });
  }

        rs.appendChild(rsd);
        rs.appendChild(html);
        console.log(total);
  
        displayPromo(varia,total);
        html = `<div>
        <p class=>continue shopping</p>
        <button type="button">checkout</button>
    </div>`
    const rsdlast = createHTMLElement(html);
    rs.appendChild(rsdlast);
      });
  }
  let createHTMLElement = (html) => {
    let template = document.createElement(`template`);
    template.innerHTML = html;
    return template.content.firstElementChild;
}

let displayPromo = (varia,total) => {
    const rs = document.getElementById('subTotal');
    rs.innerHTML = "";
    const html =`<div class="calculation">
  <h6>
      <span style="float:left">Sub total</span>        
      <span style="float:right; padding-right: 20px;">${total}</span>  
 </h6> <br>
  <h6>
      <span style="float:left">promotion code applied</span>
      <span id="pcode" style="float:right; padding-right: 20px;">${varia}</span>
 </h6> <br>
  <h6 class="upborder"><span style="float:left">Estimated Total</span>  <span style="float:right; padding-right: 20px;">${total-varia}</span></h6><br>
  </div>`
        // for (let j = 0; j < data.length; j += 1) {
        //   displayItem(data[j]);
        // }
        const rsdone = createHTMLElement(html);
        
        rs.appendChild(rsdone);
}
