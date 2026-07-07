type StatusBadgeProps = {
  isActive: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
};

function StatusBadge({
  isActive,
  activeLabel = 'Active',
  inactiveLabel = 'Inactive',
}: StatusBadgeProps) {
  return (
    <span
      className={
        isActive
          ? 'ui-status-badge ui-status-badge-active'
          : 'ui-status-badge ui-status-badge-inactive'
      }
    >
      {isActive ? activeLabel : inactiveLabel}
    </span>
  );
}

export default StatusBadge;