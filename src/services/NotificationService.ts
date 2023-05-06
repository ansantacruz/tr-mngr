
const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');

export class NotificationService {

    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyCNsThG7xiTO2V1_W4RilnpIdA1RVWD49A",
            authDomain: "turepuesto-23c7f.firebaseapp.com",
            projectId: "turepuesto-23c7f",
            storageBucket: "turepuesto-23c7f.appspot.com",
            messagingSenderId: "856394304695",
            appId: "1:856394304695:web:9d2c8cfe38ab4bd2d01132",
            measurementId: "G-09NYFVCN5Z"
          };
        admin.initializeApp({
            credential: admin.credential.cert(firebaseConfig),
          });
    }

    public async notify(destinatarios: any[], body: any, tituloMensaje: string) {

        const message = {
            notification: {
              title: tituloMensaje,
              body
            },
            token: null
          };

          try {
            destinatarios.forEach(async token => {
                message.token = token;
                await admin.messaging().send(message);
            });
            return true;
          } catch (err) {
            return false;
          }
    }

}
