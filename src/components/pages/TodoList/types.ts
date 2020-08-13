export type closeTaskType = (day: boolean) => (e: any) => void;
export type clickHandlerType =(date:Date,key:string)=>(inputValue: string, selectValue: number) => void;