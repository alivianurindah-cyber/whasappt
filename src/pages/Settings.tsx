import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { QrCode, Globe, Palette, CheckCircle2, Flame, Clock, Activity, Bot, Database, Upload, PhoneCall, Loader2, Check } from "lucide-react";

export default function Settings() {
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [isSaving, setIsSaving] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Admin User (You)", email: "admin@whatssaas.com", role: "Owner SaaS" },
    { id: 2, name: "Sarah Agent", email: "sarah@whatssaas.com", role: "Agent / Support" }
  ]);

  const handleGenerateQR = () => {
    setIsGeneratingQR(true);
    setTimeout(() => {
      setIsGeneratingQR(false);
      setQrGenerated(true);
    }, 2000);
  };

  const handleSave = (section: string) => {
    setIsSaving(section);
    setTimeout(() => {
      setIsSaving(null);
      setSuccessMessage(`${section} settings saved successfully!`);
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 1500);
  };

  const inviteMember = () => {
    const name = prompt("Enter member name:");
    const email = prompt("Enter member email:");
    if (name && email) {
      setTeamMembers([...teamMembers, { id: Date.now(), name, email, role: "Agent / Support" }]);
    }
  };

  const removeMember = (id: number) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your connections, AI, billing, and white-label options.</p>
        </div>
        {successMessage && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <Check className="h-4 w-4" />
            {successMessage}
          </div>
        )}
      </div>

      <Tabs defaultValue="connections" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="warmup">Warm-up</TabsTrigger>
          <TabsTrigger value="ai">AI & Bot</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="whitelabel">White-label</TabsTrigger>
        </TabsList>
        
        <TabsContent value="connections" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-primary shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Official API (Meta Cloud)</CardTitle>
                    <CardDescription>Stable & no ban risk. Recommended for scaling.</CardDescription>
                  </div>
                  <Badge>Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
                  <div className="bg-blue-600 text-white p-2 rounded-md shrink-0">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-blue-900">Embed WhatsApp Login</h4>
                    <p className="text-xs text-blue-700 mt-1">Allow users to connect WhatsApp Business officially in 1 click via Facebook Embedded Signup.</p>
                    <Button size="sm" className="mt-3 bg-blue-600 hover:bg-blue-700 text-white">Connect with Facebook</Button>
                  </div>
                </div>

                <div className="space-y-4 pt-2 border-t">
                  <h4 className="font-medium text-sm">Manual Configuration</h4>
                  <div className="space-y-1">
                    <Label htmlFor="phoneId">Phone Number ID</Label>
                    <Input id="phoneId" defaultValue="102345678901234" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="accountId">WhatsApp Business Account ID</Label>
                    <Input id="accountId" defaultValue="109876543210987" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="token">Permanent Access Token</Label>
                    <Input id="token" type="password" defaultValue="EAAGm0PX4ZCpsBA..." />
                  </div>
                  <Button variant="outline" className="w-full">Save Manual Config</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Unofficial (QR / Web)</CardTitle>
                <CardDescription>Connect normal WhatsApp using QR scan. Cheap but carries ban risk.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8 space-y-6">
                <div className="p-4 border-2 border-dashed rounded-xl bg-muted/50 relative flex items-center justify-center min-h-[160px] w-full max-w-[200px]">
                  {isGeneratingQR ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Generating QR...</span>
                    </div>
                  ) : qrGenerated ? (
                    <div className="flex flex-col items-center gap-4">
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=whatsapp-web-login-simulation" alt="QR Code" className="w-32 h-32" />
                      <Button variant="outline" size="sm" onClick={() => setQrGenerated(false)}>Reset</Button>
                    </div>
                  ) : (
                    <>
                      <QrCode className="w-32 h-32 text-muted-foreground opacity-50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button variant="secondary" className="shadow-md" onClick={handleGenerateQR}>Generate QR</Button>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="space-y-2 text-center max-w-[280px]">
                  <p className="text-sm font-medium">How it works</p>
                  <p className="text-xs text-muted-foreground">
                    Scan QR from WhatsApp Web → Session created → Browser automation connects you.
                  </p>
                </div>

                <div className="w-full space-y-2 pt-4 border-t">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant="outline" className="text-orange-500 border-orange-200 bg-orange-50">Disconnected</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Auto-Reconnect</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="warmup" className="mt-6">
          <Card className="border-orange-200 shadow-sm">
            <CardHeader className="bg-orange-50/50 border-b border-orange-100 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <Flame className="h-5 w-5 text-orange-500" />
                    Number Warm-up System
                  </CardTitle>
                  <CardDescription className="mt-1.5">
                    Simulate organic conversations between your connected numbers to build trust with WhatsApp and reduce ban risks.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 bg-background px-3 py-1.5 rounded-lg border shadow-sm">
                  <Label htmlFor="warmup-toggle" className="font-medium cursor-pointer">Enable Warm-up</Label>
                  <Switch id="warmup-toggle" defaultChecked />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Activity className="h-4 w-4" /> Warm-up Intensity</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select intensity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (10-50 msgs/day) - Safest</SelectItem>
                        <SelectItem value="medium">Medium (50-200 msgs/day) - Recommended</SelectItem>
                        <SelectItem value="high">High (200-500 msgs/day) - Aggressive</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">Higher intensity warms up the number faster but carries slightly more risk if the number is brand new.</p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Label className="flex items-center gap-2"><Clock className="h-4 w-4" /> Active Schedule</Label>
                    <div className="flex items-center gap-2">
                      <Input type="time" defaultValue="09:00" className="w-[120px]" />
                      <span className="text-muted-foreground">to</span>
                      <Input type="time" defaultValue="20:00" className="w-[120px]" />
                    </div>
                    <p className="text-xs text-muted-foreground">Conversations will only happen during these hours to simulate human behavior.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Daily Message Limit Variance</Label>
                    <div className="pt-4 pb-2">
                      <Slider defaultValue={[75]} max={100} step={1} />
                    </div>
                    <p className="text-xs text-muted-foreground">Randomize daily volume by up to 75% to avoid predictable bot-like patterns.</p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Label>Peer Numbers</Label>
                    <Textarea 
                      rows={3} 
                      defaultValue="+1234567890&#10;+0987654321" 
                      placeholder="Enter phone numbers (one per line)"
                    />
                    <p className="text-xs text-muted-foreground">Your number will chat with these trusted numbers. Leave blank to use our global warm-up pool.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end">
                <Button 
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                  onClick={() => handleSave("Warm-up")}
                  disabled={isSaving === "Warm-up"}
                >
                  {isSaving === "Warm-up" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-primary shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  AI Chatbot Engine
                </CardTitle>
                <CardDescription>Configure your AI models for auto-replies, intent detection, and lead qualification.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Primary AI Model</Label>
                  <Select defaultValue="openai">
                    <SelectTrigger>
                      <SelectValue placeholder="Select AI Model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI (GPT-4o) - Best for natural chat</SelectItem>
                      <SelectItem value="gemini">Google Gemini 1.5 - Best for long context/knowledge</SelectItem>
                      <SelectItem value="deepseek">DeepSeek V3 - Best for high-volume/low-cost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input id="apiKey" type="password" defaultValue="sk-proj-..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="systemPrompt">Global System Prompt</Label>
                  <Textarea 
                    id="systemPrompt" 
                    rows={4} 
                    defaultValue="You are a helpful customer support assistant. Be polite, concise, and always try to resolve the user's issue. If you cannot resolve it, offer to transfer them to a human agent." 
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                  <div>
                    <Label className="font-medium">Human Fallback</Label>
                    <p className="text-xs text-muted-foreground">Transfer to agent if AI cannot answer</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-blue-500" />
                    Knowledge Base Training
                  </CardTitle>
                  <CardDescription>Train the AI on your specific business data.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Upload PDF, DOCX, or TXT</p>
                    <p className="text-xs text-muted-foreground mb-4">Max file size: 50MB</p>
                    <Button variant="outline" size="sm">Select Files</Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Website Scraping</Label>
                    <div className="flex gap-2">
                      <Input placeholder="https://yourwebsite.com" />
                      <Button variant="secondary">Sync</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader className="bg-purple-50/50 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-purple-700">
                        <PhoneCall className="h-5 w-5 text-purple-500" />
                        AI WhatsApp Calling
                      </CardTitle>
                      <CardDescription className="mt-1">Automate voice calls via WhatsApp using AI.</CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">Premium</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="space-y-2">
                    <Label>AI Voice Persona</Label>
                    <Select defaultValue="sarah">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Voice" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarah">Sarah (Friendly Female)</SelectItem>
                        <SelectItem value="james">James (Professional Male)</SelectItem>
                        <SelectItem value="custom">Custom Voice Clone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Configure Call Flows</Button>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={() => handleSave("AI")}
              disabled={isSaving === "AI"}
            >
              {isSaving === "AI" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Save All AI Settings
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Invite agents to manage live chats and CRM.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={member.role.includes("Owner") ? "default" : "outline"}>{member.role}</Badge>
                      {!member.role.includes("Owner") && (
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => removeMember(member.id)}>Remove</Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={inviteMember}>Invite Member</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>For beginners</CardDescription>
                <div className="text-3xl font-bold mt-4">RM49<span className="text-sm font-normal text-muted-foreground">/month</span></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> 1,000 Message Credits</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Unofficial QR Connection</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Basic Chatbot</li>
                </ul>
                <Button variant="outline" className="w-full" onClick={() => handleSave("Plan Downgrade")}>Downgrade</Button>
              </CardContent>
            </Card>
            
            <Card className="border-primary relative shadow-md">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">CURRENT</div>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>For growing businesses</CardDescription>
                <div className="text-3xl font-bold mt-4">RM149<span className="text-sm font-normal text-muted-foreground">/month</span></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> 10,000 Message Credits</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Official Meta API</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> AI Flow Builder</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> 5 Team Agents</li>
                </ul>
                <Button className="w-full" onClick={() => handleSave("Subscription Management")}>Manage Subscription</Button>
              </CardContent>
            </Card>
 
            <Card>
              <CardHeader>
                <CardTitle>Agency</CardTitle>
                <CardDescription>For marketing agencies</CardDescription>
                <div className="text-3xl font-bold mt-4">RM499<span className="text-sm font-normal text-muted-foreground">/month</span></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Unlimited Messages (API Cost)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Omni-channel Support</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> White-label Dashboard</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Unlimited Agents</li>
                </ul>
                <Button variant="outline" className="w-full" onClick={() => handleSave("Plan Upgrade")}>Upgrade</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="whitelabel" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>White-label SaaS Settings</CardTitle>
              <CardDescription>Customize the platform branding for your clients (Agency Plan Required).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Platform Name</Label>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <Input defaultValue="MyCustomSaaS" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Custom Domain</Label>
                  <Input defaultValue="app.mycustomsaas.com" />
                </div>
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded border bg-primary" />
                    <Input defaultValue="#2563eb" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Logo URL</Label>
                  <Input defaultValue="https://mycustomsaas.com/logo.png" />
                </div>
              </div>
              <div className="pt-4 border-t flex justify-end">
                <Button 
                  onClick={() => handleSave("White-label")}
                  disabled={isSaving === "White-label"}
                >
                  {isSaving === "White-label" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Save White-label Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
