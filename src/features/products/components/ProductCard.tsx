type ProductCardProps = {
  id: number;
  name: string;
  barcode: string;
  price: number;
  quantity: number;
  supplierName?: string;
  isAvailable: boolean;
  onEdit: (id: number) => void;
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
  onEdit,
  onDelete,
}: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card-header">
        <h3 className="product-card-title">{name}</h3>

        <span
          className={
            isAvailable
              ? 'product-status product-status-available'
              : 'product-status product-status-unavailable'
          }
        >
          {isAvailable ? 'Available' : 'Not available'}
        </span>
      </div>

      <div className="product-card-details">
        <p>Barcode: {barcode}</p>
        <p>Price: {price} EGP</p>
        <p>Quantity: {quantity}</p>
        <p>Supplier: {supplierName ?? 'No supplier'}</p>
      </div>

      <div className="product-card-actions">
        <button
          className="products-button products-button-secondary"
          onClick={() => onEdit(id)}
        >
          Edit
        </button>

        <button
          className="products-button products-button-danger"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default ProductCard;