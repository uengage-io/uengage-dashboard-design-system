import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import { VariantProps } from 'class-variance-authority';
export { VariantProps } from 'class-variance-authority';

declare const bannerVariants: (props?: ({
    variant?: "info" | "success" | "error" | "warning" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BannerRootProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariants> {
}
declare const BannerRoot: React.ForwardRefExoticComponent<BannerRootProps & React.RefAttributes<HTMLDivElement>>;
declare const BannerIcon: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & React.RefAttributes<HTMLSpanElement>>;
declare const BannerContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

export { BannerContent, BannerIcon, BannerRoot, type BannerRootProps, bannerVariants };
