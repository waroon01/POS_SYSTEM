// https://www.bootdey.com/snippets/view/company-invoice
// https://www.jsdelivr.com/package/npm/thai-baht-text


let searchinput = document.getElementById("serchName")
let btnMenuAll = document.getElementById("btnMenuAll")
let data = '';
let menu   
var list = [];
var amount_p = 0

$(document).ready(() => {
  var menu = [{
      id: 1,
      name: 'ผัดกะเพรา',
      price: 32,
      img: 'https://krua.co/wp-content/uploads/2020/09/RT1377_ImageBannerMobile_960x633_New.jpg'
  },{
      id: 2,
      name: 'ปลาสามรส',
      price: 120,
      img: 'http://f.ptcdn.info/666/019/000/1401726614-friedfishw-o.jpg'
  },{
      id: 3,
      name: 'หมูกรอบ',
      price: 52,
      img: 'https://img-global.cpcdn.com/recipes/b0086213318dc978/1200x630cq70/photo.jpg'
  },{
      id: 4,
      name: 'คะน้าปลาเค็ม',
      price: 45,
      img: 'https://l.pstip.cc/images/article-pstip/Food/food-single-dish/food-single-dish-14659-3.jpg'
  },{
      id: 5,
      name: 'หมึกผัดไข่เค็ม',
      price: 71,
      img: 'https://img.wongnai.com/p/1920x0/2017/10/17/7891213c783c4af29c1afe927059502d.jpg'
  },{
      id: 6,
      name: 'น้ำตกหมู',
      price: 19,
      img: 'https://www.kruamoomoo.com/wp-content/uploads/2017/07/nam-tok-moo-recipe-38.jpg.webp'
  },{
    id: 7,
    name: 'ปูผัดผงกะหลี่',
    price: 19,
    img: 'https://img.kapook.com/u/surauch/cook/CrabCurry.jpg'
  },{
    id: 8,
    name: 'น้ำตกหมู',
    price: 19,
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
  },{
    id: 9,
    name: 'ข้าวผัดอเมริกัน',
    price: 19,
    img: 'https://sou-dai.com/wp-content/uploads/2020/09/dd20cf3411986bd16e08ba6e65a15fae-1024x768.jpg'
  }]

  showMenuList(menu)


//   let config = {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: 'https://script.google.com/macros/s/AKfycbx6pc8rSkEK32v3oA3in6vjyTH8U7nFEbqM0-mA__zzlvw_So2Z0r2JqFoKmazUPDy1/exec?type=1',
//     headers: { },
//     data : ""
//   };

//   axios.request(config)
//   .then((response) => {
//     // console.log(JSON.stringify(response.data));
//  menu = response.data

  // showMenuList(menu)
    
//   })
//   .catch((error) => {
//     console.log(error);
//   });
})

function selectproduct(mid, mname, mprice) {
  console.log(mid, mname, mprice)
  var pass = true;

  for (let i = 0; i < list.length; i++) {
      if(list[i].id == mid) {
          list[i].count++;
          pass = false;
      }
  }

  if(pass) {
      list.push({
          id: mid,
          name: mname,
          price: mprice,
          count: 1
      })
  }

  console.log('list : ',list)
  var html = '';
  var html2 = '';

  var sumprice = 0;
  var sumprice_vat = 0;

  for (let i = 0; i < list.length; i++) {
      sumprice += list[i].price * list[i].count;
      // html += `
      // <div class="row">
      //     <p>[x${list[i].count}] ${list[i].name}</p>
      //     <p>${numberWithCommas(list[i].price * list[i].count)} THB</p>
      // </div>          
      // `;

      html += `
      <tr>
      <td class="fs-6">[x${list[i].count}]</td>
      <td class="fw-bolder"> ${list[i].name}</td>
      <td>${numberWithCommas(list[i].price * list[i].count)} THB</td>
      <td class="text-danger" onclick="del(this,${list[i].price * list[i].count})" data-menuid="${list[i].id}"><i class="fa-solid fa-delete-left"></i></td>
      </tr>
      `;
  }
  const vat = (7/100)*sumprice
  sumprice_vat = sumprice + vat

  html2 += `
      <p>${numberWithCommas(sumprice)} | รวม Vat 7% ${numberWithCommas(sumprice_vat)} THB</p>
  `;
  $("#listbox").html(html)
  $("#sum").html(html2)

  amount_p = sumprice
  document.getElementById("qr").src = "https://promptpay.io/0000000/"+sumprice
}


