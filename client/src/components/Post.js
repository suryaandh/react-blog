import React from 'react'

const Post = () => {
  return (
    <div className="post">
      <div className="image">
        <img src="https://techcrunch.com/wp-content/uploads/2023/03/GettyImages-1462188043-e1686340799615.jpg?w=1390&crop=1" alt='adad' />
      </div>
      <div className="texts">
        <h2>ChatGPT: Everything you need to know about the AI-powered chatbot</h2>
        <p className="info">
          <a href='/' className="author">Joh Doe</a>
          <time>2023-10-18 19.06</time>
        </p>
        <p className="summary">ChatGPT, OpenAI’s text-generating AI chatbot, has taken the world by storm. It’s able to write essays, code and more given short text prompts, hyper-charging productivity. But it also has a more…nefarious side.</p>
      </div>
    </div>
  )
}

export default Post