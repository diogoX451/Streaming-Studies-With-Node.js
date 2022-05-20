import {Readable, Writable, Transform} from 'stream'
import {createWriteStream} from 'fs'
//chama o readables
const readable = Readable({
    read(){
        for(let index = 0; index < 1e4; index++){
            const person = { id: Date.now() + index, name: `Diogo-${index}`}
            //transforma em string
            const data = JSON.stringify(person);
            this.push(data);
        }
        // quando para de enviar  informação
        this.push(null);
    }
})

//processar os dados 

const mapFields = Transform({ 
    transform(chunk, encoding, cb){ 
        const data = JSON.parse(chunk);
        //mapeando os valores
        const result = `${data.id}, ${data.name.toUpperCase()}\n`
        cb(null, result);
    }
});

const mapHeaders = Transform({
    transform(chunk, encoding, cb){
        this.counter = this.counter ?? 0;
        //Se não tiver nenhuma valor
        if(this.counter){
            return cb(null, chunk);
        }

        this.counter += 1;
        cb(null,"id,name\n".concat(chunk));

    }

});
//saida dos dados 
// const writable = Writable({
//     write(chunk, encoding, cb){
//         console.log('msg', chunk.toString());
//         cb();
//     }
// });

const pipeline = readable
    .pipe(mapFields)
    .pipe(mapHeaders)
    //writable sempre e a saida d e dados
    // .pipe(writable)
    //saida dos dados 
    // .pipe(process.stdout)
    .pipe(createWriteStream('teste.csv'));

    //Saber quando acabou

pipeline
    .on('end', () =>  console.log('Finish'))