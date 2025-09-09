import { AlertTriangle, Info, ShieldCheck } from "lucide-react";

type Alert = {
  id: string;
  severity: "critical" | "warning" | "info";
  message: string;
  timestamp: string;
};

const alerts: Alert[] = [
  {
    id: "A001",
    severity: "critical",
    message: "Product A 생산량 15% 미달",
    timestamp: "2시간 전",
  },
  {
    id: "A002",
    severity: "warning",
    message: "원자재 B 가격 10% 급등",
    timestamp: "8시간 전",
  },
  {
    id: "A003",
    severity: "warning",
    message: "유럽 지역 판매량 예측치 하회",
    timestamp: "1일 전",
  },
  {
    id: "A004",
    severity: "info",
    message: "시스템 정기 점검 완료",
    timestamp: "2일 전",
  },
];

const severityIcons = {
  critical: <AlertTriangle className="h-5 w-5 text-red-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
};

const severityColors = {
  critical: "text-red-500",
  warning: "text-yellow-500",
  info: "text-blue-500",
};

export default function AlertsCard() {
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div key={alert.id} className="flex items-start gap-4">
          <div className="mt-1">{severityIcons[alert.severity]}</div>
          <div className="flex-1">
            <p
              className={`font-medium ${
                severityColors[alert.severity]
              }`}
            >
              {alert.message}
            </p>
            <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
