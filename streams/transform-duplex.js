import  {Duplex, Transform} from 'stream'
let count = 0;
const server = new Duplex({
    objectMode: true, // Faz não precisar trabalhar com buffer, no entanto gasta mais memoria
    encoding: 'utf8', //Aqui define acentos e ç
    read(){
     const everySecond =  (intervalContext) => { 
         if(count++ <= 5){ 
             this.push(`Meu nome e Diogo [${count}]`)
             return;
         }
         clearInterval(intervalContext);
         this.push(null);
     }
        //funcionamento em forma Async
        setInterval( function() {everySecond(this)})
    },
    // Como fosse um objeto diferente
    write(chunk, encoding, cb){
        console.log(`[writable] saving`, chunk)
        cb()
    }
})

//provar que o write e o read são diferentes
// write aciona Writable 
server.write(`[duplex] isso aqui é um writable  \n`);

server.push(`[duplex] Isso aqui é um Readable \n`);

// server.on('data',  msg => console.log(`[readable]${msg}`));

// server.pipe(process.stdout);

//Transformar todos em Caixa Alta
const transformUpToUpperCase= Transform({
    objectMode: true,
    transform(chunk, encoding, cb){
        cb(null, chunk.toUpperCase());
    }
});

//transforma o duplex 
transformUpToUpperCase.write(`[transform] hello from write`);
transformUpToUpperCase.push(`[transform] hello from push \n`);

//Redireciona todos os dados de Readble para Writable da Duplex
server
    .pipe(transformUpToUpperCase)
    .pipe(server)