
$(document).ready(() => {
    let list = JSON.parse(localStorage.menulist);
    let pay = localStorage.payment.replace(/\D/g,'')
    let html = '';   //menu list
    let html2 = '';  //subtotal
    let html3 = '';  //vat
    let html4 = '';  //total + vat
    let html5 = '';  //pay-total+vat
    let html6 = '';  //change

console.log(pay)

    const idRecive = "CR660"+new Date().getTime();
    $("#idrecive").html(idRecive)

    let sumprice = 0
    let sumpriceTax = 0

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
        <td>${i+1}</td>
        <td> ${list[i].name}</td>
        <td>${list[i].count}</td>
        <td class="text-95">${numberWithCommas(list[i].price)} THB</td>
        <td>${numberWithCommas(list[i].price * list[i].count)} THB</td>
        </tr>
        `;
    }

        sumpriceTax = sumprice*(7/100)
        const amountTax = +sumpriceTax+ +sumprice
        console.log(amountTax)
        const changeMoney = pay - amountTax


    html2 += `
         ${numberWithCommas(sumprice.toFixed(2))} THB
    `;
    html3 += `
         ${numberWithCommas(sumpriceTax.toFixed(2))} THB
    `;
    html4 += `
         ${numberWithCommas((amountTax).toFixed(2))} THB
    `;
    html5 += `
         ${numberWithCommas((+pay).toFixed(2))} THB
    `;
    if(changeMoney<0){
    $("#payout").css('color', '#E74646');

        html6 += `
         ชำระเงินไม่ครบ(${changeMoney})
    `;
    // $("#payout").css("background-color","red");

    }else{
        html6 += `
         ${numberWithCommas((changeMoney).toFixed(2))} THB
    `;
    }



    let money = amountTax.toFixed(2)
    let moneyText = THBText(money)

    $("#words").html(moneyText)

    JsBarcode("#barcode", idRecive);   // กรณีใช้ผ่าน id   

    $("#taxAmt").html(html3)
    $("#granTotal").html(html4)
    $("#payin").html(html5)
    $("#payout").html(html6)
    $("#list").html(html)
    $("#qrPrint").attr('src', `https://promptpay.io/0817410181/${amountTax.toFixed(2)}`);

    $("#subtotal").html(html2).promise().done(()=>{
        // window.print()
        // let a = [{id: idRecive}]
        // a.push(list)
        // let obj = a
        // console.log(obj)

        // const formData = new FormData();
        // formData.append('objs', JSON.stringify(obj))

        // // axios Request ส่งข้อมูลไปชีต

        // let config = {
        //     method: 'post',
        //     maxBodyLength: Infinity,
        //     url: 'https://script.google.com/macros/s/AKfycbx6pc8rSkEK32v3oA3in6vjyTH8U7nFEbqM0-mA__zzlvw_So2Z0r2JqFoKmazUPDy1/exec?type=2',
        //     headers: { },
        //     data : formData
        // };

        // axios.request(config)
        // .then((response) => {
        //     console.log(JSON.stringify(response.data));
        //     menu = response.data
            
        // })
        // .catch((error) => {
        //     console.log(error);
        // });
    })
})

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
 }

 function save(){
    let list = JSON.parse(localStorage.menulist);

    const idRecive = "CR660"+new Date().getTime();

    let a = [{id: idRecive}]
        a.push(list)
        let obj = a
        console.log(obj)

        const formData = new FormData();
        formData.append('objs', JSON.stringify(obj))

        // axios Request ส่งข้อมูลไปชีต

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://script.google.com/macros/s/AKfycbx6pc8rSkEK32v3oA3in6vjyTH8U7nFEbqM0-mA__zzlvw_So2Z0r2JqFoKmazUPDy1/exec?type=2',
            headers: { },
            data : formData
        };

        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            menu = response.data

            alert("Success")
            
        })
        .catch((error) => {
            console.log(error);
        });
 }

 function printlist() {

    // window.location.href = 'slip.html'
    window.print()

}