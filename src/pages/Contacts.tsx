import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Download, Upload, Tags, FileUp } from "lucide-react";

const contacts = [
  { id: 1, name: "Alice Johnson", phone: "+1 234 567 8900", tags: ["VIP", "Lead"], lastActive: "2 mins ago", customField: "LTV: $500" },
  { id: 2, name: "Bob Smith", phone: "+1 987 654 3210", tags: ["Customer"], lastActive: "1 hour ago", customField: "LTV: $120" },
  { id: 3, name: "Charlie Brown", phone: "+44 7700 900077", tags: ["Lead"], lastActive: "Yesterday", customField: "Source: Facebook" },
  { id: 4, name: "Diana Prince", phone: "+61 411 000 000", tags: ["VIP", "Customer"], lastActive: "3 days ago", customField: "LTV: $1200" },
  { id: 5, name: "Evan Wright", phone: "+1 555 019 2837", tags: ["Cold"], lastActive: "1 week ago", customField: "Source: Organic" },
];

export default function Contacts() {
  const [isAddContactOpen, setIsAddContactOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contacts (CRM)</h1>
          <p className="text-muted-foreground">Manage customers, segments, and interaction history.</p>
        </div>
        <div className="flex gap-2">
          {/* Import Dialog */}
          <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
            <DialogTrigger render={<Button variant="outline" />}>
              <Upload className="mr-2 h-4 w-4" /> Import CSV
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Import Contacts</DialogTitle>
                <DialogDescription>
                  Upload a CSV file to bulk import contacts. Ensure your file has 'Name' and 'Phone' columns.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center">
                  <FileUp className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-sm font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mb-4">CSV or Excel (max. 5MB)</p>
                  <Button variant="secondary" size="sm">Select File</Button>
                </div>
                <div className="grid gap-2">
                  <Label>Assign Tags to Imported Contacts</Label>
                  <Input placeholder="e.g., Summer Campaign, Leads" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsImportOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsImportOpen(false)}>Start Import</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Export Dialog */}
          <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
            <DialogTrigger render={<Button variant="outline" />}>
              <Download className="mr-2 h-4 w-4" /> Export
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Export Contacts</DialogTitle>
                <DialogDescription>
                  Download your contacts data for external use.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Export Range</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Contacts (12,450)</SelectItem>
                      <SelectItem value="filtered">Current Filtered View (3,200)</SelectItem>
                      <SelectItem value="selected">Selected Contacts Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Format</Label>
                  <Select defaultValue="csv">
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV (Comma Separated Values)</SelectItem>
                      <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsExportOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsExportOpen(false)}>Download File</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Add Contact Dialog */}
          <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
            <DialogTrigger render={<Button />}>
              <Plus className="mr-2 h-4 w-4" /> Add Contact
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
                <DialogDescription>
                  Manually add a new contact to your CRM.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="e.g., John Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number (with country code)</Label>
                  <Input id="phone" placeholder="e.g., +1 234 567 8900" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address (Optional)</Label>
                  <Input id="email" type="email" placeholder="e.g., john@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input id="tags" placeholder="e.g., VIP, Lead, Customer" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddContactOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsAddContactOpen(false)}>Save Contact</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>All Contacts</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search contacts..." className="pl-8 w-[250px]" />
              </div>
              <Button variant="outline" size="icon" title="Filter by Activity">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" title="Manage Segments">
                <Tags className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone (Validated)</TableHead>
                <TableHead>Tags / Segments</TableHead>
                <TableHead>Custom Data</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {contact.tags.map(tag => (
                        <Badge key={tag} variant={tag === 'VIP' ? 'default' : 'secondary'}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{contact.customField}</TableCell>
                  <TableCell className="text-muted-foreground">{contact.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Timeline</Button>
                    <Button variant="ghost" size="sm">Message</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
