import {Router, Request, Response, NextFunction} from 'express';
import Post from '../models/Post'

class PostController {
  router:Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public async GetPosts(req: Request, res: Response): Promise<void> {
    try {
      const posts = await Post.find({})
      if(posts){
        res.status(200).json({data: posts})
      }
    } catch (error) {
      console.log(error)
      res.status(res.statusCode).json({error})
    }
  }

  public async GetPost(req: Request, res: Response): Promise<void> {
    try {
      const slug: String = req.params.slug
      const posts = await Post.findOne({slug})
      if(posts){
        res.status(200).json({data: posts})
      }
    } catch (error) {
      console.log(error)
      res.status(res.statusCode).json({error})
    }
  }

  public async CreatePosts(req: Request, res: Response): Promise<void> {
    try {
      const title: String = req.body.title
      const slug: String = req.body.slug
      const content: String = req.body.content
      const image: String = req.body.image

      let post = new Post({
        title,
        slug,
        content,
        image,
      })
      post = await post.save();
      if(post){
        res.status(200).json({data: post})
      }
    } catch (error) {
      console.log(error)
      res.status(res.statusCode).json({error})
    }
  }

  public async UpdatePosts(req: Request, res: Response): Promise<void> {
    try {
      const slug: String = req.params.slug
      const posts = await Post.findOneAndUpdate({slug}, req.body)
      if(posts){
        res.status(200).json({data: posts})
      }
    } catch (error) {
      console.log(error)
      res.status(res.statusCode).json({error})
    }
  }

  public async DeletePosts(req: Request, res: Response): Promise<void> {
    try {
      const slug: String = req.params.slug
      const posts = await Post.findOneAndDelete({slug})
      if(posts){
        res.status(200).json({data: posts})
      }
    } catch (error) {
      console.log(error)
      res.status(res.statusCode).json({error})
    }
  }

  /**
   * Routes
   */
  routes() {
    this.router.get('/', this.GetPosts);
    this.router.post('/', this.CreatePosts);
    this.router.get('/:slug', this.GetPost)
    this.router.patch('/:slug', this.UpdatePosts)
    this.router.delete('/:slug', this.DeletePosts)
  }
}

// export
const PostRoutes = new PostController();
PostRoutes.routes();

export default PostRoutes.router