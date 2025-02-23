import Blog from "../models/Blog.js";

// ✅ Tüm Blogları Getir
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası", details: err.message });
  }
};

// ✅ Tek Bir Blogu Getir
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Makale bulunamadı" });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası", details: err.message });
  }
};

// ✅ Yeni Blog Ekle
export const createBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ error: "Blog eklenirken hata oluştu", details: err.message });
  }
};

// ✅ Blog Güncelle
export const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) return res.status(404).json({ error: "Makale bulunamadı" });
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: "Güncelleme sırasında hata oluştu", details: err.message });
  }
};

// ✅ Blog Sil
export const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ error: "Makale bulunamadı" });
    res.status(200).json({ message: "Makale başarıyla silindi" });
  } catch (err) {
    res.status(500).json({ error: "Silme sırasında hata oluştu", details: err.message });
  }
};

// ✅ Bloga Yorum Ekle
export const addComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Makale bulunamadı" });

    blog.comments.push(req.body);
    await blog.save();

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: "Yorum eklenirken hata oluştu", details: err.message });
  }
};
