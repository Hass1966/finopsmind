// ── 30-day cost trend ──
const today = new Date();
const costTrend = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(today);
  d.setDate(d.getDate() - (29 - i));
  const base = 1500 + Math.sin(i / 4) * 200 + (i > 20 ? -100 : 0);
  return {
    date: d.toISOString().slice(0, 10),
    amount: Math.round(base + Math.random() * 150),
  };
});

// ── Provider breakdown ──
const providerBreakdown = [
  { name: 'AWS', amount: 29380, color: '#F97316' },
  { name: 'Azure', amount: 13267, color: '#3B82F6' },
  { name: 'GCP', amount: 4735, color: '#EF4444' },
];

// ── Top services ──
const topServices = [
  { name: 'Amazon EC2', amount: 12840 },
  { name: 'Amazon RDS', amount: 6420 },
  { name: 'Azure VMs', amount: 5380 },
  { name: 'Amazon S3', amount: 3210 },
  { name: 'AWS Lambda', amount: 2890 },
  { name: 'Azure SQL', amount: 2650 },
  { name: 'Amazon EKS', amount: 2180 },
  { name: 'GCP Compute', amount: 1812 },
];

// ── AI / GPU spend ──
const aiCosts = {
  total_ai_spend: 4280,
  currency: 'GBP',
  ai_share_pct: 9.0,
  by_service: [
    { name: 'SageMaker', amount: 1820 },
    { name: 'Bedrock', amount: 1260 },
    { name: 'GPU Instances', amount: 940 },
    { name: 'Azure OpenAI', amount: 260 },
  ],
  trend: Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (13 - i));
    return { date: d.toISOString().slice(0, 10), amount: 280 + Math.random() * 80 };
  }),
};

// ── Dashboard summary ──
const costSummary = {
  total_cost: 47382,
  currency: 'GBP',
  change_pct: -8.3,
  by_provider: providerBreakdown,
  by_service: topServices,
};

const recSummary = {
  total_savings: 12450,
  total_count: 34,
  by_status: { pending: 22, accepted: 8, implemented: 4 },
};

// ── Anomalies ──
const anomalies = [
  {
    id: 'anom-001',
    detected_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    service: 'Amazon EC2',
    provider: 'aws',
    severity: 'critical' as const,
    actual_amount: 4820,
    expected_amount: 2100,
    deviation_pct: 129.5,
    status: 'active' as const,
    description: 'EC2 spend in eu-west-1 spiked 130% above baseline due to unplanned GPU instance launches.',
    root_cause: 'Three p3.2xlarge instances launched by ML pipeline without budget approval.',
  },
  {
    id: 'anom-002',
    detected_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    service: 'Amazon RDS',
    provider: 'aws',
    severity: 'high' as const,
    actual_amount: 2340,
    expected_amount: 1500,
    deviation_pct: 56.0,
    status: 'active' as const,
    description: 'RDS Multi-AZ storage costs increased 56% due to automated snapshot retention change.',
    root_cause: 'Snapshot retention changed from 7 to 35 days via Terraform update.',
  },
  {
    id: 'anom-003',
    detected_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    service: 'Azure VMs',
    provider: 'azure',
    severity: 'medium' as const,
    actual_amount: 1890,
    expected_amount: 1400,
    deviation_pct: 35.0,
    status: 'acknowledged' as const,
    description: 'Azure VM spend in UK South rose 35% — dev cluster not scaled down after load test.',
    root_cause: 'Dev cluster auto-scaling max set to 12 nodes during load test, never reverted.',
  },
  {
    id: 'anom-004',
    detected_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    service: 'AWS Lambda',
    provider: 'aws',
    severity: 'low' as const,
    actual_amount: 820,
    expected_amount: 650,
    deviation_pct: 26.2,
    status: 'resolved' as const,
    description: 'Lambda invocation costs elevated due to retry storm from upstream timeout.',
    root_cause: 'API Gateway timeout set to 3s caused cascading retries on a slow downstream service.',
  },
  {
    id: 'anom-005',
    detected_at: new Date(Date.now() - 12 * 86400000).toISOString(),
    service: 'Amazon S3',
    provider: 'aws',
    severity: 'medium' as const,
    actual_amount: 1100,
    expected_amount: 780,
    deviation_pct: 41.0,
    status: 'active' as const,
    description: 'S3 data transfer costs spiked 41% — cross-region replication to us-east-1 unexpectedly active.',
    root_cause: 'Replication rule re-enabled by CloudFormation stack update.',
  },
];

