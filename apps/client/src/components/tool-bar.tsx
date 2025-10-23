import { type Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  List,
  ListOrdered,
  StrikethroughIcon,
  Code,
  Youtube as YoutubeIcon,
} from "lucide-react";
import { isValidYouTubeUrl } from "@/lib/utils";


type ToolBarProps = {
  editor: Editor | null;
};

function ToolBar({ editor }: ToolBarProps) {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isYoutubePopoverOpen, setIsYoutubePopoverOpen] = useState(false);

  if (!editor) {
    return null;
  }

  const isUrlValid = isValidYouTubeUrl(youtubeUrl);
  const showValidation = youtubeUrl.trim().length > 0;

  const addYoutubeVideo = () => {
    if (youtubeUrl.trim() && isUrlValid) {
      editor.commands.setYoutubeVideo({
        src: youtubeUrl,
      });

      setYoutubeUrl("");
      setIsYoutubePopoverOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addYoutubeVideo();
    }
  };

  return (
    <div className="flex flex-wrap gap-3 border border-input bg-background rounded-lg p-1 my-2">
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 1 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 3 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <Heading3 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("heading", { level: 4 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 4 }).run()
        }
      >
        <Heading4 className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <StrikethroughIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("codeBlock")}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Code className="h-4 w-4" />
      </Toggle>
      <Popover open={isYoutubePopoverOpen} onOpenChange={setIsYoutubePopoverOpen}>
        <PopoverTrigger asChild>
          <Toggle
            size="sm"
            pressed={editor.isActive("youtube")}
          >
            <YoutubeIcon className="h-4 w-4" />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent className="w-80 border-foreground/25">
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Add YouTube Video</h4>
            <div className="space-y-2">
              <Input
                placeholder="Enter YouTube URL..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                onKeyDown={handleKeyPress}
                autoFocus
                className={showValidation && !isUrlValid ? "border-destructive" : ""}
              />
              {showValidation && !isUrlValid && (
                <p className="text-sm text-destructive">
                  Please enter a valid YouTube URL
                </p>
              )}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={addYoutubeVideo}
                  disabled={!youtubeUrl.trim() || !isUrlValid}
                >
                  Add Video
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsYoutubePopoverOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ToolBar;
