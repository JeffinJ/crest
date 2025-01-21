import { UserConnectionFormSchema } from "@/lib/zod-schemas/user-connections";
import { IconType } from "@icons-pack/react-simple-icons";
import { Icon, IconProps } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { z } from "zod";

// export type Connection = {
//     id: 2,
//     connectionName: string,
//     url: string,
// }

export type SocialConnection = {
    id: string;
    name: string;
    icon: IconType | ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
    color?: string;
};

export type CreateConnectionData = {
    userId: string;
    connectionName: string;
    url: string;
};

export interface Connection {
    id: number;
    userId: string;
    connectionName: string;
    url: string;
    createdAt: string;
    updatedAt: string;
}

export interface ConnectionFormData {
    connectionName: string;
    url: string;
}

export interface ConnectionFormProps {
    initialData?: ConnectionFormData;
    onSubmit: (data: ConnectionFormData) => void;
    isSubmitting?: boolean;
}

export interface CreateConnectionProps {
    onSuccess?: (data: Connection) => void;
    onError?: (error: Error) => void;
}


export type UserConnectionFormSchemaType = z.infer<typeof UserConnectionFormSchema>;