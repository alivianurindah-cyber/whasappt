import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Bot, GitBranch, Zap, PhoneCall, Store, MessageSquare, User, ArrowRight } from "lucide-react";
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
  Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Custom Node Component
const CustomNode = ({ data }: any) => {
  const Icon = data.icon || MessageSquare;
  return (
    <div className={`bg-background border-2 ${data.borderColor || 'border-border'} rounded-xl p-4 shadow-sm w-64 transition-all hover:shadow-md`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-muted-foreground" />
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${data.iconBg || 'bg-muted'}`}>
          <Icon className={`h-5 w-5 ${data.iconColor || 'text-foreground'}`} />
        </div>
        <div className="font-semibold text-sm">{data.title}</div>
      </div>
      <div className="text-xs text-muted-foreground leading-relaxed">{data.description}</div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-muted-foreground" />
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
    position: { x: 250, y: 50 },
    data: { 
      title: 'Trigger: Incoming Message', 
      description: 'Matches "Help" or "Support"',
      icon: MessageSquare,
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
      title: 'AI Node (Gemini)', 
      description: 'Generate reply & detect intent',
      icon: Bot,
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
      borderColor: 'border-purple-400 dark:border-purple-600'
    },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 250, y: 350 },
    data: { 
      title: 'Condition', 
      description: 'If intent == "human"',
      icon: GitBranch,
      iconBg: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400',
      borderColor: 'border-orange-200 dark:border-orange-800'
    },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 50, y: 520 },
    data: { 
      title: 'Action: Assign to Agent', 
      description: 'Route to human support',
      icon: User,
      iconBg: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400',
      borderColor: 'border-green-200 dark:border-green-800'
    },
  },
  {
    id: '5',
    type: 'custom',
    position: { x: 450, y: 520 },
    data: { 
      title: 'Action: Send AI Reply', 
      description: 'Send generated response',
      icon: ArrowRight,
      iconBg: 'bg-slate-100 dark:bg-slate-800',
      iconColor: 'text-slate-600 dark:text-slate-400',
      borderColor: 'border-slate-200 dark:border-slate-700'
    },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { strokeWidth: 2 } },
  { id: 'e3-4', source: '3', target: '4', label: 'True', animated: true, style: { strokeWidth: 2 } },
  { id: 'e3-5', source: '3', target: '5', label: 'False', animated: true, style: { strokeWidth: 2 } },
];

export default function Flows() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge({ ...params, animated: true, style: { strokeWidth: 2 } } as any, eds)),
    [setEdges],
  );

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Flow Builder</h1>
          <p className="text-muted-foreground">Design AI chatbots, voice agents, and automated conversation flows.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Store className="mr-2 h-4 w-4" /> Template Marketplace
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Flow
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="cursor-pointer border-primary shadow-sm transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              AI Customer Support
            </CardTitle>
            <CardDescription>Uses Gemini AI to answer FAQs and route to agents.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span className="text-primary font-medium">Editing...</span>
              <span>1.2k triggers/day</span>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-primary transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-blue-500" />
              Lead Qualification
            </CardTitle>
            <CardDescription>Asks 3 questions before saving to CRM.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Status: Active</span>
              <span>45 triggers/day</span>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-primary transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PhoneCall className="h-5 w-5 text-purple-500" />
              Voice AI (Call Automation)
            </CardTitle>
            <CardDescription>Handles incoming WhatsApp calls with AI voice.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Status: Draft</span>
              <span>0 triggers/day</span>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:border-primary transition-colors border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-muted-foreground">
              <Plus className="h-5 w-5" />
              Create Blank Flow
            </CardTitle>
            <CardDescription>Start from scratch with the drag & drop builder.</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="border-b bg-muted/20 py-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              Interactive Flow Editor (AI Customer Support)
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Test Flow</Button>
              <Button size="sm">Publish Changes</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            className="bg-muted/10"
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
            />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </CardContent>
      </Card>
    </div>
  );
}
