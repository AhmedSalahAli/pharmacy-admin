type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  onDelete: (id: number) => void;
};

function ProductCard({
  id,
  name,
  price,
  quantity,
  onDelete,
}: ProductCardProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Price: {price}</p>
      <p>Quantity: {quantity}</p>

      <button onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
}

export default ProductCard;