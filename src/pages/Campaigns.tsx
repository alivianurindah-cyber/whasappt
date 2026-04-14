import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Play, Pause, BarChart2, MessageSquare, Mail, Send as SendIcon, Smartphone, FlaskConical, Edit, Trash2, Copy } from "lucide-react";

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
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns & Templates</h1>
          <p className="text-muted-foreground">Send bulk messages, run A/B tests, and manage reusable templates.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" /> New Template
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Campaign
          </Button>
        </div>
      </div>

      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
          <TabsTrigger value="templates">Message Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="campaigns" className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Sent (This Month)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6,820</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Average Delivery Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">98.5%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Average Read Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">74.2%</div>
              </CardContent>
            </Card>
          </div>

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
                          <Button variant="ghost" size="icon" title="Analytics"><BarChart2 className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
              <CardDescription>Create and manage reusable templates for broadcasts and automated replies. WhatsApp templates require Meta approval.</CardDescription>
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
      </Tabs>
    </div>
  );
}
