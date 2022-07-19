// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,//since using typescript we here specify type of req and res
  res: NextApiResponse
) {
  if(req.method === 'POST'){
    //here we send the data to request and we getting
    // data in user by req.body
    const user=req.body;
    //then we call our Sanity
    client.createIfNotExists(user)
        .then(()=> res.status(200).json('Login Success'))
        //this will create new user in sanity
  }
} 