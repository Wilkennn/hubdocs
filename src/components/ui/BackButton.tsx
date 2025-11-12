import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  label?: string;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ label, className = '' }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      type="button"
      title="Voltar para página anterior"
      className={`
        group flex items-center gap-2 p-2 text-gray-500 
        transition-all duration-200 rounded-lg
        hover:text-gray-900 hover:bg-gray-100 
        active:bg-gray-200
        ${className}
      `}
    >
      <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
      
      {label && (
        <span className="text-sm font-medium">{label}</span>
      )}
    </button>
  );
};