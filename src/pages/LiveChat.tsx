import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Send, Paperclip, Bot, User, Mic, Image as ImageIcon, 
  FileText, LayoutTemplate, MoreVertical, Pin, CheckCircle, Settings,
  MessageSquare, Shield, Clock, Users, Globe, Palette, Save
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const chats = [
  { id: 1, name: "Alice Johnson", lastMessage: "I need help with my order.", time: "10:42 AM", unread: 2, status: "open", pinned: true },
  { id: 2, name: "Bob Smith", lastMessage: "Thanks for the info!", time: "09:15 AM", unread: 0, status: "resolved", pinned: false },
  { id: 3, name: "+44 7700 900077", lastMessage: "Pricing details please.", time: "Yesterday", unread: 1, status: "open", pinned: false },
  { id: 4, name: "Diana Prince", lastMessage: "Can I upgrade my plan?", time: "Yesterday", unread: 0, status: "open", pinned: false },
];

const initialMessages = [
  { id: 1, sender: "customer", text: "Hi, I'm having trouble with my recent order #12345.", time: "10:40 AM", read: true },
  { id: 2, sender: "bot", text: "Hello! I'm the virtual assistant. I can help you with order #12345. What seems to be the issue?", time: "10:40 AM" },
  { id: 3, sender: "customer", text: "It says delivered but I haven't received it. I need to speak to a human.", time: "10:41 AM" },
  { id: 4, sender: "system", text: "Bot assigned chat to Agent (Sarah)", time: "10:41 AM" },
  { id: 5, sender: "note", text: "Checked logistics, package is at the local post office. Will inform customer.", time: "10:42 AM", author: "Sarah" },
];

