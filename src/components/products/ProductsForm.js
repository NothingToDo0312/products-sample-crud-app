import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";

export default function ProductForm({
  formData,
  setFormData,
  onClick,
  onClose,
}) {
  const fields = [
    {
      label: "Product Name",
      name: "product_name",
      type: "text",
      placeholder: "Enter product name",
      required: true,
    },
    {
      label: "Description",
      name: "description",
      type: "text",
      placeholder: "Enter description",
      required: true,
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "Enter price",
      required: true,
      step: "0.01",
      min: "0",
    },
    {
      label: "Category",
      name: "category",
      type: "text",
      placeholder: "Enter category",
      required: true,
    },
    {
      label: "Image URL",
      name: "img_url",
      type: "url",
      placeholder: "Enter image URL",
      required: false,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.product_name || !formData.description || !formData.price || !formData.category) {
      alert("Please fill in all required fields");
      return;
    }
    
    if (parseFloat(formData.price) <= 0) {
      alert("Price must be greater than 0");
      return;
    }
    
    onClick();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(({ label, name, type, placeholder, required, step, min }) => (
        <div key={name} className="form-group">
          <label className="form-label">
            {label}
            {required && <span style={{ color: '#ef4444' }}> *</span>}
          </label>
          <input
            className="form-input"
            name={name}
            type={type}
            placeholder={placeholder}
            value={formData[name] || ""}
            onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
            required={required}
            step={step}
            min={min}
          />
        </div>
      ))}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
