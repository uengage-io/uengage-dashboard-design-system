import { StatusBadge } from "@uengage/ui";
import { ArrowBigDown } from "lucide-react";

export default function Preview() {
  return (
    <>
      <StatusBadge
        label="Success"
        variant="success"
        size="xs"
        icon={<ArrowBigDown className="w-3 h-3" />
            
        }
        iconPosition="right"
      />
      <StatusBadge
        label="Warning"
        variant="warning"
        size="xs"
        icon={<ArrowBigDown className="w-3 h-3" />}
        width="w-160"
        iconPosition="right"
      />
      <StatusBadge
        label="Success"
        variant="error"
        size="xs"
        icon={<ArrowBigDown className="w-3 h-3" />}
        iconPosition="right"
      />
    </>
  );
}
