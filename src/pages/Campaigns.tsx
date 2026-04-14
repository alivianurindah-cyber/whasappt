import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Play, Pause, BarChart2, MessageSquare, Mail, Send as SendIcon, Smartphone, FlaskConical, Edit, Trash2, Copy, Clock, Zap, Target, ArrowRight } from "lucide-react";

const campaigns = [
  { id: 1, name: "Summer Promo 2024", channel: "WhatsApp", status: "Active", sent: 1250, delivered: 1240, read: 980, type: "Broadcast", abTest: true },
  { id: 2, name: "Welcome Series", channel: "Email", status: "Running", sent: 450, delivered: 445, read: 400, type: "Automated", abTest: false },
  { id: 3, name: "Abandoned Cart Follow-up", channel: "Telegram", status: "Paused", sent: 120, delivered: 118, read: 105, type: "Automated", abTest: false },
  { id: 4, name: "Product Update v2.0", channel: "WhatsApp", status: "Completed", sent: 5000, delivered: 4900, read: 3200, type: "Broadcast", abTest: true },
  { id: 5, name: "Flash Sale Alert", channel: "SMS", status: "Scheduled", sent: 0, delivered: 0, read: 0, type: "Broadcast", abTest: false },
];

const templates = [
  { id: 1, name: "Welcome Message", category: "Onboarding", channel: "WhatsApp", status: "Approved", lastUpdated: "2 days ago" },
  { id: 2, name: "Abandoned Cart Reminder", category: "Sales", channel: "WhatsApp", status: "Approved", lastUpdated: "1 week ago" },
  { id: 3, name: "Monthly Newsletter", category: "Marketing", channel: "Email", status: "Draft", lastUpdated: "Today" },
  { id: 4, name: "Appointment Confirmation", category: "Transactional", channel: "SMS", status: "Approved", lastUpdated: "1 month ago" },
  { id: 5, name: "Flash Sale Alert", category: "Promotional", channel: "Telegram", status: "Pending", lastUpdated: "3 hours ago" },
];

const ChannelIcon = ({ channel }: { channel: string }) => {
  switch (channel) {
    case 'WhatsApp': return <MessageSquare className="h-4 w-4 text-green-500" />;
    case 'Email': return <Mail className="h-4 w-4 text-blue-500" />;
    case 'Telegram': return <SendIcon className="h-4 w-4 text-sky-500" />;
    case 'SMS': return <Smartphone className="h-4 w-4 text-purple-500" />;
    default: return <MessageSquare className="h-4 w-4" />;
  }
};

