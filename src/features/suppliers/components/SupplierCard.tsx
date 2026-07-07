import Button from '../../../components/Button';
import StatusBadge from '../../../components/StatusBadge';

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

        <StatusBadge isActive={isAvailable} />
      </div>

      <div className="supplier-card-details">
        <p>Phone: {phone ?? 'No phone'}</p>
        <p>Email: {email ?? 'No email'}</p>
        <p>Address: {address ?? 'No address'}</p>
      </div>

      <div className="supplier-card-actions">
        <Button
          variant="secondary"
          onClick={() => onEdit(id)}
        >
          Edit
        </Button>

        <Button
          variant="danger"
          onClick={() => onDelete(id)}
        >
          Delete
        </Button>
      </div>
    </article>
  );
}

export default SupplierCard;