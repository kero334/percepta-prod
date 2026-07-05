"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";

export function RichTextEditor({ content, onChange }: { content: any; onChange: (json: any) => void }) {
  const [linkSearchOpen, setLinkSearchOpen] = useState(false);
  const [linkSearchQuery, setLinkSearchQuery] = useState("");
  const [linkSearchResults, setLinkSearchResults] = useState<any[]>([]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline cursor-pointer",
        },
      }),
    ],
    content: content || {},
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none focus:outline-none min-h-[300px] p-4 text-white",
      },
    },
  });

  const supabase = createClient();

  useEffect(() => {
    if (!linkSearchOpen) return;
    
    const search = async () => {
      if (!linkSearchQuery.trim()) {
         const { data } = await supabase.from('resources').select('id, title, slug').limit(5);
         setLinkSearchResults(data || []);
         return;
      }
      const { data } = await supabase
        .from('resources')
        .select('id, title, slug')
        .ilike('title', `%${linkSearchQuery}%`)
        .limit(5);
      setLinkSearchResults(data || []);
    };
    search();
  }, [linkSearchQuery, linkSearchOpen, supabase]);

  if (!editor) return null;

  const insertInternalLink = (slug: string) => {
    editor.chain().focus().extendMarkRange("link").setLink({ href: `/${slug}` }).run();
    setLinkSearchOpen(false);
    setLinkSearchQuery("");
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b border-border/40 p-2 bg-[#121214]">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"}
        >
          <Icons.Bold className="w-4 h-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"}
        >
          <Icons.Italic className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-border/40 mx-1" />
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"}
        >
          <Icons.Heading2 className="w-4 h-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"}
        >
          <Icons.List className="w-4 h-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"}
        >
          <Icons.Quote className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-border/40 mx-1" />
        
        {/* Internal Link Picker Trigger */}
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => setLinkSearchOpen(!linkSearchOpen)}
          className={editor.isActive("link") ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-white"}
        >
          <Icons.Link className="w-4 h-4 mr-2" />
          Internal Link
        </Button>
      </div>

      {/* Internal Link Picker Modal/Popover */}
      {linkSearchOpen && (
        <div className="absolute top-14 left-4 z-50 w-80 bg-[#18181b] border border-border/40 rounded-xl shadow-2xl p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-white">Search Resources</span>
            <button onClick={() => setLinkSearchOpen(false)} className="text-muted-foreground hover:text-white">
              <Icons.X className="w-4 h-4" />
            </button>
          </div>
          <Input 
            autoFocus
            placeholder="Type to search..." 
            value={linkSearchQuery}
            onChange={(e) => setLinkSearchQuery(e.target.value)}
            className="mb-3 bg-[#09090b] border-border/40 text-white text-sm h-8"
          />
          <div className="max-h-48 overflow-y-auto space-y-1">
            {linkSearchResults.map((res) => (
              <button
                key={res.id}
                type="button"
                onClick={() => insertInternalLink(res.slug)}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-primary/10 text-sm transition-colors"
              >
                <div className="font-medium text-white truncate">{res.title}</div>
                <div className="text-xs text-muted-foreground truncate">/{res.slug}</div>
              </button>
            ))}
            {linkSearchResults.length === 0 && (
              <div className="text-center text-xs text-muted-foreground py-4">No results found</div>
            )}
          </div>
        </div>
      )}

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto cursor-text" onClick={() => editor.commands.focus()}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
