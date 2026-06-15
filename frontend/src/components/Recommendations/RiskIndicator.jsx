export const RiskIndicator = ({ risk }) => {
  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'high': return 'border-l-error';
      case 'medium': return 'border-l-[#FACC15]';
      default: return 'border-l-primary';
    }
  };

  const getRiskIcon = (level) => {
    switch (level?.toLowerCase()) {
      case 'high': return 'warning';
      case 'medium': return 'priority_high';
      default: return 'check_circle';
    }
  };

  const getRiskBg = (level) => {
    switch (level?.toLowerCase()) {
      case 'high': return 'bg-error/10';
      case 'medium': return 'bg-[#FACC15]/10';
      default: return 'bg-primary/10';
    }
  };

  if (!risk) return null;

  return (
    <div className={`bg-surface-container-lowest rounded-xl p-6 border-l-4 ${getRiskColor(risk.level)}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase">Current Alert</p>
          <h4 className="font-headline-sm text-headline-sm">{risk.level} Risk</h4>
        </div>
        <span className={`material-symbols-outlined text-3xl ${getRiskBg(risk.level)} rounded-full p-2`}>
          {getRiskIcon(risk.level)}
        </span>
      </div>
      <p className="font-body-md text-on-surface-variant mb-4">{risk.message}</p>
      <div className="flex items-center gap-4">
        <div className="flex-1 bg-surface-container-high h-2 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              risk.level === 'High' ? 'bg-error' : risk.level === 'Medium' ? 'bg-[#FACC15]' : 'bg-primary'
            }`}
            style={{ width: risk.level === 'High' ? '80%' : risk.level === 'Medium' ? '60%' : '30%' }}
          ></div>
        </div>
        <span className="font-label-md text-label-md">{risk.level === 'High' ? 'High Certainty' : risk.level === 'Medium' ? 'Medium Certainty' : 'Low Certainty'}</span>
      </div>
    </div>
  );
};