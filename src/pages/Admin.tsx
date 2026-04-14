import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, CreditCard, LayoutTemplate, Settings, ShieldCheck } from "lucide-react";

export default function Admin() {
  return (
    <div className="flex flex-col gap-6 max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
        <p className="text-muted-foreground">Full SaaS control panel for managing users, plans, and system settings.</p>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="users"><Users className="w-4 h-4 mr-2"/> Manage Users</TabsTrigger>
          <TabsTrigger value="plans"><CreditCard className="w-4 h-4 mr-2"/> Plans & Payments</TabsTrigger>
          <TabsTrigger value="cms"><LayoutTemplate className="w-4 h-4 mr-2"/> CMS & Content</TabsTrigger>
          <TabsTrigger value="system"><Settings className="w-4 h-4 mr-2"/> System Settings</TabsTrigger>
          <TabsTrigger value="security"><ShieldCheck className="w-4 h-4 mr-2"/> Security Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tenant Management</CardTitle>
              <CardDescription>Manage all SaaS clients and their subscription status.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Acme Corp</TableCell>
                    <TableCell>admin@acme.com</TableCell>
                    <TableCell><Badge>Agency</Badge></TableCell>
                    <TableCell><Badge variant="outline" className="text-green-600">Active</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Manage</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">TechStart Inc</TableCell>
                    <TableCell>founder@techstart.io</TableCell>
                    <TableCell><Badge variant="secondary">Pro</Badge></TableCell>
                    <TableCell><Badge variant="outline" className="text-green-600">Active</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Manage</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plans</CardTitle>
              <CardDescription>Configure pricing, limits, and free trials.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-bold">Starter Plan</h3>
                    <p className="text-sm text-muted-foreground">RM49/mo - 1,000 credits</p>
                  </div>
                  <Button variant="outline">Edit Plan</Button>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-bold">Pro Plan</h3>
                    <p className="text-sm text-muted-foreground">RM149/mo - 10,000 credits</p>
                  </div>
                  <Button variant="outline">Edit Plan</Button>
                </div>
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-bold">Agency Plan</h3>
                    <p className="text-sm text-muted-foreground">RM499/mo - Unlimited</p>
                  </div>
                  <Button variant="outline">Edit Plan</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cms" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Management System</CardTitle>
              <CardDescription>Edit landing pages, FAQs, and blog content.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start"><LayoutTemplate className="w-4 h-4 mr-2"/> Edit Landing Page</Button>
              <Button variant="outline" className="w-full justify-start"><LayoutTemplate className="w-4 h-4 mr-2"/> Manage FAQ Section</Button>
              <Button variant="outline" className="w-full justify-start"><LayoutTemplate className="w-4 h-4 mr-2"/> Blog / Content Pages</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System & API Settings</CardTitle>
              <CardDescription>Global configuration for SMTP, Languages, and API limits.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start"><Settings className="w-4 h-4 mr-2"/> SMTP Email Settings</Button>
              <Button variant="outline" className="w-full justify-start"><Settings className="w-4 h-4 mr-2"/> Payment Gateway (Stripe/PayPal)</Button>
              <Button variant="outline" className="w-full justify-start"><Settings className="w-4 h-4 mr-2"/> Language & Localization</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security & Compliance</CardTitle>
              <CardDescription>Monitor login authentication, RBAC, CSRF/XSS protection logs.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted rounded-lg font-mono text-xs space-y-2">
                <div className="text-green-600">[OK] CSRF Protection Active</div>
                <div className="text-green-600">[OK] XSS Sanitization Active</div>
                <div className="text-green-600">[OK] SQL Injection Prevention Active</div>
                <div className="text-blue-600">[INFO] Admin login from 192.168.1.1</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
