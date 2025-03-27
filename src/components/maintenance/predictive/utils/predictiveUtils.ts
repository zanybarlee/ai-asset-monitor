
// Risk score thresholds 
export const RISK_LOW = 0.3;
export const RISK_MEDIUM = 0.6;

export const getRiskColor = (riskScore: number): string => {
  if (riskScore < RISK_LOW) return "text-emerald-500";
  if (riskScore < RISK_MEDIUM) return "text-amber-500";
  return "text-red-500";
};

export const getRiskBgColor = (riskScore: number): string => {
  if (riskScore < RISK_LOW) return "bg-emerald-500/10 border-emerald-500/30";
  if (riskScore < RISK_MEDIUM) return "bg-amber-500/10 border-amber-500/30";
  return "bg-red-500/10 border-red-500/30";
};
