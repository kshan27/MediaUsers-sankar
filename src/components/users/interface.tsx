export interface UserData {
    id: number;
    name: string;
    avatar: string;
    hobby: string;
    location: string;
    createdAt: string;
}

export type Order = "asc" | "desc";

export interface UserTableProps {
    numSelected: number;
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof UserData
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export interface HeadCell {
    disablePadding: boolean;
    id: keyof UserData;
    label: string;
    numeric: boolean;
}
