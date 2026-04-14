import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Database, Webhook, Code, FileSpreadsheet, BookOpen, CheckCircle2, XCircle, Loader2, Copy, Key } from "lucide-react";

export default function Integrations() {
  const [isApiKeysOpen, setIsApiKeysOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  
  const [testKey, setTestKey] = useState("");
  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle");

  const handleTestConnection = () => {
    if (!testKey) return;
    setTestStatus("testing");
    setTimeout(() => {
      // Simulate validation (e.g., key must be > 10 chars to be "valid")
      if (testKey.length > 10) {
        setTestStatus("success");
      } else {
        setTestStatus("error");
      }
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API & Integrations</h1>
          <p className="text-muted-foreground">Connect your WhatsApp SaaS with external tools and CRMs.</p>
        </div>
        
        <Dialog open={isTutorialOpen} onOpenChange={setIsTutorialOpen}>
          <DialogTrigger render={<Button variant="outline" className="gap-2" />}>
            <BookOpen className="h-4 w-4" />
            API Tutorial
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>How to Integrate the API</DialogTitle>
              <DialogDescription>
                Follow these steps to connect your application to our REST API.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">1</span>
                  Generate an API Key
                </h3>
                <p className="text-sm text-muted-foreground">
                  Go to the <strong>REST API</strong> card on this page and click <strong>Manage API Keys</strong>. Generate a new key and copy it. Keep it secret!
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">2</span>
                  Authentication
                </h3>
                <p className="text-sm text-muted-foreground">
                  All API requests must include your API key in the <code>Authorization</code> header as a Bearer token.
                </p>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                    <code>Authorization: Bearer YOUR_API_KEY</code>
                  </pre>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">3</span>
                  Send a Message (Example)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Make a POST request to our messages endpoint to send a WhatsApp message.
                </p>
                <Tabs defaultValue="curl" className="w-full mt-2">
                  <TabsList>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                    <TabsTrigger value="node">Node.js</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                  </TabsList>
                  <TabsContent value="curl" className="relative">
                    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`curl -X POST https://api.yoursaas.com/v1/messages \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+1234567890",
    "type": "text",
    "text": { "body": "Hello from API!" }
  }'`}
                    </pre>
                    <Button size="icon" variant="ghost" className="absolute top-2 right-2 h-6 w-6" onClick={() => copyToClipboard(`curl -X POST https://api.yoursaas.com/v1/messages \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "to": "+1234567890",\n    "type": "text",\n    "text": { "body": "Hello from API!" }\n  }'`)}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </TabsContent>
                  <TabsContent value="node" className="relative">
                    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`const axios = require('axios');

axios.post('https://api.yoursaas.com/v1/messages', {
  to: '+1234567890',
  type: 'text',
  text: { body: 'Hello from API!' }
}, {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
}).then(response => console.log(response.data));`}
                    </pre>
                  </TabsContent>
                  <TabsContent value="python" className="relative">
                    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
{`import requests

url = "https://api.yoursaas.com/v1/messages"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "to": "+1234567890",
    "type": "text",
    "text": { "body": "Hello from API!" }
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`}
                    </pre>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">4</span>
                  Test Your Connection
                </h3>
                <p className="text-sm text-muted-foreground">
                  Use the <strong>Manage API Keys</strong> dialog to test if your API key is working correctly before deploying your code.
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={() => setIsTutorialOpen(false)}>Got it</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              REST API
            </CardTitle>
            <CardDescription>Send messages programmatically.</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className="mb-4">Active</Badge>
            <Dialog open={isApiKeysOpen} onOpenChange={setIsApiKeysOpen}>
              <DialogTrigger render={<Button variant="outline" className="w-full" />}>Manage API Keys</DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>REST API Configuration</DialogTitle>
                  <DialogDescription>
                    Manage your API keys and test your connection to the server.
                  </DialogDescription>
                </DialogHeader>
                
                <Tabs defaultValue="keys" className="w-full mt-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="keys">API Keys</TabsTrigger>
                    <TabsTrigger value="test">Test Connection</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="keys" className="space-y-4 py-4">
                    <div className="border rounded-lg p-4 flex justify-between items-center bg-muted/30">
                      <div className="flex items-center gap-3">
                        <Key className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium text-sm">Production Key</h4>
                          <p className="text-xs text-muted-foreground font-mono mt-1">sk_live_••••••••••••8a9f</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard("sk_live_example1234567890")}>Copy</Button>
                    </div>
                    <Button className="w-full">Generate New Key</Button>
                  </TabsContent>
                  
                  <TabsContent value="test" className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="api-key">Enter API Key to Test</Label>
                      <Input 
                        id="api-key" 
                        placeholder="sk_live_..." 
                        value={testKey}
                        onChange={(e) => {
                          setTestKey(e.target.value);
                          setTestStatus("idle");
                        }}
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter a key longer than 10 characters to simulate a successful connection.
                      </p>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={handleTestConnection}
                      disabled={!testKey || testStatus === "testing"}
                    >
                      {testStatus === "testing" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Test API Connection
                    </Button>

                    {testStatus === "success" && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-md flex items-start gap-3 mt-4">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h5 className="text-sm font-medium text-green-800">Connection Successful!</h5>
                          <p className="text-xs text-green-700 mt-1">Your API key is valid and the server is responding correctly. You are ready to integrate.</p>
                        </div>
                      </div>
                    )}

                    {testStatus === "error" && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-3 mt-4">
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                          <h5 className="text-sm font-medium text-red-800">Connection Failed</h5>
                          <p className="text-xs text-red-700 mt-1">Invalid API key. Please check your key and try again. (Hint: use &gt;10 chars)</p>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsApiKeysOpen(false)}>Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Webhook className="h-5 w-5 text-purple-500" />
              Webhooks
            </CardTitle>
            <CardDescription>Receive real-time event triggers.</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className="mb-4">Configured</Badge>
            <Button variant="outline" className="w-full">View Endpoints</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-green-600" />
              Shopify
            </CardTitle>
            <CardDescription>Sync orders and abandoned carts.</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="mb-4">Not Connected</Badge>
            <Button className="w-full">Connect</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-purple-600" />
              WooCommerce
            </CardTitle>
            <CardDescription>E-commerce order notifications.</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="mb-4">Not Connected</Badge>
            <Button className="w-full">Connect</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-orange-500" />
              Zapier
            </CardTitle>
            <CardDescription>Connect with 5000+ apps.</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="mb-4">Not Connected</Badge>
            <Button className="w-full">Connect</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5 text-green-500" />
              Google Sheets
            </CardTitle>
            <CardDescription>Export contacts and logs.</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="mb-4">Not Connected</Badge>
            <Button className="w-full">Connect</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
