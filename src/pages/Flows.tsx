import React, { useState, useCallback, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, Bot, GitBranch, Zap, PhoneCall, Store, MessageSquare, User, 
  ArrowRight, Webhook, Clock, Key, UserPlus, ShoppingCart, FlaskConical, 
  Calendar, Brain, LayoutTemplate, Tags, Database, Globe, Bell, StopCircle,
  Send, CheckCircle, Settings2, Trash2, Play, Save
} from "lucide-react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  BackgroundVariant,
  Connection,
  Edge,
  ReactFlowProvider,
  useReactFlow,
  Node,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Custom Node Component
const CustomNode = ({ data, selected }: any) => {
  const Icon = data.icon || MessageSquare;
  return (
    <div className={`bg-background border-2 ${selected ? 'border-primary ring-2 ring-primary/20' : data.borderColor || 'border-border'} rounded-xl p-4 shadow-sm w-64 transition-all hover:shadow-md relative group`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-muted-foreground !-left-1.5" />
      
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${data.iconBg || 'bg-muted'}`}>
          <Icon className={`h-5 w-5 ${data.iconColor || 'text-foreground'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm truncate">{data.title}</div>
          <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
            {data.type || 'Action'}
          </div>
        </div>
        {selected && (
          <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground p-1 rounded-full shadow-lg">
            <Settings2 className="h-3 w-3" />
          </div>
        )}
      </div>
      
      <div className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
        {data.description}
      </div>

      {data.parameters?.message && (
        <div className="mt-2 p-2 bg-muted/50 rounded text-[10px] italic truncate border-l-2 border-primary/30">
          "{data.parameters.message}"
        </div>
      )}
      
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-muted-foreground !-right-1.5" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 100, y: 150 },
    data: { 
      title: 'Trigger: Incoming Message', 
      description: 'Matches "Help" or "Support"',
      type: 'Trigger',
      icon: MessageSquare,
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-200 dark:border-blue-800',
      parameters: { keyword: 'Help' }
    },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 450, y: 150 },
    data: { 
      title: 'AI Node (Gemini)', 
      description: 'Generate reply & detect intent',
      type: 'AI',
      icon: Bot,
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
      borderColor: 'border-purple-400 dark:border-purple-600',
      parameters: { model: 'gemini-1.5-pro', prompt: 'You are a support assistant...' }
    },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 800, y: 150 },
    data: { 
      title: 'Condition', 
      description: 'If intent == "human"',
      type: 'Logic',
      icon: GitBranch,
      iconBg: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400',
      borderColor: 'border-orange-200 dark:border-orange-800',
      parameters: { condition: 'intent == "human"' }
    },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 1150, y: 50 },
    data: { 
      title: 'Action: Assign to Agent', 
      description: 'Route to human support',
      type: 'Action',
      icon: User,
      iconBg: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400',
      borderColor: 'border-green-200 dark:border-green-800',
      parameters: { agentId: 'support-team-1' }
    },
  },
  {
    id: '5',
    type: 'custom',
    position: { x: 1150, y: 250 },
    data: { 
      title: 'Action: Send AI Reply', 
      description: 'Send generated response',
      type: 'Action',
      icon: ArrowRight,
      iconBg: 'bg-slate-100 dark:bg-slate-800',
      iconColor: 'text-slate-600 dark:text-slate-400',
      borderColor: 'border-slate-200 dark:border-slate-700',
      parameters: { message: '{{ai_response}}' }
    },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { strokeWidth: 2 } },
  { id: 'e3-4', source: '3', target: '4', label: 'True', animated: true, style: { strokeWidth: 2 } },
  { id: 'e3-5', source: '3', target: '5', label: 'False', animated: true, style: { strokeWidth: 2 } },
];

