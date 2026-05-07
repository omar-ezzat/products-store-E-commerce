import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";

const initialFormState = {
  title: "",
  price: "",
  category: "",
  image: "",
  description: "",
};

function ProductForm({ selectedProduct, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        title: selectedProduct.title || "",
        price: selectedProduct.price || "",
        category: selectedProduct.category || "",
        image: selectedProduct.image || "",
        description: selectedProduct.description || "",
      });
    } else {
      setFormData(initialFormState);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      price: Number(formData.price),
    });
  };

  const inputStyle = {
    input: { color: "white" },
    textarea: { color: "white" },
    "& .MuiInputLabel-root": { color: "#aaa" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#333" },
      "&:hover fieldset": { borderColor: "#777" },
    },
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        fullWidth
        required
        name="title"
        label="Product Title"
        value={formData.title}
        onChange={handleChange}
        margin="normal"
        sx={inputStyle}
      />

      <TextField
        fullWidth
        required
        name="price"
        label="Price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        margin="normal"
        sx={inputStyle}
      />

      <TextField
        fullWidth
        required
        name="category"
        label="Category"
        value={formData.category}
        onChange={handleChange}
        margin="normal"
        sx={inputStyle}
      />

      <TextField
        fullWidth
        required
        name="image"
        label="Image URL"
        value={formData.image}
        onChange={handleChange}
        margin="normal"
        sx={inputStyle}
      />

      <TextField
        fullWidth
        required
        multiline
        rows={4}
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        margin="normal"
        sx={inputStyle}
      />

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading
            ? "Saving..."
            : selectedProduct
            ? "Update Product"
            : "Add Product"}
        </Button>

        {selectedProduct && (
          <Button variant="outlined" color="inherit" onClick={onCancel}>
            Cancel Edit
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default ProductForm;
