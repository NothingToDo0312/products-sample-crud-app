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
    },
    {
      label: "Description",
      name: "description",
      type: "text",
      placeholder: "Enter description",
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "Enter price",
    },
    {
      label: "Category",
      name: "category",
      type: "text",
      placeholder: "Enter category",
    },
    {
      label: "Image URL",
      name: "img_url",
      type: "text",
      placeholder: "Enter image URL",
    },
  ];

  return (
    <div className="space-y-4">
      {fields.map(({ label, name, type, placeholder }) => (
        <CustomInput
          key={name}
          label={label}
          name={name}
          type={type}
          placeholder={placeholder}
          value={formData[name]}
          onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        />
      ))}

      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <CustomButton onClick={onClick} label="Save" />
        <CustomButton type="secondary" onClick={onClose} label="Cancel" />
      </div>
    </div>
  );
}
