
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface ApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
}

export const ApiKeyDialog = ({ open, onOpenChange, onSave }: ApiKeyDialogProps) => {
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    if (apiKey.trim() === '') {
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key.",
        variant: "destructive",
      });
      return;
    }
    localStorage.setItem('gemini_api_key', apiKey);
    toast({
      title: "API Key Saved!",
      description: "Your Gemini API key has been saved locally in your browser.",
    });
    onSave();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Gemini API Key</DialogTitle>
          <DialogDescription>
            To generate a personalized roadmap, please provide your Google Gemini API key. 
            Your key will be stored securely in your browser's local storage. You can get a free key from Google AI Studio.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="api-key" className="text-right">
              API Key
            </Label>
            <Input
              id="api-key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="col-span-3"
              placeholder="Enter your Gemini API Key"
              type="password"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Key & Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
