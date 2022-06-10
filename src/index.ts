import express, {Request, Response} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import { ReadableStreamBYOBRequest } from 'stream/web';

const app = express();
const port = process.env.PORT ||3002;

app.use(cors()) 
app.use(bodyParser.json())
const videos = [
  {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
  {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
  {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
  {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
  {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]  

app.get("/videos", (req: Request, res : Response) => {
  res.send(videos);
});
app.get('/videos/:videoId', (req: Request, res: Response) => {
  const id = +req.params.videoId;
  const video =videos.find(v=>v.id===id)
  if(!video){
    res.sendStatus(404)

  }else{
    res.json(video)
  }
  // FIND VIDEO AND RETURN IT
  // IF VIDEO IS NOW EXISTS THEN RETURN 404 CODE
})
app.post('/videos', (req: Request, res: Response) => {
  let title= req.body.title
  if (!title || typeof title !=='string' || !title.trim() || title.length > 40){
    res.status(400).send({
      "errorsMessages": [{
          "message": "Incorrect title",
          "field": "title" }
      ],
     
    })
    return;

    }
  
  const newVideo = {
      id: +(new Date()),
      title: req.body.title,
      author: 'it-incubator.eu'
  }
  videos.push(newVideo)
  res.status(201).send(newVideo)
})
app.delete('/videos/:id',(req: Request, res: Response)=>{
  // put your code here
  const id=+req.params.id;
  const index = videos.findIndex(v=>v.id===id)
  if (index===-1){
  res.sendStatus(404)
}else{
  videos.splice(index,1)
  res.sendStatus(204)
}

 })
 app.put('/videos/:id',(req: Request, res: Response)=>{

  let title= req.body.title
  if (!title || typeof title !=='string' || !title.trim() || title.length>40){
    res.status(400).send({
      "errorsMessages": [{
          "message": "Incorrect title",
          "field": "title" }
      ],
    
    })
    return
  }
         
  // put your code here
  const id=+req.params.id;
  const video=videos.find(v=> v.id===id)

  if(!video){
    res.sendStatus(404)
  }else{

    video.title=req.body.title;
    res.status(204).send(video)

    res.json(video)
  }
})
 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
