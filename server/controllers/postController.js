const { Post } = require('../models');

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
}

module.exports = PostController;