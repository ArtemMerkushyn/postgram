import Post from '../models/Post.js';
import User from '../models/User.js';

// create post

export const createPost = async (req, res) => {
   try {
      const { title, text, imgUrl } = req.body;
      const user = await User.findById(req.userId); //так як в кожному запросі вшитий userId

      const newPost = new Post({
         username: user.username,
         title,
         text,
         imgUrl,
         author: req.userId,
      });

      await newPost.save();
      await User.findByIdAndUpdate(req.userId, {
         $push: { posts: newPost },
      });

      return res.json(newPost);
   } catch (error) {
      res.json({ message: `Щось пішло не так. ${error}` });
   }
}

// get all posts
export const getAll = async (req, res) => {
   try {
      const posts = await Post.find().sort('-createdAt');
      const popularPosts = await Post.find().sort('-views');
      if(!posts) {
         return res.json({ message: 'Постів немає.' });
      }
      res.json({ posts, popularPosts });
   } catch (error) {
      res.json({ message: 'Щось пішло не так.' });
   }
}