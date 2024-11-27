
import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf-8'),
});
console.log('Firebase Admin inicializado com sucesso!');

export default admin;
