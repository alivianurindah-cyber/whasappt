import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, ShoppingCart, Target, CalendarClock, TicketPercent, Plus } from "lucide-react";

export default function Automations() {
  const [isSequenceOpen, setIsSequenceOpen] = useState(false);
  const [isScoringOpen, setIsScoringOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

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
            <Dialog open={isSequenceOpen} onOpenChange={setIsSequenceOpen}>
              <DialogTrigger render={<Button variant="outline" className="w-full" />}>Manage Sequences</DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Auto Follow-up Sequences</DialogTitle>
                  <DialogDescription>
                    Create and manage drip campaigns.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-sm">Welcome Series</h4>
                      <p className="text-xs text-muted-foreground">3 messages over 7 days</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="border rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-sm">Post-Purchase Upsell</h4>
                      <p className="text-xs text-muted-foreground">2 messages over 14 days</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <Button variant="secondary" className="w-full mt-2">
                    <Plus className="mr-2 h-4 w-4" /> Create New Sequence
                  </Button>
                </div>
                <DialogFooter>
                  <Button onClick={() => setIsSequenceOpen(false)}>Done</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
            <Dialog open={isScoringOpen} onOpenChange={setIsScoringOpen}>
              <DialogTrigger render={<Button variant="outline" className="w-full" />}>Edit Scoring Rules</DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Lead Scoring Rules</DialogTitle>
                  <DialogDescription>
                    Assign points based on user actions.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Action: Replies to message</Label>
                    <div className="flex gap-2 items-center">
                      <Input type="number" defaultValue={5} className="w-20" />
                      <span className="text-sm text-muted-foreground">points</span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Action: Clicks link in message</Label>
                    <div className="flex gap-2 items-center">
                      <Input type="number" defaultValue={10} className="w-20" />
                      <span className="text-sm text-muted-foreground">points</span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Action: Unsubscribes</Label>
                    <div className="flex gap-2 items-center">
                      <Input type="number" defaultValue={-50} className="w-20" />
                      <span className="text-sm text-muted-foreground">points</span>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsScoringOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsScoringOpen(false)}>Save Rules</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
            <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
              <DialogTrigger render={<Button className="w-full" />}>Configure</DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Cart Recovery Setup</DialogTitle>
                  <DialogDescription>
                    Connect your e-commerce platform to trigger abandoned cart messages.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Platform</Label>
                    <Select defaultValue="shopify">
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shopify">Shopify</SelectItem>
                        <SelectItem value="woocommerce">WooCommerce</SelectItem>
                        <SelectItem value="magento">Magento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Delay before sending</Label>
                    <Select defaultValue="1h">
                      <SelectTrigger>
                        <SelectValue placeholder="Select delay" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15m">15 Minutes</SelectItem>
                        <SelectItem value="1h">1 Hour</SelectItem>
                        <SelectItem value="4h">4 Hours</SelectItem>
                        <SelectItem value="24h">24 Hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Message Template</Label>
                    <Select defaultValue="abandoned_cart_1">
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="abandoned_cart_1">Abandoned Cart - Friendly Reminder</SelectItem>
                        <SelectItem value="abandoned_cart_discount">Abandoned Cart - 10% Discount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCartOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsCartOpen(false)}>Save Configuration</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
            <Dialog open={isCatalogOpen} onOpenChange={setIsCatalogOpen}>
              <DialogTrigger render={<Button variant="outline" className="w-full" />}>Manage Catalog</DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Product Catalog & Coupons</DialogTitle>
                  <DialogDescription>
                    Manage your synchronized products and active coupons.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="border rounded-lg p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                        <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Summer Collection</h4>
                        <p className="text-xs text-muted-foreground">12 Items • Synced 2 hours ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Sync Now</Button>
                  </div>
                  <div className="border rounded-lg p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                        <TicketPercent className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">WELCOME10</h4>
                        <p className="text-xs text-muted-foreground">10% Off • Expires in 30 days</p>
                      </div>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <Button variant="secondary" className="w-full mt-2">
                    <Plus className="mr-2 h-4 w-4" /> Create New Coupon
                  </Button>
                </div>
                <DialogFooter>
                  <Button onClick={() => setIsCatalogOpen(false)}>Done</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
