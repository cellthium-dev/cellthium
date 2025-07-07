import { CheckCircle2, CircleX, Info, TriangleAlert } from 'lucide-react';
import type React from 'react';

interface IBannerProps {
  readonly type: 'success' | 'error' | 'warning' | 'info';
  readonly title: string | React.ReactNode;
  readonly description: string | React.ReactNode;
}

export default function Banner(props: IBannerProps) {
  const getIcon = () => {
    switch (props.type) {
      case 'success':
        return <CheckCircle2 className="col-span-1 text-green-400" />;
      case 'error':
        return <CircleX className="col-span-1 text-red-400" />;
      case 'warning':
        return <TriangleAlert className="col-span-1 text-yellow-400" />;
      case 'info':
        return <Info className="col-span-1 text-blue-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-12 items-center space-x-2 rounded-md border bg-gray-100 p-4">
      {getIcon()}
      <div className="col-span-11 text-sm">
        <p className="font-semibold">{props.title}</p>
        <p>{props.description}</p>
      </div>
    </div>
  );
}
