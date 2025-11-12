// src/hooks/useTiptapEditor.ts

import { useEditor, Editor, type Extensions, type AnyExtension } from '@tiptap/react';
import type { EditorProps } from '@tiptap/pm/view';
import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import TextAlign from '@tiptap/extension-text-align';
import Strike from '@tiptap/extension-strike';
import Link from '@tiptap/extension-link';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import FontFamily from '@tiptap/extension-font-family';

// --- Extensões Base (Sem Imagem) ---
const baseExtensions = [
  StarterKit.configure({ 
    heading: { levels: [1, 2, 3] }, 
    bulletList: { keepMarks: true, keepAttributes: false } 
  }),
  Table.configure({ resizable: true }), 
  TableRow, 
  TableHeader, 
  TableCell,
  Placeholder.configure({ placeholder: 'Comece a escrever...' }),
  CharacterCount.configure(), 
  Strike, 
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Link.configure({ openOnClick: true, autolink: false }), 
  Underline, 
  // Image removido propositalmente (será injetado via props no ContractEditor)
  Highlight.configure({ multicolor: true }), 
  Color, 
  TextStyle, 
  FontFamily.configure({ types: ['textStyle'] }),
];

// --- Configuração Base de Classes Tailwind ---
const baseEditorProps = {
  attributes: { 
    // IMPORTANTE: Removemos as classes 'prose' aqui para não conflitar com o CSS do layout A4
    class: 'focus:outline-none' 
  },
};

// --- Props do Hook ---
type UseTiptapEditorProps = {
  initialContent: string;
  onUpdate: () => void;
  dependency: any;
  extensions?: Extensions; 
  editorProps?: EditorProps;
};

/**
 * Hook customizado para encapsular a inicialização do Tiptap.
 */
export const useTiptapEditor = ({
  initialContent,
  onUpdate,
  dependency,
  extensions = [],
  editorProps = {},
}: UseTiptapEditorProps): Editor | null => {
  
  const editor = useEditor({
    // Combina as extensões base com as novas e filtra undefined para corrigir o erro de tipagem
    extensions: [
      ...baseExtensions,
      ...extensions
    ].filter((ext): ext is AnyExtension => !!ext),
    
    // Combina os props base com os novos (ex: handleDrop)
    editorProps: {
      ...baseEditorProps,
      ...editorProps,
      attributes: {
        ...baseEditorProps.attributes,
        // @ts-ignore - Permite merge de classes extras se vierem no editorProps
        ...editorProps.attributes, 
      }
    },
    
    content: initialContent,
    
    onUpdate: () => {
      onUpdate();
    },
  }, [dependency]); // Recria o editor se a dependência mudar

  return editor;
};