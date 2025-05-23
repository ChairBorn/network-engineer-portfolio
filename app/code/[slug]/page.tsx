import { ArrowLeft, Calendar, Clock, Code } from "lucide-react"
import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { Badge } from "@/components/ui/badge"

export default function CodeTutorialPage({ params }: { params: { slug: string } }) {
  // This would typically come from a CMS or database
  const tutorial = {
    title: "Network Automation with Python",
    date: "May 20, 2023",
    readTime: "15 min read",
    category: "Automation",
    description: "Complete guide to automating network tasks using Python with practical examples",
    content: `
# Network Automation with Python

Network automation is essential for modern network management. This tutorial covers practical Python scripts for automating common network tasks.

## Getting Started

First, let's set up our environment and install the necessary libraries.

### Installation

Install the required Python packages:

\`\`\`bash
pip install netmiko paramiko requests
\`\`\`

## Device Connection

Here's how to establish a connection to network devices:
    `,
    codeSnippets: [
      {
        id: 1,
        title: "Basic Device Connection",
        description: "Establishing SSH connection to network devices using Netmiko",
        language: "python",
        code: `import netmiko
from netmiko import ConnectHandler

# Device connection parameters
device = {
    'device_type': 'cisco_ios',
    'host': '192.168.1.1',
    'username': 'admin',
    'password': 'password',
    'port': 22,
    'timeout': 20,
    'global_delay_factor': 1,
}

try:
    # Establish connection
    connection = ConnectHandler(**device)
    print(f"Connected to {device['host']}")
    
    # Send command
    output = connection.send_command('show version')
    print(output)
    
    # Close connection
    connection.disconnect()
    
except Exception as e:
    print(f"Connection failed: {e}")`,
      },
      {
        id: 2,
        title: "Configuration Backup",
        description: "Automated backup of device configurations",
        language: "python",
        code: `import os
from datetime import datetime
from netmiko import ConnectHandler

def backup_config(device_info, backup_dir="backups"):
    """
    Backup device configuration to a file
    """
    # Create backup directory if it doesn't exist
    if not os.path.exists(backup_dir):
        os.makedirs(backup_dir)
    
    try:
        # Connect to device
        connection = ConnectHandler(**device_info)
        
        # Get running configuration
        config = connection.send_command('show running-config')
        
        # Generate filename with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{device_info['host']}_{timestamp}.cfg"
        filepath = os.path.join(backup_dir, filename)
        
        # Save configuration to file
        with open(filepath, 'w') as f:
            f.write(config)
        
        print(f"Configuration backed up to {filepath}")
        
        # Disconnect
        connection.disconnect()
        
        return filepath
        
    except Exception as e:
        print(f"Backup failed for {device_info['host']}: {e}")
        return None

# Example usage
devices = [
    {
        'device_type': 'cisco_ios',
        'host': '192.168.1.1',
        'username': 'admin',
        'password': 'password',
    },
    {
        'device_type': 'cisco_ios',
        'host': '192.168.1.2',
        'username': 'admin',
        'password': 'password',
    }
]

for device in devices:
    backup_config(device)`,
      },
      {
        id: 3,
        title: "Bulk Configuration Deployment",
        description: "Deploy configurations to multiple devices simultaneously",
        language: "python",
        code: `import threading
from concurrent.futures import ThreadPoolExecutor
from netmiko import ConnectHandler

def deploy_config(device_info, config_commands):
    """
    Deploy configuration commands to a single device
    """
    try:
        connection = ConnectHandler(**device_info)
        
        # Enter configuration mode
        output = connection.send_config_set(config_commands)
        
        # Save configuration
        save_output = connection.send_command('write memory')
        
        connection.disconnect()
        
        return {
            'host': device_info['host'],
            'status': 'success',
            'output': output
        }
        
    except Exception as e:
        return {
            'host': device_info['host'],
            'status': 'failed',
            'error': str(e)
        }

def bulk_deploy(devices, config_commands, max_workers=5):
    """
    Deploy configuration to multiple devices concurrently
    """
    results = []
    
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        # Submit all tasks
        futures = [
            executor.submit(deploy_config, device, config_commands)
            for device in devices
        ]
        
        # Collect results
        for future in futures:
            result = future.result()
            results.append(result)
            
            if result['status'] == 'success':
                print(f"✓ {result['host']}: Configuration deployed successfully")
            else:
                print(f"✗ {result['host']}: {result['error']}")
    
    return results

# Example configuration commands
config_commands = [
    'interface GigabitEthernet0/1',
    'description Uplink to Core Switch',
    'no shutdown',
    'exit',
    'ntp server 192.168.1.100'
]

# Deploy to all devices
results = bulk_deploy(devices, config_commands)`,
      },
      {
        id: 4,
        title: "Network Monitoring Script",
        description: "Monitor network device status and performance metrics",
        language: "python",
        code: `import time
import json
from datetime import datetime
from netmiko import ConnectHandler

class NetworkMonitor:
    def __init__(self, devices):
        self.devices = devices
        self.monitoring = False
    
    def get_device_status(self, device_info):
        """
        Get status information from a network device
        """
        try:
            connection = ConnectHandler(**device_info)
            
            # Collect various metrics
            uptime = connection.send_command('show version | include uptime')
            cpu = connection.send_command('show processes cpu | include CPU')
            memory = connection.send_command('show memory | include Processor')
            interfaces = connection.send_command('show ip interface brief')
            
            connection.disconnect()
            
            return {
                'host': device_info['host'],
                'timestamp': datetime.now().isoformat(),
                'status': 'online',
                'uptime': uptime.strip(),
                'cpu': cpu.strip(),
                'memory': memory.strip(),
                'interface_count': len(interfaces.split('\\n')) - 1
            }
            
        except Exception as e:
            return {
                'host': device_info['host'],
                'timestamp': datetime.now().isoformat(),
                'status': 'offline',
                'error': str(e)
            }
    
    def monitor_devices(self, interval=300):
        """
        Continuously monitor devices at specified interval (seconds)
        """
        self.monitoring = True
        
        while self.monitoring:
            print(f"\\n--- Monitoring Report: {datetime.now()} ---")
            
            for device in self.devices:
                status = self.get_device_status(device)
                
                if status['status'] == 'online':
                    print(f"✓ {status['host']}: Online - {status['uptime']}")
                else:
                    print(f"✗ {status['host']}: Offline - {status['error']}")
                
                # Save to log file
                with open('network_monitor.log', 'a') as f:
                    f.write(json.dumps(status) + '\\n')
            
            time.sleep(interval)
    
    def stop_monitoring(self):
        """
        Stop the monitoring loop
        """
        self.monitoring = False

# Example usage
monitor = NetworkMonitor(devices)

# Start monitoring (runs every 5 minutes)
try:
    monitor.monitor_devices(interval=300)
except KeyboardInterrupt:
    print("\\nMonitoring stopped by user")
    monitor.stop_monitoring()`,
      },
      {
        id: 5,
        title: "VLAN Management Automation",
        description: "Automate VLAN creation and management across multiple switches",
        language: "python",
        code: `from netmiko import ConnectHandler
import csv

class VLANManager:
    def __init__(self, switches):
        self.switches = switches
    
    def create_vlan(self, device_info, vlan_id, vlan_name):
        """
        Create a VLAN on a single switch
        """
        config_commands = [
            f'vlan {vlan_id}',
            f'name {vlan_name}',
            'exit'
        ]
        
        try:
            connection = ConnectHandler(**device_info)
            output = connection.send_config_set(config_commands)
            connection.send_command('write memory')
            connection.disconnect()
            
            return True, f"VLAN {vlan_id} created successfully"
            
        except Exception as e:
            return False, str(e)
    
    def assign_vlan_to_interface(self, device_info, interface, vlan_id, mode='access'):
        """
        Assign VLAN to an interface
        """
        config_commands = [
            f'interface {interface}',
            f'switchport mode {mode}',
        ]
        
        if mode == 'access':
            config_commands.append(f'switchport access vlan {vlan_id}')
        elif mode == 'trunk':
            config_commands.append(f'switchport trunk allowed vlan add {vlan_id}')
        
        config_commands.append('no shutdown')
        config_commands.append('exit')
        
        try:
            connection = ConnectHandler(**device_info)
            output = connection.send_config_set(config_commands)
            connection.send_command('write memory')
            connection.disconnect()
            
            return True, f"Interface {interface} configured for VLAN {vlan_id}"
            
        except Exception as e:
            return False, str(e)
    
    def bulk_vlan_deployment(self, vlan_config_file):
        """
        Deploy VLANs from CSV configuration file
        CSV format: switch_ip,vlan_id,vlan_name,interface,mode
        """
        results = []
        
        with open(vlan_config_file, 'r') as file:
            reader = csv.DictReader(file)
            
            for row in reader:
                switch_ip = row['switch_ip']
                vlan_id = row['vlan_id']
                vlan_name = row['vlan_name']
                interface = row['interface']
                mode = row['mode']
                
                # Find switch configuration
                switch_config = None
                for switch in self.switches:
                    if switch['host'] == switch_ip:
                        switch_config = switch
                        break
                
                if not switch_config:
                    results.append({
                        'switch': switch_ip,
                        'action': 'create_vlan',
                        'status': 'failed',
                        'message': 'Switch configuration not found'
                    })
                    continue
                
                # Create VLAN
                success, message = self.create_vlan(switch_config, vlan_id, vlan_name)
                results.append({
                    'switch': switch_ip,
                    'action': 'create_vlan',
                    'vlan_id': vlan_id,
                    'status': 'success' if success else 'failed',
                    'message': message
                })
                
                # Assign to interface if specified
                if interface:
                    success, message = self.assign_vlan_to_interface(
                        switch_config, interface, vlan_id, mode
                    )
                    results.append({
                        'switch': switch_ip,
                        'action': 'assign_interface',
                        'interface': interface,
                        'vlan_id': vlan_id,
                        'status': 'success' if success else 'failed',
                        'message': message
                    })
        
        return results

# Example usage
switches = [
    {
        'device_type': 'cisco_ios',
        'host': '192.168.1.10',
        'username': 'admin',
        'password': 'password',
    },
    {
        'device_type': 'cisco_ios',
        'host': '192.168.1.11',
        'username': 'admin',
        'password': 'password',
    }
]

vlan_manager = VLANManager(switches)

# Deploy VLANs from CSV file
results = vlan_manager.bulk_vlan_deployment('vlan_config.csv')

for result in results:
    status_icon = "✓" if result['status'] == 'success' else "✗"
    print(f"{status_icon} {result['switch']} - {result['action']}: {result['message']}")`,
      },
    ],
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <Link href="/code" className="flex items-center text-sm font-medium text-gray-500 hover:text-black mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Code Examples
        </Link>

        <div className="card-3d-container rounded-xl p-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="bg-white/50">
                {tutorial.category}
              </Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="mr-1 h-4 w-4" />
                {tutorial.date}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-1 h-4 w-4" />
                {tutorial.readTime}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Code className="mr-1 h-4 w-4" />
                {tutorial.codeSnippets.length} snippets
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{tutorial.title}</h1>
            <p className="mt-4 text-gray-500 text-lg">{tutorial.description}</p>
          </div>

          <div className="prose prose-gray max-w-none dark:prose-invert mb-12">
            <div dangerouslySetInnerHTML={{ __html: tutorial.content.replace(/\n/g, "<br>") }} />
          </div>

          <div className="space-y-12">
            {tutorial.codeSnippets.map((snippet, index) => (
              <div key={snippet.id} className="card-3d rounded-lg p-6">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      Snippet {index + 1}
                    </Badge>
                    <Badge variant="outline" className="bg-white/50">
                      {snippet.language}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold">{snippet.title}</h3>
                  <p className="text-gray-600 mt-1">{snippet.description}</p>
                </div>
                <CodeBlock code={snippet.code} language={snippet.language} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