export default function Campaigns() {
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="flex flex-col gap-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">Manage broadcasts, A/B tests, and optimize send times.</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
            <DialogTrigger render={<Button variant="outline" />}>
              <Plus className="mr-2 h-4 w-4" /> New Template
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create Message Template</DialogTitle>
                <DialogDescription>
                  Design a reusable message template. WhatsApp templates require approval.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input id="template-name" placeholder="e.g., Summer Promo 2024" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Channel</Label>
                    <Select defaultValue="whatsapp">
                      <SelectTrigger>
                        <SelectValue placeholder="Select channel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="telegram">Telegram</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Category</Label>
                    <Select defaultValue="marketing">
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="utility">Utility / Transactional</SelectItem>
                        <SelectItem value="authentication">Authentication</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="template-content">Message Content</Label>
                  <Textarea 
                    id="template-content" 
                    placeholder="Hi {{1}}, here is your discount code: {{2}}" 
                    rows={5}
                  />
                  <p className="text-xs text-muted-foreground">Use {"{{1}}"}, {"{{2}}"} for variables.</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsTemplateDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsTemplateDialogOpen(false)}>Submit for Approval</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button onClick={() => setActiveTab("create")}>
            <Plus className="mr-2 h-4 w-4" /> Create Campaign
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="all">All Campaigns</TabsTrigger>
          <TabsTrigger value="create">Create Campaign</TabsTrigger>
          <TabsTrigger value="insights">Campaign Insights</TabsTrigger>
          <TabsTrigger value="abtest">A/B Testing</TabsTrigger>
          <TabsTrigger value="optimizer">Send Time Optimizer</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Campaigns</CardTitle>
              <CardDescription>Monitor your broadcasts, automated multi-channel campaigns, and A/B tests.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Sent</TableHead>
                    <TableHead className="text-right">Delivered</TableHead>
                    <TableHead className="text-right">Read</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {campaign.name}
                          {campaign.abTest && <Badge variant="outline" className="text-[10px] h-4 bg-purple-50 text-purple-700 border-purple-200"><FlaskConical className="w-3 h-3 mr-1"/> A/B</Badge>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <ChannelIcon channel={campaign.channel} />
                          <span className="text-sm">{campaign.channel}</span>
                        </div>
                      </TableCell>
                      <TableCell>{campaign.type}</TableCell>
                      <TableCell>
                        <Badge variant={
                          campaign.status === 'Active' || campaign.status === 'Running' ? 'default' :
                          campaign.status === 'Completed' ? 'secondary' : 
                          campaign.status === 'Scheduled' ? 'outline' : 'destructive'
                        }>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{campaign.sent.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{campaign.delivered.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{campaign.read.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {campaign.status === 'Draft' || campaign.status === 'Scheduled' || campaign.status === 'Paused' ? (
                            <Button variant="ghost" size="icon" title="Resume/Start"><Play className="h-4 w-4 text-green-500" /></Button>
                          ) : campaign.status === 'Running' || campaign.status === 'Active' ? (
                            <Button variant="ghost" size="icon" title="Pause Campaign"><Pause className="h-4 w-4 text-orange-500" /></Button>
                          ) : null}
                          <Button variant="ghost" size="icon" title="Analytics" onClick={() => setActiveTab("insights")}><BarChart2 className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
              <CardDescription>Reusable templates for broadcasts and automated replies.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <ChannelIcon channel={template.channel} />
                          <span className="text-sm">{template.channel}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{template.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          template.status === 'Approved' ? 'default' :
                          template.status === 'Pending' ? 'secondary' : 'outline'
                        }>
                          {template.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{template.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" title="Edit Template"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" title="Duplicate"><Copy className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" title="Delete" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Create New Campaign</CardTitle>
              <CardDescription>Set up a new broadcast or automated sequence.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input id="campaign-name" placeholder="e.g., Black Friday Blast" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Channel</Label>
                  <Select defaultValue="whatsapp">
                    <SelectTrigger>
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="telegram">Telegram</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Campaign Type</Label>
                  <Select defaultValue="broadcast">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="broadcast">One-time Broadcast</SelectItem>
                      <SelectItem value="automated">Automated Sequence</SelectItem>
                      <SelectItem value="ab_test">A/B Test</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Select Audience / Segment</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Contacts (12,450)</SelectItem>
                    <SelectItem value="active">Active Customers (3,200)</SelectItem>
                    <SelectItem value="leads">New Leads (850)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Message Template</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="t1">Summer Promo 2024</SelectItem>
                    <SelectItem value="t2">Welcome Message</SelectItem>
                    <SelectItem value="t3">Abandoned Cart Reminder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Schedule</Label>
                <Select defaultValue="now">
                  <SelectTrigger>
                    <SelectValue placeholder="When to send?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">Send Immediately</SelectItem>
                    <SelectItem value="later">Schedule for Later</SelectItem>
                    <SelectItem value="ai">Use Send Time Optimizer (AI)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setActiveTab("all")}>Cancel</Button>
                <Button onClick={() => setActiveTab("all")}>Launch Campaign</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Sent (This Month)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6,820</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Average Delivery Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">98.5%</div>
                <p className="text-xs text-muted-foreground">Industry avg: 95%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Average Read Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">74.2%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance Breakdown</CardTitle>
              <CardDescription>Detailed metrics for your recent campaigns.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
                <div className="text-center">
                  <BarChart2 className="h-10 w-10 text-muted-foreground mx-auto mb-2 opacity-50" />
                  <p className="text-muted-foreground">Chart visualization will render here.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="abtest" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-purple-500" />
                A/B Testing
              </CardTitle>
              <CardDescription>Test different messages, images, or send times to see what converts best.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="border rounded-lg p-4 space-y-4 bg-muted/10">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Variant A (Control)</h3>
                    <Badge variant="outline">50% Traffic</Badge>
                  </div>
                  <div className="space-y-2">
                    <Label>Template</Label>
                    <Select defaultValue="t1">
                      <SelectTrigger><SelectValue placeholder="Select template" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="t1">Summer Promo - Standard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="border rounded-lg p-4 space-y-4 bg-purple-50/50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-900">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg text-purple-700 dark:text-purple-400">Variant B (Test)</h3>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-100">50% Traffic</Badge>
                  </div>
                  <div className="space-y-2">
                    <Label>Template</Label>
                    <Select defaultValue="t2">
                      <SelectTrigger><SelectValue placeholder="Select template" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="t2">Summer Promo - Emoji Heavy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="grid gap-2 max-w-md">
                <Label>Winning Metric</Label>
                <Select defaultValue="read">
                  <SelectTrigger><SelectValue placeholder="Select metric" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="read">Highest Read Rate</SelectItem>
                    <SelectItem value="reply">Highest Reply Rate</SelectItem>
                    <SelectItem value="click">Highest Link Click Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button><Play className="mr-2 h-4 w-4" /> Start A/B Test</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimizer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Send Time Optimizer (AI)
              </CardTitle>
              <CardDescription>Our AI analyzes past open rates to deliver messages when each user is most likely to read them.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-yellow-50/50 dark:bg-yellow-900/10 border-yellow-100 dark:border-yellow-900">
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-yellow-600" />
                      How it works
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Instead of sending a broadcast to 10,000 people at exactly 9:00 AM, the Optimizer staggers the delivery over a 24-hour window. If John usually opens WhatsApp at 8 PM, he gets the message at 8 PM.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Optimization Window</Label>
                    <Select defaultValue="24h">
                      <SelectTrigger><SelectValue placeholder="Select window" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">Next 12 Hours</SelectItem>
                        <SelectItem value="24h">Next 24 Hours</SelectItem>
                        <SelectItem value="48h">Next 48 Hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">Enable Optimizer for Next Campaign</Button>
                </div>

                <div className="border rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-3 bg-muted/10">
                  <Clock className="h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="font-semibold">Estimated Lift: +18%</h3>
                  <p className="text-sm text-muted-foreground">
                    Based on your audience's historical data, using the Send Time Optimizer could increase your read rates by up to 18%.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
