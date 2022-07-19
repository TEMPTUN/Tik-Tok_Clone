// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client';
import { allPostsQuery } from '../../../utils/queries'



export default async function handler(
  req: NextApiRequest,//since using typescript we here specify type of req and res
  res: NextApiResponse
) {
  if(req.method === 'GET'){
    const query= allPostsQuery();

    const data= await client.fetch(query);

    res.status(200).json(data);
  }else if(req.method === 'POST'){
    const document=req.body
    console.log(document)
    client.create(document)
      .then(()=> {
        res.status(200).json("Video Posted")
      })
  }
}