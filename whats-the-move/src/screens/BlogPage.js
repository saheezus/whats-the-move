import React, { useState, useEffect } from "react";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  let isFetched = false;

  useEffect(() => {
    if (isFetched) return; // Exit early if already fetched
    isFetched = true;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://us-central1-hackutd24-whatsthemove.cloudfunctions.net/api/blogs"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // Debugging log

        // Set posts only if data is an array
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setMedia(files.slice(0, 5)); // Limit to 5 files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const mediaUrls = [];

      if (media.length > 0) {
        for (const file of media) {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch(
            "https://us-central1-hackutd24-whatsthemove.cloudfunctions.net/api/upload",
            {
              method: 'POST',
              body: formData,
            }
          );

          if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
          }

          const data = await response.json();
          mediaUrls.push(`https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`);
        }
      }

      const blogPost = {
        title,
        content,
        media: mediaUrls,
      };

      const blogResponse = await fetch(
        "https://us-central1-hackutd24-whatsthemove.cloudfunctions.net/api/upload",
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blogPost),
        }
      );

      if (!blogResponse.ok) {
        throw new Error(`Blog upload failed: ${blogResponse.statusText}`);
      }

      const blogData = await blogResponse.json();

      // Add the new post to the beginning of the list
      setPosts((prevPosts) => [{
        id: blogData.cid,
        title,
        content,
        media: mediaUrls,
        createdAt: new Date().toISOString(),
      }, ...prevPosts]);

      // Clear form fields
      setTitle("");
      setContent("");
      setMedia([]);
    } catch (error) {
      console.error("Error uploading blog post:", error);
      setError("Failed to upload blog post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full lg:w-3/5 p-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Blog Page</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Upload Form */}
        <div className="mb-8 p-6 border border-gray-300 rounded-lg bg-white shadow-lg">
          <h2 className="text-xl font-bold mb-4">Add a New Post</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 mb-4 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Content"
              className="w-full p-2 mb-4 border rounded"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
            <div className="mb-4">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              <p className="text-sm text-gray-500 mt-1">
                Maximum 5 files allowed
              </p>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center`}
            >
              {submitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </div>
              ) : (
                'Upload Post'
              )}
            </button>
          </form>
        </div>

        {/* Blog Posts */}
        {posts && posts.length > 0 ? (
  <div className="grid gap-6">
    {posts.map((post) => (
      <article key={post.id} className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
        <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
        {post.media && post.media.length > 0 && (
          <div className="grid gap-4 mb-4">
            {post.media.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Media ${index + 1} for ${post.title}`}
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = "/api/placeholder/400/320";
                  e.target.alt = "Failed to load image";
                }}
              />
            ))}
          </div>
        )}
        <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
        {post.createdAt && (
          <p className="text-sm text-gray-500 mt-4">
            Posted on: {new Date(post.createdAt).toLocaleDateString()}
          </p>
        )}
      </article>
    ))}
  </div>
) : (
  <div className="text-center text-gray-500 p-6">
    No blog posts yet. Be the first to create one!
  </div>
)}

      </div>
    </div>
  );
};

export default BlogPage;