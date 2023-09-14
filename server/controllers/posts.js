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

      res.json(newPost);
   } catch (error) {
      res.json({ message: 'Щось пішло не так.' });
   }
}