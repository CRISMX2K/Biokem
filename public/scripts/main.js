let tkFront = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XMZ8SDUJpD8dVJ0QEgsl5EBgF3VZXQ9oArAlMkh9JvE";

if(window.location.pathname.includes("contacto")){
    let btnCorreo = document.getElementById("enviarCorreoContacto");
    btnCorreo.onclick = async function(){

        let NombreCliente = document.getElementById("NombreContacto");
        let EmailCliente = document.getElementById("EmailContacto");
        let MensajeCliente = document.getElementById("MensajeContacto");

        // Validamos que no haya campos vacios por enviar
        if(NombreCliente.value === "" || EmailCliente.value === "" || MensajeCliente.value === ""){
            Swal.fire({
                title:"¡Datos incorrectos!",
                text: "No se pueden enviar datos vacios.",
                icon: "warning"
            });
            return;
        }

        //Evaluamos que el email del usuario contenga el formato correcto
        if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(EmailCliente.value)){

            //Estructuramos el objeto a enviar
            let dataContacto = {
                fullname: NombreCliente.value,
                email: EmailCliente.value,
                message: MensajeCliente.value
            }

            //Ejecutamos la funcion ajax para enviar los datos
            try{

                let responseContacto = await $.ajax({
                    url: "https://apibk.poluxdev.com/v1/contact/send",
                    type: "POST",
                    headers: {
                        "Authorization": `Bearer ${tkFront}`
                    },
                    data: JSON.stringify(dataContacto),
                    contentType: "application/json"
                });

                console.log(JSON.parse(responseContacto));
                let responseFormateado = JSON.parse(responseContacto);

                if(responseFormateado.status){
                    Swal.fire({
                        title:"¡Mensaje enviado correctamente!",
                        text: "Se ha enviado el mensaje exitosamente, te contactaremos para dar seguimiento..",
                        icon: "success"
                    });

                    //Limpiamos los datos de los input
                    NombreCliente.value = "";
                    EmailCliente.value = "";
                    MensajeCliente.value = "";
                }

            }catch (error){
                console.error(error);

                Swal.fire({
                    title: "¡Error!",
                    text: "Hubo un problema al enviar la solicitud. Por favor, intenta nuevamente.",
                    icon: "error"
                });
            }
            
        }else{
            Swal.fire({
                title:"¡Datos incorrectos!",
                text: "El formato del email es incorrecto.",
                icon: "warning"
            });
        }
    }
}