const FLOW_TEMPLATES = [
  {
    id: 'support',
    name: 'AI Customer Support',
    description: 'Uses Gemini AI to answer FAQs and route to agents.',
    icon: Bot,
    color: 'text-purple-500',
    nodes: initialNodes,
    edges: initialEdges
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Order Tracker',
    description: 'Automatically track orders and provide status updates.',
    icon: ShoppingCart,
    color: 'text-green-500',
    nodes: [
      { id: '1', type: 'custom', position: { x: 100, y: 150 }, data: { title: 'Trigger: Order Query', type: 'Trigger', icon: MessageSquare, iconBg: 'bg-blue-100', iconColor: 'text-blue-600', parameters: { keyword: 'Order, Track' } } },
      { id: '2', type: 'custom', position: { x: 450, y: 150 }, data: { title: 'AI: Extract ID', type: 'AI', icon: Brain, iconBg: 'bg-purple-100', iconColor: 'text-purple-600', parameters: { prompt: 'Extract order ID from message' } } },
      { id: '3', type: 'custom', position: { x: 800, y: 150 }, data: { title: 'Fetch Order Status', type: 'Action', icon: Globe, iconBg: 'bg-slate-100', iconColor: 'text-slate-600', parameters: { url: 'https://api.store.com/orders/{{order_id}}' } } },
      { id: '4', type: 'custom', position: { x: 1150, y: 150 }, data: { title: 'Send Status', type: 'Action', icon: ArrowRight, iconBg: 'bg-green-100', iconColor: 'text-green-600', parameters: { message: 'Your order status is: {{status}}' } } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
    ]
  },
  {
    id: 'booking',
    name: 'Appointment Booking',
    description: 'Schedule meetings and appointments via WhatsApp.',
    icon: Calendar,
    color: 'text-blue-500',
    nodes: [
      { id: '1', type: 'custom', position: { x: 100, y: 150 }, data: { title: 'Trigger: Booking', type: 'Trigger', icon: Key, iconBg: 'bg-blue-100', iconColor: 'text-blue-600', parameters: { keyword: 'Book, Appointment' } } },
      { id: '2', type: 'custom', position: { x: 450, y: 150 }, data: { title: 'AI: Parse Date', type: 'AI', icon: Bot, iconBg: 'bg-purple-100', iconColor: 'text-purple-600', parameters: { prompt: 'Extract date and time' } } },
      { id: '3', type: 'custom', position: { x: 800, y: 150 }, data: { title: 'Check Hours', type: 'Logic', icon: Clock, iconBg: 'bg-orange-100', iconColor: 'text-orange-600', parameters: { condition: 'is_within_hours' } } },
      { id: '4', type: 'custom', position: { x: 1150, y: 150 }, data: { title: 'Confirm Booking', type: 'Action', icon: CheckCircle, iconBg: 'bg-green-100', iconColor: 'text-green-600', parameters: { message: 'Confirmed for {{date}}!' } } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
    ]
  },
  {
    id: 'realestate',
    name: 'Real Estate Lead Gen',
    description: 'Qualify property leads and sync to your CRM.',
    icon: UserPlus,
    color: 'text-orange-500',
    nodes: [
      { id: '1', type: 'custom', position: { x: 100, y: 150 }, data: { title: 'Trigger: FB Lead', type: 'Trigger', icon: Webhook, iconBg: 'bg-blue-100', iconColor: 'text-blue-600', parameters: { url: '...' } } },
      { id: '2', type: 'custom', position: { x: 450, y: 150 }, data: { title: 'Welcome Msg', type: 'Action', icon: ArrowRight, iconBg: 'bg-slate-100', iconColor: 'text-slate-600', parameters: { message: 'Hi! Interested in {{property}}?' } } },
      { id: '3', type: 'custom', position: { x: 800, y: 150 }, data: { title: 'AI: Qualify', type: 'AI', icon: Brain, iconBg: 'bg-purple-100', iconColor: 'text-purple-600', parameters: { prompt: 'Check budget and timeline' } } },
      { id: '4', type: 'custom', position: { x: 1150, y: 150 }, data: { title: 'Update CRM', type: 'Action', icon: Database, iconBg: 'bg-green-100', iconColor: 'text-green-600', parameters: { tag: 'High Priority' } } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
    ]
  },
  {
    id: 'cart',
    name: 'Abandoned Cart Recovery',
    description: 'Recover lost sales with automated discount offers.',
    icon: ShoppingCart,
    color: 'text-red-500',
    nodes: [
      { id: '1', type: 'custom', position: { x: 100, y: 150 }, data: { title: 'Trigger: Abandoned', type: 'Trigger', icon: ShoppingCart, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' } },
      { id: '2', type: 'custom', position: { x: 450, y: 150 }, data: { title: 'Wait 2 Hours', type: 'Logic', icon: Clock, iconBg: 'bg-orange-100', iconColor: 'text-orange-600', parameters: { delay: '120' } } },
      { id: '3', type: 'custom', position: { x: 800, y: 150 }, data: { title: 'Send Coupon', type: 'Action', icon: LayoutTemplate, iconBg: 'bg-slate-100', iconColor: 'text-slate-600', parameters: { message: 'Come back for 10% off!' } } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
    ]
  },
  {
    id: 'feedback',
    name: 'Feedback & Sentiment',
    description: 'Analyze customer sentiment and alert support.',
    icon: FlaskConical,
    color: 'text-yellow-500',
    nodes: [
      { id: '1', type: 'custom', position: { x: 100, y: 150 }, data: { title: 'Trigger: Message', type: 'Trigger', icon: MessageSquare, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' } },
      { id: '2', type: 'custom', position: { x: 450, y: 150 }, data: { title: 'AI: Sentiment', type: 'AI', icon: Brain, iconBg: 'bg-purple-100', iconColor: 'text-purple-600' } },
      { id: '3', type: 'custom', position: { x: 800, y: 150 }, data: { title: 'If Negative', type: 'Logic', icon: GitBranch, iconBg: 'bg-orange-100', iconColor: 'text-orange-600', parameters: { condition: 'sentiment == "negative"' } } },
      { id: '4', type: 'custom', position: { x: 1150, y: 150 }, data: { title: 'Notify Team', type: 'Action', icon: Bell, iconBg: 'bg-red-100', iconColor: 'text-red-600' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
    ]
  },
  {
    id: 'webinar',
    name: 'Webinar Registration',
    description: 'Automate event signups and send access links.',
    icon: Globe,
    color: 'text-indigo-500',
    nodes: [
      { id: '1', type: 'custom', position: { x: 100, y: 150 }, data: { title: 'Trigger: Keyword', type: 'Trigger', icon: Key, iconBg: 'bg-blue-100', iconColor: 'text-blue-600', parameters: { keyword: 'Webinar' } } },
      { id: '2', type: 'custom', position: { x: 450, y: 150 }, data: { title: 'AI: Extract Info', type: 'AI', icon: Bot, iconBg: 'bg-purple-100', iconColor: 'text-purple-600' } },
      { id: '3', type: 'custom', position: { x: 800, y: 150 }, data: { title: 'Register User', type: 'Action', icon: Globe, iconBg: 'bg-slate-100', iconColor: 'text-slate-600' } },
      { id: '4', type: 'custom', position: { x: 1150, y: 150 }, data: { title: 'Send Link', type: 'Action', icon: ArrowRight, iconBg: 'bg-green-100', iconColor: 'text-green-600', parameters: { message: 'Here is your link: {{link}}' } } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
    ]
  },
  {
    id: 'faq',
    name: 'Smart FAQ Bot',
    description: 'Answer common questions using your knowledge base.',
    icon: Brain,
    color: 'text-pink-500',
    nodes: [
      { id: '1', type: 'custom', position: { x: 100, y: 150 }, data: { title: 'Trigger: Question', type: 'Trigger', icon: MessageSquare, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' } },
      { id: '2', type: 'custom', position: { x: 450, y: 150 }, data: { title: 'AI: Search KB', type: 'AI', icon: Database, iconBg: 'bg-purple-100', iconColor: 'text-purple-600' } },
      { id: '3', type: 'custom', position: { x: 800, y: 150 }, data: { title: 'Send Answer', type: 'Action', icon: ArrowRight, iconBg: 'bg-slate-100', iconColor: 'text-slate-600' } },
      { id: '4', type: 'custom', position: { x: 1150, y: 150 }, data: { title: 'Human Fallback', type: 'Logic', icon: User, iconBg: 'bg-orange-100', iconColor: 'text-orange-600' } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
      { id: 'e3-4', source: '3', target: '4' },
    ]
  }
];

const leadNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 250, y: 50 },
    data: { 
      title: 'Trigger: New Lead', 
      description: 'From Facebook Ads',
      icon: UserPlus,
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 250, y: 200 },
    data: { 
      title: 'Send Message', 
      description: 'Ask qualification question 1',
      icon: ArrowRight,
      iconBg: 'bg-slate-100 dark:bg-slate-800',
      iconColor: 'text-slate-600 dark:text-slate-400',
      borderColor: 'border-slate-200 dark:border-slate-700'
    },
  }
];
const leadEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { strokeWidth: 2 } }
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string, nodeData: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/reactflow-data', JSON.stringify(nodeData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-72 border-l bg-muted/10 p-4 flex flex-col gap-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold text-sm">Node Library</div>
        <Badge variant="secondary" className="text-[10px]">n8n Style</Badge>
      </div>
      
      <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Triggers</div>
      <div className="grid gap-2">
        <div 
          className="bg-background border rounded-lg p-3 cursor-grab hover:border-blue-400 hover:shadow-sm transition-all flex items-center gap-3 group"
          onDragStart={(e) => onDragStart(e, 'custom', { title: 'Message Trigger', type: 'Trigger', description: 'Trigger on new message', icon: 'MessageSquare', iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400', borderColor: 'border-blue-200 dark:border-blue-800', parameters: { keyword: '' } })}
          draggable
        >
          <div className="p-2 rounded bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
            <MessageSquare className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium">WhatsApp Msg</span>
        </div>
        <div 
          className="bg-background border rounded-lg p-3 cursor-grab hover:border-blue-400 hover:shadow-sm transition-all flex items-center gap-3 group"
          onDragStart={(e) => onDragStart(e, 'custom', { title: 'Webhook', type: 'Trigger', description: 'Trigger from external app', icon: 'Webhook', iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400', borderColor: 'border-blue-200 dark:border-blue-800', parameters: { url: 'https://api.yoursite.com/webhook' } })}
          draggable
        >
          <div className="p-2 rounded bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
            <Webhook className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium">Webhook</span>
        </div>
      </div>

      <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-4 mb-1">AI & Logic</div>
      <div className="grid gap-2">
        <div 
          className="bg-background border rounded-lg p-3 cursor-grab hover:border-purple-400 hover:shadow-sm transition-all flex items-center gap-3 group"
          onDragStart={(e) => onDragStart(e, 'custom', { title: 'AI Agent', type: 'AI', description: 'Generate AI response', icon: 'Bot', iconBg: 'bg-purple-100 dark:bg-purple-900/30', iconColor: 'text-purple-600 dark:text-purple-400', borderColor: 'border-purple-400 dark:border-purple-600', parameters: { model: 'gemini-1.5-flash', prompt: '' } })}
          draggable
        >
          <div className="p-2 rounded bg-purple-50 text-purple-600 group-hover:bg-purple-100 transition-colors">
            <Bot className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium">AI Assistant</span>
        </div>
        <div 
          className="bg-background border rounded-lg p-3 cursor-grab hover:border-orange-400 hover:shadow-sm transition-all flex items-center gap-3 group"
          onDragStart={(e) => onDragStart(e, 'custom', { title: 'Condition', type: 'Logic', description: 'Split flow based on rules', icon: 'GitBranch', iconBg: 'bg-orange-100 dark:bg-orange-900/30', iconColor: 'text-orange-600 dark:text-orange-400', borderColor: 'border-orange-200 dark:border-orange-800', parameters: { condition: '' } })}
          draggable
        >
          <div className="p-2 rounded bg-orange-50 text-orange-600 group-hover:bg-orange-100 transition-colors">
            <GitBranch className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium">If / Else</span>
        </div>
      </div>

      <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-4 mb-1">Actions</div>
      <div className="grid gap-2">
        <div 
          className="bg-background border rounded-lg p-3 cursor-grab hover:border-slate-400 hover:shadow-sm transition-all flex items-center gap-3 group"
          onDragStart={(e) => onDragStart(e, 'custom', { title: 'Send Message', type: 'Action', description: 'Send a text message', icon: 'ArrowRight', iconBg: 'bg-slate-100 dark:bg-slate-800', iconColor: 'text-slate-600 dark:text-slate-400', borderColor: 'border-slate-200 dark:border-slate-700', parameters: { message: '' } })}
          draggable
        >
          <div className="p-2 rounded bg-slate-50 text-slate-600 group-hover:bg-slate-100 transition-colors">
            <ArrowRight className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium">Send Message</span>
        </div>
        <div 
          className="bg-background border rounded-lg p-3 cursor-grab hover:border-green-400 hover:shadow-sm transition-all flex items-center gap-3 group"
          onDragStart={(e) => onDragStart(e, 'custom', { title: 'Assign Agent', type: 'Action', description: 'Route to human', icon: 'User', iconBg: 'bg-green-100 dark:bg-green-900/30', iconColor: 'text-green-600 dark:text-green-400', borderColor: 'border-green-200 dark:border-green-800', parameters: { agentId: '' } })}
          draggable
        >
          <div className="p-2 rounded bg-green-50 text-green-600 group-hover:bg-green-100 transition-colors">
            <User className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium">Assign Agent</span>
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t">
        <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
          <p className="text-[10px] text-primary font-bold uppercase mb-1">Pro Tip</p>
          <p className="text-[11px] text-muted-foreground">Drag nodes onto the canvas and connect them from right to left handles.</p>
        </div>
      </div>
    </div>
  );
};

const NodeProperties = ({ node, onUpdate, onDelete, onClose }: any) => {
  const [data, setData] = useState(node.data);

  useEffect(() => {
    setData(node.data);
  }, [node]);

  const handleChange = (field: string, value: any) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    onUpdate(node.id, newData);
  };

  const handleParamChange = (param: string, value: any) => {
    const newParams = { ...data.parameters, [param]: value };
    const newData = { ...data, parameters: newParams };
    setData(newData);
    onUpdate(node.id, newData);
  };

  return (
    <Sheet open={!!node} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-[400px] overflow-y-auto">
        <SheetHeader className="border-b pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${data.iconBg || 'bg-muted'}`}>
              {React.createElement(data.icon || MessageSquare, { className: `h-5 w-5 ${data.iconColor || 'text-foreground'}` })}
            </div>
            <div>
              <SheetTitle>{data.title}</SheetTitle>
              <SheetDescription>{data.type} Node Configuration</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Node Name</Label>
            <Input 
              value={data.title} 
              onChange={(e) => handleChange('title', e.target.value)} 
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea 
              value={data.description} 
              onChange={(e) => handleChange('description', e.target.value)} 
              rows={2}
            />
          </div>

          <div className="pt-4 border-t">
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider text-muted-foreground">Parameters</h4>
            
            {data.type === 'Trigger' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Keyword Match</Label>
                  <Input 
                    placeholder="e.g. Help, Support" 
                    value={data.parameters?.keyword || ''} 
                    onChange={(e) => handleParamChange('keyword', e.target.value)}
                  />
                </div>
              </div>
            )}

            {data.type === 'AI' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Model</Label>
                  <Select 
                    value={data.parameters?.model || 'gemini-1.5-flash'} 
                    onValueChange={(v) => handleParamChange('model', v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                      <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>System Prompt</Label>
                  <Textarea 
                    placeholder="Instructions for the AI..." 
                    value={data.parameters?.prompt || ''} 
                    onChange={(e) => handleParamChange('prompt', e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            )}

            {data.type === 'Action' && data.title.includes('Message') && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Message Content</Label>
                  <Textarea 
                    placeholder="Enter message text..." 
                    value={data.parameters?.message || ''} 
                    onChange={(e) => handleParamChange('message', e.target.value)}
                    rows={4}
                  />
                  <p className="text-[10px] text-muted-foreground">Use {"{{variable}}"} for dynamic data.</p>
                </div>
              </div>
            )}

            {data.type === 'Logic' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Condition (JavaScript)</Label>
                  <Input 
                    placeholder="e.g. intent === 'human'" 
                    value={data.parameters?.condition || ''} 
                    onChange={(e) => handleParamChange('condition', e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="pt-8 flex flex-col gap-3">
            <Button className="w-full" onClick={() => onClose()}>
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
            <Button variant="destructive" className="w-full" onClick={() => onDelete(node.id)}>
              <Trash2 className="h-4 w-4 mr-2" /> Delete Node
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const FlowEditor = ({ nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange }: any) => {
  const { screenToFlowPosition } = useReactFlow();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds: any) => addEdge({ ...params, animated: true, style: { strokeWidth: 2, stroke: '#6366f1' } } as any, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeClick = useCallback((_: any, node: Node) => {
    setSelectedNode(node);
  }, []);

  const updateNodeData = useCallback((nodeId: string, newData: any) => {
    setNodes((nds: any) =>
      nds.map((node: any) => {
        if (node.id === nodeId) {
          return { ...node, data: newData };
        }
        return node;
      })
    );
  }, [setNodes]);

  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds: any) => nds.filter((node: any) => node.id !== nodeId));
    setEdges((eds: any) => eds.filter((edge: any) => edge.source !== nodeId && edge.target !== nodeId));
    setSelectedNode(null);
  }, [setNodes, setEdges]);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const dataStr = event.dataTransfer.getData('application/reactflow-data');

      if (typeof type === 'undefined' || !type || !dataStr) {
        return;
      }

      const parsedData = JSON.parse(dataStr);
      
      // Re-map string icons to actual Lucide components
      const iconMap: Record<string, any> = {
        MessageSquare, Webhook, Bot, GitBranch, Clock, ArrowRight, User, Key, 
        UserPlus, ShoppingCart, FlaskConical, Calendar, Brain, LayoutTemplate, 
        Tags, Database, Globe, Bell, StopCircle
      };
      
      parsedData.icon = iconMap[parsedData.icon] || MessageSquare;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: parsedData,
      };

      setNodes((nds: any) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes],
  );

  return (
    <div className="flex h-full w-full" ref={reactFlowWrapper}>
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          className="bg-muted/5"
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: true,
            style: { strokeWidth: 2, stroke: '#6366f1' }
          }}
        >
          <Controls />
          <MiniMap 
            nodeStrokeColor={(n) => {
              if (n.data?.borderColor) return n.data.borderColor as string;
              return '#eee';
            }}
            nodeColor={(n) => {
              if (n.data?.iconBg) return '#fff';
              return '#fff';
            }}
            zoomable
            pannable
          />
          <Background variant={BackgroundVariant.Lines} gap={20} size={1} color="#e2e8f0" />
        </ReactFlow>
        
        {selectedNode && (
          <NodeProperties 
            node={selectedNode} 
            onUpdate={updateNodeData} 
            onDelete={deleteNode}
            onClose={() => setSelectedNode(null)} 
          />
        )}
      </div>
      <Sidebar />
    </div>
  );
};

export default function Flows() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [activeFlowName, setActiveFlowName] = useState("AI Customer Support");
  
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [isMarketplaceOpen, setIsMarketplaceOpen] = useState(false);
  const [testMessage, setTestMessage] = useState("");
  const [testChat, setTestChat] = useState([{ sender: "bot", text: "Hello! How can I help you today?" }]);

  const loadFlow = (name: string, newNodes: any, newEdges: any) => {
    setActiveFlowName(name);
    setNodes(newNodes);
    setEdges(newEdges);
  };

  const handleTestSend = () => {
    if (!testMessage.trim()) return;
    setTestChat([...testChat, { sender: "user", text: testMessage }]);
    setTestMessage("");
    
    // Simulate bot reply
    setTimeout(() => {
      setTestChat(prev => [...prev, { sender: "bot", text: "This is a simulated response from your flow." }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Flow Builder</h1>
          <p className="text-muted-foreground">Design AI chatbots, voice agents, and automated conversation flows.</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isMarketplaceOpen} onOpenChange={setIsMarketplaceOpen}>
            <DialogTrigger render={<Button variant="outline" />}>
              <Store className="mr-2 h-4 w-4" /> Template Marketplace
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Template Marketplace</DialogTitle>
                <DialogDescription>
                  Start quickly with pre-built automation templates. Click a template to load it.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                {FLOW_TEMPLATES.map((template) => (
                  <Card 
                    key={template.id}
                    className="cursor-pointer hover:border-primary hover:shadow-md transition-all group"
                    onClick={() => {
                      loadFlow(template.name, template.nodes, template.edges);
                      setIsMarketplaceOpen(false);
                    }}
                  >
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors`}>
                          <template.icon className={`h-5 w-5 ${template.color}`} />
                        </div>
                        <CardTitle className="text-sm">{template.name}</CardTitle>
                      </div>
                      <CardDescription className="text-xs">{template.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Button onClick={() => loadFlow("Blank Flow", [], [])}>
            <Plus className="mr-2 h-4 w-4" /> New Flow
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card 
          className={`cursor-pointer transition-colors ${activeFlowName === "AI Customer Support" ? "border-primary shadow-sm" : "hover:border-primary"}`}
          onClick={() => loadFlow("AI Customer Support", initialNodes, initialEdges)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              AI Customer Support
            </CardTitle>
            <CardDescription>Uses Gemini AI to answer FAQs and route to agents.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span className={activeFlowName === "AI Customer Support" ? "text-primary font-medium" : ""}>
                {activeFlowName === "AI Customer Support" ? "Editing..." : "Status: Active"}
              </span>
              <span>1.2k triggers/day</span>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-colors ${activeFlowName === "Lead Qualification" ? "border-primary shadow-sm" : "hover:border-primary"}`}
          onClick={() => loadFlow("Lead Qualification", leadNodes, leadEdges)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-blue-500" />
              Lead Qualification
            </CardTitle>
            <CardDescription>Asks 3 questions before saving to CRM.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span className={activeFlowName === "Lead Qualification" ? "text-primary font-medium" : ""}>
                {activeFlowName === "Lead Qualification" ? "Editing..." : "Status: Active"}
              </span>
              <span>45 triggers/day</span>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-colors ${activeFlowName === "Voice AI (Call Automation)" ? "border-primary shadow-sm" : "hover:border-primary"}`}
          onClick={() => loadFlow("Voice AI (Call Automation)", [], [])}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PhoneCall className="h-5 w-5 text-purple-500" />
              Voice AI (Call Automation)
            </CardTitle>
            <CardDescription>Handles incoming WhatsApp calls with AI voice.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span className={activeFlowName === "Voice AI (Call Automation)" ? "text-primary font-medium" : ""}>
                {activeFlowName === "Voice AI (Call Automation)" ? "Editing..." : "Status: Draft"}
              </span>
              <span>0 triggers/day</span>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-colors border-dashed ${activeFlowName === "Blank Flow" ? "border-primary border-solid shadow-sm" : "hover:border-primary"}`}
          onClick={() => loadFlow("Blank Flow", [], [])}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-muted-foreground">
              <Plus className="h-5 w-5" />
              Create Blank Flow
            </CardTitle>
            <CardDescription>Start from scratch with the drag & drop builder.</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-none shadow-none bg-transparent">
        <CardHeader className="border-b bg-background py-3 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                {activeFlowName}
              </CardTitle>
              <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">Live</Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Play className="h-3 w-3" /> Execute Once
              </Button>
              <Dialog open={isTestOpen} onOpenChange={setIsTestOpen}>
                <DialogTrigger render={<Button variant="outline" size="sm" />}>Test Flow</DialogTrigger>
                <DialogContent className="sm:max-w-[400px] h-[500px] flex flex-col">
                  <DialogHeader>
                    <DialogTitle>Test Flow Simulator</DialogTitle>
                    <DialogDescription>
                      Simulate a conversation to test your flow logic.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex-1 overflow-y-auto p-4 bg-slate-50 rounded-md border flex flex-col gap-3">
                    {testChat.map((msg, i) => (
                      <div key={i} className={`flex gap-2 max-w-[80%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : ''}`}>
                        <Avatar className="w-6 h-6 mt-auto">
                          <AvatarFallback className={msg.sender === 'bot' ? 'bg-primary text-primary-foreground' : ''}>
                            {msg.sender === 'bot' ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`p-2 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-white border'}`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Input 
                      placeholder="Type a message..." 
                      value={testMessage}
                      onChange={(e) => setTestMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleTestSend()}
                    />
                    <Button size="icon" onClick={handleTestSend}><Send className="h-4 w-4" /></Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isPublishOpen} onOpenChange={setIsPublishOpen}>
                <DialogTrigger render={<Button size="sm" />}>Publish Changes</DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Publish Flow</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to publish these changes? They will go live immediately.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center justify-center py-6">
                    <div className="bg-green-50 text-green-600 p-4 rounded-full">
                      <CheckCircle className="h-12 w-12" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsPublishOpen(false)}>Cancel</Button>
                    <Button onClick={() => setIsPublishOpen(false)}>Publish Now</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 relative">
          <ReactFlowProvider>
            <FlowEditor 
              nodes={nodes} 
              setNodes={setNodes} 
              onNodesChange={onNodesChange} 
              edges={edges} 
              setEdges={setEdges} 
              onEdgesChange={onEdgesChange} 
            />
          </ReactFlowProvider>
        </CardContent>
      </Card>
    </div>
  );
}
