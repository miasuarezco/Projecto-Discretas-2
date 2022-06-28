class Vertice {
    constructor(
        id,data,
        {   x = random(70, ancho - 70),                             
            y = random(70, alto - 70),                              
            r = random(50, 100),                                    
            c = random(["white", "yellow", "tomato"]),      
            img = tst     // 1 - Si se quiere usar imagen por defecto cargar imagen transparente
        }) {
        //Parametro obligatorio
        this.id=id;
        this.data = data;   //Nombre / valor 

        //Parametros visuales opcionales
        this.x = x;         //Coordenada en x del vertice
        this.y = y;         //Coordenada en y del vertice
        this.r = r;         //Radio del vertice
        this.c = c;         //Color del vertice
        this.img = img;     //Imagen asociada al vertice
    }

    Hover(c,sw,grafo){
        let d = dist(mouseX, mouseY, this.x, this.y);
        if (d < this.r / 2) {
            //Imprimir conexiones
            for (let idconexion of grafo.conexiones[this.id]){
                if(idconexion in grafo.vertices){        //Solo hago la conexion si el nodo al que hago referencia existe
                    let vertfin=grafo.vertices[idconexion];

                    //Imprimir conexiones
                    push();
                    stroke(c);
                    strokeWeight(sw);
                    line(this.x,this.y,vertfin.x,vertfin.y);
                    pop();

                    //Imprimir el vertice fin nuevamente
                    push();
                    fill(vertfin.c);
                    stroke(c);
                    strokeWeight(sw);
                    circle(vertfin.x, vertfin.y, vertfin.r);
                    fill('white');
                    textSize(this.r * 0.17333);
                    stroke('black');
                    strokeWeight(2);
                    image(vertfin.img, vertfin.x - (vertfin.r * 0.5), vertfin.y - (vertfin.r * 0.5), vertfin.r * cos(2 * PI), vertfin.r * sin(360), vertfin.img.x, vertfin.img.y);
                    text(vertfin.data, vertfin.x - (vertfin.r * 0.333), vertfin.y + (vertfin.r * 0.0314));
                    pop();

                }else{
                    print(id+": el vertice "+idconexion+ " no existe! Ignorando conexion");
                }
            }
            // Imprimir vertice hovereado
                push();
                fill(this.c);
                stroke(c);
                strokeWeight(sw);
                circle(this.x, this.y, this.r);
                fill('white');
                textSize(this.r * 0.17333);
                stroke('black');
                strokeWeight(2);
                image(this.img, this.x - (key.r * 0.5), key.y - (key.r * 0.5), key.r * cos(2 * PI), key.r * sin(360), key.img.x, key.img.y);
                text(this.data, this.x - (key.r * 0.333), key.y + (key.r * 0.0314));
                pop();
            
        }
    }

    Clicked(grafo){
        let d = dist(mouseX,mouseY,this.x,this.y);
        if (d<this.r/2){
            //Añadir el universo tocado a la lista de recorrido
            text(recorrido.Print(),50,20);
            if(recorrido.size==0){
                recorrido.PushBack(this);
                viajerr.html("<i></i>");
            }
            else if (recorrido.size==1){
                if(recorrido.head.data!=this){
                    //Verificar conexiones
                    if(grafo.conexiones[recorrido.head.data.id].has(this.id)){
                        recorrido.PushBack(this);
                        viajerr.html("<i></i>");
                    }else{
                        viajerr.html("<i>Los caminos no<br>estan conectados!</i>");
                    }
                }else{
                    viajerr.html("<i>No puedes viajar al <br> mismo lugar!</i>");
                }
            }
            else{
                if(recorrido.tail.data!=this){
                    if(grafo.conexiones[recorrido.tail.data.id].has(this.id)){
                        recorrido.PushBack(this);
                        viajerr.html("<i></i>");
                    }else{
                        viajerr.html("<i>Los caminos no <br>estan conectados!</i>");
                    }
                }else{
                    viajerr.html("<i>No puedes viajar al <br> mismo lugar!</i>");
                }
            }
            if(grafo.conexiones[recorrido.tail.data.id].size==0){
                viajerr.html("<i>Camino sin <br>      salida!</i>");
            }
        }
    }
}

class Grafo{
    constructor(){
        this.vertices={};       //Diccionario donde se le asigna un ID a cada vertice
        this.conexiones={};     //Diccionario donde se le asigna un set de IDS a cada ID en representacion de sus conexiones
    }

    Insert(id,data,connections,visual){ //ID es el identificador de cada vertice en el grafo
        this.vertices[id]=new Vertice(id,data,visual);      //Añadir el vertice al arreglo de vertices con la key siendo su ID
        this.conexiones[id]=new Set();  //Inicializar el set de las conexiones de cada vertice
        for(let i of connections){
            this.conexiones[id].add(i);
        }
    }


    Print(c,sw){
        //Imprimir aristas
        for (let id in this.conexiones){
            //La key de conexiones es el Id del nodo inicial
            let vertinicio=this.vertices[id];

            //this.conexiones[id] corresponde al set donde estan las conexiones de ese nodo inicial
            for (let idconexion of this.conexiones[id]){
                if(idconexion in this.vertices){        //Solo hago la conexion si el nodo al que hago referencia existe
                    let vertfin=this.vertices[idconexion];
                    push();
                    stroke(c);
                    strokeWeight(sw);
                    line(vertinicio.x,vertinicio.y,vertfin.x,vertfin.y);
                    pop();
                }else{
                    print(id+": el vertice "+idconexion+ " no existe! Ignorando conexion");
                }
            }
        }
        //Imprimir vertices
        for(let id in this.vertices){
                key=this.vertices[id];
                key.Hover('blue',6,this);            //Al imprimir tambien se verifica si se esta hovereando el vertice
                //paso this como parametro pq en los vertices no existen conexiones, existen sobre el grafo en si entonces tengo que 
                //pasar ese grafo de referencia para hacer el hover que si es inherente a cada vertice (lol)
                push();
                fill(key.c);
                stroke(c);
                strokeWeight(sw);
                circle(key.x, key.y, key.r);
                fill('white');
                textSize(this.r * 0.17333);
                stroke('black');
                strokeWeight(2);
                image(key.img, key.x - (key.r * 0.5), key.y - (key.r * 0.5), key.r * cos(2 * PI), key.r * sin(360), key.img.x, key.img.y);
                text(key.data, key.x - (key.r * 0.333), key.y + (key.r * 0.0314));
                pop();
        }
    }

    VerClicked(){       
        //Si se hizo un click sobre el canvas, verificar en que nodo fue hecho
        for(let id in this.vertices){
            this.vertices[id].Clicked(this);
        }
    }

}