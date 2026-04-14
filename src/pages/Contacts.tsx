import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Download, Upload, Tags } from "lucide-react";

const contacts = [
  { id: 1, name: "Alice Johnson", phone: "+1 234 567 8900", tags: ["VIP", "Lead"], lastActive: "2 mins ago", customField: "LTV: $500" },
  { id: 2, name: "Bob Smith", phone: "+1 987 654 3210", tags: ["Customer"], lastActive: "1 hour ago", customField: "LTV: $120" },
  { id: 3, name: "Charlie Brown", phone: "+44 7700 900077", tags: ["Lead"], lastActive: "Yesterday", customField: "Source: Facebook" },
  { id: 4, name: "Diana Prince", phone: "+61 411 000 000", tags: ["VIP", "Customer"], lastActive: "3 days ago", customField: "LTV: $1200" },
  { id: 5, name: "Evan Wright", phone: "+1 555 019 2837", tags: ["Cold"], lastActive: "1 week ago", customField: "Source: Organic" },
];

export default function Contacts() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contacts (CRM)</h1>
          <p className="text-muted-foreground">Manage customers, segments, and interaction history.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" /> Import CSV
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Contact
          </Button>
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
