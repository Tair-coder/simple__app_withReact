// src/types.ts

export interface pagesState {
    previousPage: number;
    currPage: number;
    nextPage: number;
}

export interface OtherState {
    count: number;
    items: string[];
}

// Главное состояние Redux
export interface RootState {
    pages: pagesState;
    other: OtherState;
}