export default function LiveChat() {
  const [activeTab, setActiveTab] = useState("inbox");
  const [activeChat, setActiveChat] = useState(chats[0]);
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");

  // Chat Setup State
  const [chatSettings, setChatSettings] = useState({
    autoReply: true,
    aiAssistant: true,
    workingHours: "9:00 AM - 6:00 PM",
    welcomeMessage: "Hello! How can we help you today?",
    offlineMessage: "We are currently offline. Please leave a message.",
    themeColor: "#6366f1",
    language: "English",
    assignTo: "Round Robin"
  });

  const handleSaveSettings = () => {
    // Mock save
    alert("Chat settings saved successfully!");
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: isInternalNote ? "note" : "agent",
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      author: "Sarah",
      read: false
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inbox (Live Chat)</h1>
          <p className="text-muted-foreground">Centralized multi-agent inbox for real-time chat.</p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inbox" className="gap-2">
              <MessageSquare className="h-4 w-4" /> Inbox
            </TabsTrigger>
            <TabsTrigger value="setup" className="gap-2">
              <Settings className="h-4 w-4" /> Chat Setup
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {activeTab === "inbox" ? (
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
              
              {messages.map((msg) => {
                if (msg.sender === 'system') {
                  return (
                    <div key={msg.id} className="flex justify-center">
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md flex items-center gap-1">
                        <Bot className="w-3 h-3" /> {msg.text}
                      </span>
                    </div>
                  );
                }

                if (msg.sender === 'note') {
                  return (
                    <div key={msg.id} className="flex gap-3 max-w-[80%] self-end flex-row-reverse">
                      <Avatar className="w-8 h-8 mt-auto bg-yellow-100 text-yellow-700">
                        <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                      </Avatar>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl rounded-br-none p-3 shadow-sm">
                        <div className="text-xs font-bold text-yellow-700 mb-1">Internal Note ({msg.author})</div>
                        <p className="text-sm text-yellow-800">{msg.text}</p>
                        <span className="text-[10px] text-yellow-600 mt-1 block text-right">{msg.time}</span>
                      </div>
                    </div>
                  );
                }

                const isAgent = msg.sender === 'agent' || msg.sender === 'bot';
                
                return (
                  <div key={msg.id} className={`flex gap-3 max-w-[80%] ${isAgent ? 'self-end flex-row-reverse' : ''}`}>
                    <Avatar className={`w-8 h-8 mt-auto ${msg.sender === 'bot' ? 'bg-primary text-primary-foreground' : ''}`}>
                      <AvatarFallback>
                        {msg.sender === 'bot' ? <Bot className="w-4 h-4" /> : 
                         msg.sender === 'agent' ? <User className="w-4 h-4" /> : 
                         activeChat.name.substring(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`${isAgent ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-background border rounded-bl-none'} rounded-2xl p-3 shadow-sm`}>
                      <p className="text-sm">{msg.text}</p>
                      <span className={`text-[10px] mt-1 block flex items-center gap-1 ${isAgent ? 'text-primary-foreground/70 justify-end' : 'text-muted-foreground'}`}>
                        {msg.time} {msg.sender === 'bot' && '• Bot'} {msg.read && <CheckCircle className="h-3 w-3 text-blue-500" />}
                      </span>
                    </div>
                  </div>
                );
              })}
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
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isInternalNote ? "Type an internal note (customer won't see this)..." : "Type your message..."} 
                  className={`flex-1 ${isInternalNote ? 'bg-yellow-50 border-yellow-200 placeholder:text-yellow-600/50' : ''}`}
                />
                
                <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8" title="Voice Note">
                  <Mic className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button 
                  onClick={handleSendMessage}
                  size="icon" 
                  className={`shrink-0 ${isInternalNote ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : ''}`}
                >
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto pb-8">
          <Card className="md:col-span-2 p-6 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" /> General Configuration
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={chatSettings.language} onValueChange={(v) => setChatSettings({...chatSettings, language: v})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="Indonesian">Indonesian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Theme Color</Label>
                  <div className="flex gap-2">
                    <Input type="color" className="w-12 p-1 h-10" value={chatSettings.themeColor} onChange={(e) => setChatSettings({...chatSettings, themeColor: e.target.value})} />
                    <Input value={chatSettings.themeColor} onChange={(e) => setChatSettings({...chatSettings, themeColor: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Bot className="h-5 w-5 text-purple-500" /> Automation & AI
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div className="space-y-0.5">
                    <Label className="text-base">AI Assistant Support</Label>
                    <p className="text-sm text-muted-foreground">Allow AI to suggest replies and handle basic queries.</p>
                  </div>
                  <Switch checked={chatSettings.aiAssistant} onCheckedChange={(v) => setChatSettings({...chatSettings, aiAssistant: v})} />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-Reply (Offline)</Label>
                    <p className="text-sm text-muted-foreground">Send an automatic message when agents are unavailable.</p>
                  </div>
                  <Switch checked={chatSettings.autoReply} onCheckedChange={(v) => setChatSettings({...chatSettings, autoReply: v})} />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-500" /> Messaging
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Welcome Message</Label>
                  <Textarea value={chatSettings.welcomeMessage} onChange={(e) => setChatSettings({...chatSettings, welcomeMessage: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Offline Message</Label>
                  <Textarea value={chatSettings.offlineMessage} onChange={(e) => setChatSettings({...chatSettings, offlineMessage: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t flex justify-end">
              <Button onClick={handleSaveSettings} className="gap-2">
                <Save className="h-4 w-4" /> Save Setup
              </Button>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" /> Business Hours
              </h3>
              <div className="space-y-2">
                <Label>Working Hours</Label>
                <Input value={chatSettings.workingHours} onChange={(e) => setChatSettings({...chatSettings, workingHours: e.target.value})} />
              </div>
              <p className="text-xs text-muted-foreground">Chat will automatically switch to "Offline" mode outside these hours.</p>
            </Card>

            <Card className="p-6 space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <Users className="h-4 w-4 text-green-500" /> Assignment Logic
              </h3>
              <div className="space-y-2">
                <Label>Routing Strategy</Label>
                <Select value={chatSettings.assignTo} onValueChange={(v) => setChatSettings({...chatSettings, assignTo: v})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Round Robin">Round Robin</SelectItem>
                    <SelectItem value="Manual">Manual Only</SelectItem>
                    <SelectItem value="Least Busy">Least Busy Agent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="font-bold flex items-center gap-2 text-primary">
                <Shield className="h-4 w-4" /> Security
              </h3>
              <p className="text-xs text-muted-foreground mt-2">All chats are end-to-end encrypted. You can enable IP whitelisting in advanced settings.</p>
              <Button variant="link" className="p-0 h-auto text-xs text-primary mt-2">Advanced Security Settings</Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
