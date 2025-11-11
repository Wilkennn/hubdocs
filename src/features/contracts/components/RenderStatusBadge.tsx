import { CheckCircle, Edit3 } from "lucide-react";

export const RenderStatusBadge = (status: 'active' | 'draft' | 'expired') => {
  switch (status) {
    case 'active':
      return (
        <div className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
          <CheckCircle className="w-3.5 h-3.5" />
          Ativo
        </div>
      );
    case 'draft':
      return (
        <div className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
          <Edit3 className="w-3.5 h-3.5" />
          Rascunho
        </div>
      );
    case 'expired':
      return (
        <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
          {/* (Ícone opcional para expirado) */}
          Expirado
        </div>
      );
    default:
      return null;
  }
};
