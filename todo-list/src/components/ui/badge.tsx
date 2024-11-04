import { BadgeProps, badgeVariants } from "../@types/props";

function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <div className={`${badgeVariants({ variant })} ${className}`} {...props}>
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
