import { IconType } from "@icons-pack/react-simple-icons";
import { Icon, IconProps } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type Connection = {
    id: 2,
    connectionName: string,
    url: string,
}

export type SocialConnection = {
    id: string;
    name: string;
    icon: IconType | ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
    color?: string;
};