# POS_SYSTEM
ทำระบบหน้าร้านค้า ออกใบเสร็จรับเงินได้

cdn axios
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.2.2/axios.min.js" integrity="sha512-QTnb9BQkG4fBYIt9JGvYmxPpd6TBeKp6lsUrtiVQsrJ9sb33Bn9s0wMQO9qVBFbPX3xHRAsBHvXlcsrnJjExjg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>


*****ทำคอมม่าให้กับตัวเลขจำนวนเงิน*****
function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
  return x;
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
