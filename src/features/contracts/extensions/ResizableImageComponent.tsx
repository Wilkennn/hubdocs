import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import { Resizable } from 're-resizable';
import { useState, useEffect } from 'react';

export const ResizableImageComponent = (props: NodeViewProps) => {
  // Pega a largura salva ou assume 100% se for nova
  const [width, setWidth] = useState<string | number>(props.node.attrs.width || '100%');

  // Sincroniza se o atributo mudar externamente
  useEffect(() => {
    setWidth(props.node.attrs.width || '100%');
  }, [props.node.attrs.width]);

  return (
    <NodeViewWrapper className="flex justify-center my-6 relative">
      <Resizable
        size={{ width, height: 'auto' }}
        lockAspectRatio={true} // IMPORTANTE: Mantém a proporção (fluidez)
        maxWidth="100%"
        minWidth="100px" // Evita que a imagem suma
        
        // Atualiza o Tiptap apenas quando soltar o mouse (Performance)
        onResizeStop={(e, direction, ref, d) => {
          const newWidth = ref.style.width;
          setWidth(newWidth);
          props.updateAttributes({ width: newWidth });
        }}
        
        // Atualiza o visual enquanto arrasta (Fluidez visual)
        onResize={(e, direction, ref, d) => {
            setWidth(ref.style.width);
        }}

        // Habilita alças (laterais e cantos para sensação natural)
        enable={{
          top: false, right: true, bottom: false, left: true,
          topRight: false, bottomRight: false, bottomLeft: false, topLeft: false,
        }}
        
        // Estilo das alças invisíveis (área de clique)
        handleStyles={{
            left: { width: '12px', left: '-6px', cursor: 'ew-resize', zIndex: 10 },
            right: { width: '12px', right: '-6px', cursor: 'ew-resize', zIndex: 10 }
        }}

        className={`relative transition-all duration-200 ${
            props.selected ? 'z-10' : ''
        }`}
      >
        {/* Container da Imagem com Borda de Seleção */}
        <div className={`relative rounded transition-all duration-200 ${
            props.selected 
                ? 'ring-2 ring-primary ring-offset-2 shadow-lg' // Visual "Selecionado"
                : 'hover:ring-2 hover:ring-gray-200 hover:ring-offset-1' // Visual "Hover" sutil
        }`}>
            <img
                src={props.node.attrs.src}
                alt={props.node.attrs.alt}
                className="block w-full h-auto rounded-sm pointer-events-none" // pointer-events-none evita bug de arrastar a tag img nativa
            />

            {/* Alças Visuais (As "bolinhas" estilo Word/Docs) - Só aparecem quando selecionado */}
            {props.selected && (
                <>
                    {/* Alça Esquerda */}
                    <div className="absolute top-1/2 -left-1.5 w-3 h-6 bg-white border border-primary rounded-sm transform -translate-y-1/2 shadow-sm" />
                    {/* Alça Direita */}
                    <div className="absolute top-1/2 -right-1.5 w-3 h-6 bg-white border border-primary rounded-sm transform -translate-y-1/2 shadow-sm" />
                </>
            )}
        </div>
      </Resizable>
    </NodeViewWrapper>
  );
};