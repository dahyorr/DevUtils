export type ThemeMode = 'light' | 'dark'

export interface NavChildItemProps {
    label: string;
    path: string;
    disabled: boolean;
    closeSidebar?: () => void;
}

export interface NavMainItemProps {
    label: string;
    dropdown: boolean;
    path?: string;
    icon: React.ReactNode;
    disabled?: boolean;
    links?: NavChildItemProps[];
}

export type HashType = 'sha256' | 'md5' | 'sha512' | 'sha224'

export type StatusType = "pending" | "failed" | "completed"

export interface HashData {
    type: HashType;
    hash: string;
    status: StatusType;
}

export interface HashRequest {
    fileId: string;
    hashTypes: HashType[];
}

export type UUIDVersion = 'v1' | 'v4'