if(document.getElementById("BannerInicio")){

    //BANNER PRINCIPAL
    // Ejecutamos la función ajax para traer las imágenes de banner activas e insertar los banners
    async function obtenerBanners() {
        try {
            let responseBanners = await $.ajax({
                url: "https://apibk.poluxdev.com/v1/images/active/BP",
                type: "GET",
                headers:  {
                    "Authorization": `Bearer ${tkFront}`
                }
            });

            function crearBanner(bannerData, index) {
                const container = document.getElementById("banners-container");

                const banner = document.createElement("div");
                banner.className = "banner";

                const imagen = document.createElement("img");
                imagen.src = "https://apibk.poluxdev.com/" + bannerData.path;
                banner.appendChild(imagen);

                container.appendChild(banner);
            }

            if (responseBanners.status && responseBanners.data) {
                const bannersContainer = document.getElementById("banners-container");
                responseBanners.data.forEach((bannerData) => {
                    crearBanner(bannerData);
                });

                mostrarBanners(bannerIndex);

                // Configuramos un temporizador para cambiar automáticamente 
                setInterval(() => {
                    cambiarBanner(1);
                }, 8000);
            }

        } catch (error) {
            console.error(error);

            Swal.fire({
                title: "¡Error!",
                text: "Hubo un problema con el servidor. Por favor, intenta más tarde.",
                icon: "error"
            });
        }
    }

    // Seteamos el index de la serie de banners
    let bannerIndex = 0;

    function mostrarBanners(index) {
        const banners = document.querySelector('.banners');
        banners.style.transform = `translateX(${-index * 100}%)`;
    }

    function cambiarBanner(n) {
        bannerIndex += n;
        const banners = document.querySelectorAll('.banner');

        if (bannerIndex >= banners.length) {
            bannerIndex = 0;
        } else if (bannerIndex < 0) {
            bannerIndex = banners.length - 1;
        }

        mostrarBanners(bannerIndex);
    }

    obtenerBanners();


//MINI BANNER
    // Ejecutamos la función ajax para traer las imágenes de banner activas e insertar los banners
    async function obtenerMiniBanners() {
        try {
            let responseBanners = await $.ajax({
                url: "https://apibk.poluxdev.com/v1/images/active/BP",
                type: "GET",
                headers:  {
                    "Authorization": `Bearer ${tkFront}`
                }
            });

            function crearMiniBanner(bannerData, index) {
                const container = document.getElementById("Minibanners-container");

                const banner = document.createElement("div");
                banner.className = "bannerMini";

                const imagen = document.createElement("img");
                imagen.src = "https://apibk.poluxdev.com/" + bannerData.path;
                banner.appendChild(imagen);

                container.appendChild(banner);
            }

            if (responseBanners.status && responseBanners.data) {
                const bannersContainer = document.getElementById("Minibanners-container");
                responseBanners.data.forEach((bannerData) => {
                    crearMiniBanner(bannerData);
                });

                mostrarMiniBanners(bannerIndex);

                // Configuramos un temporizador para cambiar automáticamente 
                setInterval(() => {
                    cambiarMiniBanner(1);
                }, 8000);
            }

        } catch (error) {
            console.error(error);

            Swal.fire({
                title: "¡Error!",
                text: "Hubo un problema con el servidor. Por favor, intenta más tarde.",
                icon: "error"
            });
        }
    }

    // Seteamos el index de la serie de banners
    let bannerIndexMini = 0;

    function mostrarMiniBanners(index) {
        const banners = document.querySelector('.bannersMini');
        banners.style.transform = `translateX(${-index * 100}%)`;
    }

    function cambiarMiniBanner(n) {
        bannerIndexMini += n;
        const banners = document.querySelectorAll('.bannerMini');

        if (bannerIndexMini >= banners.length) {
            bannerIndexMini = 0;
        } else if (bannerIndexMini < 0) {
            bannerIndexMini = banners.length - 1;
        }

        mostrarMiniBanners(bannerIndexMini);
    }

    obtenerMiniBanners();

    //CARRUSEL DE SUCURSALES PRINCIPAL
    const contenidoCarrusel = document.getElementById('contenido-carrusel');
    const flechaIzquierda = document.getElementById('flecha-izquierda');
    const flechaDerecha = document.getElementById('flecha-derecha');
    
   
    let indiceActual = 0;
    
    setInterval(() => {
        indiceActual = (indiceActual + 1) % respuestaApi.data.length;
        mostrarRegistros(respuestaApi);
    }, 8100);

    let  respuestaApi;
    async function recibirSucursales(){
        
        try{
            respuestaApi = await $.ajax({
                url: "https://apibk.poluxdev.com/v1/catalogs/offices",
                type: "GET",
                headers:  {
                    "Authorization": `Bearer ${tkFront}`
                }
            });
        }catch(e){
            console.error(e);
            respuestaApi = "Error: " + e.error;
        }
        
        return respuestaApi;
    }

    async function mostrarRegistros(respuestaApi) {
        contenidoCarrusel.innerHTML = '';
        respuestaApi.data.forEach(registro => {
            const elementoRegistro = crearElementoRegistro(registro);
            contenidoCarrusel.appendChild(elementoRegistro);
        });
        const valorTransformacion = `translateX(-${indiceActual * 100}%)`;
        contenidoCarrusel.style.transform = valorTransformacion;
    }
    

    function crearElementoRegistro(registro) {
        const linkMaps = "https://www.google.com/maps/search/" + registro.address;
        const elementoRegistro = document.createElement('div');
        elementoRegistro.className = 'registroCarrusel';

        const contenidoTarjeta = `
            <div class="tarjeta">
                <img src="/content/images/Iconos/icono-ubicacion.png" style="width:35px; cursor:pointer;" onclick="window.open('${linkMaps}', '_blank');">
                <h2 style="margin:5px 0; font-size:1.7em;" class="nombreSuc">${registro.name}</h2>
                <p class="direccion" style="text-align:center; margin:5px 0; font-size:1em; max-width:60%;">${registro.address}</p>
            </div>
        `;

        elementoRegistro.innerHTML = contenidoTarjeta;

        const imgElemento = elementoRegistro.querySelector('.direccion');
        imgElemento.onclick = function(){
            window.open(linkMaps, "_blank");
        }

        const nombreElemento = elementoRegistro.querySelector('.nombreSuc');
        nombreElemento.onclick = function(){
            window.open(linkMaps, "_blank");
        }

        return elementoRegistro;
    }
    
    
    flechaDerecha.addEventListener('click', () => {
        indiceActual = (indiceActual + 1) % respuestaApi.data.length;
        mostrarRegistros(respuestaApi);
    });
    
    flechaIzquierda.addEventListener('click', () => {
        indiceActual = (indiceActual - 1 + respuestaApi.data.length) % respuestaApi.data.length;
        mostrarRegistros(respuestaApi);
    });

    async function iniciarCarrusel() {
        const respuestaApi = await recibirSucursales();
        mostrarRegistros(respuestaApi);
    }

    iniciarCarrusel();
}


