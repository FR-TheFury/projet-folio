
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Zap, ZapOff } from 'lucide-react';

interface PerformanceToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const PerformanceToggle = ({ enabled, onToggle }: PerformanceToggleProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-3 py-2">
      <div className="flex items-center gap-2 text-cyan-400 text-sm font-mono">
        {enabled ? <Zap className="w-4 h-4" /> : <ZapOff className="w-4 h-4" />}
        <span>{enabled ? 'FX ON' : 'FX OFF'}</span>
      </div>
      <Switch
        checked={enabled}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-cyan-500"
      />
    </div>
  );
};

export default PerformanceToggle;
