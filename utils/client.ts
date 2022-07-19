import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'xjihq176',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: false,//given so that you can use it to faster access
  // token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
  //here the thing above me is a enviroment variable
  // used so that we cAN HIDE our token from outsiders
  token:"sksThrXKJu3HVHO4o80B8UbWQUtBoTYJzDF81nHWR78iM6xbNM4IzwJV6vG8fF8rI439W7ZBdwpjwIIMliFgcU3XmBdJrOqXkyHZ0eL7x6c2FApxSipuqBmTEXnJqveUgUZO4hIcVayUqBAqPL8Ue0wE3R0NA2NXPC6ftOJOF6jNGAU2DCRr"
  //not given env var since vs code wasnt accepting a env file RIP to SEcurity
});