if(window.location.pathname.includes("catalogo")){

    //Creamos y ejecutamos la funcion para insertar las sucursales que haya y asi mostrar los servicios despues
    let respuestaApi, SucursalID;
    
    const SelectSucursales = document.getElementById("SucursalServicios");
    async function insertaSucursales(){
        try{
            respuestaApi = await $.ajax({
                url: "https://apibk.poluxdev.com/v1/catalogs/offices",
                type: "GET",
                headers:  {
                    "Authorization": `Bearer ${tkFront}`
                }
            });

            respuestaApi.data.forEach(sucursal => {
                const option = document.createElement("option");
                option.value = sucursal.id;
                option.text = sucursal.name;
                SelectSucursales.appendChild(option);
            });

        }catch(e){
            console.error(e);
            respuestaApi = "Error: " + e.error;
        }
    }

    insertaSucursales();



    SelectSucursales.onchange = function(){

        const AnalisisTexto = document.getElementById("Analisis");
        const ChequeosTexto = document.getElementById("Chequeos");
        const PerfilesTexto = document.getElementById("Perfiles");
        const ImagenTexto = document.getElementById("Imagen");
        const ContenedorRegistros = document.querySelector(".ContenedorInformacionServicios");
        
        ContenedorRegistros.innerHTML  = "Seleccione un tipo de servicio para visualizar las opciones";
        ContenedorRegistros.style.justifyContent  = "center";
        ContenedorRegistros.style.alignItems  = "center";
        AnalisisTexto.classList.remove("OpcionPestañaSeleccionada");
        ChequeosTexto.classList.remove("OpcionPestañaSeleccionada");
        PerfilesTexto.classList.remove("OpcionPestañaSeleccionada");
        ImagenTexto.classList.remove("OpcionPestañaSeleccionada");

        SucursalID = SelectSucursales.value;

        if(SucursalID === ""){
            document.querySelector(".PestañasServicios").style.opacity = "0.7";

        }else {
            document.querySelector(".PestañasServicios").style.opacity = "1";
            
            AnalisisTexto.onclick = async function(){
                AnalisisTexto.classList.add("OpcionPestañaSeleccionada");
                ChequeosTexto.classList.remove("OpcionPestañaSeleccionada");
                PerfilesTexto.classList.remove("OpcionPestañaSeleccionada");
                ImagenTexto.classList.remove("OpcionPestañaSeleccionada");

                try{
                    let = respuestaAnalisis = await $.ajax({
                        url: "https://apibk.poluxdev.com/v1/catalogs/analisysByOffice/" + SucursalID,
                        type: "GET",
                        headers:  {
                            "Authorization": `Bearer ${tkFront}`
                        }
                    });
                    
                    let Analisis = respuestaAnalisis.data;
                    if(Analisis !== null){
                        ContenedorRegistros.innerHTML  = "";
                        ContenedorRegistros.style.alignItems  = "start";
                        ContenedorRegistros.style.justifyContent  = "start";
                        Analisis.forEach(analisis =>{
                            let TarjetaRegistro = `
                                <div class="RegistroAnalisis FadeInDerecha">
                                    <img src="/content/images/Iconos/analisis.png" style="width:35px;">
                                    <div style="display:flex; flex-direction:column; font-size:12px; padding:0 10px;">
                                        <span style="font-weight:800;">${analisis.studio}</span>
                                        <span>$${analisis.price} MXN</span>
                                    </div>
                                </div>
                            `;
    
                            ContenedorRegistros.innerHTML += TarjetaRegistro;
                        });

                    }else{
                        ContenedorRegistros.style.alignItems  = "center";
                        ContenedorRegistros.style.justifyContent  = "center";
                        ContenedorRegistros.innerHTML  = "No hay analisis en esta sucursal";
                    }
                    

                }catch(e){
                    console.error(e);
                    respuestaAnalisis = "Error: " + e.error;
                }
            }

            PerfilesTexto.onclick = async function(){
                PerfilesTexto.classList.add("OpcionPestañaSeleccionada");
                ChequeosTexto.classList.remove("OpcionPestañaSeleccionada");
                AnalisisTexto.classList.remove("OpcionPestañaSeleccionada");
                ImagenTexto.classList.remove("OpcionPestañaSeleccionada");

                try{
                    let = respuestaPerfiles = await $.ajax({
                        url: "https://apibk.poluxdev.com/v1/catalogs/profilesByOffice/" + SucursalID,
                        type: "GET",
                        headers:  {
                            "Authorization": `Bearer ${tkFront}`
                        }
                    });
                    
                    let Perfiles = respuestaPerfiles.data;

                    if(Perfiles !== null){
                        ContenedorRegistros.innerHTML  = "";
                        ContenedorRegistros.style.alignItems  = "start";
                        ContenedorRegistros.style.justifyContent  = "start";
                        Perfiles.forEach(perfil =>{
                            let TarjetaRegistro = `
                                <div class="RegistroAnalisis FadeInDerecha">
                                    <img src="/content/images/Iconos/analisis.png" style="width:35px;">
                                    <div style="display:flex; flex-direction:column; font-size:12px; padding:0 10px;">
                                        <span style="font-weight:800;">${perfil.profile}</span>
                                        <span>$${perfil.price} MXN</span>
                                    </div>
                                </div>
                            `;
    
                            ContenedorRegistros.innerHTML += TarjetaRegistro;
                        });

                    }else{
                        ContenedorRegistros.style.alignItems  = "center";
                        ContenedorRegistros.style.justifyContent  = "center";
                        ContenedorRegistros.innerHTML  = "No hay perfiles en esta sucursal";
                    }
                    

                }catch(e){
                    console.error(e);
                    respuestaAnalisis = "Error: " + e.error;
                }
            }
        }
    }
}

