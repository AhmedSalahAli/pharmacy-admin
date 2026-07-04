import { useQuery } from '@tanstack/react-query';

import { getSuppliers } from '../api/suppliersApi';

import '../suppliers.css';

function SuppliersPage() {
  const {
    data: suppliers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['suppliers'],
    queryFn: getSuppliers,
  });

  return (
    <div className="suppliers-page">
      <div className="suppliers-page-header">
        <div>
          <h1 className="suppliers-page-title">Suppliers</h1>
          <p className="suppliers-page-subtitle">
            View pharmacy suppliers used in product management.
          </p>
        </div>
      </div>

      <section className="suppliers-section">
        <h2 className="suppliers-section-title">Suppliers List</h2>

        {isLoading ? (
          <p>Loading suppliers...</p>
        ) : isError ? (
          <p className="suppliers-message-error">
            Failed to load suppliers
          </p>
        ) : suppliers.length === 0 ? (
          <p>No suppliers found</p>
        ) : (
          <div className="suppliers-list">
            {suppliers.map((supplier) => (
              <article key={supplier.id} className="supplier-card">
                <h3 className="supplier-card-title">{supplier.name}</h3>

                <div className="supplier-card-details">
                  <p>ID: {supplier.id}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default SuppliersPage;