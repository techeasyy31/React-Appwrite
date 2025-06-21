import { useEffect, useState } from "react";
import { account, databases, storage, ID_ } from "../appwrite/config";

const DATABASE_ID = 'your_database_id';
const COLLECTION_ID = 'posts';
const BUCKET_ID = 'your_bucket_id';

export default function Home() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      setPosts(res.documents);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleUpload = async () => {
    if (!image || !caption) return;
    try {
      const uploaded = await storage.createFile(BUCKET_ID, ID_.unique(), image);
      const imageId = uploaded.$id;

      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID_.unique(), {
        caption,
        imageId,
      });

      setCaption("");
      setImage(null);
      fetchPosts();
    } catch (err) {
      alert(err.message);
    }
  };

  const getImageUrl = (id) => storage.getFilePreview(BUCKET_ID, id).href;

  return (
    <div>
      <h2>Home - Post Your Image</h2>
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <input placeholder="Caption" value={caption} onChange={e => setCaption(e.target.value)} />
      <button onClick={handleUpload}>Post</button>

      <div>
        {posts.map((post) => (
          <div key={post.$id}>
            <img src={getImageUrl(post.imageId)} width="300" alt="uploaded" />
            <p>{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
