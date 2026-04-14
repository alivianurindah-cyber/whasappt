import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Globe, Settings, Users, Download, Play, Pause, AlertCircle } from "lucide-react";

export default function LeadGeneration() {
  const [isScraping, setIsScraping] = useState(false);
  const [isWebsiteScraping, setIsWebsiteScraping] = useState(false);
  const [leads, setLeads] = useState([
    { id: 1, name: "Apex Plumbing Services", phone: "+1 212-555-0198", source: "Google Maps", rating: "4.8 ⭐", website: "apexplumbing.com", status: "New" },
    { id: 2, name: "City Wide Repairs", phone: "+1 212-555-0233", source: "Google Maps", rating: "4.2 ⭐", website: "citywiderepairs.net", status: "New" },
    { id: 3, name: "TechFlow Solutions", phone: "+44 20 7123 4567", source: "Website", rating: "N/A", website: "techflow.io", status: "Contacted" },
  ]);
  const [mapsQuery, setMapsQuery] = useState({ keyword: "", location: "" });
  const [scraperUrl, setScraperUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const simulateMapsScraping = () => {
    if (isScraping) {
      setIsScraping(false);
      setProgress(0);
      return;
    }

    if (!mapsQuery.keyword || !mapsQuery.location) {
      alert("Please enter both keyword and location.");
      return;
    }

    setIsScraping(true);
    setProgress(0);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setIsScraping(false);
        
        // Add new mock leads
        const newLeads = [
          { 
            id: Date.now(), 
            name: `${mapsQuery.keyword} ${mapsQuery.location} Pro`, 
            phone: `+1 ${Math.floor(Math.random() * 900 + 100)}-555-${Math.floor(Math.random() * 9000 + 1000)}`, 
            source: "Google Maps", 
            rating: `${(Math.random() * 2 + 3).toFixed(1)} ⭐`, 
            website: `${mapsQuery.keyword.toLowerCase().replace(/\s/g, '')}-biz.com`,
            status: "New"
          },
          { 
            id: Date.now() + 1, 
            name: `Elite ${mapsQuery.keyword} ${mapsQuery.location}`, 
            phone: `+1 ${Math.floor(Math.random() * 900 + 100)}-555-${Math.floor(Math.random() * 9000 + 1000)}`, 
            source: "Google Maps", 
            rating: `${(Math.random() * 2 + 3).toFixed(1)} ⭐`, 
            website: `elite-${mapsQuery.keyword.toLowerCase().replace(/\s/g, '')}.net`,
            status: "New"
          }
        ];
        setLeads(prev => [...newLeads, ...prev]);
      }
      setProgress(currentProgress);
    }, 800);
  };

  const simulateWebsiteScraping = () => {
    if (isWebsiteScraping) {
      setIsWebsiteScraping(false);
      setProgress(0);
      return;
    }

    if (!scraperUrl) {
      alert("Please enter a target URL.");
      return;
    }

    setIsWebsiteScraping(true);
    setProgress(0);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 20;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setIsWebsiteScraping(false);
        
        // Add new mock lead from website
        const newLead = { 
          id: Date.now(), 
          name: "Extracted Business", 
          phone: "+1 800-WEB-DATA", 
          source: "Website", 
          rating: "N/A", 
          website: scraperUrl.replace('https://', '').split('/')[0],
          status: "New"
        };
        setLeads(prev => [newLead, ...prev]);
      }
      setProgress(currentProgress);
    }, 600);
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Lead Generation</h1>
        <p className="text-muted-foreground">Find and extract leads from Google Maps and Websites.</p>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="maps">Google Maps</TabsTrigger>
          <TabsTrigger value="scraper">Website Scraper</TabsTrigger>
          <TabsTrigger value="leads">All Leads</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Leads Extracted</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,450</div>
                <p className="text-xs text-muted-foreground">+2,100 this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Scrapers</CardTitle>
                <Play className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Running currently</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-xs text-muted-foreground">Valid phone numbers found</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Extraction Jobs</CardTitle>
              <CardDescription>Status of your latest lead generation tasks.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Name</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Leads Found</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Plumbers in New York</TableCell>
                    <TableCell><Badge variant="outline">Google Maps</Badge></TableCell>
                    <TableCell><Badge className="bg-green-500">Completed</Badge></TableCell>
                    <TableCell>452</TableCell>
                    <TableCell>Today, 10:30 AM</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Real Estate Agencies CA</TableCell>
                    <TableCell><Badge variant="outline">Google Maps</Badge></TableCell>
                    <TableCell><Badge variant="secondary" className="animate-pulse">Running (45%)</Badge></TableCell>
                    <TableCell>128</TableCell>
                    <TableCell>Today, 11:15 AM</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Tech Startups Directory</TableCell>
                    <TableCell><Badge variant="outline">Website</Badge></TableCell>
                    <TableCell><Badge variant="destructive">Failed</Badge></TableCell>
                    <TableCell>12</TableCell>
                    <TableCell>Yesterday</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maps" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-500" />
                Google Maps Extractor
              </CardTitle>
              <CardDescription>Find businesses by keyword and location to extract their contact details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Keyword / Niche</Label>
                  <Input 
                    placeholder="e.g. Coffee Shops, Dentists, Plumbers" 
                    value={mapsQuery.keyword}
                    onChange={(e) => setMapsQuery({...mapsQuery, keyword: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input 
                    placeholder="e.g. London, UK or New York, NY" 
                    value={mapsQuery.location}
                    onChange={(e) => setMapsQuery({...mapsQuery, location: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Max Results</Label>
                <Input type="number" defaultValue={100} />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={simulateMapsScraping} className={isScraping ? "bg-red-500 hover:bg-red-600" : ""}>
                  {isScraping ? <><Pause className="mr-2 h-4 w-4" /> Stop Extraction</> : <><Play className="mr-2 h-4 w-4" /> Start Extraction</>}
                </Button>
              </div>
            </CardContent>
          </Card>

          {isScraping && (
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-sm">Extraction in Progress...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Found: {Math.floor(progress / 2)} leads</span>
                    <span>Scanning page {Math.floor(progress / 30) + 1}...</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="scraper" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-500" />
                Website Scraper
              </CardTitle>
              <CardDescription>Extract phone numbers and emails from specific websites or directories.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Target URL</Label>
                <Input 
                  placeholder="https://example-directory.com/plumbers" 
                  value={scraperUrl}
                  onChange={(e) => setScraperUrl(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Crawl Depth</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option>Single Page Only</option>
                  <option>Same Domain (1 level deep)</option>
                  <option>Same Domain (2 levels deep)</option>
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={simulateWebsiteScraping} className={isWebsiteScraping ? "bg-red-500 hover:bg-red-600" : ""}>
                  {isWebsiteScraping ? <><Pause className="mr-2 h-4 w-4" /> Stop Scraping</> : <><Play className="mr-2 h-4 w-4" /> Start Scraping</>}
                </Button>
              </div>
            </CardContent>
          </Card>

          {isWebsiteScraping && (
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-sm">Scraping Website...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Analyzing DOM...</span>
                    <span>{Math.floor(progress)}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>All Extracted Leads</CardTitle>
                <CardDescription>Manage and export your generated leads.</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search leads..." className="pl-8 w-[250px]" />
                </div>
                <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export CSV</Button>
                <Button>Add to CRM</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Website</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.phone}</TableCell>
                      <TableCell><Badge variant="outline">{lead.source}</Badge></TableCell>
                      <TableCell>{lead.rating}</TableCell>
                      <TableCell className="text-blue-500 hover:underline cursor-pointer">{lead.website}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Extraction Settings
              </CardTitle>
              <CardDescription>Configure proxy, delays, and API keys for scraping.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Google Maps API Key (Optional, for faster extraction)</Label>
                <Input type="password" placeholder="AIzaSy..." />
              </div>
              <div className="space-y-2">
                <Label>Proxy Settings</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <option>No Proxy (Direct)</option>
                  <option>Use System Proxies</option>
                  <option>Custom Proxy List</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Request Delay (Seconds)</Label>
                <Input type="number" defaultValue={2} />
                <p className="text-xs text-muted-foreground">Higher delays reduce the chance of being blocked.</p>
              </div>
              <Button className="mt-4">Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
