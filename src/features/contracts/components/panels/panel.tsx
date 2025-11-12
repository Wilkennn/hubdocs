// // src/features/editor/components/panels/VariablesPanel.tsx

// import React, { useState } from 'react';
// import type { Editor } from '@tiptap/react';
// import { Plus, X, ArrowRight, Variable } from 'lucide-react';
// import { Input, Button } from '../../../../components/ui';
// import type { Variables } from '../../../../types';
// import { normalizeVariableName, formatVariableLabel } from '../../../../utils/helpers';

// interface VariablesPanelProps {
//   editor: Editor;
//   variables: Variables;
//   setVariables: React.Dispatch<React.SetStateAction<Variables>>;
//   onUnsavedChange: () => void;
// }

// export const VariablesPanel: React.FC<VariablesPanelProps> = ({
//   editor,
//   variables,
//   setVariables,
//   onUnsavedChange,
// }) => {
//   const [newVarName, setNewVarName] = useState('');

//   const handleAddVariable = () => {
//     const key = normalizeVariableName(newVarName);
//     if (!key) {
//       alert('Digite um nome para a variável.');
//       return;
//     }
//     if (variables.hasOwnProperty(key)) {
//       alert('Esta variável já existe.');
//       return;
//     }
//     setVariables((prev) => ({ ...prev, [key]: '' }));
//     setNewVarName('');
//     onUnsavedChange();
//   };

//   const handleVariableChange = (key: string, value: string) => {
//     setVariables((prev) => ({ ...prev, [key]: value }));
//     onUnsavedChange();
//   };

//   const handleDeleteVariable = (key: string) => {
//     if (window.confirm(`Remover a variável "{{${key}}}"?`)) {
//       setVariables((prev) => {
//         const newVars = { ...prev };
//         delete newVars[key];
//         return newVars;
//       });
//       onUnsavedChange();
//     }
//   };

//   const insertVariable = (key: string) => {
//     editor.chain().focus().insertContent(`{{${key}}}`).run();
//   };

//   const entries = Object.entries(variables);

//   return (
//     <div className="p-4 space-y-6">
//       {/* Add New Variable */}
//       <div>
//         <h3 className="text-sm font-semibold text-gray-900 mb-3">
//           Adicionar Variável
//         </h3>
//         <div className="flex gap-2">
//           <Input
//             type="text"
//             placeholder="ex: nome_empresa"
//             value={newVarName}
//             onChange={(e) => setNewVarName(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleAddVariable()}
//           />
//           <Button onClick={handleAddVariable} size="sm">
//             <Plus className="w-4 h-4" />
//           </Button>
//         </div>
//         <p className="text-xs text-gray-500 mt-1.5">
//           Espaços serão convertidos em underscore (_)
//         </p>
//       </div>

//       {/* Variables List */}
//       <div>
//         <h3 className="text-sm font-semibold text-gray-900 mb-3">
//           Variáveis do Documento
//         </h3>

//         {entries.length === 0 ? (
//           <div className="text-center py-8">
//             <Variable className="w-8 h-8 text-gray-300 mx-auto mb-2" />
//             <p className="text-sm text-gray-500">Nenhuma variável criada</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {entries.map(([key, value]) => (
//               <div key={key} className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       {formatVariableLabel(key)}
//                     </label>
//                     <code className="text-xs text-gray-500 font-mono">
//                       {`{{${key}}}`}
//                     </code>
//                   </div>
//                   <button
//                     onClick={() => handleDeleteVariable(key)}
//                     className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
//                     title="Remover variável"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>

//                 <Input
//                   type="text"
//                   value={value}
//                   onChange={(e) => handleVariableChange(key, e.target.value)}
//                   placeholder="Valor da variável"
//                 />

//                 <button
//                   onClick={() => insertVariable(key)}
//                   className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
//                 >
//                   <ArrowRight className="w-3 h-3" />
//                   Inserir no documento
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // ============================================
// // ClausesPanel.tsx
// // ============================================

// import { FileText, CheckCircle, PlusCircle } from 'lucide-react';
// import type { Clause, DocumentData } from '../../../../types';

// interface ClausesPanelProps {
//   availableClauses: Clause[];
//   attachedClauses: DocumentData[];
//   onAttachTerm: (clause: Clause) => void;
// }

// export const ClausesPanel: React.FC<ClausesPanelProps> = ({
//   availableClauses,
//   attachedClauses,
//   onAttachTerm,
// }) => {
//   return (
//     <div className="p-4 space-y-6">
//       {/* Attached Clauses */}
//       <div>
//         <h3 className="text-sm font-semibold text-gray-900 mb-3">
//           Termos Anexados
//         </h3>

//         {attachedClauses.length === 0 ? (
//           <div className="text-center py-8">
//             <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
//             <p className="text-sm text-gray-500">Nenhum termo anexado</p>
//           </div>
//         ) : (
//           <div className="space-y-2">
//             {attachedClauses.map((doc) => (
//               <div
//                 key={doc.id}
//                 className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg"
//               >
//                 <FileText className="w-4 h-4 text-green-600 flex-shrink-0" />
//                 <span className="text-sm text-gray-900 flex-1">{doc.name}</span>
//                 <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Available Clauses */}
//       <div>
//         <h3 className="text-sm font-semibold text-gray-900 mb-3">
//           Termos Disponíveis
//         </h3>

//         {availableClauses.length === 0 ? (
//           <div className="text-center py-8">
//             <Library className="w-8 h-8 text-gray-300 mx-auto mb-2" />
//             <p className="text-sm text-gray-500">
//               Nenhum termo disponível
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-2">
//             {availableClauses.map((clause) => (
//               <button
//                 key={clause.id}
//                 onClick={() => onAttachTerm(clause)}
//                 className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
//               >
//                 <PlusCircle className="w-4 h-4 text-primary flex-shrink-0" />
//                 <span className="text-sm text-gray-900">{clause.title}</span>
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // ============================================
// // HistoryPanel.tsx
// // ============================================

// import { Clock as ClockIcon } from 'lucide-react';
// import type { Version } from '../../../../types';
// import { formatDateTime } from '../../../../utils/helpers';

// interface HistoryPanelProps {
//   documentName: string;
//   versions: Version[];
// }

// export const HistoryPanel: React.FC<HistoryPanelProps> = ({
//   documentName,
//   versions,
// }) => {
//   return (
//     <div className="p-4">
//       <div className="mb-3">
//         <h3 className="text-sm font-semibold text-gray-900">
//           Histórico - {documentName}
//         </h3>
//       </div>

//       {versions.length === 0 ? (
//         <div className="text-center py-8">
//           <History className="w-8 h-8 text-gray-300 mx-auto mb-2" />
//           <p className="text-sm text-gray-500">Nenhuma versão salva</p>
//         </div>
//       ) : (
//         <div className="space-y-2">
//           {versions.map((version, index) => (
//             <div
//               key={version.versionId}
//               className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               <div className="flex items-center justify-between mb-1">
//                 <span className="text-sm font-medium text-gray-900">
//                   Versão {versions.length - index}
//                   {index === 0 && (
//                     <span className="ml-2 text-xs text-green-600 font-normal">
//                       (Mais recente)
//                     </span>
//                   )}
//                 </span>
//               </div>
//               <div className="flex items-center gap-1 text-xs text-gray-500">
//                 <ClockIcon className="w-3 h-3" />
//                 {formatDateTime(version.timestamp)}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };