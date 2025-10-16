import React, { useState } from 'react';
import { useToast } from '../components/Toast';
import { 
  Download, 
  Terminal, 
  Package, 
  CheckCircle, 
  Copy,
  ExternalLink,
  Server,
  Monitor,
  Shield,
  GitBranch,
  Code,
  Settings
} from 'lucide-react';

const Installation = () => {
  const { showToast, ToastContainer } = useToast();
  const [copiedCommand, setCopiedCommand] = useState('');

  const copyToClipboard = (text, commandName) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCommand(commandName);
      showToast(`${commandName} copied to clipboard!`, 'success');
      setTimeout(() => setCopiedCommand(''), 2000);
    }).catch(() => {
      showToast('Failed to copy to clipboard', 'error');
    });
  };

  const installationSteps = [
    {
      id: 1,
      title: 'System Requirements',
      description: 'Ensure your system meets the minimum requirements',
      requirements: [
        'Node.js 18.0 or higher',
        'npm 8.0 or higher',
        'Windows 10/11, macOS 10.15+, or Linux',
        'Minimum 4GB RAM',
        'Administrative privileges'
      ]
    },
    {
      id: 2,
      title: 'Download AURA Agent',
      description: 'Download and install the AURA agent on target systems',
      commands: [
        {
          name: 'Windows PowerShell',
          command: 'Invoke-WebRequest -Uri "https://releases.aura.com/agent/windows/latest" -OutFile "aura-agent.msi"; Start-Process msiexec.exe -Wait -ArgumentList "/i aura-agent.msi /quiet"'
        },
        {
          name: 'Linux/macOS',
          command: 'curl -fsSL https://releases.aura.com/install.sh | sudo bash'
        }
      ]
    },
    {
      id: 3,
      title: 'Configure Agent',
      description: 'Set up the agent with your AURA dashboard',
      commands: [
        {
          name: 'Register Agent',
          command: 'aura-agent register --server https://your-aura-dashboard.com --token YOUR_API_TOKEN'
        },
        {
          name: 'Start Service',
          command: 'aura-agent start --daemon'
        }
      ]
    }
  ];

  const packages = [
    {
      category: 'Core Components',
      icon: <Package className="w-5 h-5" />,
      items: [
        { name: 'AURA Agent', version: 'v2.1.0', description: 'Main monitoring and management agent' },
        { name: 'AURA Dashboard', version: 'v1.8.2', description: 'Web-based management interface' },
        { name: 'AURA CLI', version: 'v1.5.1', description: 'Command-line interface tools' }
      ]
    },
    {
      category: 'Patch Management',
      icon: <Shield className="w-5 h-5" />,
      items: [
        { name: 'Patch Engine', version: 'v3.2.0', description: 'Automated patch deployment system' },
        { name: 'Rollback Manager', version: 'v2.0.1', description: 'Patch rollback and recovery tools' },
        { name: 'Update Scheduler', version: 'v1.9.3', description: 'Maintenance window management' }
      ]
    },
    {
      category: 'Monitoring & Alerts',
      icon: <Monitor className="w-5 h-5" />,
      items: [
        { name: 'Resource Monitor', version: 'v2.3.1', description: 'Real-time system monitoring' },
        { name: 'Alert Engine', version: 'v1.7.2', description: 'Intelligent alerting system' },
        { name: 'Analytics Module', version: 'v1.4.0', description: 'Performance analytics and reporting' }
      ]
    },
    {
      category: 'Configuration Management',
      icon: <GitBranch className="w-5 h-5" />,
      items: [
        { name: 'Drift Detector', version: 'v2.1.3', description: 'Configuration drift detection' },
        { name: 'Config Backup', version: 'v1.6.0', description: 'Configuration backup and restore' },
        { name: 'Version Control', version: 'v1.3.2', description: 'Git-style configuration versioning' }
      ]
    }
  ];

  const quickCommands = [
    {
      name: 'Check Agent Status',
      command: 'aura-agent status',
      description: 'Verify agent is running and connected'
    },
    {
      name: 'View Logs',
      command: 'aura-agent logs --tail 50',
      description: 'Display recent agent activity'
    },
    {
      name: 'Update Agent',
      command: 'aura-agent update --auto-restart',
      description: 'Update agent to latest version'
    },
    {
      name: 'Reset Configuration',
      command: 'aura-agent config reset --confirm',
      description: 'Reset agent to default settings'
    }
  ];

  return (
    <>
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: '#123458' }}>
                Installation Guide
              </h1>
              <p className="mt-2 opacity-70" style={{ color: '#123458' }}>
                Complete installation and setup instructions for AURA components
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button 
                onClick={() => window.open('https://docs.aura.com', '_blank')}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors" 
                style={{ backgroundColor: '#D4C9BE', color: '#123458' }}
              >
                <ExternalLink className="w-4 h-4 inline mr-2" />
                Documentation
              </button>
              <button 
                onClick={() => showToast('Downloading installation package...', 'info')}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors" 
                style={{ backgroundColor: '#123458', color: '#F1EFEC' }}
              >
                <Download className="w-4 h-4 inline mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Quick Actions - Left Side */}
          <div className="lg:col-span-1">
            <div className="rounded-xl shadow-sm sticky top-6" style={{ backgroundColor: '#FFFFFF' }}>
              <div className="p-4 border-b" style={{ borderColor: '#D4C9BE' }}>
                <h3 className="text-lg font-semibold" style={{ color: '#123458' }}>Quick Commands</h3>
              </div>
              <div className="p-4 space-y-3">
                {quickCommands.map((cmd, index) => (
                  <div key={index} className="space-y-2">
                    <button 
                      onClick={() => copyToClipboard(cmd.command, cmd.name)}
                      className="w-full text-left p-3 rounded-lg border transition-colors hover:bg-opacity-50"
                      style={{ backgroundColor: '#F1EFEC', borderColor: '#D4C9BE' }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium" style={{ color: '#123458' }}>
                          {cmd.name}
                        </span>
                        {copiedCommand === cmd.name ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 opacity-60" style={{ color: '#123458' }} />
                        )}
                      </div>
                      <code className="text-xs font-mono block p-2 rounded" style={{ backgroundColor: '#123458', color: '#F1EFEC' }}>
                        {cmd.command}
                      </code>
                      <p className="text-xs opacity-60 mt-1" style={{ color: '#123458' }}>
                        {cmd.description}
                      </p>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Installation Steps */}
            <div className="rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
              <div className="p-4 border-b" style={{ borderColor: '#D4C9BE' }}>
                <h3 className="text-lg font-semibold" style={{ color: '#123458' }}>Installation Steps</h3>
              </div>
              <div className="p-4">
                <div className="space-y-6">
                  {installationSteps.map((step) => (
                    <div key={step.id} className="relative">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
                            style={{ backgroundColor: '#123458' }}
                          >
                            {step.id}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold mb-2" style={{ color: '#123458' }}>
                            {step.title}
                          </h4>
                          <p className="text-sm opacity-70 mb-4" style={{ color: '#123458' }}>
                            {step.description}
                          </p>
                          
                          {step.requirements && (
                            <div className="space-y-2">
                              {step.requirements.map((req, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  <span className="text-sm" style={{ color: '#123458' }}>{req}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {step.commands && (
                            <div className="space-y-3">
                              {step.commands.map((cmd, index) => (
                                <div key={index} className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium" style={{ color: '#123458' }}>
                                      {cmd.name}
                                    </span>
                                    <button
                                      onClick={() => copyToClipboard(cmd.command, cmd.name)}
                                      className="flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors"
                                      style={{ backgroundColor: '#D4C9BE', color: '#123458' }}
                                    >
                                      {copiedCommand === cmd.name ? (
                                        <CheckCircle className="w-3 h-3" />
                                      ) : (
                                        <Copy className="w-3 h-3" />
                                      )}
                                      <span>Copy</span>
                                    </button>
                                  </div>
                                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#123458' }}>
                                    <code className="text-sm font-mono" style={{ color: '#F1EFEC' }}>
                                      {cmd.command}
                                    </code>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Package Information */}
            <div className="rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF' }}>
              <div className="p-4 border-b" style={{ borderColor: '#D4C9BE' }}>
                <h3 className="text-lg font-semibold" style={{ color: '#123458' }}>Available Packages</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {packages.map((category, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center space-x-2 mb-3">
                        <div style={{ color: '#123458' }}>{category.icon}</div>
                        <h4 className="font-semibold" style={{ color: '#123458' }}>
                          {category.category}
                        </h4>
                      </div>
                      <div className="space-y-2">
                        {category.items.map((item, itemIndex) => (
                          <div 
                            key={itemIndex} 
                            className="p-3 rounded-lg border"
                            style={{ backgroundColor: '#F1EFEC', borderColor: '#D4C9BE' }}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-sm" style={{ color: '#123458' }}>
                                {item.name}
                              </span>
                              <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#123458', color: '#F1EFEC' }}>
                                {item.version}
                              </span>
                            </div>
                            <p className="text-xs opacity-70" style={{ color: '#123458' }}>
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Installation;