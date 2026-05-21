import { useState, useEffect, useRef } from 'react';
import {
  Bot, Send, ChevronDown, ChevronRight, Copy, Check, CheckCircle,
  Sparkles, RotateCcw, PoundSterling,
} from 'lucide-react';
import DemoShell from '../components/DemoShell';
import { streamingDemoEvents, demoAnalysisResult } from '../data/mockData';

type StreamEvent =
  | { type: 'progress'; stage: string; iteration: number; message: string }
  | { type: 'tool_call'; name: string; tool_use_id: string }
  | { type: 'tool_result'; name: string; success: boolean; duration_ms: number }
  | { type: 'reasoning'; trace: { observation: string; hypothesis: string; evidence: string; confidence: number; risk: string; recommendation: string } };

const suggestedPrompts = [
  'Why did my costs spike this month?',
  'What can be auto-fixed right now?',
  'Show me my biggest waste areas',
  'What needs my approval before we act?',
];

function TimelineItem({ event }: { event: StreamEvent }) {
  switch (event.type) {
    case 'progress':
      return (
        <div className="flex items-start gap-3 py-1.5">
          <div className="mt-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-blue-100 shrink-0" />
          <span className="text-sm text-gray-700">{event.message}</span>
        </div>
      );
    case 'tool_call':
      return (
        <div className="flex items-start gap-3 py-1.5">
          <div className="mt-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-amber-100 animate-pulse shrink-0" />
          <span className="text-sm text-gray-700">
            Calling <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">{event.name}</code>
          </span>
        </div>
      );
    case 'tool_result':
      return (
        <div className="flex items-start gap-3 py-1.5">
          <div className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${event.success ? 'bg-green-500 ring-2 ring-green-100' : 'bg-red-500 ring-2 ring-red-100'}`} />
          <span className="text-sm text-gray-700">
            <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs font-mono">{event.name}</code>
            {' '}{event.success ? 'completed' : 'failed'} in {event.duration_ms}ms
          </span>
        </div>
      );
    case 'reasoning':
      return (
        <div className="flex items-start gap-3 py-1.5">
          <div className="mt-1 w-2.5 h-2.5 rounded-full bg-purple-500 ring-2 ring-purple-100 shrink-0" />
          <span className="text-sm text-gray-700">
            Confidence: {(event.trace.confidence * 100).toFixed(0)}%
          </span>
        </div>
      );
    default:
      return null;
  }
}

export default function DemoAgentAnalysis() {
  const [query, setQuery] = useState('');
  const [displayedQuery, setDisplayedQuery] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [streamEvents, setStreamEvents] = useState<StreamEvent[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [reasoningOpen, setReasoningOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [autoPlayed, setAutoPlayed] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  const runDemo = (prompt: string) => {
    setDisplayedQuery(prompt);
    setQuery('');
    setStreaming(true);
    setStreamEvents([]);
    setShowResult(false);
    setReasoningOpen(false);
    setAutoPlayed(true);

    let idx = 0;
    const playNext = () => {
      if (idx >= streamingDemoEvents.length) {
        setTimeout(() => {
          setStreaming(false);
          setShowResult(true);
        }, 400);
        return;
      }
      const evt = streamingDemoEvents[idx];
      const { delay, ...event } = evt;
      setTimeout(() => {
        setStreamEvents((prev) => [...prev, event as StreamEvent]);
        idx++;
        playNext();
      }, delay);
    };
    playNext();
  };

  // Auto-scroll timeline
  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.scrollTop = timelineRef.current.scrollHeight;
    }
  }, [streamEvents]);

  // Auto-play on mount
  useEffect(() => {
    if (!autoPlayed) {
      const timer = setTimeout(() => runDemo('Why did our EC2 costs spike 40% last week?'), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const result = demoAnalysisResult;

  const tierBadge = (tier: string) => {
    const colors: Record<string, string> = {
      auto_executable: 'bg-green-100 text-green-800',
      approval_required: 'bg-amber-100 text-amber-800',
      high_risk: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors[tier] || 'bg-gray-100 text-gray-800'}`}>
        {tier.replace(/_/g, ' ')}
      </span>
    );
  };

  return (
    <DemoShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Agent</h1>
              <p className="text-sm text-gray-500">Agentic cost intelligence — powered by Claude</p>
            </div>
          </div>
          <button
            onClick={() => { setShowResult(false); setStreamEvents([]); setStreaming(false); setDisplayedQuery(''); setAutoPlayed(false); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Demo
          </button>
        </div>

        {/* Input */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && query.trim() && runDemo(query)}
              placeholder="Ask about your AWS costs..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              disabled={streaming}
            />
            <button
              onClick={() => query.trim() && runDemo(query)}
              disabled={streaming || !query.trim()}
              className="px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => runDemo(prompt)}
                disabled={streaming}
                className="px-3 py-1.5 text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full text-gray-600 transition-colors disabled:opacity-50 flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" /> {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* User query display */}
        {displayedQuery && (
          <div className="flex gap-3 items-start">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-gray-600">H</div>
            <div className="bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-800">{displayedQuery}</div>
          </div>
        )}

        {/* Streaming Timeline */}
        {(streaming || streamEvents.length > 0) && !showResult && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              {streaming && <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />}
              {streaming ? (
                <span className="text-sm font-medium text-gray-900">Analysing...</span>
              ) : (
                <span className="text-sm font-medium text-gray-500">Analysis complete</span>
              )}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                <PoundSterling className="w-3 h-3" /> Cost Analyst
              </span>
            </div>
            <div ref={timelineRef} className="border-l-2 border-gray-200 ml-1 pl-4 space-y-0.5 max-h-64 overflow-y-auto">
              {streamEvents.map((evt, i) => (
                <TimelineItem key={i} event={evt} />
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        {showResult && (
          <div className="space-y-4">
            {/* Completed timeline summary */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Analysis completed — {streamEvents.filter((e) => e.type === 'tool_call').length} tool calls,{' '}
                {result.iterations} iterations
              </div>
            </div>

            {/* Summary & metrics */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900">Analysis Result</h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    <PoundSterling className="w-3 h-3" /> Cost Analyst
                  </span>
                  <span className="text-xs text-gray-400">({result.iterations} iterations)</span>
                </div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                  <CheckCircle className="w-4 h-4" /> Auto-executed
                </span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{result.summary}</p>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-600">£{result.estimated_savings_gbp.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Est. savings/month</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{result.risk_score}</p>
                  <p className="text-xs text-gray-500">Risk score</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-700">{(result.reasoning_trace.confidence * 100).toFixed(0)}%</p>
                  <p className="text-xs text-gray-500">Confidence</p>
                </div>
              </div>
            </div>

            {/* Reasoning Trace */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <button onClick={() => setReasoningOpen(!reasoningOpen)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <span className="font-medium text-gray-900 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-primary-600" /> AI Reasoning Trace
                </span>
                {reasoningOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
              {reasoningOpen && (
                <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
                  {[
                    { label: 'Observation', value: result.reasoning_trace.observation, bg: 'bg-blue-50 border-blue-100', text: 'text-blue-700' },
                    { label: 'Hypothesis', value: result.reasoning_trace.hypothesis, bg: 'bg-purple-50 border-purple-100', text: 'text-purple-700' },
                    { label: 'Evidence', value: result.reasoning_trace.evidence, bg: 'bg-indigo-50 border-indigo-100', text: 'text-indigo-700' },
                    { label: 'Risk Assessment', value: result.reasoning_trace.risk, bg: 'bg-amber-50 border-amber-100', text: 'text-amber-700' },
                    { label: 'Recommendation', value: result.reasoning_trace.recommendation, bg: 'bg-green-50 border-green-100', text: 'text-green-700' },
                  ].map(({ label, value, bg, text }) => (
                    <div key={label} className={`${bg} border rounded-lg p-3`}>
                      <p className={`text-xs font-semibold ${text} mb-1`}>{label}</p>
                      <p className="text-sm text-gray-700">{value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Recommendations</h3>
              <div className="space-y-3">
                {result.recommendations.map((rec, i) => (
                  <div key={i} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{rec.resource_id}</span>
                        {tierBadge(rec.tier)}
                      </div>
                      <span className="text-sm font-bold text-primary-600">
                        £{rec.estimated_savings_gbp.toLocaleString()}/mo
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{rec.action}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>Confidence: {(rec.confidence * 100).toFixed(0)}%</span>
                    </div>
                    {rec.terraform && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-500">Terraform</span>
                          <button
                            onClick={() => { navigator.clipboard.writeText(rec.terraform!); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                            className="text-xs text-primary-600 hover:text-primary-800 flex items-center gap-1"
                          >
                            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copied ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                        <pre className="bg-gray-900 text-green-400 rounded-lg p-3 text-xs overflow-x-auto font-mono">{rec.terraform}</pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