function del(row,row_price){
  const tr = row.parentNode
  const menu_id = row.dataset.menuid
  var index = list.findIndex(item => item.id === +menu_id);
  list.splice(index, 1);
  console.log(list)
  tr.remove()
  let amount = amount_p - row_price
  amount_p = amount

  const vat = (7/100)*amount
  const sumP_vat = amount + vat

  const htmlSumPrice = `
  <p> ${numberWithCommas(amount)} | รวม Vat 7% ${numberWithCommas(sumP_vat)} THB</p>
`;
  $("#sum").html(htmlSumPrice)
}


//   1
function showMenuList(menu){
  var html = '';
  for (let i = 0; i < menu.length; i++) {

      html += `
      <div class="col-sm-3 pt-4">
      <div class="card" onmouseover="blueCard(this)" onmouseout="notblueCard(this)" onclick="selectproduct(${menu[i].id}, '${menu[i].name}', ${menu[i].price} )">
        <img onmouseover="blueImg(this)" onmouseout="notblueImg(this)" src="${menu[i].img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h6 class="fw-bold card-title">${menu[i].name}</h6>
          <p class="card-text">${menu[i].price} THB</p>
        </div>
      </div>
      </div>
      `

  }
  $("#productbox").html(html)

}


searchinput.addEventListener('keyup',(e)=>{
  const menuAll = menu
  let menuFilter = menuAll.filter((f)=>{
   let searchinputVal = searchinput.value
   return (
       f.name.toLowerCase().includes(searchinputVal)
   );
});

showMenuList(menuFilter)

})

btnMenuAll.addEventListener('click',(e)=>{
  const menuAll = menu
  showMenuList(menuAll)

})


function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
  return x;
}

function clearlist() {
  amount_p = 0
  list = [];
  $("#sum").html("")
  $("#listbox").html(`<p>โปรดเลือกรายการ</p>`)
}

function printlist() {
  const payment = $("#pay").val()
  const vat = (7/100)*amount_p
  const sum_vat = amount_p + vat 
  const changeMoney = payment - sum_vat

 if(!payment) {
    Swal.fire(
      'กรุณาตรวจสอบ?',
      'ช่องใส่จำนวนเงินที่รับชำระ',
      'question'
    )
    // alert("ตรวจสอบช่องใส่จำนวนเงินที่รับชำระ")
  }else{
    localStorage.setItem('payment', payment)
    // console.log('list',list)
    var gotolist = JSON.stringify(list)
    console.log('gotolist',gotolist)
    localStorage.setItem('menulist', gotolist)
  
    window.open('slip.html','_blank')
  }
}

function blueImg(img){
  img.style.opacity = 0.5;
}

function notblueImg(img){
  img.style.opacity = 1;
}

function blueCard(card){
  card.style.color = "pink";
}
function notblueCard(card){
  card.style.color = "black";
}

    //แปลงตัวเลขให้มี คอมม่าคั่น https://stackoverflow.com/questions/1990512/add-comma-to-numbers-every-three-digits    
    $("#pay").keyup(function (event) {
      // skip for arrow keys
      if (event.which >= 37 && event.which <= 40) {
          event.preventDefault();
      }
      var $this = $(this);
      var num = $this.val().replace(/,/g, '');
      // the following line has been simplified. Revision history contains original.
      $this.val(num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
  });

