import {Readable, Writable} from 'stream'

//chama o readables
const readable = Readable({
    //para cada arquivo que ele encontrar
    read(){

        this.push('Hello World 1'),
        this.push('Hello World 2'), 
        this.push('Hello World 3')

        // quando para de enviar  informação
        this.push(null);
    }
})

//saida dos dados 
const writable = Writable({
    write(chunk, encoding, cb){
        console.log('msg', chunk.toString());
        cb();
    }
});

readable
    //writable sempre e a saida d e dados
    .pipe(writable);
    // .pipe(process.stdout);