type ProductCardProps = {
  id: number;
  name: string;
  barcode: string;
  price: number;
  quantity: number;
  supplierName?: string;
  isAvailable: boolean;
  onDelete: (id: number) => void;
};

function ProductCard({
  id,
  name,
  barcode,
  price,
  quantity,
  supplierName,
  isAvailable,
  onDelete,
}: ProductCardProps) {
  return (
    <div>
      <h2>{name}</h2>

      <p>Barcode: {barcode}</p>
      <p>Price: {price}</p>
      <p>Quantity: {quantity}</p>
      <p>Supplier: {supplierName ?? 'No supplier'}</p>
      <p>Status: {isAvailable ? 'Available' : 'Not available'}</p>

      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}

export default ProductCard;