// ── Recommendations ──
const recommendations = [
  {
    id: 'rec-001',
    rule_id: 'idle-ec2',
    resource_id: 'i-0a1b2c3d4e5f67890',
    resource_name: 'dev-api-server-03',
    provider: 'aws',
    type: 'idle_resource',
    title: 'Terminate idle EC2 instance',
    description: 'Instance has averaged 2.1% CPU over the last 14 days with no active connections.',
    estimated_savings: 186.40,
    risk_score: 15,
    status: 'pending',
    severity: 'medium',
    terraform: `resource "aws_instance" "dev_api_server_03" {
  # RECOMMENDATION: Terminate this idle instance
  # Savings: £186.40/month
  count = 0  # Set to 0 to terminate
}`,
  },
  {
    id: 'rec-002',
    rule_id: 'oversized-rds',
    resource_id: 'db-staging-analytics',
    resource_name: 'staging-analytics-db',
    provider: 'aws',
    type: 'rightsizing',
    title: 'Downsize RDS instance from db.r5.2xlarge to db.r5.large',
    description: 'Database averages 12% CPU and 8GB of 64GB RAM used. Safe to downsize 2 tiers.',
    estimated_savings: 520.00,
    risk_score: 25,
    status: 'pending',
    severity: 'high',
    terraform: `resource "aws_db_instance" "staging_analytics" {
  instance_class = "db.r5.large"  # Was db.r5.2xlarge
  # Savings: £520.00/month
}`,
  },
  {
    id: 'rec-003',
    rule_id: 'unattached-ebs',
    resource_id: 'vol-0f1e2d3c4b5a69870',
    resource_name: 'orphaned-data-vol',
    provider: 'aws',
    type: 'unused_resource',
    title: 'Delete unattached EBS volume',
    description: 'Volume has been unattached for 42 days. Last attached to terminated instance i-old12345.',
    estimated_savings: 92.16,
    risk_score: 10,
    status: 'pending',
    severity: 'low',
    terraform: null,
  },
  {
    id: 'rec-004',
    rule_id: 'graviton-migration',
    resource_id: 'i-prod-web-cluster',
    resource_name: 'prod-web-asg',
    provider: 'aws',
    type: 'graviton_migration',
    title: 'Migrate Auto Scaling Group to Graviton (ARM64)',
    description: 'Cluster of 6x m5.xlarge instances eligible for m7g.xlarge — 20% price reduction with equal or better performance.',
    estimated_savings: 648.00,
    risk_score: 35,
    status: 'accepted',
    severity: 'high',
    terraform: `resource "aws_launch_template" "prod_web" {
  instance_type = "m7g.xlarge"  # Was m5.xlarge
  # Graviton ARM64 — 20% savings
  # Savings: £648.00/month
}`,
  },
  {
    id: 'rec-005',
    rule_id: 'old-snapshots',
    resource_id: 'snap-batch-2024',
    resource_name: '147 snapshots older than 90 days',
    provider: 'aws',
    type: 'storage_optimization',
    title: 'Delete old EBS snapshots',
    description: '147 snapshots from terminated instances, oldest is 380 days. Total 4.2 TB.',
    estimated_savings: 210.00,
    risk_score: 20,
    status: 'pending',
    severity: 'medium',
    terraform: null,
  },
  {
    id: 'rec-006',
    rule_id: 'idle-elb',
    resource_id: 'alb-legacy-api',
    resource_name: 'legacy-api-lb',
    provider: 'aws',
    type: 'idle_resource',
    title: 'Remove idle Application Load Balancer',
    description: 'ALB has processed 0 requests in the last 30 days. All target groups empty.',
    estimated_savings: 24.50,
    risk_score: 5,
    status: 'implemented',
    severity: 'low',
    terraform: null,
  },
  {
    id: 'rec-007',
    rule_id: 'lambda-memory',
    resource_id: 'fn-image-processor',
    resource_name: 'image-processor',
    provider: 'aws',
    type: 'rightsizing',
    title: 'Reduce Lambda memory from 3008MB to 1024MB',
    description: 'Function peaks at 420MB memory. Reducing allocation will cut cost by 66% with no performance impact.',
    estimated_savings: 156.00,
    risk_score: 15,
    status: 'pending',
    severity: 'medium',
    terraform: `resource "aws_lambda_function" "image_processor" {
  memory_size = 1024  # Was 3008
  # Savings: £156.00/month
}`,
  },
  {
    id: 'rec-008',
    rule_id: 'nat-gateway',
    resource_id: 'nat-dev-vpc',
    resource_name: 'dev-vpc-nat',
    provider: 'aws',
    type: 'idle_resource',
    title: 'Replace NAT Gateway with NAT Instance in dev VPC',
    description: 'Dev VPC NAT Gateway processes <1GB/day. A t3.nano NAT instance would save 85%.',
    estimated_savings: 38.20,
    risk_score: 30,
    status: 'pending',
    severity: 'low',
    terraform: null,
  },
  {
    id: 'rec-009',
    rule_id: 'reserved-instance',
    resource_id: 'ri-opportunity-rds',
    resource_name: 'prod-primary-db',
    provider: 'aws',
    type: 'reserved_instance',
    title: 'Purchase 1-year Reserved Instance for production RDS',
    description: 'Instance has run 24/7 for 8 months. 1yr RI would save 35% vs on-demand.',
    estimated_savings: 840.00,
    risk_score: 40,
    status: 'pending',
    severity: 'high',
    terraform: null,
  },
  {
    id: 'rec-010',
    rule_id: 'azure-idle-vm',
    resource_id: 'vm-test-runner-02',
    resource_name: 'test-runner-02',
    provider: 'azure',
    type: 'idle_resource',
    title: 'Deallocate idle Azure VM',
    description: 'VM has been running with 0.5% CPU for 21 days. Last used for CI/CD testing.',
    estimated_savings: 142.80,
    risk_score: 10,
    status: 'pending',
    severity: 'medium',
    terraform: null,
  },
];

