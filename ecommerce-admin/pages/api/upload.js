// import multiparty from 'multiparty';
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// import fs from 'fs';
// import mime from 'mime-types'

// const bucketName = 'sayak-next-ecommerce'
// export default async function handle(req, res) {
//     const form = new multiparty.Form();

//     const { fields, files } = await new Promise((resolve, reject) => {
//         form.parse(req, (err, fields, files) => {
//             if(err) {
//                 reject(err);
//             }
//             resolve({ fields, files });
//         });
//     });
//     // console.log(files);
//     const client = new S3Client({
//         region: 'ap-northeast-1',
//         credentials: {
//             accessKeyId: process.env.S3_ACCESS_KEY,
//             secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//           },
        
//     });
//     const links=[];
//     for (const file of files.file) {
//         // console.log(file);
//         const ext= file.originalFilename.split('.').pop();
//         // console.log({ext,file});

//         const newFilename = Date.now() +'.'+ext;
    
//         await client.send(new PutObjectCommand({
//             Bucket: bucketName,
//             Key: newFilename, 
//             Body: fs.readFileSync(file.path),
//             ACL: 'public-read',
//             ContentType: mime.lookup(file.path)
//         }));
//         const link=`https://${bucketName}.s3.amazonaws.com/${newFilename}`;
//         console.log(link);
//         links.push(link);
//     }

//     return res.json({links});
// }

// export const config = {
//     api: { bodyParser: false }
// }

import multiparty from 'multiparty';
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types';
// import {mongooseConnect} from "@/lib/mongoose";
// import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";
const bucketName = 'sayak-next-ecommerce';

export default async function handle(req,res) {
//   await mongooseConnect();
//   await isAdminRequest(req,res);

  const form = new multiparty.Form();
  const {fields,files} = await new Promise((resolve,reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({fields,files});
    });
  });
//   console.log('length:', files.file.length);
  const client = new S3Client({
    region: 'ap-northeast-1',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const links = [];
  for (const file of files.file) {
    const ext = file.originalFilename.split('.').pop();
    const newFilename = Date.now() + '.' + ext;
    await client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: newFilename,
      Body: fs.readFileSync(file.path),
      ACL: 'public-read',
      ContentType: mime.lookup(file.path),
    }));
    const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
    links.push(link);
  }
  return res.json({links});
}

export const config = {
  api: {bodyParser: false},
};