import type { TabBarProps } from "@/types";
import { FileText, Paperclip } from "lucide-react"; // Sugestão: Paperclip faz mais sentido para 'Anexo' que Grip

export const EditorTabBar: React.FC<TabBarProps> = ({ documents, activeTabId, onSelectTab }) => {
  return (
    <nav className="flex items-center gap-6 px-6 border-b border-gray-100 bg-white overflow-x-auto no-scrollbar">
      {documents.map((doc) => {
        const isActive = activeTabId === doc.id;
        
        return (
          <button
            key={doc.id}
            onClick={() => onSelectTab(doc.id)}
            className={`
              group flex items-center gap-2 py-3 text-sm font-medium border-b-2 transition-all ease-in-out duration-200
              ${isActive 
                ? 'border-primary text-gray-900' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200'
              }
            `}
          >
            {/* Ícone com opacidade variável para não poluir visualmente */}
            <span className={`transition-opacity duration-200 ${isActive ? 'opacity-100 text-primary' : 'opacity-70 group-hover:opacity-100'}`}>
              {!doc.isAnnex ? (
                <FileText className="w-4 h-4" />
              ) : (
                // Troquei GripVertical por Paperclip, fica mais semântico para "Anexo"
                <Paperclip className="w-4 h-4" />
              )}
            </span>
            
            {doc.name}
          </button>
        );
      })}
    </nav>
  );
};