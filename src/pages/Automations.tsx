import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, ShoppingCart, Target, CalendarClock, TicketPercent } from "lucide-react";

export default function Automations() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Advanced Automations</h1>
        <p className="text-muted-foreground">Power features for marketing funnels, lead scoring, and event triggers.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-primary shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-primary" />
              Auto Follow-up Sequences
            </CardTitle>
            <CardDescription>Drip campaigns sent over days or weeks.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground">3 Active Sequences</span>
              <Badge>Running</Badge>
            </div>
            <Button variant="outline" className="w-full">Manage Sequences</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-500" />
              Lead Scoring System
            </CardTitle>
            <CardDescription>Automatically score leads based on chat behavior.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground">Rules configured</span>
              <Badge variant="secondary">Active</Badge>
            </div>
            <Button variant="outline" className="w-full">Edit Scoring Rules</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-green-500" />
              Cart Recovery Automation
            </CardTitle>
            <CardDescription>Send WhatsApp reminders for abandoned carts.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground">Requires Shopify/WooCommerce</span>
              <Badge variant="outline">Setup Required</Badge>
            </div>
            <Button className="w-full">Configure</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TicketPercent className="h-5 w-5 text-purple-500" />
              Coupon & Product Catalog
            </CardTitle>
            <CardDescription>Send interactive product catalogs and dynamic coupons.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground">12 Products Synced</span>
              <Badge variant="secondary">Active</Badge>
            </div>
            <Button variant="outline" className="w-full">Manage Catalog</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
