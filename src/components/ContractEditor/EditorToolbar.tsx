// src/components/ContractEditor/EditorToolbar.tsx
import React, { useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { ToolbarButton } from './ToolbarButton';
import { 
  Bold, Italic, List, ListOrdered, Undo, Redo, 
  Table2, Strikethrough, AlignLeft, AlignCenter, 
  AlignRight, Quote, Code, Link2, Link2Off, 
  Underline as UnderlineIcon, Highlighter, ImageIcon, 
  Minus, Palette
} from 'lucide-react';

type EditorToolbarProps = {
  editor: Editor;
};

export const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor }) => {
  // Funções de lógica do Tiptap movidas para cá
  const setLink = useCallback(() => {
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run(); return;
    }
    const url = window.prompt('URL', editor.getAttributes('link').href);
    if (url === null) return;
    if (url === '') { editor.chain().focus().unsetLink().run(); return; }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt('URL da Imagem');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const handleTextTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const v = event.target.value;
    if (v === 'paragraph') editor.chain().focus().setParagraph().run();
    else if (v === 'heading-1') editor.chain().focus().toggleHeading({ level: 1 }).run();
    else if (v === 'heading-2') editor.chain().focus().toggleHeading({ level: 2 }).run();
    else if (v === 'heading-3') editor.chain().focus().toggleHeading({ level: 3 }).run();
  };
  
  const getCurrentTextType = () => {
    if (editor.isActive('heading', { level: 1 })) return 'heading-1';
    if (editor.isActive('heading', { level: 2 })) return 'heading-2';
    if (editor.isActive('heading', { level: 3 })) return 'heading-3';
    return 'paragraph';
  };
  
  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const v = event.target.value;
    if (v === 'default') editor.chain().focus().unsetFontFamily().run();
    else editor.chain().focus().setFontFamily(v).run();
  };

  const getCurrentFont = () => editor.getAttributes('textStyle').fontFamily || 'default';

  return (
    <div className="h-12 px-4 flex items-center gap-1 border-y border-gray-200 overflow-x-auto sticky top-[65px] z-30 bg-white">
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Desfazer"><Undo className="w-4 h-4" /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Refazer"><Redo className="w-4 h-4" /></ToolbarButton>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <select value={getCurrentFont()} onChange={handleFontChange} className="text-sm text-gray-700 border border-gray-300 rounded-md px-2 py-1.5 h-9 focus:outline-none focus:ring-2 focus:ring-primary"><option value="default">Padrão</option><option value="Arial">Arial</option><option value="Times New Roman">Times New Roman</option><option value="Verdana">Verdana</option></select>
      <select value={getCurrentTextType()} onChange={handleTextTypeChange} className="text-sm text-gray-700 border border-gray-300 rounded-md px-2 py-1.5 h-9 focus:outline-none focus:ring-2 focus:ring-primary ml-1"><option value="paragraph">Parágrafo</option><option value="heading-1">Título 1</option><option value="heading-2">Título 2</option><option value="heading-3">Título 3</option></select>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Negrito"><Bold className="w-4 h-4" /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Itálico"><Italic className="w-4 h-4" /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Sublinhado"><UnderlineIcon className="w-4 h-4" /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Riscado"><Strikethrough className="w-4 h-4" /></ToolbarButton>
      <div className="relative p-2 rounded hover:bg-gray-100 flex items-center gap-1 cursor-pointer" title="Cor do Texto"><Palette className="w-4 h-4 text-gray-700" /><div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: editor.getAttributes('textStyle').color || '#000000' }}/> <input type="color" onInput={(e) => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()} value={editor.getAttributes('textStyle').color || '#000000'} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/></div>
      <div className="relative p-2 rounded hover:bg-gray-100 flex items-center gap-1 cursor-pointer" title="Cor do Destaque"><Highlighter className="w-4 h-4 text-gray-700" /><div className="w-4 h-4 rounded-sm border border-gray-300" style={{ backgroundColor: editor.getAttributes('highlight').color || 'transparent' }}/> <input type="color" onInput={(e) => editor.chain().focus().setHighlight({ color: (e.target as HTMLInputElement).value }).run()} value={editor.getAttributes('highlight').color || '#ffffff'} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/></div>
      <ToolbarButton onClick={setLink} active={editor.isActive('link')} title={editor.isActive('link') ? "Remover link" : "Adicionar link"}>{editor.isActive('link') ? <Link2Off className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}</ToolbarButton>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Lista"><List className="w-4 h-4" /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Lista Numerada"><ListOrdered className="w-4 h-4" /></ToolbarButton>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Alinhar à Esquerda"><AlignLeft className="w-4 h-4" /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Alinhar ao Centro"><AlignCenter className="w-4 h-4" /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Alinhar à Direita"><AlignRight className="w-4 h-4" /></ToolbarButton>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Citação"><Quote className="w-4 h-4" /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Bloco de Código"><Code className="w-4 h-4" /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()} title="Inserir Tabela"><Table2 className="w-4 h-4" /></ToolbarButton>
      <ToolbarButton onClick={addImage} title="Inserir Imagem (URL)"><ImageIcon className="w-4 h-4" /></ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Inserir Quebra de Página"><Minus className="w-4 h-4" /></ToolbarButton>
    </div>
  );
};