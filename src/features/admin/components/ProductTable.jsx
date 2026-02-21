import { formatCurrency } from "../../../utils/formatCurrency";

export default function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <p className="rounded-lg bg-slate-100 p-5 text-slate-600">No products available.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-600">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Rating</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t border-slate-200">
              <td className="px-4 py-3 font-medium text-slate-900">{product.title}</td>
              <td className="px-4 py-3 capitalize text-slate-600">{product.category}</td>
              <td className="px-4 py-3 text-slate-700">{formatCurrency(product.price)}</td>
              <td className="px-4 py-3 text-slate-700">{product.stock}</td>
              <td className="px-4 py-3 text-slate-700">{product.rating.toFixed(1)}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(product)}
                    className="rounded-md border border-slate-300 px-3 py-1 text-xs"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(product.id)}
                    className="rounded-md border border-red-200 bg-red-50 px-3 py-1 text-xs text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
