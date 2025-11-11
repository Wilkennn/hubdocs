// src/hooks/useTiptapEditor.ts

import { useEditor, Editor } from '@tiptap/react';
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
import Image from '@tiptap/extension-image';
import FontFamily from '@tiptap/extension-font-family';

// --- Configuração das Extensões ---
const editorExtensions = [
  StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
  Table.configure({ resizable: true }), 
  TableRow, 
  TableHeader, 
  TableCell,
  Placeholder.configure({ placeholder: 'Comece a escrever...' }),
  CharacterCount.configure(), 
  Strike, 
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Link.configure({ openOnClick: true, autolink: true }), 
  Underline, 
  Image,
  Highlight.configure({ multicolor: true }), 
  Color, 
  TextStyle, 
  FontFamily.configure({ types: ['textStyle'] }),
];

// --- Props do Editor ---
const editorPropsConfig = {
  attributes: { 
    class: 'prose prose-sm lg:prose-base focus:outline-none max-w-none' 
  },
};

// --- Props do Hook ---
type UseTiptapEditorProps = {
  initialContent: string;
  onUpdate: () => void;
  dependency: any; // O que força a recriação (ex: ID do documento)
};

/**
 * Hook customizado para encapsular a inicialização do Tiptap.
 */
export const useTiptapEditor = ({
  initialContent,
  onUpdate,
  dependency
}: UseTiptapEditorProps): Editor | null => {
  
  const editor = useEditor({
    extensions: editorExtensions,
    editorProps: editorPropsConfig,
    content: initialContent,
    onUpdate: () => {
      onUpdate();
    },
  }, [dependency]); // Recria o editor se a dependência (document.id) mudar

  return editor;
};