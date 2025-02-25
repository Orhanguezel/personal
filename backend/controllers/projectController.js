import Project from "../models/Project.js";

// 📌 **Yeni proje ekle**
export const addProject = async (req, res) => {
  try {
    const { title, description, link, image, technologies, features } = req.body;
    
    if (!title || !description || !link) {
      return res.status(400).json({ message: "Lütfen tüm alanları doldurun." });
    }

    const newProject = await Project.create({
      title,
      description,
      link,
      image,
      technologies,
      features
    });

    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Proje eklerken hata oluştu." });
  }
};

// 📌 **Projeyi güncelle**
export const updateProject = async (req, res) => {
  try {
    const { title, description, link, image, technologies, features } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Proje bulunamadı." });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.link = link || project.link;
    project.image = image || project.image;
    project.technologies = technologies || project.technologies;
    project.features = features || project.features;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: "Projeyi güncellerken hata oluştu." });
  }
};

// 📌 **Projeyi sil**
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Proje bulunamadı." });
    }

    await project.deleteOne();
    res.json({ message: "Proje başarıyla silindi." });
  } catch (error) {
    res.status(500).json({ message: "Projeyi silerken hata oluştu." });
  }
};

// 📌 **Seçilen dile göre projeleri getir**

export const getProjectsByLanguage = async (req, res) => {
  try {
    const { lang } = req.params;
    const projects = await Project.find();

    const translatedProjects = projects.map(project => ({
      id: project._id,
      title: project.title[lang] || project.title["en"], // 🌍 Dile göre başlık
      description: project.description[lang] || project.description["en"],
      link: project.link,
      image: project.image,
      technologies: project.technologies,
      features: project.features[lang] || project.features["en"]
    }));

    res.json(translatedProjects);
  } catch (error) {
    console.error("❌ Hata: Projeleri getirirken sorun oluştu", error);
    res.status(500).json({ message: "Projeleri getirirken hata oluştu." });
  }
};

// 📌 **Tüm projeleri getir**
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Projeleri getirirken hata oluştu." });
  }
};

// 📌 **Tek proje getir (dile duyarlı)**
export const getProjectById = async (req, res) => {
  try {
    const { id, lang } = req.params;
    const project = await Project.findById(id);
    
    if (!project) {
      return res.status(404).json({ message: "Proje bulunamadı." });
    }

    // 📌 **Dile göre içeriği seçiyoruz**
    const translatedProject = {
      id: project._id,
      title: project.title[lang] || project.title["en"],
      description: project.description[lang] || project.description["en"],
      link: project.link,
      image: project.image,
      technologies: project.technologies,
      features: project.features[lang] || project.features["en"],
    };

    res.json(translatedProject);
  } catch (error) {
    console.error("❌ Proje detayını çekerken hata:", error);
    res.status(500).json({ message: "Projeyi getirirken hata oluştu." });
  }
};
