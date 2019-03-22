function inicializarSlider() {
  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  output.innerHTML = slider.value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");;

  slider.oninput = function() {
      var valueFormat = this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      output.innerHTML = valueFormat;
  }
}


$(document).ready(function() {
  $('body').bootstrapMaterialDesign();
  /*--------------- Efecto hover fucsia sobre las tarjetas ----------------*/
  const aList = document.querySelectorAll('.tarjeta a');
  aList.forEach(function(aItem) {
      const img = aItem.querySelector('.tarjeta img');
      const texto = aItem.querySelector('.tarjeta .texto');

      aItem.addEventListener("mouseover", function( event ) {
          if (img.className === 'iconoContratarSeguro') {
              img.src = 'assets/images/img1.png';
          }
          else {
            if (img.className === 'iconoGestionarSegurosContratados') {
              img.src = 'assets/images/img3.png';
            }else{
              img.src = 'assets/images/img9.png';
            }

          }
          texto.style.color = "#CA195B";
      }, false);

      aItem.addEventListener("mouseout", function( event ) {
          if (img.className === 'iconoContratarSeguro') {
              img.src = 'assets/images/img2.png';
          }
          else {
            if (img.className === 'iconoGestionarSegurosContratados') {
              img.src = 'assets/images/img4.png';
            }else{
              img.src = 'assets/images/img10.png';
            }
          }
          texto.style.color = "";
      }, false);

  });

  /*--------------- Efecto hover sobre el menu vertical ----------------*/
  const aListMenuVertical = document.querySelectorAll('.menu-vertical a');
  aListMenuVertical.forEach(function(aItem) {

      const img = aItem.querySelector('.menu-vertical img');
      const texto = aItem.querySelector('.menu-vertical .texto');

      aItem.addEventListener("mouseover", function( event ) {

          switch (img.className) {
              case 'opcion1':
                  img.src = 'assets/images/iconosMenu2/1a.png';
                  break;
              case 'opcion2':
                  img.src = 'assets/images/iconosMenu2/2a.png';
                  break;
              case 'opcion3':
                  img.src = 'assets/images/iconosMenu2/3a.png';
                  break;
              case 'opcion4':
                  img.src = 'assets/images/iconosMenu2/4a.png';
                  break;
              case 'opcion5':
                  img.src = 'assets/images/iconosMenu2/1a.png';
                  break;
              case 'opcion6':
                  img.src = 'assets/images/iconosMenu2/2a.png';
                  break;
              case 'opcion7':
                  img.src = 'assets/images/iconosMenu2/3a.png';
                  break;
              case 'opcion8':
                  img.src = 'assets/images/iconosMenu2/4a.png';
                  break;
              default:
                  //
          }

          texto.style.color = "#ffffff";
          texto.style.display = "block";
      }, false);

      aItem.addEventListener("mouseout", function( event ) {

          switch (img.className) {
              case 'opcion1':
                  img.src = 'assets/images/iconosMenu2/1.png';
                  break;
              case 'opcion2':
                  img.src = 'assets/images/iconosMenu2/2.png';
                  break;
              case 'opcion3':
                  img.src = 'assets/images/iconosMenu2/3.png';
                  break;
              case 'opcion4':
                  img.src = 'assets/images/iconosMenu2/4.png';
                  break;
              case 'opcion5':
                  img.src = 'assets/images/iconosMenu2/1.png';
                  break;
              case 'opcion6':
                  img.src = 'assets/images/iconosMenu2/2.png';
                  break;
              case 'opcion7':
                  img.src = 'assets/images/iconosMenu2/3.png';
                  break;
              case 'opcion8':
                  img.src = 'assets/images/iconosMenu2/4.png';
                  break;
              default:
                  //
          }

          texto.style.color = "";
          texto.style.display = "none";
      }, false);

  });

  /*--------------------- Poniendo la clase activo -----------------------*/
  var aList2 = document.querySelectorAll(".menu-vertical a");

  aList2.forEach(function(aItem) {
      aItem.onclick = function() {
          const imgList = document.querySelectorAll('.menu-vertical img');
          const img = aItem.querySelector('.menu-vertical img');

          imgList.forEach(function(imgItem) {
              imgItem.classList.remove("activo");
          });

          img.classList.add("activo");

          imgList.forEach(imgItem => {
              switch (imgItem.className) {
                  case 'opcion1':
                      imgItem.src = 'assets/images/iconosMenu2/1.png';
                      break;
                  case 'opcion2':
                      imgItem.src = 'assets/images/iconosMenu2/2.png';
                      break;
                  case 'opcion3':
                      imgItem.src = 'assets/images/iconosMenu2/3.png';
                      break;
                  case 'opcion4':
                      imgItem.src = 'assets/images/iconosMenu2/4.png';
                      break;
                  case 'opcion5':
                      imgItem.src = 'assets/images/iconosMenu2/1.png';
                      break;
                  case 'opcion6':
                      imgItem.src = 'assets/images/iconosMenu2/2.png';
                      break;
                  case 'opcion7':
                      imgItem.src = 'assets/images/iconosMenu2/3.png';
                      break;
                  case 'opcion8':
                      imgItem.src = 'assets/images/iconosMenu2/4.png';
                      break;
                  default:
                      //
              }
          });
      }

  });

});
