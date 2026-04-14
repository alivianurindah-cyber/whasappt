import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Database, Webhook, Code, FileSpreadsheet } from "lucide-react";

export default function Integrations() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">API & Integrations</h1>
        <p className="text-muted-foreground">Connect your WhatsApp SaaS with external tools and CRMs.</p>
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
            <Button variant="outline" className="w-full">Manage API Keys</Button>
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