// ── Forecast data (30-day) ──
const forecastData = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(today);
  d.setDate(d.getDate() + i + 1);
  const base = 1580 - i * 8;
  return {
    date: d.toISOString().slice(0, 10),
    predicted: Math.round(base + Math.random() * 60),
    upper_bound: Math.round(base + 180 + Math.random() * 40),
    lower_bound: Math.round(base - 180 + Math.random() * 40),
  };
});

// ── Dynamic rules samples ──
const dynamicRules = [
  {
    id: 'dr-001',
    name: 'Idle GPU instances',
    description: 'Detect GPU instances with low utilisation outside business hours',
    enabled: true,
    cloud_provider: 'aws',
    resource_type: 'EC2 Instance',
    conditions_yaml: `conditions:
  - field: instance_type
    operator: starts_with
    value: "p3"
  - field: cpu_pattern
    operator: equals
    value: "idle"
  - field: monthly_cost_estimate
    operator: greater_than
    value: "500"`,
    recommendation_type: 'scheduled_shutdown',
    recommendation_template: 'Schedule shutdown for GPU instance {resource_id} outside business hours',
    severity: 'high',
    estimated_savings_formula: 'monthly_cost_estimate * 0.65',
    version: 2,
    last_evaluated_at: new Date(Date.now() - 3600000).toISOString(),
    match_count: 3,
    created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
  },
  {
    id: 'dr-002',
    name: 'Untagged production resources',
    description: 'Find resources missing the Environment tag in production accounts',
    enabled: true,
    cloud_provider: 'aws',
    resource_type: 'EC2 Instance',
    conditions_yaml: `conditions:
  - field: tag:Environment
    operator: is_null
  - field: account_id
    operator: in_list
    value: "111222333444,555666777888"`,
    recommendation_type: 'tagging_compliance',
    recommendation_template: 'Add Environment tag to {resource_id}',
    severity: 'medium',
    estimated_savings_formula: null,
    version: 1,
    last_evaluated_at: new Date(Date.now() - 7200000).toISOString(),
    match_count: 18,
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
  {
    id: 'dr-003',
    name: 'Oversized dev databases',
    description: 'RDS instances in dev accounts larger than db.t3.medium',
    enabled: false,
    cloud_provider: 'aws',
    resource_type: 'RDS Instance',
    conditions_yaml: `conditions:
  - field: tag:Environment
    operator: equals
    value: "development"
  - field: monthly_cost_estimate
    operator: greater_than
    value: "200"
any_of:
  - conditions:
    - field: instance_type
      operator: starts_with
      value: "db.r5"
    - field: instance_type
      operator: starts_with
      value: "db.r6g"`,
    recommendation_type: 'rightsizing',
    recommendation_template: 'Downsize dev RDS instance {resource_id} to db.t3.medium',
    severity: 'low',
    estimated_savings_formula: 'monthly_cost_estimate * 0.60',
    version: 1,
    last_evaluated_at: null,
    match_count: 0,
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
];

// ── Auto-execution config ──
const autoExecConfig = {
  enabled: true,
  max_savings_gbp: 500,
  max_risk_score: 40,
  allowed_categories: ['idle_resource', 'rightsizing', 'unused_resource', 'old_generation', 'unused_ebs', 'unused_eip'],
  excluded_environments: ['production'],
  excluded_tags: ['do-not-touch', 'manual-review'],
  execution_mode: 'aws_api',
  daily_execution_limit: 10,
  require_mfa_for_production: true,
};

// ── Streaming analysis demo events ──
const streamingDemoEvents = [
  { type: 'progress' as const, stage: 'snapshot', iteration: 0, message: 'Building architecture snapshot...', delay: 400 },
  { type: 'progress' as const, stage: 'rag', iteration: 0, message: 'Searching 50 similar past cases...', delay: 800 },
  { type: 'progress' as const, stage: 'routing', iteration: 0, message: 'Routing to cost_analyst specialist', delay: 300 },
  { type: 'progress' as const, stage: 'thinking', iteration: 1, message: 'Iteration 1 — analysing cost patterns', delay: 600 },
  { type: 'tool_call' as const, name: 'get_spend_trend', tool_use_id: 'tu-001', delay: 200 },
  { type: 'tool_call' as const, name: 'get_cost_anomalies', tool_use_id: 'tu-002', delay: 100 },
  { type: 'tool_result' as const, name: 'get_spend_trend', success: true, duration_ms: 142, delay: 800 },
  { type: 'tool_result' as const, name: 'get_cost_anomalies', success: true, duration_ms: 89, delay: 200 },
  { type: 'progress' as const, stage: 'thinking', iteration: 2, message: 'Iteration 2 — investigating EC2 spike', delay: 600 },
  { type: 'tool_call' as const, name: 'get_resource_with_profile', tool_use_id: 'tu-003', delay: 200 },
  { type: 'tool_call' as const, name: 'get_cost_trend_for_resource', tool_use_id: 'tu-004', delay: 100 },
  { type: 'tool_result' as const, name: 'get_resource_with_profile', success: true, duration_ms: 234, delay: 900 },
  { type: 'tool_result' as const, name: 'get_cost_trend_for_resource', success: true, duration_ms: 178, delay: 200 },
  { type: 'progress' as const, stage: 'thinking', iteration: 3, message: 'Iteration 3 — generating recommendations', delay: 700 },
  { type: 'tool_call' as const, name: 'generate_terraform_plan', tool_use_id: 'tu-005', delay: 300 },
  { type: 'tool_result' as const, name: 'generate_terraform_plan', success: true, duration_ms: 456, delay: 1000 },
  { type: 'reasoning' as const, trace: { observation: 'EC2 spend spiked 40% due to 3 unplanned p3.2xlarge GPU instances', hypothesis: 'ML pipeline auto-launched GPU instances without budget gates', evidence: 'CloudTrail shows RunInstances calls from ml-pipeline IAM role at 02:14 UTC', confidence: 0.92, risk: 'Medium — instances are not serving production traffic', recommendation: 'Terminate idle GPU instances and add budget-gated approval to ML pipeline' }, delay: 500 },
];

const demoAnalysisResult = {
  id: 'analysis-demo-001',
  summary: `Your EC2 costs spiked 40% last week due to three p3.2xlarge GPU instances launched by the ML training pipeline at 02:14 UTC on Monday. These instances have been running continuously but show <5% GPU utilisation since Wednesday, suggesting the training job completed but instances were not terminated.

The spike adds approximately £2,720/month to your bill. I recommend:

1. Immediately terminate the three idle GPU instances (£2,720/mo savings)
2. Add a CloudWatch alarm + Lambda auto-termination for GPU instances idle >4 hours
3. Implement a budget gate in the ML pipeline requiring approval for instance types costing >£500/mo

Combined with the 8 other idle resources I found, total recoverable savings are £3,847/month.`,
  reasoning_trace: {
    observation: 'EC2 spend spiked 40% — three p3.2xlarge instances running idle in eu-west-1',
    hypothesis: 'ML pipeline auto-launched GPU instances without budget controls or auto-termination',
    evidence: 'CloudTrail RunInstances from ml-pipeline role at 02:14 UTC; GPU utilisation <5% since Wednesday; no active training jobs',
    confidence: 0.92,
    risk: 'Low — instances serve no production traffic. Termination is safe.',
    recommendation: 'Terminate idle GPU instances, add CloudWatch auto-termination, implement budget gate',
  },
  recommendations: [
    {
      resource_id: 'i-0abc123def456 (x3 instances)',
      action: 'Terminate idle p3.2xlarge GPU instances',
      terraform: `resource "aws_instance" "ml_gpu" {
  count = 0  # Terminate all 3 idle GPU instances
  # Previous: count = 3, instance_type = "p3.2xlarge"
  # Savings: £2,720/month
}`,
      estimated_savings_gbp: 2720,
      tier: 'auto_executable',
      confidence: 0.95,
    },
    {
      resource_id: 'ml-pipeline-config',
      action: 'Add budget gate to ML pipeline — require approval for instances >£500/mo',
      terraform: null,
      estimated_savings_gbp: 0,
      tier: 'approval_required',
      confidence: 0.88,
    },
    {
      resource_id: 'cw-alarm-gpu-idle',
      action: 'Create CloudWatch alarm + Lambda to auto-terminate GPU instances idle >4 hours',
      terraform: `resource "aws_cloudwatch_metric_alarm" "gpu_idle" {
  alarm_name          = "gpu-idle-auto-terminate"
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = 4
  metric_name         = "GPUUtilization"
  namespace           = "CWAgent"
  period              = 3600
  statistic           = "Average"
  threshold           = 5
  alarm_actions       = [aws_lambda_function.terminate_idle.arn]
}`,
      estimated_savings_gbp: 1127,
      tier: 'approval_required',
      confidence: 0.85,
    },
  ],
  risk_score: 18,
  estimated_savings_gbp: 3847,
  requires_approval: false,
  iterations: 3,
  created_at: new Date().toISOString(),
};

// ── Built-in rules summary for rules engine section ──
const builtinRulesPreview = [
  { id: 'idle-ec2', name: 'Idle EC2 Instances', provider: 'aws', threshold: 'CPU < 5%', category: 'Idle Resource' },
  { id: 'oversized-rds', name: 'Oversized RDS', provider: 'aws', threshold: 'CPU < 15%, RAM < 25%', category: 'Rightsizing' },
  { id: 'unattached-ebs', name: 'Unattached EBS Volumes', provider: 'aws', threshold: 'Unattached > 7 days', category: 'Unused Resource' },
  { id: 'old-snapshots', name: 'Old EBS Snapshots', provider: 'aws', threshold: 'Age > 90 days', category: 'Storage' },
  { id: 'graviton-migration', name: 'Graviton Migration', provider: 'aws', threshold: 'x86 → ARM eligible', category: 'Migration' },
  { id: 'lambda-memory', name: 'Lambda Memory Optimisation', provider: 'aws', threshold: 'Used < 40% allocated', category: 'Rightsizing' },
  { id: 'nat-gateway', name: 'NAT Gateway Optimisation', provider: 'aws', threshold: '< 1GB/day throughput', category: 'Idle Resource' },
  { id: 'reserved-instance', name: 'Reserved Instance Opportunity', provider: 'aws', threshold: 'On-demand > 6 months', category: 'Commitment' },
  { id: 'idle-elb', name: 'Idle Load Balancers', provider: 'aws', threshold: '0 requests / 30 days', category: 'Idle Resource' },
  { id: 'savings-plan', name: 'Savings Plan Gaps', provider: 'aws', threshold: 'Coverage < 70%', category: 'Commitment' },
  { id: 'azure-idle-vm', name: 'Idle Azure VMs', provider: 'azure', threshold: 'CPU < 5%', category: 'Idle Resource' },
  { id: 'gcp-idle-compute', name: 'Idle GCP Instances', provider: 'gcp', threshold: 'CPU < 5%', category: 'Idle Resource' },
];

// ── Budgets ──
const budgets = [
  { id: 'bud-001', name: 'AWS Production', amount: 35000, current_spend: 25550, period: 'monthly', provider: 'aws', alert_threshold: 80, status: 'on_track' },
  { id: 'bud-002', name: 'Azure Dev/Test', amount: 8000, current_spend: 7120, period: 'monthly', provider: 'azure', alert_threshold: 75, status: 'warning' },
  { id: 'bud-003', name: 'GCP Analytics', amount: 5000, current_spend: 2840, period: 'monthly', provider: 'gcp', alert_threshold: 80, status: 'on_track' },
  { id: 'bud-004', name: 'ML/AI Workloads', amount: 6000, current_spend: 5980, period: 'monthly', provider: 'aws', alert_threshold: 90, status: 'critical' },
  { id: 'bud-005', name: 'Q2 Total Cloud', amount: 150000, current_spend: 98400, period: 'quarterly', provider: 'all', alert_threshold: 85, status: 'on_track' },
];

// ── Remediations ──
const remediations = [
  { id: 'rem-001', recommendation_id: 'rec-004', title: 'Migrate prod-web-asg to Graviton', status: 'pending_approval', risk_score: 35, estimated_savings: 648, created_at: new Date(Date.now() - 86400000).toISOString(), requested_by: 'AI Agent — Cost Analyst', execution_mode: 'github_pr', terraform: true },
  { id: 'rem-002', recommendation_id: 'rec-009', title: 'Purchase 1-year RI for prod-primary-db', status: 'approved', risk_score: 40, estimated_savings: 840, created_at: new Date(Date.now() - 2 * 86400000).toISOString(), requested_by: 'AI Agent — Cost Analyst', execution_mode: 'servicenow', terraform: false, approved_by: 'hassan@finopsmind.com', approved_at: new Date(Date.now() - 86400000).toISOString() },
  { id: 'rem-003', recommendation_id: 'rec-001', title: 'Terminate idle dev-api-server-03', status: 'executed', risk_score: 15, estimated_savings: 186.40, created_at: new Date(Date.now() - 5 * 86400000).toISOString(), requested_by: 'Auto-Execution Engine', execution_mode: 'aws_api', terraform: false, executed_at: new Date(Date.now() - 5 * 86400000).toISOString() },
  { id: 'rem-004', recommendation_id: 'rec-006', title: 'Remove idle legacy-api-lb', status: 'executed', risk_score: 5, estimated_savings: 24.50, created_at: new Date(Date.now() - 8 * 86400000).toISOString(), requested_by: 'Auto-Execution Engine', execution_mode: 'aws_api', terraform: false, executed_at: new Date(Date.now() - 8 * 86400000).toISOString() },
  { id: 'rem-005', recommendation_id: 'rec-002', title: 'Downsize staging-analytics-db', status: 'rejected', risk_score: 25, estimated_savings: 520, created_at: new Date(Date.now() - 3 * 86400000).toISOString(), requested_by: 'AI Agent — Cost Analyst', execution_mode: 'github_pr', terraform: true, rejected_by: 'ops-lead@finopsmind.com', rejected_reason: 'Staging load test next week — defer until June' },
];

// ── Resource inventory ──
const inventory = [
  { id: 'i-0a1b2c3d4e5f67890', name: 'dev-api-server-03', type: 'EC2 Instance', provider: 'aws', region: 'eu-west-1', status: 'running', instance_type: 'm5.large', monthly_cost: 186.40, cpu_avg: 2.1, tags: { Environment: 'development', Team: 'backend' } },
  { id: 'i-prod-web-01', name: 'prod-web-01', type: 'EC2 Instance', provider: 'aws', region: 'eu-west-1', status: 'running', instance_type: 'm5.xlarge', monthly_cost: 216.00, cpu_avg: 45.2, tags: { Environment: 'production', Team: 'platform' } },
  { id: 'i-prod-web-02', name: 'prod-web-02', type: 'EC2 Instance', provider: 'aws', region: 'eu-west-1', status: 'running', instance_type: 'm5.xlarge', monthly_cost: 216.00, cpu_avg: 52.8, tags: { Environment: 'production', Team: 'platform' } },
  { id: 'db-staging-analytics', name: 'staging-analytics-db', type: 'RDS Instance', provider: 'aws', region: 'eu-west-1', status: 'available', instance_type: 'db.r5.2xlarge', monthly_cost: 1040.00, cpu_avg: 12.0, tags: { Environment: 'staging', Team: 'data' } },
  { id: 'db-prod-primary', name: 'prod-primary-db', type: 'RDS Instance', provider: 'aws', region: 'eu-west-1', status: 'available', instance_type: 'db.r5.xlarge', monthly_cost: 520.00, cpu_avg: 38.5, tags: { Environment: 'production', Team: 'platform' } },
  { id: 'vol-0f1e2d3c4b5a69870', name: 'orphaned-data-vol', type: 'EBS Volume', provider: 'aws', region: 'eu-west-1', status: 'available', instance_type: 'gp3 / 500GB', monthly_cost: 92.16, cpu_avg: 0, tags: {} },
  { id: 'fn-image-processor', name: 'image-processor', type: 'Lambda Function', provider: 'aws', region: 'eu-west-1', status: 'active', instance_type: '3008 MB', monthly_cost: 234.00, cpu_avg: 0, tags: { Environment: 'production', Team: 'media' } },
  { id: 'vm-test-runner-02', name: 'test-runner-02', type: 'Azure VM', provider: 'azure', region: 'uksouth', status: 'running', instance_type: 'Standard_D4s_v3', monthly_cost: 142.80, cpu_avg: 0.5, tags: { Environment: 'development', Team: 'qa' } },
  { id: 'gce-analytics-01', name: 'analytics-worker-01', type: 'GCP Compute', provider: 'gcp', region: 'europe-west2', status: 'running', instance_type: 'n2-standard-4', monthly_cost: 168.00, cpu_avg: 28.4, tags: { Environment: 'production', Team: 'data' } },
  { id: 'alb-legacy-api', name: 'legacy-api-lb', type: 'Load Balancer', provider: 'aws', region: 'eu-west-1', status: 'active', instance_type: 'ALB', monthly_cost: 24.50, cpu_avg: 0, tags: { Environment: 'legacy' } },
  { id: 'nat-dev-vpc', name: 'dev-vpc-nat', type: 'NAT Gateway', provider: 'aws', region: 'eu-west-1', status: 'active', instance_type: 'NAT Gateway', monthly_cost: 44.94, cpu_avg: 0, tags: { Environment: 'development', VPC: 'dev-vpc' } },
  { id: 'eks-prod-01', name: 'prod-eks-cluster', type: 'EKS Cluster', provider: 'aws', region: 'eu-west-1', status: 'active', instance_type: '6 nodes', monthly_cost: 892.00, cpu_avg: 62.3, tags: { Environment: 'production', Team: 'platform' } },
];

// ── Cost allocations by tag ──
const allocations = {
  by_team: [
    { name: 'Platform', cost: 14280, percentage: 30.1 },
    { name: 'Data', cost: 9840, percentage: 20.8 },
    { name: 'Backend', cost: 8920, percentage: 18.8 },
    { name: 'Media', cost: 5640, percentage: 11.9 },
    { name: 'QA', cost: 3420, percentage: 7.2 },
    { name: 'ML/AI', cost: 3180, percentage: 6.7 },
    { name: 'Untagged', cost: 2102, percentage: 4.4 },
  ],
  by_environment: [
    { name: 'Production', cost: 28420, percentage: 60.0 },
    { name: 'Staging', cost: 8240, percentage: 17.4 },
    { name: 'Development', cost: 6580, percentage: 13.9 },
    { name: 'Legacy', cost: 2040, percentage: 4.3 },
    { name: 'Untagged', cost: 2102, percentage: 4.4 },
  ],
  untagged_resources: 14,
  total_resources: 312,
};

// ── Policies ──
const policies = [
  { id: 'pol-001', name: 'Production cost ceiling', type: 'cost_limit', mode: 'enforce', target: 'tag:Environment=production', threshold: '£40,000/month', violations: 0, status: 'compliant' },
  { id: 'pol-002', name: 'Required tagging', type: 'tagging', mode: 'enforce', target: 'All resources', threshold: 'Environment, Team, Owner', violations: 14, status: 'violated' },
  { id: 'pol-003', name: 'EU region only', type: 'region_restriction', mode: 'audit', target: 'All accounts', threshold: 'eu-west-1, eu-west-2, uksouth, europe-west2', violations: 2, status: 'violated' },
  { id: 'pol-004', name: 'No GPU without approval', type: 'resource_type', mode: 'enforce', target: 'Non-ML accounts', threshold: 'p3.*, p4.*, g4dn.*', violations: 3, status: 'violated' },
  { id: 'pol-005', name: 'Dev environment spend cap', type: 'cost_limit', mode: 'audit', target: 'tag:Environment=development', threshold: '£10,000/month', violations: 0, status: 'compliant' },
  { id: 'pol-006', name: 'S3 public access block', type: 'security', mode: 'enforce', target: 'All S3 buckets', threshold: 'Block all public access', violations: 1, status: 'violated' },
];

// ── Reports (executive summary) ──
const executiveSummary = {
  period: 'May 2026',
  total_cost: 47382,
  previous_cost: 51680,
  change_pct: -8.3,
  savings_realised: 12450,
  savings_pending: 8920,
  anomalies_detected: 5,
  anomalies_resolved: 2,
  recommendations_generated: 34,
  recommendations_implemented: 4,
  carbon_footprint: { total_tco2e: 2.4, change_pct: -12, energy_kwh: 8420 },
  top_savings: [
    { action: 'Terminated 3 idle GPU instances', savings: 2720 },
    { action: 'Removed legacy ALB', savings: 24.50 },
    { action: 'Reserved Instance purchase (RDS)', savings: 840 },
    { action: 'Lambda memory optimisation', savings: 156 },
  ],
};

export {
  costTrend,
  providerBreakdown,
  topServices,
  aiCosts,
  costSummary,
  recSummary,
  anomalies,
  recommendations,
  forecastData,
  dynamicRules,
  autoExecConfig,
  streamingDemoEvents,
  demoAnalysisResult,
  builtinRulesPreview,
  budgets,
  remediations,
  inventory,
  allocations,
  policies,
  executiveSummary,
};
