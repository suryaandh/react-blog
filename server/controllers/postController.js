const { Post, User } = require('../models');

class PostController {

  static async getPosts(req, res) {
    try {
      const post = await Post.findAll();

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async getPostById(req, res) {
    try {
      const id = +req.params.id;

      const post = await Post.findByPk(id);

      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async createPost(req, res) {
    try {
      const { title, summary, content, author, image } = req.body;

      const post = await Post.create({
        title, summary, content, image, author
      });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getPostByUserId(req, res) {
    try {
      const id = +req.params.id;
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }

      const user = await User.findByPk(id);

      if (!user) {
        console.log(user)
        return res.status(404).json({ error: 'User not found' });
      }

      // Dapatkan semua posting yang terkait dengan pengguna
      const posts = await Post.findAll({
        where: {
          author: id,
        },
      });

      if (posts.length === 0) {
        return res.status(404).json({ error: 'No posts found for this user' });
      }

      res.status(200).json(posts);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  }

  static async updatePostStatus(req, res) {
    try {
      const id = +req.params.id;

      // Temukan postingan berdasarkan ID
      const post = await Post.findByPk(id);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      // Toggle status dari "0" ke "1" atau sebaliknya
      post.status = post.status === 0 ? 1 : 0;

      // Simpan perubahan status di dalam database
      await post.save();

      res.status(200).json({ message: 'Post status updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}


module.exports = PostController;