import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import "./write.css";
import axios from "axios";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/categories");
        const updatedCategories = res.data.map((category) =>
          category._id === selectedCategory
            ? { ...category, selected: true }
            : { ...category, selected: false }
        );
        setCategories(updatedCategories);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, [selectedCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      category: selectedCategory,
    };

    if (file) {
      const formData = new FormData();
      const filename = Date.now() + file.name;
      formData.append("name", filename);
      formData.append("file", file);
      newPost.photo = filename;

      try {
        await axios.post("/upload", formData);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/categories", { name: newCategory });
      const updatedCategories = [...categories, res.data];
      setCategories(updatedCategories);
      setSelectedCategory(res.data._id); // Assign the newly created category to the selected category
      setNewCategory("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="write">
      {file && <img className="writeImg" src={URL.createObjectURL(file)} alt="" />}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="far fa-images" style={{ fontSize: "24px" }}></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell about your recipe..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <div className="writeFormGroup">
          <select
            className="writeInput"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="newCategoryForm">
            <input
              type="text"
              placeholder="New Category"
              className="newCategoryInput"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button
              className="newCategoryButton"
              onClick={handleCategorySubmit}
              disabled={!newCategory}
            >
              Add Category
            </button>
          </div>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
