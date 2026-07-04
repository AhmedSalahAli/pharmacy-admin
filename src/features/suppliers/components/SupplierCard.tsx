type SupplierCardProps = {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  isAvailable: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

function SupplierCard({
  id,
  name,
  phone,
  email,
  address,
  isAvailable,
  onEdit,
  onDelete,
}: SupplierCardProps) {
  return (
    <article className="supplier-card">
      <div className="supplier-card-header">
        <h3 className="supplier-card-title">{name}</h3>

        <span
          className={
            isAvailable
              ? 'supplier-status supplier-status-available'
              : 'supplier-status supplier-status-unavailable'
          }
        >
          {isAvailable ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className="supplier-card-details">
        <p>Phone: {phone ?? 'No phone'}</p>
        <p>Email: {email ?? 'No email'}</p>
        <p>Address: {address ?? 'No address'}</p>
      </div>

      <div className="supplier-card-actions">
        <button
          className="suppliers-button suppliers-button-secondary"
          onClick={() => onEdit(id)}
        >
          Edit
        </button>

        <button
          className="suppliers-button suppliers-button-danger"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default SupplierCard;