import {Router, Request, Response, NextFunction} from 'express';
import User from '../models/User'

class UserController {
  router:Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public async GetUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find({})
      if(users){
        res.status(200).json({data: users})
      }
    } catch (error) {
      console.log(error)
      res.status(res.statusCode).json({error})
    }
  }

  public async GetUser(req: Request, res: Response): Promise<void> {
    try {
      const slug: String = req.params.slug
      const users = await User.findOne({username: slug})
      if(users){
        res.status(200).json({data: users})
      }
    } catch (error) {
      console.log(error)
      res.status(res.statusCode).json({error})
    }
  }

  public async CreateUsers(req: Request, res: Response): Promise<void> {
    try {
      const name: String = req.body.name
      const username: String = req.body.username
      const email: String = req.body.email
      const password: String = req.body.password
      const posts: String[] = req.body.posts;

      console.log(req.body)
      let user = new User({
        name,
        username,
        email,
        password,
        posts
      })
      user = await user.save();
      if(user){
        res.status(200).json({data: user})
      }
    } catch (error) {
      console.log(error)
      res.status(res.statusCode).json({error})
    }
  }

  public async UpdateUser(req: Request, res: Response): Promise<void> {
    try {
      const slug: String = req.params.slug
      const users = await User.findOneAndUpdate({username: slug}, req.body)
      if(users){
        res.status(200).json({data: users})
      }
    } catch (error) {
      console.log(error)
      res.status(res.statusCode).json({error})
    }
  }

  public async DeleteUser(req: Request, res: Response): Promise<void> {
    try {
      const slug: String = req.params.slug
      const users = await User.findOneAndDelete({username: slug})
      if(users){
        res.status(200).json({data: users})
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
    this.router.get('/', this.GetUsers);
    this.router.post('/', this.CreateUsers);
    this.router.get('/:slug', this.GetUser)
    this.router.patch('/:slug', this.UpdateUser)
    this.router.delete('/:slug', this.DeleteUser)
  }
}

// export
const UserRoutes = new UserController();
UserRoutes.routes();

export default UserRoutes.router