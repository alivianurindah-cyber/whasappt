import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Send, Paperclip, Bot, User, Mic, Image as ImageIcon, 
  FileText, LayoutTemplate, MoreVertical, Pin, CheckCircle 
} from "lucide-react";

const chats = [
  { id: 1, name: "Alice Johnson", lastMessage: "I need help with my order.", time: "10:42 AM", unread: 2, status: "open", pinned: true },
  { id: 2, name: "Bob Smith", lastMessage: "Thanks for the info!", time: "09:15 AM", unread: 0, status: "resolved", pinned: false },
  { id: 3, name: "+44 7700 900077", lastMessage: "Pricing details please.", time: "Yesterday", unread: 1, status: "open", pinned: false },
  { id: 4, name: "Diana Prince", lastMessage: "Can I upgrade my plan?", time: "Yesterday", unread: 0, status: "open", pinned: false },
];

export default function LiveChat() {
  const [activeChat, setActiveChat] = useState(chats[0]);
  const [isInternalNote, setIsInternalNote] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inbox (Live Chat)</h1>
        <p className="text-muted-foreground">Centralized multi-agent inbox for real-time chat.</p>
      </div>

      <Card className="flex flex-1 overflow-hidden">
        {/* Chat List Sidebar */}
        <div className="w-80 border-r flex flex-col bg-muted/10">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search chats..." className="pl-8 bg-background" />
            </div>
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              <Badge variant="default" className="cursor-pointer whitespace-nowrap">Open (3)</Badge>
              <Badge variant="outline" className="cursor-pointer whitespace-nowrap">Resolved</Badge>
              <Badge variant="outline" className="cursor-pointer whitespace-nowrap">Bot Handled</Badge>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chats.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => setActiveChat(chat)}
                className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors relative ${activeChat.id === chat.id ? 'bg-muted' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="font-medium truncate flex items-center gap-1">
                    {chat.pinned && <Pin className="h-3 w-3 text-muted-foreground" />}
                    {chat.name}
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">{chat.time}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground truncate pr-4">{chat.lastMessage}</div>
                  {chat.unread > 0 && (
                    <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center shrink-0">{chat.unread}</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-16 border-b flex items-center justify-between px-6 bg-background">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{activeChat.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium flex items-center gap-2">
                  {activeChat.name}
                  <Badge variant="secondary" className="text-[10px] h-4">VIP</Badge>
                </div>
                <div className="text-xs text-green-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Online • Assigned to: Sarah Agent
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Button variant="outline" size="sm"><CheckCircle className="mr-2 h-4 w-4"/> Resolve</Button>
              <Button variant="outline" size="sm"><User className="mr-2 h-4 w-4"/> Reassign</Button>
              <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4"/></Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-slate-50/50">
            <div className="flex justify-center">
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">Today</span>
            </div>
            
            <div className="flex gap-3 max-w-[80%]">
              <Avatar className="w-8 h-8 mt-auto">
                <AvatarFallback>{activeChat.name.substring(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="bg-background border rounded-2xl rounded-bl-none p-3 shadow-sm">
                <p className="text-sm">Hi, I'm having trouble with my recent order #12345.</p>
                <span className="text-[10px] text-muted-foreground mt-1 block flex items-center gap-1">
                  10:40 AM • <CheckCircle className="h-3 w-3 text-blue-500" /> Read
                </span>
              </div>
            </div>

            <div className="flex gap-3 max-w-[80%] self-end flex-row-reverse">
              <Avatar className="w-8 h-8 mt-auto bg-primary text-primary-foreground">
                <AvatarFallback><Bot className="w-4 h-4" /></AvatarFallback>
              </Avatar>
              <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-none p-3 shadow-sm">
                <p className="text-sm">Hello! I'm the virtual assistant. I can help you with order #12345. What seems to be the issue?</p>
                <span className="text-[10px] text-primary-foreground/70 mt-1 block text-right">10:40 AM • Bot</span>
              </div>
            </div>

            <div className="flex gap-3 max-w-[80%]">
              <Avatar className="w-8 h-8 mt-auto">
                <AvatarFallback>{activeChat.name.substring(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="bg-background border rounded-2xl rounded-bl-none p-3 shadow-sm">
                <p className="text-sm">It says delivered but I haven't received it. I need to speak to a human.</p>
                <span className="text-[10px] text-muted-foreground mt-1 block">10:41 AM</span>
              </div>
            </div>
            
            <div className="flex justify-center">
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md flex items-center gap-1">
                <Bot className="w-3 h-3" /> Bot assigned chat to Agent (Sarah)
              </span>
            </div>

            <div className="flex gap-3 max-w-[80%] self-end flex-row-reverse">
              <Avatar className="w-8 h-8 mt-auto bg-yellow-100 text-yellow-700">
                <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
              </Avatar>
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl rounded-br-none p-3 shadow-sm">
                <div className="text-xs font-bold text-yellow-700 mb-1">Internal Note (Sarah)</div>
                <p className="text-sm text-yellow-800">Checked logistics, package is at the local post office. Will inform customer.</p>
                <span className="text-[10px] text-yellow-600 mt-1 block text-right">10:42 AM</span>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-background flex flex-col gap-3">
            <Tabs defaultValue="reply" onValueChange={(v) => setIsInternalNote(v === 'note')}>
              <TabsList className="h-8">
                <TabsTrigger value="reply" className="text-xs">Reply to Customer</TabsTrigger>
                <TabsTrigger value="note" className="text-xs bg-yellow-50 data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-800">Internal Note</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" title="Attach File">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" title="Send Image">
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" title="Send Document">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" title="Send Interactive Button/Catalog">
                  <LayoutTemplate className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
              
              <Input 
                placeholder={isInternalNote ? "Type an internal note (customer won't see this)..." : "Type your message..."} 
                className={`flex-1 ${isInternalNote ? 'bg-yellow-50 border-yellow-200 placeholder:text-yellow-600/50' : ''}`}
              />
              
              <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" title="Voice Note">
                <Mic className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button size="icon" className={`shrink-0 ${isInternalNote ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : ''}`}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {!isInternalNote && (
              <div className="flex justify-between px-2">
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Bot className="w-3 h-3" /> AI Reply Suggestion: "I've checked with logistics..." (Press Tab)
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
