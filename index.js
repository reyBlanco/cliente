const c=console.log;
const d=document;
const $form=d.querySelector("#form");
const $frase=$form.querySelector("#frase_text");
const $op=$form.querySelector("#op_number");
const $submit_http=$form.querySelector("#submit_http");
const $submit_ws=$form.querySelector("#submit_ws");
const $contenedor=d.querySelector("#contenedor");
const $table=d.querySelector("#table");
const $tboby=$table.querySelector("#tbody");
const $verificar_button=$tboby.querySelector("#verificar_button");

let res={
    frase:"hola servidor",
    opcion:0
}

let resJson=JSON.stringify(res);
//https://192.168.100.16:3000/
let paqueteGet={
    url:"https://192.168.100.16:3000",
    succes:(resObj)=>{
        c(resObj.datosRecuperados);
        $contenedor.innerHTML="";
        for(const atributo in resObj){
            if(typeof resObj[atributo]==="string"){
                $contenedor.innerHTML+=`<B>${atributo}:${resObj[atributo]}</B><br>`;
            }

            if(typeof resObj[atributo]==="object"){
                const objeto=resObj[atributo];

                for(const key in objeto){
                    $contenedor.innerHTML+=`<B>${key}:${objeto[key]}</B><br>`;
                }
            }
        }
    },
    reject:(error)=>{
        $contenedor.innerHTML=error;
    }
}
//{url,data,method,mode,headers,succes,reject}
//https://192.168.100.16:3000/
let paqueteEnviar={
    url:"https://192.168.100.16:3000/enviar",
    data:{},
    method:"POST",
    mode:"cors",
    headers:{
        "content-type":"application/json"
    },
    succes:(resObj)=>{
        $contenedor.innerHTML="";
        for(const atributo in resObj){
            if(typeof resObj[atributo]==="string"){
                $contenedor.innerHTML+=`<B>${atributo}:${resObj[atributo]}</B><br>`;
            }
            if(typeof resObj[atributo]==="object"){
                let obj=resObj[atributo];
                for(const key in obj){
                    $contenedor.innerHTML+=`<B>${key}:${obj[key]}</B><br>`;
                }
            }
        }
    },
    reject:(error)=>{
        $contenedor.innerHTML=error;
    }
}

const Get=async (paquete={})=>{
    let {url,succes,reject}=paquete;
    try {
        let res=await fetch(url);
        succes(await res.json());

    } catch (error) {
        reject(`algo salio mal ${error.message}`);
    }
}

let enviar=async (paquete={})=>{
    let {url,data,method,mode,headers,succes,reject}=paquete;

    try {
        let res=await fetch(url,{
            headers,
            method,
            mode,
            body:JSON.stringify(data),
        });

        succes(await res.json());
    } catch (error) {
        reject(`algo salio mal al enviar datos. ${error.message}`);
    }
}

d.addEventListener("click",(e)=>{
e.preventDefault();
e.preventDefault();
    if(e.target===$verificar_button){
        Get(paqueteGet);
    }
    if(e.target===$submit_http){
        paqueteEnviar.data={
            frase:$frase.value,
            opcion:$op.value
        }
        e.preventDefault();
        enviar(paqueteEnviar);
    }
    e.preventDefault();
});