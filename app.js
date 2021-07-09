const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const SESSION_FILE_PATH = './session.json';
const CHATS = './chats.js';
const GRUPO_FAMILIA = '573015575931-1564536611@g.us';

let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
   sessionData = require(SESSION_FILE_PATH);
}


const client = new Client({
   session: sessionData
});

client.on('authenticated', (session) => {
   sessionData = session;
   fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
      if (err) {
         console.log(err);
      }
   })
})

client.on('qr', (qr) => {
   qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
   console.log('Client is ready');

   // Trae lo chats
   /* client.getChats().then(resp => {
      fs.writeFile(CHATS, JSON.stringify(resp), function (err) {
         if (err) {
            console.log(err);
         }
      })
   });*/


});

function sendMessage(msg) {
   client.sendMessage(GRUPO_FAMILIA, `${msg}`).then((resp) => {
      console.log(resp);
   })
}

client.on('message', message => {
   console.log(message);
});

client.initialize();