if(window.location.pathname.includes("registro")){
    const FormularioRegistro = document.getElementById("RegistroForm");

    FormularioRegistro.onsubmit = async function(event){
        event.preventDefault();
        if(document.getElementById("contra2Reg").value === document.getElementById("contraReg").value){
            try{
                let = respuestaRegistro = await $.ajax({
                    url: "https://apibk.poluxdev.com/v1/secure/register/",
                    type: "GET",
                    headers:  {
                        "Authorization": `Bearer ${tkFront}`
                    },
                    data: {
                        curp: document.getElementById("CurpReg").value,
                        email: document.getElementById("correoReg").value,
                        firstname: document.getElementById("NombreReg").value,
                        lastname: document.getElementById("ApellidoPReg").value,
                        secondlastname: document.getElementById("ApellidoMReg").value,
                        password: document.getElementById("contra2Reg").value
                    }
                });
    
                console.log(respuestaRegistro);
            }catch(e){
    
            }

        }else{
            event.preventDefault();
            Swal.fire({
                title:"¡Las contraseñas no coinciden!",
                text: "Vuelve a ingresar tu contraseña y su confirmación porfavor.",
                icon: "warning"
            });
        }
        
    }
}

function convertirAMayusculas(input) {
    input.addEventListener('input', function(event) {
      input.value = event.target.value.toUpperCase();
    });
  }