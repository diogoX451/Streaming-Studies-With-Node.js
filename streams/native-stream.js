
// process.stdin
//     .pipe(process.stdout)// ==> Repete os dados informados pelo CMD
//     .on('data', msg => console.log(msg, 'data'))
//     .on('end', _ => console.log('end')) // ==> Simula o fim da aplicação
//     .on('error', err => console.log('error', err)) // ==> Erro da Aplicação da aplicação
//     .on('close', () => console.log('close')) // fechar aplicação

// Criação do terminal
  // para executar abra dois terminais e pegue o codigo antes de inicializar digita node-e "codigo"
  //Terminal 1
//   require('net').createServer(socket => socket.pipe(process.stdout)).listen(3333)
      //Terminal 2 == envia a stream
//   process.stdin.pipe(require('net').connect(3333))

//Criação de um arquivo sempre dando node -e
    // no randomBytes  == informar quanto bytes tera 1e8 ate infinito
// process.stdout.write(crypto.randomBytes(1e9)) > big.file

//======= Criação da  Api ========

import http from 'http'; 
//feito para strean createReadStream
import { createReadStream,readFileSync } from 'fs';
// usa createServer
http.createServer((req, res) => {
    // Em tese de funcionamento
    // const file = readFileSync('big.file');
    // res.write(file); // => É um string 
    // res.end()// => Finalizar a requisição

    createReadStream('../big.file')
      .pipe(res)
}).listen(3333, () => console.log('rodando na porta 3333'));

// roda comando curl localhost:3333 -o output.txt