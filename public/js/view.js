import {putsizeqty,delrow} from '../js/service'



export const displayItem = (data) => {
    const table = document.getElementById('tabs');
    const html = `<tr class="rows">
    <td class="tdIwidth"><img alt="image" class="imsize" src=${data.image}></td>
    <td class="tdwidth"><div class="textclass">${data.text}</div>
                        <div class="textclass">color : ${data.color}</div>
                        <button type="button" id="size" class="btn btn-outline-success" data-toggle="modal" data-target="#myModal">Edit</button>
                        <button type="button" id="size" class="btn btn-outline-danger">X Remove</button>
                        <button type="button" id="size" class="btn btn-outline-info">Save for Later</button></td>
                        
    <td class="twidth">${data.size}</td>
    <td class="twidth"><input class="inpu" type="value" value="${data.quantity}" label="label"><br></td>
    <td class="twidth">${data.price}</td>
  </tr>`;

  let row = createHTMLElement(html);
  let editButton = row.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling;
  let removeButton = editButton.nextElementSibling;
  removeButton.onclick = () =>{
     delrow(data.id);
  }
  editButton.onclick = () => {
    //   openModal(data.id);
    const emod = document.getElementById('Emodal');
    emod.innerHTML = "";
    let html=` <div class="mod Lmodal Lmodall">
    <h6>${data.text}</h6>
    <p class="priceDisplay">${data.price}</p>
    <div>
        <div class="padd">
          <select name="size">
            <option value="S" selected disabled hidden>Size(S)</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
          <select name="qty">
                <option value="0" selected disabled hidden>Qty</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
           </select>
        </div>
        <button id="size" class="modalEdit btn btn-outline-secondary" type="button" data-dismiss="modal">Edit</button>
    </div>


  </div>`;

  const lmod = createHTMLElement(html);
  let finaledit = lmod.lastElementChild.lastElementChild;
  console.log(finaledit);
  finaledit.onclick = () => {
    let s = document.getElementsByName('size')[0];
    let size = s.options[s.selectedIndex].value;
    console.log(`size = ${size}`);

    let q = document.getElementsByName('qty')[0];
    let qty = q.options[q.selectedIndex].value;
    console.log(`qty = ${qty}`)
    putsizeqty(data.id,qty,size);
  }
  emod.appendChild(lmod);
  html = `<div class="mod Rmodal">
      <img alt="image" class="rmo" src="${data.image}" >
  </div>`
  const rmod = createHTMLElement(html);
  emod.appendChild(rmod);
}
  table.appendChild(row);
}

let createHTMLElement = (html) => {
    let template = document.createElement(`template`);
    template.innerHTML = html;
    return template.content.firstElementChild;
}



